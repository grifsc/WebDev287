// Delete a booking from the database
function deleteBooking(bookingID) {
    fetch('/delete-service/' + bookingID, {
        method: 'DELETE',
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            alert('Booking Deletion Succesfully');
        } else {
            alert('Booking Deletion Error');
        }
    })
    .catch(error => console.error('Error deleting booking:', error));
}