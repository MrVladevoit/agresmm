<?php

function smtpmail($mail_to, $subject, $message, $headers='') {

        //��������� �����
        $config['smtp_username'] = 'manager@new-yearbusiness.ru';  //������� �� ��� ������ ��������� ����� �� ISPManager.
        $config['smtp_password'] = 'xaXHOMDC';  //�������� ������.
        $config['smtp_from']     = 'manager@new-yearbusiness.ru'; //���� ��� - ��� ��� ������ �����. ����� ���������� ��� ��������� � ���� "�� ����".
        //������ ��� ��������� ������ �� �����
        $config['smtp_host']     = 'localhost';  //������ ��� �������� ����� (��� ����� �������� ������ �� ���������).
        $config['smtp_port']     = '25'; // ���� ������. �� �������, ���� �� �������.
        $config['smtp_debug']    = false;  //���� �� ������ ������ ��������� ������, ������� true ������ false.
        $config['smtp_charset']  = 'UTF-8';   //��������� ���������.

        $SEND =   "Date: ".date("D, d M Y H:i:s") . " UT\r\n";
        $SEND .=   'Subject: =?'.$config['smtp_charset'].'?B?'.base64_encode($subject)."=?=\r\n";
        if ($headers) $SEND .= $headers."\r\n\r\n";
        else
        {
                $SEND .= "Reply-To: ".$config['smtp_username']."\r\n";
                $SEND .= "MIME-Version: 1.0\r\n";
                $SEND .= "Content-Type: text/plain; charset=\"".$config['smtp_charset']."\"\r\n";
                $SEND .= "Content-Transfer-Encoding: 8bit\r\n";
                $SEND .= "From: \"".$config['smtp_from']."\" <".$config['smtp_username'].">\r\n";
                $SEND .= "To: $mail_to <$mail_to>\r\n";
                $SEND .= "X-Priority: 3\r\n\r\n";
        }
        $SEND .=  $message."\r\n";
         if( !$socket = fsockopen($config['smtp_host'], $config['smtp_port'], $errno, $errstr, 30) ) {
            if ($config['smtp_debug']) echo $errno."<br>".$errstr;
            return false;
         }

            if (!server_parse($socket, "220", __LINE__)) return false;

            fputs($socket, "EHLO " . $config['smtp_host'] . "\r\n");
            if (!server_parse($socket, "250", __LINE__)) {
               if ($config['smtp_debug']) echo '<p>�� ���� ��������� EHLO!</p>';
               fclose($socket);
               return false;
            }
            fputs($socket, "AUTH LOGIN\r\n");
            if (!server_parse($socket, "334", __LINE__)) {
               if ($config['smtp_debug']) echo '<p>�� ���� ����� ����� �� ������ �����������!</p>';
               fclose($socket);
               return false;
            }
            fputs($socket, base64_encode($config['smtp_username']) . "\r\n");
            if (!server_parse($socket, "334", __LINE__)) {
               if ($config['smtp_debug']) echo '<p>����� ����������� �� ��� ������ ��������!</p>';
               fclose($socket);
               return false;
            }
            fputs($socket, base64_encode($config['smtp_password']) . "\r\n");
            if (!server_parse($socket, "235", __LINE__)) {
               if ($config['smtp_debug']) echo '<p>������ �� ��� ������ �������� ��� ������! ������ �����������!</p>';
               fclose($socket);
               return false;
            }
            fputs($socket, "MAIL FROM: <".$config['smtp_username'].">\r\n");
            if (!server_parse($socket, "250", __LINE__)) {
               if ($config['smtp_debug']) echo '<p>�� ���� ��������� ������� MAIL FROM:</p>';
               fclose($socket);
               return false;
            }
            fputs($socket, "RCPT TO: <" . $mail_to . ">\r\n");

            if (!server_parse($socket, "250", __LINE__)) {
               if ($config['smtp_debug']) echo '<p>�� ���� ��������� ������� RCPT TO:</p>';
               fclose($socket);
               return false;
            }
            fputs($socket, "DATA\r\n");

            if (!server_parse($socket, "354", __LINE__)) {
               if ($config['smtp_debug']) echo '<p>�� ���� ��������� ������� DATA!</p>';
               fclose($socket);
               return false;
            }
            fputs($socket, $SEND."\r\n.\r\n");

            if (!server_parse($socket, "250", __LINE__)) {
               if ($config['smtp_debug']) echo '<p>�� ���� ��������� ���� ������. ������ �� ���� ����������!</p>';
               fclose($socket);
               return false;
            }
            fputs($socket, "QUIT\r\n");
            fclose($socket);
            return TRUE;
}
function server_parse($socket, $response, $line = __LINE__) {
        global $config;
    while (substr($server_response, 3, 1) != ' ') {
        if (!($server_response = fgets($socket, 256))) {
                   if ($config['smtp_debug']) echo "<p>�������� � ��������� �����!</p>$response
$line
";
                   return false;
                }
    }
    if (!(substr($server_response, 0, 3) == $response)) {
           if ($config['smtp_debug']) echo "<p>�������� � ��������� �����!</p>$response
$line
";
           return false;
        }
    return true;
}

//��������� ����� ����� ���������� �����������, ����� ����������� ����� ����� �������.

function smtpmassmail($mail_to, $subject, $message, $headers='')
{
$mailaddresses=explode(",",$mail_to);
foreach ($mailaddresses as $mailaddress) smtpmail($mailaddress,$subject,$message,$headers);
}

?>