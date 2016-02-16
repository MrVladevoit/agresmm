<?php
include_once('smtp-func.php');
$recepient = "manager@gp-studio.ru";//ваш email
$sitename = "smm.gp-studio.ru";

$name = trim($_POST["name"]);
$phone = trim($_POST["phone"]);
$message = "Имя: $name \nТелефон: $phone";


$pagetitle = "Новая заявка с сайта \"$sitename\"";
smtpmail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient");


// $autoanswer = "Заявка с сайта \"$sitename\"";

// $automessage = "Здравствуйте, вы оставили заявку. С вами свяжутся в ближайшее время.\n\nC ув. менеджер \"$sitename\"";
// smtpmail($email, $autoanswer, $automessage, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient");
?>
