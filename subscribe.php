<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/PHPMailer-master/src/Exception.php';
require 'PHPMailer/PHPMailer-master/src/PHPMailer.php';
require 'PHPMailer/PHPMailer-master/src/SMTP.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = $_POST['email'] ?? '';

    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die('Email tidak valid.');
    }

    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->isSMTP();
        $mail->Host       = 'smtp.gmail.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'nusanarrative@gmail.com';
        $mail->Password   = 'bscqtzdnldpbzbno'; // gunakan app password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        // Email pengirim dan penerima
        $mail->setFrom('nusanarrative@gmail.com', 'Form Subscription');
        $mail->addAddress('nusanarrative@gmail.com'); // dikirim ke kamu

        // Konten email
        $mail->isHTML(true);
        $mail->Subject = 'Langganan Baru dari Website';
        $mail->Body    = "<p><strong>Email baru berlangganan:</strong> {$email}</p>";
        $mail->AltBody = "Email baru berlangganan: {$email}";

        $mail->send();
        echo '<script>alert("Terima kasih telah berlangganan!"); window.location.href = "index.html";</script>';
    } catch (Exception $e) {
        echo "<script>alert('Gagal mengirim langganan. Error: {$mail->ErrorInfo}'); window.history.back();</script>";
    }
} else {
    header('Location: index.html');
}
