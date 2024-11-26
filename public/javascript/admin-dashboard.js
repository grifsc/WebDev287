//SideBar animation
const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");

menuBtn.addEventListener('click', () => {
    sideMenu.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
    sideMenu.style.display = 'none';
});


//Display the last 10 most recent booking
function loadDashboard() {
    let clientInfo = [];

    fetch('/users')
        .then(response => response.json())
        .then(users => {
            //Get the name of each client to display in booking table
            users.forEach(user => {
                let userInfo = [user.id, user.first + ' ' + user.last];
                clientInfo.push(userInfo);
            });

            // Fetch the recent bookings to display after clientInfo is populated
            fetch('/bookings')
                .then(response => response.json())
                .then(bookings => {
                    //For the sales analytics portion
                    //Display all sales made
                    let sales = 0;
                    bookings.forEach(booking => {
                        if(booking.payment === 'Paid'){
                            let price = booking.price;
                            price = parseFloat(price);
                            sales += price;
                        }
                    });
                    document.getElementById('sales-amount').textContent = `$${sales}`;

                    //Display total booking in DB
                    const numBookings = bookings.length;
                    document.getElementById('bookings-amount').textContent = `${numBookings}`;

                    //Display the number of client registered in DB
                    const numClient = clientInfo.length;
                    document.getElementById('customers-amount').textContent = `${numClient}`;


                    // Store the last 10 bookings registered in the database
                    const recentBookings = bookings.slice(-10).reverse();

                    // Display the bookings dynamically
                    recentBookings.forEach(booking => {
                        const tr = document.createElement('tr');

                        // Get the client name
                        let clientName = '';
                        for (let i = 0; i < clientInfo.length; i++) {
                            if (clientInfo[i][0] == booking.clientID) {
                                clientName = clientInfo[i][1];
                                break;
                            }
                        }

                        //Display recent table bookings
                        const trContent = `
                            <td>${booking.clientID}</td>
                            <td>${clientName}</td>
                            <td>${booking.service}</td>
                            <td>${booking.date}</td>
                            <td>${booking.time}</td>
                            <td class="${
                                booking.status === 'Pending' ? 'warning' :
                                booking.status === 'Cancelled' ? 'danger' :
                                booking.status === 'Complete' ? 'success' :
                                'primary'
                            }">${booking.status}</td>
                        `;

                        tr.innerHTML = trContent;
                        document.querySelector('table tbody').appendChild(tr);
                    });
                })
                .catch(error => console.log('Error loading the recent bookings: ', error));
        })
        .catch(error => console.log('Error loading the users: ', error));
}


//Initialize the page
window.onload = loadDashboard;