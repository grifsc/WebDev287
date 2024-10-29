// Function to show the popup and overlay with a smooth transition
function showPopup(type) {
    // Get the overlay element that dims the background
    const overlay = document.getElementById('overlay');
    
    // Initialize variable to hold the selected popup element
    let popup = null;

    // Determine which popup to show based on the 'type' parameter
    if (type === 'name') {
        popup = document.getElementById('popup-form-name');  // Get the 'Name' popup element
    } else if (type === 'email') {
        popup = document.getElementById('popup-form-email'); // Get the 'Email' popup element
    } else if (type === 'password') {
        popup = document.getElementById('popup-form-password'); // Get the 'Password' popup element
    }

    // Display the overlay by setting its display to 'block'
    overlay.style.display = 'block';

    // Add 'active' class to the selected popup element for it to appear (typically this will trigger CSS styling/animations)
    popup.classList.add('active');

    // Use setTimeout to trigger a smooth fade-in effect by setting opacity to 1 after display is set to 'block'
    setTimeout(() => {
        overlay.style.opacity = '1';
    }, 0);  // Delay is set to 0 to ensure display change happens before opacity transition
}

// Function to hide the popup and overlay with a smooth transition
function hidePopup() {
    // Get the overlay element that dims the background
    const overlay = document.getElementById('overlay');

    // Select all popup forms to hide all open forms
    const popups = document.querySelectorAll('.popup-form');

    // Start fading out the overlay by setting its opacity to 0 (smooth transition via CSS)
    overlay.style.opacity = '0';

    // Remove 'active' class from all popups to hide them
    popups.forEach(popup => {
        popup.classList.remove('active');  // Remove class that shows the popup
    });

    // After a short delay (300ms) to allow for the opacity transition, hide the overlay completely
    setTimeout(() => {
        overlay.style.display = 'none';  // Set to 'none' to allow interaction with the page below
    }, 300);  // Delay matches the duration of the CSS transition for opacity
}

// Update the Name
// Add an event listener to the name form's submit event
document.getElementById('nameForm').addEventListener('submit', function(event) {
    // Prevent the default form submission behavior, which reloads the page
    event.preventDefault();
    
    // Retrieve the new name input by the user
    var newName = document.getElementById('newName').value;

    // Update the page's 'name' display element with the new name
    document.getElementById('name').innerText = newName;

    // Close the popup and overlay after updating the name
    hidePopup();
});

// Update the Email
// Add an event listener to the email form's submit event
document.getElementById('emailForm').addEventListener('submit', function(event) {
    // Prevent the default submission behavior
    event.preventDefault();

    // Retrieve the new email input by the user
    var newEmail = document.getElementById('newEmail').value;

    // Update the page's 'email' display element with the new email
    document.getElementById('email').innerText = newEmail;

    // Close the popup and overlay after updating the email
    hidePopup();
});

// Update the Password
// Add an event listener to the password form's submit event
document.getElementById('passwordForm').addEventListener('submit', function(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Retrieve the new password input by the user
    var newPassword = document.getElementById('newPassword').value;

    // Display a masked version of the password on the page to protect privacy
    document.getElementById('password').innerText = '********';

    // Close the popup and overlay after updating the password
    hidePopup();
});

// Hide popup when clicking on the overlay outside the popup form
document.getElementById('overlay').addEventListener('click', function() {
    // Call the hidePopup function to close the popup and hide the overlay
    hidePopup();
});