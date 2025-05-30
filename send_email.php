<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/PHPMailer-master/src/Exception.php';
require 'PHPMailer/PHPMailer-master/src/PHPMailer.php';
require 'PHPMailer/PHPMailer-master/src/SMTP.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Ambil data dari form
    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $subject = $_POST['subject'] ?? 'Pesan dari Form Kontak';
    $message = $_POST['message'] ?? '';

    // Validasi input
    if (empty($name) || empty($email) || empty($message)) {
        die('Harap isi semua field yang diperlukan');
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die('Email tidak valid');
    }

 
    if (!empty($_POST['honeypot'])) {
    die('Spam detected');
    }

    // Konfigurasi PHPMailer
    $mail = new PHPMailer(true);

    try {
        // Server settings
        $mail->SMTPDebug = 2;                      
        $mail->isSMTP();                         
        $mail->Host       = 'smtp.gmail.com';      
        $mail->SMTPAuth   = true;                  
        $mail->Username   = 'nusanarrative@gmail.com';
        $mail->Password   = 'bscqtzdnldpbzbno';    
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; 
        $mail->Port       = 587;                 

        $mail->setFrom('nusanarrative@gmail.com', 'Contact Form Nusanarrative');
        $mail->addReplyTo($email, $name); // agar bisa reply ke pengirim asli

        $mail->addAddress('nusanarrative@gmail.com');

        // Content
        $mail->isHTML(true);                      
        $mail->Subject = 'Pesan Baru dari Website';
        $mail->Body    = "
            <h2>Pesan Baru dari Form Kontak</h2>
            <p><strong>Nama:</strong> {$name}</p>
            <p><strong>Email:</strong> {$email}</p>
            <p><strong>Pesan:</strong></p>
            <p>{$message}</p>
        ";
        $mail->AltBody = strip_tags($message);   

        $mail->send();
        echo '<script>alert("Pesan berhasil dikirim!"); window.location.href = "index.html";</script>';
    } catch (Exception $e) {
        echo "<script>alert('Pesan tidak dapat dikirim. Error: {$mail->ErrorInfo}'); window.history.back();</script>";
    }
} else {
    header('Location: index.html');
}
?>