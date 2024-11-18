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
Services.forEach(service => {
    const tr = document.createElement('tr');
    const trContent = `
        <td>${service.description}</td>
        <td class="${
            service.status === 'Upcoming' ? 'warning' :
            service.status === 'Completed' ? 'success' :
            'primary'
        }">${service.status}</td>
        <td>${service.date}</td>
        <td>${service.time}</td>
        <td>${service.amount}</td>
    `;

    tr.innerHTML = trContent;
    document.querySelector('table tbody').appendChild(tr);
});