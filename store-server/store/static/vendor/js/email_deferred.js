$(document).ready(function() {
    function validateEmailAjax(email) {
        $('#emailLoader').show();
        $('#emailValidationResult').text('').hide();

        // Timer Promise (Deferred)
        var timer = $.Deferred();
        setTimeout(function() {
            timer.resolve();
        }, 2000);

        // AJAX Promise (Deferred)
        var ajax = $.Deferred();
        $.ajax({
            url: '/users/validate-email/',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ email: email }),
            headers: {
                'X-CSRFToken': getCookie('csrftoken')
            }
        })
        .done(function(response) {
            ajax.resolve(response); // response is an object {valid: ..., message: ...}
        })
        .fail(function() {
            ajax.resolve({valid: false, message: 'Ошибка сервера!'});
        });

        // Show result only when BOTH timer and AJAX are done
        $.when(timer, ajax).done(function(_, response) {
            $('#emailLoader').hide();
            $('#emailValidationResult')
                .text(response.message)
                .css('color', response.valid ? 'green' : 'red')
                .show();
        });
    }

    $('#checkEmailBtn').on('click', function() {
        var email = $('#id_email').val();
        validateEmailAjax(email);
    });

    // CSRF helper
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            let cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                let cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
});