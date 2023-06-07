<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require 'PHPMailer-master/PHPMailer-master/src/Exception.php';
require 'PHPMailer-master/PHPMailer-master/src/PHPMailer.php';
require 'PHPMailer-master/PHPMailer-master/src/SMTP.php';

$mail = new PHPMailer();
$mail->IsSMTP();

$mail->SMTPDebug  = 0;  
$mail->SMTPAuth   = TRUE;
$mail->SMTPSecure = "tls";
$mail->Port       = 587;
$mail->Host       = "smtp.gmail.com";
$mail->Username   = "championcubers@gmail.com";
$mail->Password   = "jdzazkjmxaxznkfr";

$mail->IsHTML(true);
$mail->AddAddress("stepsfordancing@gmail.com", "DOLLY GOYAL");
$mail->SetFrom("stepsfordancing@gmail.com", "DOLLY GOYAL");
$mail->AddReplyTo("stepsfordancing@gmail.com", "DOLLY GOYAL");
//$mail->AddCC("soumil.goyal@yahoo.com.sg", "Soumil Goyal");
$mail->Subject = "New Registration on Website!";
if (isset($_POST['submit'])) {

    $name = $_POST["bdwname"];
    $email = $_POST["bdwemail"];
    $phonenumber = $_POST["bdwphonenumber"];
    $howdidyouhear = $_POST["howdidyouhear"];
    $howmanymonths = $_POST["howmanymonths"];

    $finalmessage = "";

    $allanswers = array(
          "Full name" => $name,
           "Email address" => $email,
            "Phone number" => $phonenumber,
            "How did you hear about this workshop" => $howdidyouhear,
            "How many months are you signing for" => $howmanymonths,);

    foreach ($allanswers as $x => $value) {
        $finalmessage = $finalmessage . "$x is: $value<br>";
    }    

    echo "$finalmessage";
}

$content = "$finalmessage";

$mail->MsgHTML($content); 
if(!$mail->Send()) {
    echo "Error while sending Email.";
    var_dump($mail);
} else {
    echo "Email sent successfully";
} 
header("location: index.php?registerstatus=success#register")
?>