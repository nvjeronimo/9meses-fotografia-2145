<?php
// The contact form's proof of a real browser (see nm_guard_* in _store.php): hands out a signed, dated challenge.
// The form asks for one when it is first touched, works out its answer in the background and sends both with the request.
declare(strict_types=1);
require __DIR__ . '/_store.php';

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
if ($_SERVER['REQUEST_METHOD'] !== 'GET') { http_response_code(405); echo json_encode(['ok' => false]); exit; }
if (!nm_same_site() || !nm_limit('guard', 30, 600)) { http_response_code(429); echo json_encode(['ok' => false]); exit; }
echo json_encode(['ok' => true] + nm_guard_issue());
