// Event Listener for the Form
document.getElementById('bookingForm').addEventListener('submit', bookingForm);

// Reference: https://youtu.be/7LGpIQ6ceJs?si=1uRItCreLZjrrce8
async function bookingForm(e) {
    e.preventDefault(); // Prevent Page from Refreshing

    // Wait to fetch client id, HARDCODED FOR NOW
    const clientID = 2;

    const dropdown = document.getElementById('pickService');
    const service = dropdown.value;
    alert(service);
    const status = "Pending"; // Pending by default when creating a booking
    const payment = "Unpaid"; // Unpaid by default when creating a booking
    
    // Wait to be able to fetch the price first
    price = await fetchPrice(service);
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

async function fetchPrice(serviceName) {
    try {
        // Wait to store the information before going through the next, works the same as .then
        const response = await fetch('/services');
        const services = await response.json();
        
        // Search for the service with the matching name
        const service = services.find(s => s.name === serviceName);
        
        if (service) {
            console.log('Price for service:', service.price);
            return service.price;
        } else {
            console.error('Service not found');
            return "Service not found!";
        }
    } catch (error) {
        console.error('Error fetching services:', error);
        return "Error fetching services!";
    }
}