document.addEventListener('DOMContentLoaded', function () {
    const overlay = document.getElementById('overlay');
    const popup = document.getElementById('popup');
    const selectedDayElement = document.getElementById('selectedDay');
    const days = document.querySelectorAll('.day');
    const closeBtn = document.querySelector('.close-btn');

    // Object to store selected slots for each day
    const scheduleData = {};

    // Function to open the popup and set the selected day
    function openPopup(dayNumber) {
        selectedDayElement.textContent = `October ${dayNumber}, 2024`;
        overlay.classList.add('active');
        popup.classList.add('active');
        
        // Load schedule for the selected day
        loadSchedule(dayNumber);
    }

    // Function to close the popup and remove active classes
    function closePopup() {
        overlay.classList.remove('active');
        popup.classList.remove('active');
    }

    // Function to load the schedule for a specific day
    function loadSchedule(dayNumber) {
        const slots = document.querySelectorAll('.slot');
        
        // Clear previous selections
        slots.forEach(slot => slot.classList.remove('selected'));

        // Retrieve and apply the saved schedule for this day
        const daySchedule = scheduleData[dayNumber] || [];
        daySchedule.forEach(time => {
            const slot = document.querySelector(`.slot[data-time="${time}"]`);
            if (slot) {
                slot.classList.add('selected');
            }
        });

        // Store the current day in a data attribute for later reference
        popup.setAttribute('data-day', dayNumber);
    }

    // Function to save the selected slots for the current day
    function saveSchedule(dayNumber) {
        const slots = document.querySelectorAll('.slot');
        const selectedSlots = [];

        // Gather all selected slots
        slots.forEach(slot => {
            if (slot.classList.contains('selected')) {
                selectedSlots.push(slot.getAttribute('data-time'));
            }
        });

        // Save the selected slots for the specific day
        scheduleData[dayNumber] = selectedSlots;
    }

    // When a calendar day is clicked, open the popup with the selected day
    days.forEach(day => {
        day.addEventListener('click', function () {
            const dayNumber = this.getAttribute('data-day');
            openPopup(dayNumber);
        });
    });

    // Close popup when clicking outside of it (overlay)
    overlay.addEventListener('click', closePopup);

    // Toggle slot selection within the schedule table
    document.querySelectorAll('.slot').forEach(slot => {
        slot.addEventListener('click', function () {
            this.classList.toggle('selected');

            // Get the current day from the popup's data attribute
            const currentDay = popup.getAttribute('data-day');
            saveSchedule(currentDay); // Save selection changes
        });
    });

    // Attach closePopup function to the close button
    closeBtn.addEventListener('click', closePopup);
});