//side menu
const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");

menuBtn.addEventListener('click', () => {
    sideMenu.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    sideMenu.style.display = 'none';
});


// Wait until the entire document is loaded before running the code
document.addEventListener('DOMContentLoaded', function () {
    //list of constants that will be used in the java script
    //overlay to dim background
    const overlay = document.getElementById('overlay');               
    //popup form
    const popup = document.getElementById('popup');                   
    //for when user clicks a day on the calendar
    const selectedDayElement = document.getElementById('selectedDay'); 
    //all the days on the calendar
    const days = document.querySelectorAll('.day');                   
    //close 
    const closeBtn = document.querySelector('.close-btn');            

    //object to store scheduled data for each day, with keys for slots, statuses, and fulfilled selections
    const scheduleData = {};

    //function to open the popup and show the selected day number
    function openPopup(dayNumber) {
        //day for the header
        selectedDayElement.textContent = `October ${dayNumber}, 2024`; 
        //Turn on background dim and bring up the form
        overlay.classList.add('active');                               
        popup.classList.add('active');
        //track any changes made to the form                                 
        loadSchedule(dayNumber);                                       
    }

    //remove the dim effect and close the popup 
    function closePopup() {
        overlay.classList.remove('active');  
        popup.classList.remove('active');     
    }

    //load saved schedule data for a specific day and display selections
    function loadSchedule(dayNumber) {
        //Get all time slot, fulfilled, and status elements in the popup form
        const slots = document.querySelectorAll('.slot');
        const fulfilledSlots = document.querySelectorAll('.fulfilled');
        const statuses = document.querySelectorAll('.status');

        //clear previous selections made on the form
        slots.forEach(slot => slot.classList.remove('selected'));
        fulfilledSlots.forEach(fulfilled => fulfilled.classList.remove('selected'));
        statuses.forEach(status => status.classList.remove('selected'));

        //get selections from the form of the chosen day schedule
        //Or initialize day if no previous selections
        const daySchedule = scheduleData[dayNumber] || { slots: [], fulfilled: [], statuses: [] };

        //apply 'slot' selections from selected day
        daySchedule.slots.forEach(time => {
            const slot = document.querySelector(`.slot[data-time="${time}"]`);
            if (slot) slot.classList.add('selected');
        });

        //apply 'fulfilled' selections from selected day
        daySchedule.fulfilled.forEach(time => {
            const fulfilled = document.querySelector(`.fulfilled[data-time="${time}"]`);
            if (fulfilled) fulfilled.classList.add('selected');
        });

        //apply 'payment status' selections from selected day
        daySchedule.statuses.forEach(time => {
            const status = document.querySelector(`.status[data-time="${time}"]`);
            if (status) status.classList.add('selected');
        });

        // Store the current day number in the popup for easy reference
        popup.setAttribute('data-day', dayNumber);
    }

    //function for storing changes made to day
    function saveSchedule(dayNumber) {
        //arrays to store the selected slots, fulfilled states, and payment statuses
        const selectedSlots = [];
        const selectedFulfilled = [];
        const selectedStatuses = [];

        //iterate through and note which time slots selected
        document.querySelectorAll('.slot.selected').forEach(slot => {
            selectedSlots.push(slot.getAttribute('data-time'));
        });

        //iterate through and note which fufilled services slots selected
        document.querySelectorAll('.fulfilled.selected').forEach(fulfilled => {
            selectedFulfilled.push(fulfilled.getAttribute('data-time'));
        });

        //iterate through and note which payment statuses slots selected
        document.querySelectorAll('.status.selected').forEach(status => {
            selectedStatuses.push(status.getAttribute('data-time'));
        });

        //save selections made for slots, fulfilled, and statuses for the selected day in scheduleData
        scheduleData[dayNumber] = {
            slots: selectedSlots,
            fulfilled: selectedFulfilled,
            statuses: selectedStatuses
        };
    }

    //event listeners for when a user clicks
    //---------------------------
    //iterate through every day and give them an event listner to call popup form on click
    days.forEach(day => {
        day.addEventListener('click', function () {
            //note chosen day
            const dayNumber = this.getAttribute('data-day');
            //open form
            openPopup(dayNumber);                             
        });
    });

    //close the popup when clicking outside of the form/on the overlay
    overlay.addEventListener('click', closePopup);

    //iterate through all 'slots' and give them an event listener
    document.querySelectorAll('.slot').forEach(slot => {
        //when clicked
        slot.addEventListener('click', function () {
            //fill in the slot
            this.classList.toggle('selected');                
            //get the day and save it
            const currentDay = popup.getAttribute('data-day'); 
            saveSchedule(currentDay);                          
        });
    });

    //iterate through all 'fulfilled services' and give them an event listener
    document.querySelectorAll('.fulfilled').forEach(fulfilled => {
        //when clicked
        fulfilled.addEventListener('click', function () {
            //fill the slot
            this.classList.toggle('selected');                 
            //get the day and save it
            const currentDay = popup.getAttribute('data-day'); 
            saveSchedule(currentDay);                         
        });
    });

    //iterate through all 'payment statuses' and give them an event listener
    document.querySelectorAll('.status').forEach(status => {
        //when clicked
        status.addEventListener('click', function () {
            //fill the slot
            this.classList.toggle('selected');                 
            //get the day and save it
            const currentDay = popup.getAttribute('data-day'); 
            saveSchedule(currentDay);                        
        });
    });

    //attach closePopup() to the close button in the popup form
    closeBtn.addEventListener('click', closePopup);
});