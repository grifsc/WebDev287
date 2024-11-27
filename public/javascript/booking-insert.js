// Event Listener for the Form
document.getElementById('bookingForm').addEventListener('submit', bookingForm);

// Reference: https://youtu.be/7LGpIQ6ceJs?si=1uRItCreLZjrrce8
function bookingForm(e) {
    e.preventDefault(); // Prevent Page from Refreshing

    // Hardcoded Client ID for now
    let clientIdConstant = 2;
    const clientID = clientIdConstant;

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
                price;
                if (service.name == service) { // If the service's name corresponds to the current service selected
                    price = service.price;
                    console.log(price);
                }
            })
        })
        .catch(error => console.error('Error fetching service:', error));
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

// Currently not working, improve later
async function fetchClientID() {
  let fetchedValue; // This will hold the fetched value

  try {
    const response = await fetch('/userid');
    const data = await response.json();
    fetchedValue = data; // Assign the fetched data to the variable
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  // Now you can use fetchedValue outside the fetch block
  console.log(fetchedValue); // This will log the fetched data once it's available
}