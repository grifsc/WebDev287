// Load and display bookingss
function loadServices() {
    let serviceimage = []; // TEMPORARY IMAGE
    fetch('/services')
        .then(response => response.json())
        .then(services => {
            services.forEach(service => {
                let temparray = [service.name, service.image];
                serviceimage.push(temparray);
            })
    })
    .catch(error => console.error('Error loading bookingss:', error));

    fetch('/bookings')
        .then(response => response.json())
        .then(bookings => {
            const bookingsList = document.querySelector('.horizontal-list');

            //Dynamically display each bookings saved in DB
            bookings.forEach(booking => {
                const hardcoded = 2;
                
                    const bookingsDiv = document.createElement('li');
                    bookingsDiv.classList.add('bookings-option');
                    bookingsDiv.id = 'bookings-' + booking.id;
                    
                    let thisimage = "";
                    for (let index = 0; index < serviceimage.length; index++) {
                        if (serviceimage[index][0] == booking.name) {
                            thisimage = serviceimage[index][1];
                            break;
                        }
                    }

                    const bookingsInfo = `
                        <h2>${booking.date}</h2>
                        <h3>${booking.name}
                        <br>${booking.price}
                        </h3>
                        <img src="${thisimage}" alt="404">
                        <!--Button-->
                        <button>Cancel</button>
                    `;

                    bookingsDiv.innerHTML = bookingsInfo;
                    bookingsList.appendChild(bookingsDiv);
                
            });
        })
        .catch(error => console.error('Error loading bookingss:', error));
}
window.onload=loadServices;