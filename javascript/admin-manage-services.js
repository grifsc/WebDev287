document.addEventListener('DOMContentLoaded', function () {
    //Grabbing the necessary DOM elements for overlay, popup, selected day display, and close button
    const overlay = document.getElementById('overlay');
    const popup = document.getElementById('popup');
    const selectedDayElement = document.getElementById('selectedDay');
    const days = document.querySelectorAll('.day');
    const closeBtn = document.querySelector('.close-btn');

    //Object to store scheduled data for each day, including slot, status, and fulfilled selections
    const scheduleData = {};

    //Function to open the popup and display the selected day number
    function openPopup(dayNumber) {
        selectedDayElement.textContent = `October ${dayNumber}, 2024`;
        overlay.classList.add('active'); //Activate overlay to dim background
        popup.classList.add('active'); //Show popup form
        loadSchedule(dayNumber); //Load schedule data for the selected day
    }

    //Function to close the popup and hide the overlay
    function closePopup() {
        overlay.classList.remove('active');
        popup.classList.remove('active');
    }

    //Function to load the saved schedule for a specific day and apply saved selections
    function loadSchedule(dayNumber) {
        //Fetch all time slot elements in the popup form
        const slots = document.querySelectorAll('.slot');
        const fulfilledSlots = document.querySelectorAll('.fulfilled');
        const statuses = document.querySelectorAll('.status');

        //Clear any previously selected slots, statuses, and fulfilled slots
        slots.forEach(slot => slot.classList.remove('selected'));
        fulfilledSlots.forEach(fulfilled => fulfilled.classList.remove('selected'));
        statuses.forEach(status => status.classList.remove('selected'));

        //Retrieve schedule data for the selected day or initialize empty data if no prior data exists
        const daySchedule = scheduleData[dayNumber] || { slots: [], fulfilled: [], statuses: [] };

        //Apply stored selections for time slots
        daySchedule.slots.forEach(time => {
            const slot = document.querySelector(`.slot[data-time="${time}"]`);
            if (slot) slot.classList.add('selected');
        });

        //Apply stored selections for fulfilled slots
        daySchedule.fulfilled.forEach(time => {
            const fulfilled = document.querySelector(`.fulfilled[data-time="${time}"]`);
            if (fulfilled) fulfilled.classList.add('selected');
        });

        //Apply stored selections for status
        daySchedule.statuses.forEach(time => {
            const status = document.querySelector(`.status[data-time="${time}"]`);
            if (status) status.classList.add('selected');
        });

        // Store the current day in the popup for easy reference
        popup.setAttribute('data-day', dayNumber);
    }

    // Function to save the selected time slots, fulfilled states, and payment statuses for the current day
    function saveSchedule(dayNumber) {
        // Arrays to hold the selected times for slots, fulfilled states, and payment statuses
        const selectedSlots = [];
        const selectedFulfilled = [];
        const selectedStatuses = [];

        // Gather all selected slot times
        document.querySelectorAll('.slot.selected').forEach(slot => {
            selectedSlots.push(slot.getAttribute('data-time'));
        });

        // Gather all selected fulfilled times
        document.querySelectorAll('.fulfilled.selected').forEach(fulfilled => {
            selectedFulfilled.push(fulfilled.getAttribute('data-time'));
        });

        // Gather all selected status times
        document.querySelectorAll('.status.selected').forEach(status => {
            selectedStatuses.push(status.getAttribute('data-time'));
        });

        // Save selected times for slots, fulfilled states, and statuses for the specific day
        scheduleData[dayNumber] = {
            slots: selectedSlots,
            fulfilled: selectedFulfilled,
            statuses: selectedStatuses
        };
    }

    // Add event listeners for each calendar day to open the popup with the selected day
    days.forEach(day => {
        day.addEventListener('click', function () {
            const dayNumber = this.getAttribute('data-day');
            openPopup(dayNumber);
        });
    });

    // Close the popup when clicking outside of it (on the overlay)
    overlay.addEventListener('click', closePopup);

    // Add event listeners for slot elements to toggle selection and save changes
    document.querySelectorAll('.slot').forEach(slot => {
        slot.addEventListener('click', function () {
            this.classList.toggle('selected');
            const currentDay = popup.getAttribute('data-day');
            saveSchedule(currentDay); // Save slot selection changes
        });
    });

    // Add event listeners for fulfilled elements to toggle selection and save changes
    document.querySelectorAll('.fulfilled').forEach(fulfilled => {
        fulfilled.addEventListener('click', function () {
            this.classList.toggle('selected');
            const currentDay = popup.getAttribute('data-day');
            saveSchedule(currentDay); // Save fulfilled selection changes
        });
    });

    // Add event listeners for status elements to toggle selection and save changes
    document.querySelectorAll('.status').forEach(status => {
        status.addEventListener('click', function () {
            this.classList.toggle('selected');
            const currentDay = popup.getAttribute('data-day');
            saveSchedule(currentDay); // Save status selection changes
        });
    });

    // Attach the closePopup function to the close button
    closeBtn.addEventListener('click', closePopup);
});