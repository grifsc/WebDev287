//Display the logo and the client name dynamically
fetch('/home-page-info/1')
.then(response => response.json())
.then(data => {
    const logoContainer = document.querySelector('.logo');
    logoContainer.innerHTML = `
        <img src="${data.logo}" alt="Logo">
    `;
})
.catch(error => console.error('Error loading logo:', error));

fetch('/admin')
.then(response => response.json())
.then(users => {
    const name = users.first;
    const container = document.getElementById('admin-name');
    if (container) {
        container.textContent = name; 
    }
}).catch(error => console.error('Error loading client name:', error));

//Function to show the popup and overlay with a smooth transition
function showPopup(type) {
    //overlay element that dims the background
    const overlay = document.getElementById('overlay');
    
    //Initialize variable to hold the selected popup element
    let popup = null;

    //determine which popup to show based on 'type' 
    if (type === 'name') {
        popup = document.getElementById('popup-form-name');  
    } else if (type === 'email') {
        popup = document.getElementById('popup-form-email'); 
    } else if (type === 'password') {
        popup = document.getElementById('popup-form-password'); 
    }

    //set overlay display style to block
    overlay.style.display = 'block';

    //add 'active' class to the selected popup element for it to appear
    popup.classList.add('active');

    //smooth transition with time delay
    setTimeout(() => {
        overlay.style.opacity = '1';
    }, 0); 
}

//function to hide the popup and overlay
function hidePopup() {
    //overlay element that dims the background
    const overlay = document.getElementById('overlay');

    //select all popup forms to hide all open forms
    const popups = document.querySelectorAll('.popup-form');

    //fade out by going to opacity 0
    overlay.style.opacity = '0';

    //remove 'active' class from all popups to hide them
    popups.forEach(popup => {
        popup.classList.remove('active'); 
    });

    //after a short delay (300ms) to allow for the opacity transition
    setTimeout(() => {
        //display none so it doesn't interfere with page interactions
        overlay.style.display = 'none';  
    }, 300); 
}

//update the Name
//add an event listener to the name form's submit event
document.getElementById('nameForm').addEventListener('submit', function(event) {
    //prevent the default form submission behavior
    event.preventDefault();
    
    //retrieve the new name input by the user
    var newName = document.getElementById('newName').value;

    //update the page's 'name' display element with the new name
    document.getElementById('name').innerText = newName;

    //close the popup and overlay after updating the name
    hidePopup();
});

//update the Email
//add an event listener to the email form's submit event
document.getElementById('emailForm').addEventListener('submit', function(event) {
    //prevent the default submission behavior
    event.preventDefault();

    //retrieve the new email input by the user
    var newEmail = document.getElementById('newEmail').value;

    //update the page's 'email' display element with the new email
    document.getElementById('email').innerText = newEmail;

    //close the popup and overlay after updating the email
    hidePopup();
});

//update the Password
//add an event listener to the password form's submit event
document.getElementById('passwordForm').addEventListener('submit', function(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    //retrieve the new password input by the user
    var newPassword = document.getElementById('newPassword').value;

    //display a masked version of the password on the page to protect privacy
    document.getElementById('password').innerText = '********';

    //close the popup and overlay after updating the password
    hidePopup();
});

//hide popup when clicking on the overlay outside the popup form
document.getElementById('overlay').addEventListener('click', function() {
    hidePopup();
});