document.addEventListener('DOMContentLoaded', function () {
    const overlay = document.getElementById('overlay');
    const popup = document.getElementById('popup');
    const selectedDayElement = document.getElementById('selectedDay');
    
    const days = document.querySelectorAll('.day');
    const slots = document.querySelectorAll('.slot');

    // When a calendar day is clicked
    days.forEach(day => {
        day.addEventListener('click', function () {
            const dayNumber = this.getAttribute('data-day');
            selectedDayElement.textContent = `October ${dayNumber}, 2024`;
            overlay.style.display = 'block';
            popup.style.display = 'block';
        });
    });

    // Close popup function
    function closePopup() {
        overlay.style.display = 'none';
        popup.style.display = 'none';
    }

    // Close popup when clicking outside
    overlay.addEventListener('click', closePopup);

    // Toggle slot selection
    slots.forEach(slot => {
        slot.addEventListener('click', function () {
            if (this.classList.contains('selected')) {
                this.classList.remove('selected'); // Deselect slot
            } else {
                this.classList.add('selected'); // Select slot
            }
        });
    });

    // Attach closePopup function to the close button
    window.closePopup = closePopup;
});