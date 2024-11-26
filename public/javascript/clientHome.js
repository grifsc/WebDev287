//Fetch the client recent bookings
function loadHome(){
    fetch('/client-bookings')
        .then(response => response.json())
        .then(bookings => {
            bookings.forEach(booking => {
                const tr = document.createElement('tr');
                const trContent = `
                    <td>${booking.name}</td>
                    <td>${booking.date}</td>
                    <td>${booking.time}</td>
                    <td class="${
                        booking.status === 'Pending' ? 'warning' :
                        booking.status === 'Cancelled' ? 'danger' :
                        booking.status === 'Completed' ? 'success' :
                        'primary'
                    }">${booking.status}</td>
                    <td class="primary">Details</td>
                `;
            
                tr.innerHTML = trContent;
                document.querySelector('table tbody').appendChild(tr);
            });
        })
        .catch(error => console.log('Error loading the recent client bookings: ', error));
}

//Initialize the page
window.onload = loadHome;


//Fill Table
Services.forEach(service => {
    const tr = document.createElement('tr');
    const trContent = `
        <td>${service.service}</td>
        <td>${service.date}</td>
        <td>${service.time}</td>
        <td class="${
            service.status === 'Pending' ? 'warning' :
            service.status === 'Canceled' ? 'danger' :
            service.status === 'Completed' ? 'success' :
            'primary'
        }">${service.status}</td>
        <td class="primary">Details</td>
    `;

    tr.innerHTML = trContent;
    document.querySelector('table tbody').appendChild(tr);
});