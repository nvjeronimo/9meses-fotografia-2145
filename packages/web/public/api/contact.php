<?php
// Contact form handler for 9mesesfotografia.com (PHP mail() from the studio's own mailbox). Always answers in JSON:
// {ok, error, copy}. `copy` says whether the confirmation went to the visitor.
declare(strict_types=1);
require __DIR__ . '/_store.php';

const TO = 'info@9mesesfotografia.com';        // forward-only address: it passes everything on to the studio's Gmail
const CC = 'website@9mesesfotografia.com';     // a real mailbox on the domain, which keeps its own copy
const BCC = '9mesesfotografia@gmail.com';      // hidden copy sent straight to the Gmail, in case the forward fails
const FROM = 'info@9mesesfotografia.com';      // sender of the notification and of the confirmation
const PHONE = '+351 967 716 894';

// Session names by the key the form sends: [for Tânia (always Portuguese), Portuguese, English].
const SESSIONS = [
    'maternity' => ['Maternidade', 'Maternidade', 'Maternity'],
    'newborn' => ['Newborn', 'Newborn', 'Newborn'],
    'baby' => ['Bebé', 'Bebé', 'Baby'],
    'family' => ['Família', 'Família', 'Family'],
    'smash' => ['Smash the Cake', 'Smash the Cake', 'Smash the Cake'],
];

function done(bool $ok, string $error = '', int $code = 200, bool $copy = false): void {
    // every refused or failed send leaves a trace (reason and sizes only), so it can be explained afterwards
    if (!$ok) nm_log($error, ['http' => $code, 'lang' => $_POST['lang'] ?? '', 'session' => $_POST['session'] ?? '', 'msg_len' => mb_strlen((string) ($_POST['message'] ?? '')), 'mail_host' => substr((string) strrchr((string) ($_POST['email'] ?? ''), '@'), 1, 60), 'consent' => (int) (($_POST['consent'] ?? '') === '1')]);
    http_response_code($ok ? 200 : $code);
    header('Content-Type: application/json; charset=utf-8');
    header('Cache-Control: no-store');
    echo json_encode(['ok' => $ok, 'error' => $error, 'copy' => $copy]);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') done(false, 'method', 405);

// Only this site's own form may post here. A browser always says where a POST comes from: one that names another
// site, or names nothing at all (no Origin, no page it came from), is a script.
if (!nm_same_site() || !nm_from_site()) done(false, 'origin', 403);

// Honeypot: bots fill the hidden "website" field. Pretend success and send nothing.
if (!empty($_POST['website'])) { nm_count('spam_trap'); done(true); }

// The proof of a real browser that took the time to fill the form (see nm_guard_* in _store.php).
$guard = (string) ($_POST['g'] ?? '');
$guardWhy = nm_guard_check($guard, (string) ($_POST['ga'] ?? ''));
if ($guardWhy !== '') { nm_count('spam_' . $guardWhy); done(false, 'check', 400); }

$clean = static fn($v, int $max) => trim(mb_substr(str_replace(["\r", "\0"], '', (string) $v), 0, $max));
$oneLine = static fn(string $v) => (string) preg_replace('/[\n\t]+/', ' ', $v);
$isDate = static fn(string $v): bool => (bool) preg_match('/^\d{4}-\d{2}-\d{2}$/', $v) && strtotime($v) !== false;
$showDate = static fn(string $v): string => date('d/m/Y', (int) strtotime($v));

$name = $oneLine($clean($_POST['name'] ?? '', 120));
$email = $oneLine($clean($_POST['email'] ?? '', 200));
$phone = $oneLine($clean($_POST['phone'] ?? '', 40));
$session = (string) ($_POST['session'] ?? '');
$family = $oneLine($clean($_POST['family'] ?? '', 200));
$dueDate = $oneLine($clean($_POST['due_date'] ?? '', 10));
$preferred = $oneLine($clean($_POST['preferred_date'] ?? '', 10));
$package = $oneLine($clean($_POST['package'] ?? '', 80));
$message = $clean($_POST['message'] ?? '', 5000);
$en = ($_POST['lang'] ?? 'pt') === 'en';
$consent = ($_POST['consent'] ?? '') === '1';

if ($name === '' || !filter_var($email, FILTER_VALIDATE_EMAIL) || !$consent
    || ($session !== '' && !isset(SESSIONS[$session]))
    || ($dueDate !== '' && !$isDate($dueDate)) || ($preferred !== '' && !$isDate($preferred))) {
    done(false, 'invalid', 422);
}

// At most 5 requests in 10 minutes per visitor, and a ceiling for everyone together (40 an hour), so the
// confirmation can never be used to flood other people's mailboxes.
if (!nm_limit('form', 5, 600) || !nm_limit('form', 40, 3600, true)) done(false, 'rate', 429);
nm_guard_spend($guard);

// What passes all of the above can still be a machine driving a real browser. One sign of it: a message full of
// links. Such a request still reaches the studio, marked, but nothing is sent back to the address it gives (an
// automatic reply to an address that never asked is itself spam).
$doubt = preg_match_all('~https?://|www\.~i', $message) >= 3;
if ($doubt) nm_count('spam_doubt');

$esc = static fn(string $v) => htmlspecialchars($v, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
function send_mail(string $to, string $subject, string $text, string $html, array $headers): bool {
    $b = 'nm_' . bin2hex(random_bytes(8));
    $headers[] = 'MIME-Version: 1.0';
    $headers[] = 'Content-Type: multipart/alternative; boundary="' . $b . '"';
    $body = "--{$b}\r\nContent-Type: text/plain; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n" . chunk_split(base64_encode($text))
        . "--{$b}\r\nContent-Type: text/html; charset=UTF-8\r\nContent-Transfer-Encoding: base64\r\n\r\n" . chunk_split(base64_encode($html))
        . "--{$b}--\r\n";
    return @mail($to, '=?UTF-8?B?' . base64_encode($subject) . '?=', $body, implode("\r\n", $headers), '-f' . FROM);
}
/** The shell both emails share: cream page, white card, the studio's name on top. */
function shell(string $lang, string $title, string $inner, string $footer): string {
    return '<!doctype html><html lang="' . $lang . '"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>' . $title . '</title></head>'
        . '<body style="margin:0;padding:0;background:#f7f3ee;">'
        . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f7f3ee;"><tr><td align="center" style="padding:32px 16px;">'
        . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border:1px solid #e9e1d6;">'
        . '<tr><td style="padding:28px 32px 8px;font:400 13px/1.4 Arial,Helvetica,sans-serif;letter-spacing:0.18em;text-transform:uppercase;color:#a8865f;">9 Meses Fotografia</td></tr>'
        . '<tr><td style="padding:0 32px 28px;font:400 16px/1.6 Arial,Helvetica,sans-serif;color:#3a342e;">' . $inner . '</td></tr>'
        . '</table>'
        . '<p style="max-width:560px;margin:16px auto 0;font:400 12px/1.5 Arial,Helvetica,sans-serif;color:#8a8076;">' . $footer . '</p>'
        . '</td></tr></table></body></html>';
}

$first = mb_substr(preg_split('/\s+/', $name)[0] ?? '', 0, 40);
$sessionForStudio = $session !== '' ? SESSIONS[$session][0] : '—';

// 1) Notification to the studio, always in Portuguese.
$rows = [
    'Nome' => $name,
    'Email' => $email,
    'Telefone' => $phone ?: '—',
    'Sessão' => $sessionForStudio,
    'Pacote escolhido' => $package ?: '—',
    'Data prevista / de nascimento' => $dueDate !== '' ? $showDate($dueDate) : '—',
    'Data preferida' => $preferred !== '' ? $showDate($preferred) : '—',
    'Família' => $family ?: '—',
];
$text = "Novo pedido de marcação pelo site (" . ($en ? 'EN' : 'PT') . ")\n\n";
foreach ($rows as $k => $v) $text .= "{$k}: {$v}\n";
$text .= "\nMensagem:\n" . ($message ?: '—') . "\n\n—\nResponda a este email para falar diretamente com {$name}.\n"
    . "Consentimento RGPD: aceite em " . date('c') . " (Política de Privacidade)\n";
$table = '';
foreach ($rows as $k => $v) {
    $table .= '<tr><td style="padding:8px 12px 8px 0;border-bottom:1px solid #efe8de;font:400 12px/1.4 Arial,Helvetica,sans-serif;letter-spacing:0.08em;text-transform:uppercase;color:#8a8076;white-space:nowrap;vertical-align:top;">' . $esc($k) . '</td>'
        . '<td style="padding:8px 0;border-bottom:1px solid #efe8de;font:400 15px/1.5 Arial,Helvetica,sans-serif;color:#3a342e;">' . $esc($v) . '</td></tr>';
}
$html = shell('pt', 'Pedido de marcação',
    '<h1 style="margin:8px 0 6px;font:400 26px/1.25 Georgia,\'Times New Roman\',serif;color:#2b2622;">Pedido de marcação</h1>'
    . '<p style="margin:0 0 20px;color:#6b625a;">Recebeu um novo pedido através do site 9mesesfotografia.com.</p>'
    . '<table role="presentation" width="100%" cellpadding="0" cellspacing="0">' . $table . '</table>'
    . '<p style="margin:22px 0 6px;font:400 12px/1.4 Arial,Helvetica,sans-serif;letter-spacing:0.08em;text-transform:uppercase;color:#8a8076;">Mensagem</p>'
    . '<p style="margin:0;white-space:pre-wrap;">' . ($message !== '' ? nl2br($esc($message)) : '—') . '</p>'
    . '<p style="margin:24px 0 0;padding-top:16px;border-top:1px solid #efe8de;color:#6b625a;">Responda a este email para falar diretamente com ' . $esc($name) . '.</p>',
    'Formulário de contacto de 9mesesfotografia.com · idioma do visitante: ' . ($en ? 'English' : 'Português') . ' · ' . date('d/m/Y H:i'));
$sent = send_mail(TO, ($doubt ? '[verificar: possível spam] ' : '') . "Novo pedido de marcação: {$name} ({$sessionForStudio})", $text, $html, [
    'From: 9 Meses Fotografia (site) <' . FROM . '>',
    'Cc: ' . CC,
    'Bcc: ' . BCC,
    'Reply-To: ' . $email,
    'X-Mailer: 9mesesfotografia.com',
]);
if (!$sent) done(false, 'mail', 500);
nm_count('sent');
nm_count('lang_' . ($en ? 'en' : 'pt'));
if ($doubt) done(true);

// 2) Confirmation to the visitor. Fixed copy: of what was typed, only the first name is repeated, plus the session
// and the date when they are valid choices; never the free text, so the form cannot be used to send someone else's
// words to a third party.
$sessionForVisitor = $session !== '' ? SESSIONS[$session][$en ? 2 : 1] : '';
$L = $en ? [
    'subject' => 'I received your request — 9 Meses Fotografia',
    'hello' => 'Hello',
    'p1' => 'Thank you for your message. I have received your request and will reply personally, by email or phone.',
    'yours' => 'Your request',
    'session' => 'session',
    'date' => 'preferred date',
    'urgent' => 'If it is urgent, you can also reach me on WhatsApp',
    'call' => 'call to a Portuguese mobile network',
    'sign' => 'With love,',
    'place' => 'Photography studio · Ferreiras, Albufeira, Algarve',
    'footer' => 'You are receiving this email because you sent a request on 9mesesfotografia.com.',
] : [
    'subject' => 'Recebi o vosso pedido — 9 Meses Fotografia',
    'hello' => 'Olá',
    'p1' => 'Obrigada pela mensagem. Recebi o vosso pedido e respondo pessoalmente, por email ou telefone.',
    'yours' => 'O vosso pedido',
    'session' => 'sessão',
    'date' => 'data preferida',
    'urgent' => 'Se for urgente, também me encontram no WhatsApp',
    'call' => 'chamada para a rede móvel nacional',
    'sign' => 'Com amor,',
    'place' => 'Estúdio de fotografia · Ferreiras, Albufeira, Algarve',
    'footer' => 'Recebe este email porque enviou um pedido em 9mesesfotografia.com.',
];
$parts = [];
if ($sessionForVisitor !== '') $parts[] = "{$L['session']} {$sessionForVisitor}";
if ($preferred !== '') $parts[] = "{$L['date']} " . $showDate($preferred);
$summary = $parts ? $L['yours'] . ': ' . implode(', ', $parts) . '.' : '';
$site = 'https://9mesesfotografia.com' . ($en ? '/en' : '/');
$arText = "{$L['hello']} {$first},\n\n{$L['p1']}\n" . ($summary !== '' ? "\n{$summary}\n" : '')
    . "\n{$L['urgent']}: " . PHONE . " ({$L['call']}).\n\n{$L['sign']}\nTânia\n\n9 Meses Fotografia\n{$L['place']}\n{$site}\n";
$arHtml = shell($en ? 'en' : 'pt', $esc($L['subject']),
    '<h1 style="margin:8px 0 14px;font:400 26px/1.25 Georgia,\'Times New Roman\',serif;color:#2b2622;">' . $esc($L['hello']) . ' ' . $esc($first) . ',</h1>'
    . '<p style="margin:0 0 16px;">' . $esc($L['p1']) . '</p>'
    . ($summary !== '' ? '<p style="margin:0 0 16px;padding:12px 16px;border-left:3px solid #c9a87c;background:#faf6f0;">' . $esc($summary) . '</p>' : '')
    . '<p style="margin:0 0 22px;">' . $esc($L['urgent']) . ': <a href="https://wa.me/351967716894" style="color:#3a342e;">' . PHONE . '</a> <span style="color:#8a8076;font-size:13px;">(' . $esc($L['call']) . ')</span>.</p>'
    . '<p style="margin:0;">' . $esc($L['sign']) . '<br><span style="font:italic 400 20px/1.4 Georgia,\'Times New Roman\',serif;color:#2b2622;">Tânia</span></p>'
    . '<p style="margin:22px 0 0;padding-top:16px;border-top:1px solid #efe8de;font-size:13px;color:#6b625a;">9 Meses Fotografia<br>' . $esc($L['place']) . '<br><a href="' . $site . '" style="color:#6b625a;">9mesesfotografia.com</a></p>',
    $esc($L['footer']));
$copy = send_mail($email, $L['subject'], $arText, $arHtml, [
    'From: 9 Meses Fotografia <' . FROM . '>',
    'Reply-To: ' . FROM,
    'Auto-Submitted: auto-replied',
]);

done(true, '', 200, $copy);
