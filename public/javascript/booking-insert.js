// Event Listener for the Form
document.getElementById('bookingForm').addEventListener('submit', bookingForm);

// Reference: https://youtu.be/7LGpIQ6ceJs?si=1uRItCreLZjrrce8
function bookingForm(e) {
    e.preventDefault(); // Prevent Page from Refreshing

    // Hardcoded Client ID for now
    const hardcodedClientID = 2;

    const clientID = hardcodedClientID;
    const service = document.getElementById('pickService').value;
    const status = "Pending"; // Pending by default when creating a booking
    const payment = "Unpaid"; // Unpaid by default when creating a booking
    // TODO: FETCH PRICE FROM SERVICES!!!
    fetch('/services')
        .then(response => response.json())
        .then(services => {
            services.forEach(service => {
                if (service.name == service) { // If the service's name corresponds to the current service selected
                    staticServicePrice = service.price;
                }
            })
        })
        .catch(error => console.error('Error editing service:', error));;

    const price = staticServicePrice;
    const date = document.getElementById('date').value;
    const time = "unused"; // Deprecated

    const data = {
        clientID,
        service,
        status,
        payment,
        price,
        date,
        time,
    }

    // Take the data and insert a booking
    insertBooking(data);
}

// Insert a booking to the database
function insertBooking(data) {
    fetch('/add-booking', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            alert('Booking Successful');
        } else {
            alert('Booking Error');
        }
    })
    .catch(error => console.error('Error adding booking:', error));
}