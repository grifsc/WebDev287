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
            const trContent = `
                <td>${service.name}</td>
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
                }">${service.payment}</td>
            `;

            tr.innerHTML = trContent;
            document.querySelector('table tbody').appendChild(tr);
        });
    }).catch(error => console.error('Error loading bookings'));