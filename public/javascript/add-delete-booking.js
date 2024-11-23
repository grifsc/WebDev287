// Insert a booking to the database
function insertBooking(clientID, serviceID, date, time) {
    // Generate Booking ID by iterating through the booking ids?
    // Grab Client ID from Login
    // Grab Client's Name from Client ID through User Data
    // Default Status is Pending
    // Default Payment is Unpaid
    // Grab Price from Service Data
    // Get Date from Forms
    // Get Time from Forms

    const data = {
        id,
        clientID,
        name,
        service,
        status,
        payment,
        price,
        date,
        time
    };

    // Add client's information
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
    .catch(error => console.error('Error adding service:', error));

    // Add service's information
    // TODO
}

// Delete a booking from the database
// TODO
function deletBooking(serviceID) {
    fetch('/delete-service/' + serviceID, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            loadServices();
            hidePopup(); 
        } else {
            alert('Error deleting service');
        }
    })
    .catch(error => console.error('Error deleting service:', error));
}