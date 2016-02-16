<?php
include_once('smtp-func.php');
$recepient = "manager@new-yearbusiness.ru";//ваш email
$sitename = "New-yearbusiness.ru";

$name = trim($_POST["name"]);
$email = trim($_POST["email"]);
$message = "Имя: $name \nEmail: $email";


$pagetitle = "Новая заявка с сайта \"$sitename\"";
smtpmail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient");
?>
