// Variables for side menu
const sideMenu = document.querySelector("aside");
const menuButton = document.querySelector("#menu-btn");
const closeButton = document.querySelector("#close-btn");

// Side menu toggle
menuButton.addEventListener('click', () => {
    sideMenu.style.display = 'block';
});

closeButton.addEventListener('click', () => {
    sideMenu.style.display = 'none';
});

// Function to fetch and display users based on search input
function fetchAndDisplayUsers(searchInput = '') {
    let url = '/users';

    fetch(url)
        .then(response => response.json())
        .then(users => {
            const tableBody = document.querySelector('table tbody');
            //clear existing rows
            tableBody.innerHTML = '';

            //filter users
            const filteredUsers = users.filter(user => {
                const searchName = `${user.first} ${user.last}`.toLowerCase();
                //user should not be an admin and therefore a client
                //and check if their name includes the search input
                return !user.admin && searchName.includes(searchInput.toLowerCase());
            });

            //sort users alphabetically by full name
            filteredUsers.sort((prevUser, currentUser) => {
                const prevUserName = `${prevUser.first} ${prevUser.last}`.toLowerCase();
                const currentUserName = `${currentUser.first} ${currentUser.last}`.toLowerCase();
                return prevUserName.localeCompare(currentUserName);
            });

            //create a table and fill the table data with client name, client email, email button, delete button
            filteredUsers.forEach(user => {
                const currentUserName = `${user.first} ${user.last}`;
                const tr = document.createElement('tr');
                const trContent = `
                    <td>${currentUserName}</td>
                    <td>${user.email}</td>
                    <td>
                        <button onclick="window.location.href='mailto:${user.email}?subject=Reaching Out&body=Hey ${currentUserName},'">
                            Email
                        </button>
                    </td>
                    <td>
                        <button class="delete-btn" data-id="${user.id}">Delete</button>
                    </td>
                `;
                tr.innerHTML = trContent;
                tableBody.appendChild(tr);
            });

            //attach event listeners to delete buttons
            document.querySelectorAll('.delete-btn').forEach(button => {
                button.addEventListener('click', () => {
                    const userID = button.getAttribute('data-id');
                    deleteUser(userID);
                });
            });
        })
        .catch(error => console.error('Error loading users:', error));
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
                    
                    //remove user row from table
                    document.querySelector(`.delete-btn[data-id="${userID}"]`).closest('tr').remove();
                    
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
                } else {
                    alert('Failed to delete client.');
                }
            })
            .catch(error => console.error('Error deleting client:', error));
    }
}

//search functionality
const searchField = document.querySelector('.search-input');
searchField.addEventListener('input', () => {
    //get the search input value
    const searchInput = searchField.value.trim(); 
    fetchAndDisplayUsers(searchInput); // Call the fetch function with the search term
});

//fetch and display users on initial page load
fetchAndDisplayUsers();
