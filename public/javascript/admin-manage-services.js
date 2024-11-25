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

//function to fetch and display bookings based on sort type and search input
function fetchAndDisplayBookings(sortBy = '', searchInput = '') {
    let url = '/bookings';
    if (sortBy) url += `?sortBy=${sortBy}`; // Append sort query if provided

    fetch(url)
        .then(response => response.json())
        .then(bookings => {
            //filter bookings based on search input
            const filteredBookings = bookings.filter(booking => {
                const clientName = getUserName(booking.clientID).toLowerCase();
                const serviceName = booking.service.toLowerCase();
                const searchTerm = searchInput.toLowerCase();
                return (
                    clientName.includes(searchTerm) || serviceName.includes(searchTerm)
                );
            });

            //sorting logic based on the selected sort type
            if (sortBy === 'price') {
                //sort by price in descending order
                filteredBookings.sort((prevBooking, currentBooking) => currentBooking.price - prevBooking.price);
            } else if (sortBy === 'status') {
                //sort by status based on predefined priority
                const statusPriority = { 'Pending': 1, 'Cancelled': 2, 'Complete': 3 };
                filteredBookings.sort((prevBooking, currentBooking) =>
                    statusPriority[prevBooking.status] - statusPriority[currentBooking.status]
                );
            } else if (sortBy === 'name') {
                //sort by client name alphabetically
                filteredBookings.sort((prevBooking, currentBooking) => {
                    let prevUser = getUserName(prevBooking.clientID);
                    let currentUser = getUserName(currentBooking.clientID);
                    return prevUser.localeCompare(currentUser);
                });
            } else if (sortBy === 'payment') {
                //sort by payment status with unpaid first
                filteredBookings.sort((prevBooking, currentBooking) => {
                    if (prevBooking.payment === 'Unpaid' && currentBooking.payment !== 'Unpaid') return -1;
                    if (prevBooking.payment !== 'Unpaid' && currentBooking.payment === 'Unpaid') return 1;
                    return 0;
                });
            } else if (sortBy === 'oldestDate') {
                //sort by date with oldest first
                filteredBookings.sort((prevBooking, currentBooking) => {
                    let prevDate = parseDate(prevBooking.date);
                    let currentDate = parseDate(currentBooking.date);
                    return prevDate - currentDate;
                });
            } else if (sortBy === 'newestDate') {
                //sort by date with newest first
                filteredBookings.sort((prevBooking, currentBooking) => {
                    let prevDate = parseDate(prevBooking.date);
                    let currentDate = parseDate(currentBooking.date);
                    return currentDate - prevDate;
                });
            } else if (sortBy === 'service') {
                //sort by service name alphabetically
                filteredBookings.sort((prevBooking, currentBooking) =>
                    prevBooking.service.localeCompare(currentBooking.service)
                );
            }


            const tableBody = document.querySelector('table tbody');
            //clear exisiting rows
            tableBody.innerHTML = ''; 

            filteredBookings.forEach(booking => {
                let currentUserName = getUserName(booking.clientID);
                let currentUserEmail = getUserEmail(booking.clientID);

                //create a new table row and fill the table data
                //client name, service name, date, service status, payment status, price, email button, delete button
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
                        <button onclick="window.location.href='mailto:${currentUserEmail}?subject=Appointment Details&body=Hey ${currentUserName},%0A%0AYour appointment details are as follows:%0A%0AService: ${booking.service}%0ADate: ${booking.date}%0AStatus: ${booking.status}%0APayment%20Status: ${booking.payment}%0APrice: $${booking.price}'">
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

            //attach event listeners to delete buttons
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
    const searchInput = document.querySelector('.search-input').value.trim();
    //if sort type selected redisplay page
    //fetch and display with sort and search
    fetchAndDisplayBookings(sortOption, searchInput);
});

//event listener for search
document.querySelector('.search-input').addEventListener('input', () => {
    const searchInput = document.querySelector('.search-input').value.trim();
    const sortOption = getQueryParam('sortBy') || '';
    //if search input recieved redisplay page
    //fetch and display with search and sort
    fetchAndDisplayBookings(sortOption, searchInput);
});

// Initial load
const currentSort = getQueryParam('sortBy') || '';
setSortDropdown(currentSort);
fetchAndDisplayBookings(currentSort);
