$(document).ready(function() {
    $("#contact_form").submit(function() {
        if ("" == this.name.value) return sweetAlert("Ошибка", "Введите Ваше имя!", "error"), !1;
        if ("" == this.phone.value) return sweetAlert("Ошибка", "Введите Ваш телефон в формате +7 (900) 000-00-00", "error"), !1;
        var e = $("input[name=phone]", this).val(),
            r = new RegExp("[^0-9]*", "g"),
            t = new RegExp("[^0-9-+ ()]", "g"),
            n = e.replace(r, "");
        return -1 != e.search(t) ? (sweetAlert("Ошибка", 'Номер телефона может содержать только цифры, символы "+", "-", "(", ")" и пробелы', "error"), !1) : !n || n.length < 7 ? (sweetAlert("Ошибка", "В вашем телефоне слишком мало цифр!", "error"), !1) : ($.ajax({
            type: "POST",
            url: "../mail.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val(""), swal("Письмо отправлено !", "Мы обязательно с вами свяжемся!", "success"), $("#contact_form").trigger("reset")
        }), !1)
    })
});