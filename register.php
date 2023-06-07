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
    $mail->Password   = "SoumilDhruv21";

    $mail->IsHTML(true);
    $mail->AddAddress("stepsfordancing@gmail.com", "DOLLY GOYAL");
    $mail->SetFrom("stepsfordancing@gmail.com", "DOLLY GOYAL");
    $mail->AddReplyTo("stepsfordancing@gmail.com", "DOLLY GOYAL");
    //$mail->AddCC("soumil.goyal@yahoo.com.sg", "Soumil Goyal");
    $mail->Subject = "New Registration on Website!";

    if (isset($_POST['submit'])) {

    $persontype = $_POST["persontype"];
    $parentname = $_POST["parentname"];
    $parentemail = $_POST["parentemail"];
    $parentnumber = $_POST["parentnumber"];
    $studentname = $_POST["studentname"];
    $studentage = $_POST["studentage"];
    $name = $_POST["name"];
    $email = $_POST["email"];
    $dancetype = "";
    $phonenumber = $_POST["phonenumber"];
    foreach($_POST['dancetype'] as $value){
        $dancetype = $dancetype . "dancetype : ".$value.'<br/>';
    }
    $experience = $_POST["experience"];
    $additionalinfo = $_POST["additionalinfo"];
    if ($persontype == "mychild") {
        if (!filter_var($parentemail, FILTER_VALIDATE_EMAIL)) {
            echo "invalidemail<br>";
            //header("index.html?error=invalidemail#register")
        }
    } else {
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            echo "invalidemail<br>";
            //header("index.html?error=invalidemail#register")
         }
    }
    

    

    $finalmessage = "";

    $allanswers = array("persontype" => $persontype,
     "parentname" => $parentname,
      "parentemail" => $parentemail,
       "parentnumber" => $parentnumber,
        "studentname" => $studentname,
         "studentage" => $studentage,
          "name" => $name,
           "email" => $email,
            "phonenumber" => $phonenumber,
            "dancetype" => $dancetype,
            "experience" => $experience,
            "additionalinfo" => $additionalinfo,);

    foreach ($allanswers as $x => $value) {
        $finalmessage = $finalmessage . "$x is:: $value<br>";
    }    

    echo "$finalmessage";

    $content = "$finalmessage";

    $mail->MsgHTML($content); 
    if(!$mail->Send()) {
        echo "Error while sending Email.";
        var_dump($mail);
    } else {
        echo "Email sent successfully";
    }
    header("location: index.html");
}


?>