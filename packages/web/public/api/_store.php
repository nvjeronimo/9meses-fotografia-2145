<?php
// Shared helpers for the contact form's endpoints (guard.php, contact.php): a private folder outside the web root
// (a deploy never wipes it and nobody can open it), a failure log, anonymous day counters, a per-visitor limit and
// the guard against automated sends. No names, emails or messages are ever written here.
declare(strict_types=1);

const NM_HOSTS = ['9mesesfotografia.com', 'www.9mesesfotografia.com'];

function nm_dir(): string {
    $root = rtrim((string) ($_SERVER['DOCUMENT_ROOT'] ?? ''), '/');
    $dir = ($root !== '' ? dirname($root) : sys_get_temp_dir()) . '/9m-data';
    if (!is_dir($dir) && !@mkdir($dir, 0700, true)) $dir = sys_get_temp_dir();
    return $dir;
}

/** One line per refused or failed send: when, why and a few sizes. Never the name, the email or the message. */
function nm_log(string $reason, array $info = []): void {
    $file = nm_dir() . '/form-failures.log';
    if (@filesize($file) > 512 * 1024) @rename($file, $file . '.1');
    $pairs = [];
    foreach ($info as $k => $v) $pairs[] = $k . '=' . preg_replace('/[^\w.@:+-]/', '_', (string) $v);
    @file_put_contents($file, date('c') . ' ' . $reason . ' ' . implode(' ', $pairs) . "\n", FILE_APPEND | LOCK_EX);
}

/** Adds one to a named counter for today. Kept for 120 days. */
function nm_count(string $key): void {
    $file = nm_dir() . '/form-stats.json';
    $fh = @fopen($file, 'c+');
    if (!$fh) return;
    if (flock($fh, LOCK_EX)) {
        $data = json_decode((string) stream_get_contents($fh), true) ?: [];
        $day = date('Y-m-d');
        $data[$day][$key] = (int) ($data[$day][$key] ?? 0) + 1;
        $cut = date('Y-m-d', time() - 120 * 86400);
        foreach (array_keys($data) as $d) if ($d < $cut) unset($data[$d]);
        ftruncate($fh, 0); rewind($fh); fwrite($fh, (string) json_encode($data)); fflush($fh); flock($fh, LOCK_UN);
    }
    fclose($fh);
}

/** True when the request names this site as its origin, or names none (a same-site GET carries no Origin). */
function nm_same_site(): bool {
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    return $origin === '' || in_array(parse_url($origin, PHP_URL_HOST), NM_HOSTS, true);
}

/** True when the request says it comes from one of this site's pages. A browser always says so on a POST. */
function nm_from_site(): bool {
    $from = (string) ($_SERVER['HTTP_ORIGIN'] ?? '') ?: (string) ($_SERVER['HTTP_REFERER'] ?? '');
    return in_array(parse_url($from, PHP_URL_HOST), NM_HOSTS, true);
}

/** A small limit: at most $max calls in $seconds, per visitor (the IP is only ever kept as a digest) or, with
    $everyone, for all visitors together. */
function nm_limit(string $name, int $max, int $seconds, bool $everyone = false): bool {
    $bucket = sys_get_temp_dir() . '/nm' . $name . '_' . ($everyone ? 'all' : md5($_SERVER['REMOTE_ADDR'] ?? 'unknown'));
    $hits = array_filter(explode(',', @file_get_contents($bucket) ?: ''), fn($t) => $t !== '' && (int) $t > time() - $seconds);
    if (count($hits) >= $max) return false;
    $hits[] = (string) time();
    @file_put_contents($bucket, implode(',', $hits), LOCK_EX);
    return true;
}

/* ---- The form's guard against automated sends. No outside service, no cookie, nothing for the visitor to solve.
   The page asks api/guard.php for a challenge: the time, a random part and a signature only this server can make.
   The browser must then find a number that, hashed with the challenge, starts with NM_GUARD_BITS zero bits (a fraction
   of a second of work), and send challenge and number with the request. A request passes when the signature is ours,
   the challenge is at least a few seconds and at most two hours old (nobody fills the form faster; a script posts at
   once), the number is right, and the challenge has not been used before. The signing key is made by the server on
   first use and lives in the private folder: it is in no repository and nobody needs to know it. */
const NM_GUARD_BITS = 12;
function nm_guard_key(): string {
    $file = nm_dir() . '/guard-key';
    $k = trim((string) @file_get_contents($file));
    if (strlen($k) < 32) { $k = bin2hex(random_bytes(32)); @file_put_contents($file, $k, LOCK_EX); @chmod($file, 0600); }
    return $k;
}
function nm_guard_issue(): array {
    $c = time() . '.' . bin2hex(random_bytes(8));
    return ['c' => $c . '.' . hash_hmac('sha256', $c, nm_guard_key()), 'bits' => NM_GUARD_BITS];
}
/** '' when the challenge and its answer are good, otherwise why not (for the counters; the page is only told "check"). */
function nm_guard_check(string $c, string $answer, int $minAge = 3): string {
    $p = explode('.', $c);
    if (count($p) !== 3 || !ctype_digit($p[0]) || !preg_match('/^\d{1,12}$/', $answer)) return 'missing';
    if (!hash_equals(hash_hmac('sha256', $p[0] . '.' . $p[1], nm_guard_key()), $p[2])) return 'forged';
    $age = time() - (int) $p[0];
    if ($age < $minAge) return 'early';
    if ($age > 7200) return 'old';
    $h = hash('sha256', $c . '.' . $answer, true);
    for ($i = 0, $bits = NM_GUARD_BITS; $bits > 0; $i++, $bits -= 8) { $byte = ord($h[$i]); if ($bits >= 8 ? $byte !== 0 : ($byte >> (8 - $bits)) !== 0) return 'work'; }
    if (is_file(sys_get_temp_dir() . '/nmg_' . md5($c))) return 'used';
    return '';
}
/** A challenge is good for one request: called once the request has passed validation and the limits. */
function nm_guard_spend(string $c): void { @touch(sys_get_temp_dir() . '/nmg_' . md5($c)); }
