// Delete a booking from the database
function deleteBooking(bookingID) {
    fetch('/delete-booking/' + bookingID, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            // Refresh the page
            window.location = window.location.href;
            alert('Booking Deletion Success');
        } else {
            alert('Booking Deletion Error');
        }
    })
    .catch(error => console.error('Error deleting booking:', error));
}