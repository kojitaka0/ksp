// JavaScript for the modal window
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('modalWindow');
    const openModalBtn = document.getElementById('openModal');
    const closeModalBtn = document.querySelector('.close');

    // Open the modal
    openModalBtn.onclick = function () {
        modal.style.display = "block";
    };

    // Close the modal when the "X" button is clicked
    closeModalBtn.onclick = function () {
        modal.style.display = "none";
    };

    // Close the modal when clicking outside the modal content
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
});