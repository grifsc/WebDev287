// Function to show the popup and overlay with a smooth transition
function showPopup(type) {
    const overlay = document.getElementById('overlay');
    let popup = null;

    if (type === 'name') {
        popup = document.getElementById('popup-form-name');
    } else if (type === 'email') {
        popup = document.getElementById('popup-form-email');
    } else if (type === 'password') {
        popup = document.getElementById('popup-form-password');
    }

    overlay.style.display = 'block';
    popup.classList.add('active');

    setTimeout(() => {
        overlay.style.opacity = '1';
    }, 0);
}

// Function to hide the popup and overlay with a smooth transition
function hidePopup() {
    const overlay = document.getElementById('overlay');
    const popups = document.querySelectorAll('.popup-form');

    overlay.style.opacity = '0';

    popups.forEach(popup => {
        popup.classList.remove('active');
    });

    setTimeout(() => {
        overlay.style.display = 'none';
    }, 300);
}

// Update the Name
document.getElementById('nameForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var newName = document.getElementById('newName').value;
    document.getElementById('name').innerText = newName;
    hidePopup();
});

// Update the Email
document.getElementById('emailForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var newEmail = document.getElementById('newEmail').value;
    document.getElementById('email').innerText = newEmail;
    hidePopup();
});

// Update the Password
document.getElementById('passwordForm').addEventListener('submit', function(event) {
    event.preventDefault();
    var newPassword = document.getElementById('newPassword').value;
    document.getElementById('password').innerText = '********'; // Show masked password
    hidePopup();
});

// Hide popup when clicking on the overlay
document.getElementById('overlay').addEventListener('click', function() {
    hidePopup();
});
