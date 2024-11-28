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

//Store the idea to get the name
let userID = null;

fetch('/clientbookings')
    .then(response => response.json())
    .then(bookings => {
        const userIDSet = new Set();
        bookings.forEach(booking => userIDSet.add(booking.clientID));

        if (userIDSet.size === 1) {
            userID = [...userIDSet][0]; 
        } else {
            console.error('Multiple or no user IDs found in bookings.');
            throw new Error('Invalid user ID.');
        }
    })
    .catch(error => console.error('Error loading client id:', error));

fetch('/users')
    .then(response => response.json())
    .then(users => {
        const user = users.find(user => user.id === userID);

        if (user) {
            const container = document.getElementById('client-name');
            container.textContent = `${user.first}`;
        } else {
            console.error('User not found.');
        }
    }).catch(error => console.error('Error loading client name:', error));


 //Getting bookings from database
fetch('http://localhost:8000/clientbookings').then(response => {
    return response.json();
}).then(data => { 
    data.forEach(service => {
        const tr = document.createElement('tr');
        const trContent = `
            <td>${service.service}</td>
            <td class="${
                service.status === 'Cancelled' ? 'danger' :
                service.status === 'Pending' ? 'warning' :
                service.status === 'Completed' ? 'success' :
                'primary'
            }">${service.status}</td>
            <td>${service.date}</td>
            <td>${service.time}</td>
            <td class= "${
                service.payment === 'Paid' ? 'success' :
                service.payment === 'Unpaid' ? 'danger' :
                'primary'
            }">${service.payment}</td>
            <td>${service.price}</td>
        `;
    
        tr.innerHTML = trContent;
        document.querySelector('table tbody').appendChild(tr);
    });
}).catch(error => console.error('Error loading bookings:', error));

//Completed Services Receipts
fetch('http://localhost:8000/clientbookings')
.then(response => response.json())
.then(data => {
    const container = document.querySelector('.bills-container');
    container.innerHTML = ''; 

    let receiptNumber = 1; // Initialize counter for receipt numbers

    data.forEach(service => {
        if (service.status === 'Complete') {
            const billDiv = document.createElement('div');
            billDiv.className = 'bill';
            billDiv.innerHTML = `
                <h2>Services Manager</h2>
                <p>83 Pierre Avenue, Montreal, Canada</p>
                <p>PokéRent At Your Service!</p>
                <p>BILL #${receiptNumber}</p>
                <hr/>
                <p>Order Ticket: #${Math.floor(1000 + Math.random() * 9000)}</p>
                <p>${service.service}</p>
                <p>1 x $${service.price}</p>
                <hr/>
                <p>Amount due: $${service.price}</p>
                <hr/>
                <p>Date: ${new Date(service.date).toLocaleDateString()}</p>
            `;
            container.appendChild(billDiv);
            receiptNumber++; // Increment the receipt number for the next one
        }else{
            const billDiv = document.createElement('div');
            billDiv.className = 'bill';
            billDiv.innerHTML = `
            <p>UPCOMING</p>
            `;
            container.appendChild(billDiv);
        }
    });
}).catch(error => console.error('Error loading client booking:', error));

// Upcoming Payment Receipts
fetch('http://localhost:8000/clientbookings')
.then(response => response.json())
.then(data => {
    const container = document.querySelector('.bills-container1');
    container.innerHTML = ''; 

    let receiptNumber = 1; // Initialize counter for receipt numbers

    data.forEach(service => {
        if (service.status === 'Pending') {
            const billDiv = document.createElement('div');
            billDiv.className = 'bill';
            billDiv.innerHTML = `
                <h2>Services Manager</h2>
                <p>83 Pierre Avenue, Montreal, Canada</p>
                <p>PokéRent At Your Service!</p>
                <p>Receipt #${receiptNumber}</p>
                <hr/>
                <p>Order Ticket: #${Math.floor(1000 + Math.random() * 9000)}</p>
                <p>${service.service}</p>
                <p>1 x $${service.price}</p>
                <hr/>
                <p>Amount due: $${service.price}</p>
                <hr/>
                <p>Date: ${new Date(service.date).toLocaleDateString()}</p>
            `;
            container.appendChild(billDiv);
            receiptNumber++; // Increment the receipt number for the next one
        }else{
            const billDiv = document.createElement('div');
            billDiv.className = 'bill';
            billDiv.innerHTML = `
            <p>COMPLETED</p>
            `;
            container.appendChild(billDiv);
        }
    });
}).catch(error => console.error('Error loading client booking:', error));