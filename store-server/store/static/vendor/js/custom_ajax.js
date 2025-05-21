// Task 1: Email Validation on Registration
document.addEventListener('DOMContentLoaded', function() {
    var checkBtn = document.getElementById('checkEmailBtn');
    var emailInput = document.getElementById('id_email'); // Django default id for email field
    var resultSpan = document.getElementById('emailValidationResult');
    if (checkBtn && emailInput && resultSpan) {
        checkBtn.addEventListener('click', function() {
            fetch('/users/validate-email/', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": getCookie('csrftoken')
                },
                body: JSON.stringify({email: emailInput.value})
            })
            .then(response => response.json())
            .then(data => {
                resultSpan.textContent = data.message;
                resultSpan.style.color = data.valid ? 'green' : 'red';
            })
            .catch(() => {
                resultSpan.textContent = "Ошибка сервера!";
                resultSpan.style.color = 'red';
            });
        });
    }

    // Task 2: Announcement fetch
    var announcementDiv = document.getElementById('announcement');
    if (announcementDiv) {
        fetch('/static/announcement.txt')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.text();
        })
        .then(text => {
            announcementDiv.textContent = text;
        })
        .catch(() => {
            announcementDiv.textContent = "Не удалось загрузить объявление.";
        });
    }
});

// CSRF helper for AJAX in Django
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}