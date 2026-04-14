<?php
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: index.html#kontakt');
    exit;
}

$name = trim($_POST['name'] ?? '');
$company = trim($_POST['company'] ?? '');
$email = trim($_POST['email'] ?? '');
$message = trim($_POST['message'] ?? '');
$privacy = $_POST['privacy'] ?? '';

if ($name === '' || $company === '' || $email === '' || $message === '' || $privacy === '') {
    header('Location: index.html#kontakt');
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    header('Location: index.html#kontakt');
    exit;
}

$to = 'info@atakhan-tamer.de';
$subject = 'Neue Projektanfrage über atakhan-tamer.de';
$body = "Name: {$name}\nUnternehmen: {$company}\nE-Mail: {$email}\n\nAnfrage:\n{$message}\n";
$headers = "From: no-reply@atakhan-tamer.de\r\n";
$headers .= "Reply-To: {$email}\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

@mail($to, $subject, $body, $headers);

header('Location: kontakt-erfolg.html');
exit;
