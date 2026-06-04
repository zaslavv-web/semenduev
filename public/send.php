<?php
/**
 * send.php — обработчик заявок с сайта semenduev.pro
 *
 * Принимает JSON от форм сайта и отправляет письмо через smtp.yandex.ru
 * на адрес RECIPIENT_EMAIL.
 *
 * ────────────────────────────────────────────────────────────────────
 *  УСТАНОВКА
 * ────────────────────────────────────────────────────────────────────
 * 1. Положите этот файл в корень сайта: /public_html/send.php
 *    (или туда, куда настроен document root вашего хостинга).
 *
 * 2. Установите PHPMailer одним из двух способов:
 *
 *    А) Через composer (рекомендуется, если хостинг это поддерживает):
 *       composer require phpmailer/phpmailer
 *       — затем убедитесь, что в той же папке появилась /vendor/autoload.php.
 *
 *    Б) Вручную: скачайте https://github.com/PHPMailer/PHPMailer/releases
 *       и положите файлы src/PHPMailer.php, src/SMTP.php, src/Exception.php
 *       в /PHPMailer/ рядом с send.php. Затем замените блок
 *       "require autoload" ниже на require_once для этих трёх файлов.
 *
 * 3. Заполните настройки в блоке CONFIG ниже:
 *    — SMTP_USER  = ящик, через который отправляем (noreply@semenduev.pro)
 *    — SMTP_PASS  = ПАРОЛЬ ПРИЛОЖЕНИЯ из Яндекс 360
 *                   (id.yandex.ru → «Безопасность» → «Пароли приложений»),
 *                   НЕ основной пароль аккаунта!
 *    — RECIPIENT_EMAIL = куда приходят заявки (viktor@semenduev.pro)
 *    — ALLOWED_ORIGINS = список доменов, с которых принимаем форму
 *
 * 4. Создайте рядом с send.php папку logs/ с правами 0775 — туда будут
 *    писаться ошибки отправки (logs/send-errors.log).
 *
 * ────────────────────────────────────────────────────────────────────
 *  ПРОВЕРКА
 * ────────────────────────────────────────────────────────────────────
 *   curl -X POST https://semenduev.pro/send.php \
 *        -H "Content-Type: application/json" \
 *        -H "Origin: https://semenduev.pro" \
 *        -d '{"source":"contact","name":"Тест","phone":"+79991234567","message":"Проверка"}'
 *
 *   Ожидаемый ответ: {"ok":true}
 */

// ============== CONFIG ==============

const SMTP_HOST       = 'smtp.yandex.ru';
const SMTP_PORT       = 465;
const SMTP_SECURE     = 'ssl';
const SMTP_USER       = 'viktor.semenduev@yandex.ru';
const SMTP_PASS       = 'ayeeiwldusbsobcs';
const SMTP_FROM_NAME  = 'Сайт semenduev.pro';
const RECIPIENT_EMAIL = 'viktor@semenduev.pro';     // ← куда приходят заявки

// Домены, с которых принимаем заявки (защита от чужих сайтов).
// Добавьте сюда все варианты, под которыми может открываться ваш сайт.
const ALLOWED_ORIGINS = [
    'https://semenduev.pro',
    'https://www.semenduev.pro',
];

// ====================================

header('Content-Type: application/json; charset=utf-8');

// --- CORS / Origin check ---
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin && in_array($origin, ALLOWED_ORIGINS, true)) {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Vary: Origin');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'method_not_allowed']);
    exit;
}

// Жёсткая проверка origin/referer — заявки принимаем только со своего сайта.
$referer = $_SERVER['HTTP_REFERER'] ?? '';
$okOrigin = false;
foreach (ALLOWED_ORIGINS as $allowed) {
    if ($origin === $allowed) { $okOrigin = true; break; }
    if ($referer && strpos($referer, $allowed) === 0) { $okOrigin = true; break; }
}
if (!$okOrigin) {
    http_response_code(403);
    echo json_encode(['ok' => false, 'error' => 'bad_origin']);
    exit;
}

// --- Парсим JSON ---
$raw = file_get_contents('php://input');
if (!$raw || strlen($raw) > 10000) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'bad_payload']);
    exit;
}
$data = json_decode($raw, true);
if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'bad_json']);
    exit;
}

// --- Honeypot: если бот заполнил скрытое поле "website" — молча отвечаем OK ---
if (!empty($data['website'])) {
    echo json_encode(['ok' => true]);
    exit;
}

// --- Валидация и обрезка длин ---
function clean(string $s, int $max): string {
    $s = trim($s);
    // вырезаем управляющие символы кроме \r\n\t
    $s = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F]/u', '', $s);
    if (mb_strlen($s) > $max) $s = mb_substr($s, 0, $max);
    return $s;
}

$source  = clean((string)($data['source']  ?? ''), 32);
$name    = clean((string)($data['name']    ?? ''), 200);
$phone   = clean((string)($data['phone']   ?? ($data['contact'] ?? '')), 200);
$contact = clean((string)($data['contact'] ?? ''), 200);
$message = clean((string)($data['message'] ?? ''), 2000);

if ($name === '' || ($phone === '' && $contact === '')) {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'missing_fields']);
    exit;
}

$sourceLabel = [
    'contact'    => 'Форма «Контакты»',
    'checklist'  => 'Форма «Чек-лист»',
    'diagnostic' => 'Форма «Диагностика»',
    'callback'   => 'Форма «Перезвоните мне»',
    'dialog'     => 'Модалка «Оставить заявку»',
][$source] ?? ('Форма: ' . $source);

// --- Подключаем PHPMailer ---
// Вариант А: composer
$autoload = __DIR__ . '/vendor/autoload.php';
if (file_exists($autoload)) {
    require_once $autoload;
} else {
    // Вариант Б: ручная установка PHPMailer в ./PHPMailer/
    require_once __DIR__ . '/phpmailer/Exception.php';
    require_once __DIR__ . '/phpmailer/PHPMailer.php';
    require_once __DIR__ . '/phpmailer/SMTP.php';
}

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$mail = new PHPMailer(true);

try {
    $mail->CharSet   = 'UTF-8';
    $mail->isSMTP();
    $mail->Host       = SMTP_HOST;
    $mail->Port       = SMTP_PORT;
    $mail->SMTPAuth   = true;
    $mail->SMTPSecure = SMTP_SECURE;
    $mail->Username   = SMTP_USER;
    $mail->Password   = SMTP_PASS;

    $mail->setFrom(SMTP_USER, SMTP_FROM_NAME);
    $mail->addAddress(RECIPIENT_EMAIL);
    // Если посетитель оставил email — можно отвечать прямо из почты:
    if (filter_var($phone, FILTER_VALIDATE_EMAIL)) {
        $mail->addReplyTo($phone, $name);
    } elseif (filter_var($contact, FILTER_VALIDATE_EMAIL)) {
        $mail->addReplyTo($contact, $name);
    }

    $mail->Subject = 'Заявка с сайта: ' . $sourceLabel;

    $lines = [];
    $lines[] = 'Источник: ' . $sourceLabel;
    $lines[] = 'Имя:       ' . $name;
    if ($phone !== '')   $lines[] = 'Контакт:   ' . $phone;
    if ($contact !== '' && $contact !== $phone) $lines[] = 'Доп.:      ' . $contact;
    if ($message !== '') {
        $lines[] = '';
        $lines[] = 'Сообщение:';
        $lines[] = $message;
    }
    $lines[] = '';
    $lines[] = '— IP: ' . ($_SERVER['REMOTE_ADDR'] ?? '?');
    $lines[] = '— UA: ' . substr($_SERVER['HTTP_USER_AGENT'] ?? '?', 0, 200);
    $lines[] = '— Время: ' . date('Y-m-d H:i:s');

    $mail->Body    = implode("\n", $lines);
    $mail->isHTML(false);

    $mail->send();
    echo json_encode(['ok' => true]);
} catch (Exception $e) {
    @file_put_contents(
        __DIR__ . '/logs/send-errors.log',
        '[' . date('c') . '] ' . $mail->ErrorInfo . "\n",
        FILE_APPEND
    );
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'send_failed']);
}
