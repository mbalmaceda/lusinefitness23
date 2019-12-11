<?php
require 'PHPMailer/PHPMailerAutoload.php';
require 'PHPMailer/extras/Security.php';

define('SMTP_HOST', 'asmtp.mail.hostpoint.ch');
define('SMTP_USERNAME', 'no-reply@lusinefitness23.ch');
define('SMTP_PASSWORD', 'kYe6fDKS');
define('SMTP_PORT', 587);

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['token'])) {

    // Build POST request:
    $recaptcha_url = 'https://www.google.com/recaptcha/api/siteverify';
    $recaptcha_secret = '6LfrkakUAAAAAP4I-sBTIeqFn6bFNV9IgTW0eHhD';
    $recaptcha_response = $_POST['token'];

    // Make and decode POST request:
    $recaptcha = file_get_contents($recaptcha_url . '?secret=' . $recaptcha_secret . '&response=' . $recaptcha_response);
    $recaptcha = json_decode($recaptcha);
    
    // Take action based on the score returned:
    if ($recaptcha->score >= 0.5) {
        if (isset($_POST['name']) AND isset($_POST['email']) AND isset($_POST['message']))
        { 
            $to = 'contact@lusinefitness23.ch';
            $security = new Security();

            $name = $security->xss_clean($_POST['name']);
            $email = $security->xss_clean($_POST['email']);
            $services = $security->xss_clean($_POST['subject']);
            $message = $security->xss_clean($_POST['message']);
            $location = $security->xss_clean($_POST['location']);
            
            // Prefedined Variables  
            $set_from = 'Lusine Fitness 23 Notification Mailer';
            $subject = 'Message de ' . $name . '!';

            // Collecting all content in HTML Table
            $content = '<table width="100%">
            <tr><td colspan="2"><strong>Détails du contact:</strong></td></tr>
            <tr><td valign="top">Nom:</td><td>' . $name . '</td></tr>
            <tr><td valign="top">Email:</td><td>' . $email . '</td></tr>
            <tr><td valign="top">Sujet:</td><td>' . $services. '</td></tr>
            <tr><td valign="top">Emplacement:</td><td>' . $location. '</td></tr>
            <tr><td valign="top">Message:</td><td>' . $message . '</td></tr>
            </table> ';

            try {
                $mail = new PHPMailer();
                $mail->isSMTP();
                $mail->Host = SMTP_HOST;
                $mail->Port = SMTP_PORT;
                $mail->Mailer = "smtp";
                $mail->SMTPSecure = 'TLS';
                $mail->SMTPAuth = true;
                $mail->Username = SMTP_USERNAME;
                $mail->Password = SMTP_PASSWORD;
                $mail->CharSet = 'UTF-8';
                $mail->Encoding = 'base64';
                // $mail->SMTPDebug = 2;

                $mail->setFrom(SMTP_USERNAME, $set_from);
                $mail->addAddress($to);

                $mail->Subject = $subject;
                $mail->msgHTML($content);
                
                // Send the message
                $result = false;
                if ($mail->send()) {
                    $result = true;
                }
                echo json_decode($result);
            } catch (phpmailerException $e) {
                echo $e->errorMessage(); //Pretty error messages from PHPMailer
            } catch (Exception $e) {
                echo $e->getMessage(); //Boring error messages from anything else!
            }  
        }
    } else {
        echo json_decode(['error' => 'Debes verificar tu identidad']);
    }

} 
?>