// Event Listener for the Form
document.getElementById('bookingForm').addEventListener('submit', bookingForm);

// Reference: https://youtu.be/7LGpIQ6ceJs?si=1uRItCreLZjrrce8
function bookingForm(e) {
    e.preventDefault(); // Prevent Page from Refreshing

    // Hardcoded Client ID for now
    const hardcodedClientID = 2;

    const clientID = hardcodedClientID;
    const dropdown = document.getElementById('pickService');
    const service = dropdown.value;
    alert(service);
    const status = "Pending"; // Pending by default when creating a booking
    const payment = "Unpaid"; // Unpaid by default when creating a booking
    let price = "20 DOLLAHS GOTTA FIX THIS LATER";
    // TODO: FETCH PRICE FROM SERVICES!!!
    fetch('/services')
        .then(response => response.json())
        .then(services => {
            services.forEach(service => {
                if (service.name == service) { // If the service's name corresponds to the current service selected
                    price = service.price;
                }
            })
        })
        .catch(error => console.error('Error editing service:', error));;
    const date = document.getElementById('date').value;
    // const date = "1999";
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
            alert(`Booking Error: IDK WHY`);
        }
    })
    .catch(error => console.error('Error adding booking:', error));
}