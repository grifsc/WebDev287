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



 //Getting bookings from database
fetch('http://localhost:8000/clientbookings').then(response => {
    return response.json();
}).then(data => { 
    data.forEach(service => {
        const tr = document.createElement('tr');
        const trContent = `
            <td>${service.service}</td>
            <td class="${
                service.status === 'Upcoming' ? 'warning' :
                service.status === 'Completed' ? 'success' :
                'primary'
            }">${service.status}</td>
            <td>${service.date}</td>
            <td>${service.time}</td>
            <td>${service.price}</td>
        `;
    
        tr.innerHTML = trContent;
        document.querySelector('table tbody').appendChild(tr);
    });
})

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
            <p>NO SERVICES HAS BEEN COMPLETED</p>
            `;
            container.appendChild(billDiv);
        }
    });
})

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
            <p>NO UPCOMING PAYMENTS</p>
            `;
            container.appendChild(billDiv);
        }
    });
})
