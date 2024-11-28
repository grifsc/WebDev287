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

function updateName(userID) {
// Update Name
document.getElementById('nameForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Retrieve the new name input by the user
    var newName = document.getElementById('newName').value.trim();

    // Split the name into first and last
    var [firstName, lastName = ''] = newName.split(' '); // Default lastName to empty string if not provided

    // Send POST request to update the user name
    fetch('/edit-user-name', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: userID,
            first: firstName,
            last: lastName,
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Update the displayed name on success
            document.getElementById('name').innerText = newName;
            hidePopup();
        } else {
            console.error('Failed to update name');
        }
    })
    .catch(error => console.error('Error updating name:', error));
});
}

function updateEmail(userID) {
    // Update Email
document.getElementById('emailForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Retrieve the new email input by the user
    var newEmail = document.getElementById('newEmail').value.trim();

    // Send POST request to update the user email
    fetch('/edit-user-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: userID,
            email: newEmail,
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Update the displayed email on success
            document.getElementById('email').innerText = newEmail;
            hidePopup();
        } else {
            console.error('Failed to update email');
        }
    })
    .catch(error => console.error('Error updating email:', error));
});
}

function updatePassword(userID) {
    // Update Password
document.getElementById('passwordForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Retrieve the new password input by the user
    var newPassword = document.getElementById('newPassword').value.trim();

    // Send POST request to update the user password
    fetch('/edit-user-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: userID,
            password: newPassword,
        }),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Display a placeholder for the password on success
            document.getElementById('password').innerText = '********';
            hidePopup();
        } else {
            console.error('Failed to update password');
        }
    })
    .catch(error => console.error('Error updating password:', error));
});
}

//function to delete a user and their incomplete bookings
function deleteUser(userID) {
    if (confirm('Are you sure you want to delete this client?')) {
        
        //delete the user
        fetch(`/delete-user/${userID}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Client deleted successfully');
                    
                    //delete bookings associated with the removed client
                    fetch('/bookings')
                        .then(response => response.json())
                        .then(bookings => {
                            //the booking clientID should match the removed userID
                            //also check that the booking is not complete, otherwise it has been serviced and money is owed or recieved
                            let incompleteBookings = bookings.filter(booking => 
                                booking.clientID == userID && booking.status != 'Complete'
                            );

                            //delete each incomplete booking
                            incompleteBookings.forEach(booking => {
                                fetch(`/delete-booking/${booking.id}`, {
                                    method: 'DELETE',
                                })
                                    .then(response => response.json())
                                    .then(data => {
                                        if (data.success) {
                                            alert(`Booking ID ${booking.id} deleted successfully.`);
                                        } else {
                                            alert(`Failed to delete booking ID ${booking.id}.`);
                                        }
                                    })
                                    .catch(error => console.error(`Error deleting booking ID ${booking.id}:`, error));
                            });
                        })
                        .catch(error => console.error('Error fetching bookings:', error));
                    //redirect to the home page
                    window.location.href = '/html/home.html';
                } else {
                    alert('Failed to delete client.');
                }
            })
            .catch(error => console.error('Error deleting client:', error));
    }
}
function loadSettings() {
    // Display the logo dynamically
    fetch('/home-page-info/1')
        .then(response => response.json())
        .then(data => {
            const logoContainer = document.querySelector('.logo');
            if (logoContainer) {
                logoContainer.innerHTML = `
                    <img src="${data.logo}" alt="Logo">
                `;
            }
        })
        .catch(error => console.error('Error loading logo:', error));

    // Display the user name and email dynamically
    fetch('/admin')
        .then(response => response.json())
        .then(users => {
            //change the name in the top right corner
            const name = users.first;
            const userID = users.id;
            const container = document.getElementById('admin-name');
            if (container) {
                container.textContent = name; 
            }

            // Construct the full name and retrieve email
            const nameSetting = `${users.first} ${users.last}`;
            const emailSetting = users.email;

            // Replace the "Matteo" in the HTML with the full name
            const nameContainer = document.getElementById('name');
            if (nameContainer) {
                nameContainer.textContent = nameSetting;
            }

            // Replace "matteo@hotmail.com" in the HTML with the email
            const emailContainer = document.getElementById('email');
            if (emailContainer) {
                emailContainer.textContent = emailSetting;
            }
            
            updateName(userID);
            updateEmail(userID);
            updatePassword(userID);
            
            
        })
        .catch(error => console.error('Error loading client details:', error));
}

// Call the loadSettings function to apply updates
loadSettings();
//if user is deleted redirect to home page
