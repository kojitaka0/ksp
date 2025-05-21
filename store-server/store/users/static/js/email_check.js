$(document).ready(function() {
    $("#email").on("blur", function() {
        let email = $(this).val();
        if (email.length > 0) {
            $.ajax({
                url: "/users/check_email/",
                method: "POST",
                data: {
                    email: email,
                    csrfmiddlewaretoken: $("input[name='csrfmiddlewaretoken']").val()
                },
                success: function(response) {
                    if (response.valid) {
                        $("#emailFeedback").text("Email is available.").css("color", "green");
                    } else {
                        $("#emailFeedback").text("Email is already taken or invalid.").css("color", "red");
                    }
                }
            });
        } else {
            $("#emailFeedback").text("");
        }
    });
});