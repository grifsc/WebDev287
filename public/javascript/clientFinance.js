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

//Fill services bill table
fetch('/bookings')
    .then(response => response.json())
    .then(services => {
        services.forEach(service => {
            const tr = document.createElement('tr');
            // Changed service.payment to service.price and service.name to service.service
            const trContent = `
                <td>${service.service}</td>
                <td class="${
                    service.status === 'Pending' ? 'warning' :
                    service.status === 'Complete' ? 'success' :
                    service.status === 'Cancelled' ? 'danger' :
                    'primary'
                }">${service.status}</td>
                <td>${service.date}</td>
                <td>${service.time}</td>
                <td  class="${
                    service.payment === 'Paid' ? 'success' :
                    service.payment === 'Unpaid' ? 'danger' :
                    'primary'
                }">${service.price}</td>
            `;

            tr.innerHTML = trContent;
            document.querySelector('table tbody').appendChild(tr);
        });
    }).catch(error => console.error('Error loading bookings'));