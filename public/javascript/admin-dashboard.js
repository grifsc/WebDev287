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
//Fill booking animations
Bookings.forEach(booking => {
    const tr = document.createElement('tr');
    const trContent = `
        <td>${booking.clientName}</td>
        <td>${booking.service}</td>
        <td>${booking.date}</td>
        <td>${booking.time}</td>
        <td class="${
            booking.status === 'Pending' ? 'warning' :
            booking.status === 'Delayed' ? 'danger' :
            booking.status === 'Complete' ? 'success' :
            'primary'
        }">${booking.status}</td>
       
    `;

    tr.innerHTML = trContent;
    document.querySelector('table tbody').appendChild(tr);
});