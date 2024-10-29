// Function to show the popup and overlay with a smooth transition
function showPopup(type) {
    // Select the overlay element that dims the background
    const overlay = document.getElementById('overlay');
    
    // Initialize the variable for the popup element
    let popup = null;

    // Determine which popup to show based on the 'type' argument
    if (type === 'name') {
        popup = document.getElementById('popup-form-name');
    } else if (type === 'email') {
        popup = document.getElementById('popup-form-email');
    } else if (type === 'password') {
        popup = document.getElementById('popup-form-password');
    }

    // Display the overlay and make the selected popup visible
    overlay.style.display = 'block';
    popup.classList.add('active'); // Add the 'active' class to the selected popup for styling/animation

    // Introduce a slight delay to trigger the CSS transition effect
    setTimeout(() => {
        overlay.style.opacity = '1'; // Smoothly transition the overlay to be fully opaque
    }, 0);
}

// Function to hide the popup and overlay with a smooth transition
function hidePopup() {
    // Select the overlay element
    const overlay = document.getElementById('overlay');
    
    // Select all popup forms on the page
    const popups = document.querySelectorAll('.popup-form');

    // Start fading out the overlay by setting its opacity to 0
    overlay.style.opacity = '0';

    // Remove the 'active' class from each popup, hiding them smoothly
    popups.forEach(popup => {
        popup.classList.remove('active');
    });

 
}

//Update the Name
//watch for a sumbit event for the name form
document.getElementById('nameForm').addEventListener('submit', function(event) {
    // Prevent the default form submission, which would cause a page reload
    event.preventDefault();
    
    // Get the new name entered by the user
    var newName = document.getElementById('newName').value;

    //Update the display with the new name in the 'name' element
    document.getElementById('name').innerText = newName;

    //Hide the popup after the name is updated
    hidePopup();
});

//Update the Email
//watch for a sumbit event for the email form
document.getElementById('emailForm').addEventListener('submit', function(event) {
    //Prevent the default/place holder
    event.preventDefault();
    
    //Get the new email entered by the user
    var newEmail = document.getElementById('newEmail').value;

    //Update the display with the new email in the 'email' element
    document.getElementById('email').innerText = newEmail;

    //Hide the popup after the email is updated
    hidePopup();
});

//Update the Password
//watch for a sumbit event for the password form
document.getElementById('passwordForm').addEventListener('submit', function(event) {
    //Prevent the default form submission behavior
    event.preventDefault();
    
    //Get the new password entered by the user
    var newPassword = document.getElementById('newPassword').value;

    //Password is always hidden
    document.getElementById('password').innerText = '********';

    //Hide the popup after the password is updated
    hidePopup();
});

//Hide the popup when clicking on the overlay (outside of the popup content)
document.getElementById('overlay').addEventListener('click', function() {
    hidePopup();
});