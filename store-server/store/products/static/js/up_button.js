// JavaScript for the "Up" button
document.addEventListener('DOMContentLoaded', () => {
    const upButton = document.getElementById('upButton');

    // Show the button when scrolled down 100px
    window.onscroll = function () {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            upButton.style.display = "block";
        } else {
            upButton.style.display = "none";
        }
    };

    // Scroll to the top when the button is clicked
    upButton.onclick = function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
});