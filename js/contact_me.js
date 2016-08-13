$(function() {

    $(".contactForm input, .contactForm textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            $form.find("[type=submit]").prop("disabled", true); //prevent submit behaviour
            var submit_value = $form.find("[type=submit]").val();
            $form.find("[type=submit]").val( $form.find("[type=submit]").attr('data-disabled') );
            // get values from FORM
            var phone = $form.find("input[name=phone]").val();
            $.ajax({
                url: "././mail/mail.php",
                type: "POST",
                data: {
                    phone: phone
                },
                cache: false,
                success: function() {
                    // remove prevent submit behaviour
                    $("[type=submit]").prop("disabled", false);  
                    $("[type=submit]").val(submit_value);

                    //clear all fields
                    $('.contactForm').trigger("reset");

                    document.location.href='presentation.html';
                },
                error: function() {
                    // Fail message
                    $('.success').html("<div class='alert alert-danger'>");
                    $('.success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('.success > .alert-danger').append("<strong>Приносим свои извинения, но наш почтовый сервер времено не работает. Попробуйте, отправить сообщение еще раз и сообщите нам о проблеме!");
                    $('.success > .alert-danger').append('</div>');

                    // remove prevent submit behaviour
                    $("[type=submit]").prop("disabled", false); 
                    $("[type=submit]").val() = submit_value;

                    //clear all fields
                    $('.contactForm').trigger("reset");
                },
            })
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});


/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('.success').html('');
});
