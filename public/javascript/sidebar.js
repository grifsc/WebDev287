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