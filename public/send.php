<?php
/**
 * send.php — обработчик заявок с сайта semenduev.pro
 * Версия с отладкой (массив $debug возвращается в ответе всегда)
 */

// ============== CONFIG ==============
const SMTP_HOST       = 'smtp.yandex.ru';
const SMTP_PORT       = 465;
const SMTP_SECURE     = 'ssl';
const SMTP_USER       = 'viktor.semenduev@yandex.ru';
const SMTP_PASS       = 'ayeeiwldusbsobcs';
const SMTP_FROM_NAME  = 'Сайт semenduev.pro';
const RECIPIENT_EMAIL = 'viktor@semenduev.pro';

const ALLOWED_ORIGINS = [
    'https://semenduev.pro',
    'https://www.semenduev.pro',
];
// ====================================

header('Content-Type: application/json; charset=utf-8');

// Включаем вывод всех ошибок для отладки
error_reporting(E_ALL);
ini_set('display_errors', 1);

$debug = [];
$debug[] = '=== НАЧАЛО ОТЛАДКИ ===';
$debug[] = 'Время: ' . date('Y-m-d H:i:s');
$debug[] = 'Метод запроса: ' . $_SERVER['REQUEST_METHOD'];
$debug[] = 'URI: ' . ($_SERVER['REQUEST_URI'] ?? 'unknown');

// --- CORS / Origin check ---
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$debug[] = 'Origin: ' . ($origin ?: 'не указан');

if ($origin && in_array($origin, ALLOWED_ORIGINS, true)) {
    header('Access-Control-Allow-Origin: ' . $origin);
    header('Vary: Origin');
    header('Access-Control-Allow-Methods: POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type');
    $debug[] = 'CORS заголовки установлены для: ' . $origin;
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    $debug[] = 'OPTIONS запрос, отправляем 204';
    echo json_encode(['debug' => $debug, 'ok' => false, 'error' => 'options_request']);
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    $debug[] = 'ОШИБКА: Не POST запрос';
    echo json_encode(['debug' => $debug, 'ok' => false, 'error' => 'method_not_allowed']);
    exit;
}

// Проверка origin/referer
$referer = $_SERVER['HTTP_REFERER'] ?? '';
$debug[] = 'Referer: ' . ($referer ?: 'не указан');

$okOrigin = false;
foreach (ALLOWED_ORIGINS as $allowed) {
    if ($origin === $allowed) {
        $okOrigin = true;
        $debug[] = 'Origin принят: ' . $allowed;
        break;
    }
    if ($referer && strpos($referer, $allowed) === 0) {
        $okOrigin = true;
        $debug[] = 'Referer принят: ' . $allowed;
        break;
    }
}

if (!$okOrigin) {
    $debug[] = 'ОШИБКА: origin/referer не разрешен';
    echo json_encode(['debug' => $debug, 'ok' => false, 'error' => 'bad_origin']);
    exit;
}

// --- Парсим JSON ---
$raw = file_get_contents('php://input');
$debug[] = 'Сырые данные (длина: ' . strlen($raw) . '): ' . ($raw ?: 'ПУСТО');

if (!$raw) {
    $debug[] = 'ОШИБКА: Нет данных в запросе';
    echo json_encode(['debug' => $debug, 'ok' => false, 'error' => 'no_data']);
    exit;
}

if (strlen($raw) > 10000) {
    $debug[] = 'ОШИБКА: Превышен лимит данных (10000)';
    echo json_encode(['debug' => $debug, 'ok' => false, 'error' => 'payload_too_large']);
    exit;
}

$data = json_decode($raw, true);
$debug[] = 'Результат json_decode: ' . print_r($data, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    $debug[] = 'ОШИБКА JSON: ' . json_last_error_msg();
    echo json_encode(['debug' => $debug, 'ok' => false, 'error' => 'bad_json', 'json_error' => json_last_error_msg()]);
    exit;
}

if (!is_array($data)) {
    $debug[] = 'ОШИБКА: Данные не являются массивом, тип: ' . gettype($data);
    echo json_encode(['debug' => $debug, 'ok' => false, 'error' => 'not_array']);
    exit;
}

// Honeypot
if (!empty($data['website'])) {
    $debug[] = 'Honeypot сработал (поле website заполнено)';
    echo json_encode(['debug' => $debug, 'ok' => true]);
    exit;
}

// --- Валидация ---
function clean(string $s, int $max): string {
    $s = trim($s);
    $s = preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F]/u', '', $s);
    if (mb_strlen($s) > $max) $s = mb_substr($s, 0, $max);
    return $s;
}

$source  = clean((string)($data['source']  ?? ''), 32);
$name    = clean((string)($data['name']    ?? ''), 200);
$phone   = clean((string)($data['phone']   ?? ($data['contact'] ?? '')), 200);
$contact = clean((string)($data['contact'] ?? ''), 200);
$message = clean((string)($data['message'] ?? ''), 2000);

$debug[] = 'Обработанные поля:';
$debug[] = '  source: ' . $source;
$debug[] = '  name: ' . $name;
$debug[] = '  phone: ' . $phone;
$debug[] = '  contact: ' . $contact;
$debug[] = '  message (первые 100 симв): ' . substr($message, 0, 100);

if ($name === '' || ($phone === '' && $contact === '')) {
    $debug[] = 'ОШИБКА: Отсутствуют обязательные поля (имя или контакт)';
    echo json_encode(['debug' => $debug, 'ok' => false, 'error' => 'missing_fields']);
    exit;
}

$sourceLabel = [
    'contact'   => 'Форма «Контакты»',
    'checklist' => 'Форма «Чек-лист»',
    'dialog'    => 'Модалка «Оставить заявку»',
][$source] ?? ('Форма: ' . $source);

$debug[] = 'Источник формы: ' . $sourceLabel;

// --- Подключаем phpmailer (ручная установка в ./phpmailer/) ---
$debug[] = 'Поиск phpmailer...';
require_once __DIR__ . 'public/phpmailer/Exception.php';
require_once __DIR__ . '/public/phpmailer/phpmailer.php';
require_once __DIR__ . '/public/phpmailer/SMTP.php';
$debug[] = 'phpmailer загружен';

use phpmailer\phpmailer\phpmailer;
use phpmailer\phpmailer\Exception;

$mail = new phpmailer(true);

try {
    $debug[] = 'Настройка SMTP...';
    $mail->CharSet   = 'UTF-8';
    $mail->isSMTP();
    $mail->Host       = SMTP_HOST;
    $mail->Port       = SMTP_PORT;
    $mail->SMTPAuth   = true;
    $mail->SMTPSecure = SMTP_SECURE;
    $mail->Username   = SMTP_USER;
    $mail->Password   = SMTP_PASS;

    // Включаем SMTP debug для вывода
    $mail->SMTPDebug = 2;
    $mail->Debugoutput = function($str, $level) use (&$debug) {
        $debug[] = 'SMTP: ' . trim($str);
    };

    $debug[] = 'Отправитель: ' . SMTP_USER;
    $mail->setFrom(SMTP_USER, SMTP_FROM_NAME);

    $debug[] = 'Получатель: ' . RECIPIENT_EMAIL;
    $mail->addAddress(RECIPIENT_EMAIL);

    if (filter_var($phone, FILTER_VALIDATE_EMAIL)) {
        $mail->addReplyTo($phone, $name);
        $debug[] = 'ReplyTo (email): ' . $phone;
    } elseif (filter_var($contact, FILTER_VALIDATE_EMAIL)) {
        $mail->addReplyTo($contact, $name);
        $debug[] = 'ReplyTo (email): ' . $contact;
    }

    $subject = 'Заявка с сайта: ' . $sourceLabel;
    $mail->Subject = $subject;
    $debug[] = 'Тема: ' . $subject;

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

    $debug[] = 'Текст письма:';
    $debug[] = $mail->Body;

    $debug[] = 'Попытка отправки...';
    $mail->send();
    $debug[] = '✓ ПИСЬМО УСПЕШНО ОТПРАВЛЕНО!';

    echo json_encode(['debug' => $debug, 'ok' => true]);

} catch (Exception $e) {
    $debug[] = '✗ ОШИБКА ПРИ ОТПРАВКЕ: ' . $mail->ErrorInfo;
    $debug[] = 'Исключение: ' . $e->getMessage();
    $debug[] = 'Код ошибки: ' . $e->getCode();

    @file_put_contents(
        __DIR__ . '/logs/send-errors.log',
        '[' . date('c') . '] ' . $mail->ErrorInfo . "\n",
        FILE_APPEND
    );

    echo json_encode(['debug' => $debug, 'ok' => false, 'error' => 'send_failed']);
}

$debug[] = '=== КОНЕЦ ОТЛАДКИ ===';
