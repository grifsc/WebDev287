//variables for side menu
const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");

//side menu toggle
menuBtn.addEventListener('click', () => {
    sideMenu.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    sideMenu.style.display = 'none';
});

//load users and bookings data
let userNames = [];
fetch('/users')
    .then(response => response.json())
    .then(users => {
        users.forEach(user => {
            let currentUserName = [user.id, user.first + " " + user.last, user.email];
            userNames.push(currentUserName);
        });
    })
    .catch(error => console.error('error loading users:', error));

//function to fetch and display bookings based on sort type
function fetchAndDisplayBookings(sortBy = '') {
    let url = '/bookings';
    if (sortBy) url += `?sortBy=${sortBy}`; //append sort query if provided

    fetch(url)
        .then(response => response.json())
        .then(bookings => {
            //sorting logic based on the selected sort type
            if (sortBy === 'price') {
                //sort by highest price first
                bookings.sort((prevBooking, currentBooking) => currentBooking.price - prevBooking.price); 
            
            } else if (sortBy === 'status') {
                //sort by status priority
                const statusPriority = { 'Pending': 1, 'Cancelled': 2, 'Complete': 3 };
                bookings.sort((prevBooking, currentBooking) => statusPriority[prevBooking.status] - statusPriority[currentBooking.status]); 
           
            } else if (sortBy === 'name') {
                //sort by client name alphabetically
                bookings.sort((prevBooking, currentBooking) => {
                    let prevUser = getUserName(prevBooking.clientID);
                    let currentUser = getUserName(currentBooking.clientID);
                    return prevUser.localeCompare(currentUser); 
                });
            
            } else if (sortBy === 'payment') {
                //sort by payment status (Unpaid first)
                bookings.sort((prevBooking, currentBooking) => {
                    if (prevBooking.payment === 'Unpaid' && currentBooking.payment !== 'Unpaid') return -1;
                    if (prevBooking.payment !== 'Unpaid' && currentBooking.payment === 'Unpaid') return 1;
                    return 0; 
                });
            
            } else if (sortBy === 'oldestDate') {
                //sort by oldest date (year, month, day)
                bookings.sort((prevBooking, currentBooking) => {
                    let prevDate = parseDate(prevBooking.date);
                    let currentDate = parseDate(currentBooking.date);
                    return prevDate - currentDate; 
                });
            
            } else if (sortBy === 'newestDate') {
                //sort by newest date (year, month, day)
                bookings.sort((prevBooking, currentBooking) => {
                    let prevDate = parseDate(prevBooking.date);
                    let currentDate = parseDate(currentBooking.date);             
                    return currentDate - prevDate; 
                });
            
            } else if (sortBy === 'service') {
                //sort by service name alphabetically
                bookings.sort((prevBooking, currentBooking) => {
                    return prevBooking.service.localeCompare(currentBooking.service); 
                });
            }

            const tableBody = document.querySelector('table tbody');
            tableBody.innerHTML = ''; //clear existing rows

            bookings.forEach(booking => {
                let currentUserName = getUserName(booking.clientID);
                let currentUserEmail = getUserEmail(booking.clientID);

                //create a new table row
                const tr = document.createElement('tr');
                const trContent = `
                    <td>${currentUserName}</td>
                    <td>${booking.service}</td>
                    <td>${booking.date}</td>
                    <td class="${
                        booking.status === 'Pending' ? 'warning' :
                        booking.status === 'Cancelled' ? 'danger' :
                        booking.status === 'Complete' ? 'success' : 'primary'
                    }">${booking.status}</td>
                    <td class="${
                        booking.payment === 'Paid' ? 'success' :
                        booking.payment === 'Unpaid' ? 'danger' : 'primary'
                    }">${booking.payment}</td>
                    <td>$${booking.price}</td>
                    <td>
                        <button onclick="window.location.href='mailto:${currentUserEmail}?subject=Appointment%20Details&body=Hello%20${currentUserName},%0A%0AYour%20appointment%20details%20are%20as%20follows:%0A%0AService:%20${booking.service}%0ADate:%20${booking.date}%0AStatus:%20${booking.status}%0APayment%20Status:%20${booking.payment}%0APrice:%20$${booking.price}'">
                            Email
                        </button>
                    </td>
                    <td>
                        <button class="delete-btn" data-id="${booking.id}">Delete</button>
                    </td>
                `;
                tr.innerHTML = trContent;
                tableBody.appendChild(tr);
            });

            //reattach delete event listeners
            document.querySelectorAll('.delete-btn').forEach(button => {
                button.addEventListener('click', () => {
                    const bookingID = button.getAttribute('data-id');
                    deleteBooking(bookingID);
                });
            });
        })
        .catch(error => console.error('error loading bookings:', error));
}

//function to get the user's name by client ID
function getUserName(clientID) {
    const user = userNames.find(user => user[0] === clientID);
    return user ? user[1] : "Unknown";
}

//function to get the user's email by client ID
function getUserEmail(clientID) {
    const user = userNames.find(user => user[0] === clientID);
    return user ? user[2] : "";
}

//function to parse date information to create a Date object
function parseDate(dateStr) {
    const months = {
        'Jan.': 1, 'Feb.': 2, 'Mar.': 3, 'Apr.': 4, 'May.': 5, 'Jun.': 6,
        'Jul.': 7, 'Aug.': 8, 'Sep.': 9, 'Oct.': 10, 'Nov.': 11, 'Dec.': 12
    };

    const [month, day, year] = dateStr.split(' ');
    //convert to Date object for sorting
    return new Date(year, months[month] - 1, parseInt(day)); 
}

//function to delete a booking
function deleteBooking(bookingID) {
    if (confirm('Are you sure you want to delete this booking?')) {
        fetch(`/delete-booking/${bookingID}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Booking deleted successfully');
                    document.querySelector(`.delete-btn[data-id="${bookingID}"]`).closest('tr').remove();
                } else {
                    alert('Failed to delete booking.');
                }
            })
            .catch(error => console.error('error deleting booking:', error));
    }
}

//function to get the value of a URL query parameter
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

//set the selected sort option in the dropdown
function setSortDropdown(selectedOption) {
    const sortDropdown = document.getElementById('sort-options');
    sortDropdown.value = selectedOption;
}

//event listener for sorting
document.getElementById('sort-options').addEventListener('change', () => {
    const sortOption = document.getElementById('sort-options').value;
    //update the URL and reload the page with the selected sort type
    window.location.href = `?sortBy=${sortOption}`;
});

//initial load
//get current sort from URL query
const currentSort = getQueryParam('sortBy') || ''; 
//set dropdown based on current sort
setSortDropdown(currentSort); 
//fetch and display bookings with the current sort option
fetchAndDisplayBookings(currentSort); 