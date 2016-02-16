$(document).ready(function() {
	$("#contactform").submit(function() {
		if(this.name.value==''){
			sweetAlert('Ошибка','Введите Ваше имя!','error');
			return false
		}

		if(this.phone.value==''){
			sweetAlert('Ошибка','Введите Ваше имя!','error');
			return false
		}

		var email_val=document.forms["contactform"]["email"].value;

		if(email_val==0){
			sweetAlert('Ошибка','Введите Ваш адрес электронной почты!','error');
			return false
		}
		//Проверим содержит ли значение введенное в поле email символы @ и .
		at=email_val.indexOf("@");
		dot=email_val.indexOf(".");
		if (at<1 || dot <1){
			sweetAlert('Ошибка','Адрес электронной почты был введен неправильно.','error');
			return false;
		}
		return $.ajax({
			type: "POST",
			url: "../mail.php",
			data: $(this).serialize()
		}).done(function() {
			$(this).find("input").val(""), swal('Письмо отправлено !', 'Мы обязательно с вами свяжемся!', 'success'), $("#contactform").trigger("reset")
		}), !1
	})
});

$(document).ready(function() {
	$("#contactform2").submit(function() {
		if(this.name.value==''){
			sweetAlert('Ошибка','Введите Ваше имя!','error');
			return false
		}

		var email_val=document.forms["contactform2"]["email"].value;

		if(email_val==0){
			sweetAlert('Ошибка','Введите Ваш адрес электронной почты!','error');
			return false
		}
		//Проверим содержит ли значение введенное в поле email символы @ и .
		at=email_val.indexOf("@");
		dot=email_val.indexOf(".");
		if (at<1 || dot <1){
			sweetAlert('Ошибка','Адрес электронной почты был введен неправильно.','error');
			return false;
		}
		return $.ajax({
			type: "POST",
			url: "../mail.php",
			data: $(this).serialize()
		}).done(function() {
			$(this).find("input").val(""), swal('Письмо отправлено !', 'Мы обязательно с вами свяжемся!', 'success'), $("#contactform2").trigger("reset")
		}), !1
	})
});