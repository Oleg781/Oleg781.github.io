<?php
  /**
  * Requires the "PHP Email Form" library
  * The "PHP Email Form" library is available only in the pro version of the template
  * The library should be uploaded to: vendor/php-email-form/php-email-form.php
  * For more info and help: https://bootstrapmade.com/php-email-form/
  */

  // Replace contact@example.com with your real receiving email address
  // $receiving_email_address = 'oleg.fedjuk@gmail.com';

  // if( file_exists($php_email_form = '../assets/vendor/php-email-form/php-email-form.php' )) {
  //   include( $php_email_form );
  // } else {
  //   die( 'Unable to load the "PHP Email Form" Library!');
  // }

  // $contact = new PHP_Email_Form;
  // $contact->ajax = true;
  
  // $contact->to = $receiving_email_address;
  // $contact->from_name = $_POST['name'];
  // $contact->from_email = $_POST['email'];
  // $contact->subject = $_POST['subject'];

  // Uncomment below code if you want to use SMTP to send emails. You need to enter your correct SMTP credentials
  /*
  $contact->smtp = array(
    'host' => 'example.com',
    'username' => 'example',
    'password' => 'pass',
    'port' => '587'
  );
  */

//   $contact->add_message( $_POST['name'], 'From');
//   $contact->add_message( $_POST['email'], 'Email');
//   if(isset($_POST['phone'])) {
//     $contact->add_message( $_POST['phone'], 'Phone');
//   }
//   $contact->add_message( $_POST['message'], 'Message', 10);

//   echo $contact->send();

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use Dotenv\Dotenv;

require __DIR__ . '/../vendor/autoload.php';

$dotenv = Dotenv::createImmutable(__DIR__, '.env.local');
$dotenv->load();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
  $to      = $_ENV['MAIL_TO'];
  $subject = $_POST["subject"];
  $name    = $_POST["name"];
  $email   = $_POST["email"];
  $message = $_POST["message"];
  // $phone = $_POST["phone"] ?? '';

  $mail = new PHPMailer(true);

  try {
    $mail->isSMTP();
    $mail->Host       = $_ENV['SMTP_HOST'];
    $mail->SMTPAuth   = true;
    $mail->Username   = $_ENV['SMTP_USERNAME'];
    $mail->Password   = $_ENV['SMTP_PASSWORD'];
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port = (int) $_ENV['SMTP_PORT'];
    
    $mail->setFrom($_ENV['MAIL_FROM'], $_ENV['MAIL_FROM_NAME']);
    $mail->addAddress($to);
    $mail->addReplyTo($email, $name);

    $mail->isHTML(false);
    $mail->Subject = $subject;
    $mail->Body = "Name: $name\nEmail: $email\nMessage:\n$message";

    $mail->send();
    echo "OK";
    // Bootstrap AJAX odottaa "OK", ei "Ok" tai muu
  } catch (Exception $e) {
      echo "Fail to send: {$mail->ErrorInfo}";
  }
}
?>



