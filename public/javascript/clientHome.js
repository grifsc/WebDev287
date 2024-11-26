//Fetch the client recent bookings
function loadHome(){
    fetch('/clientbookings')
        .then(response => response.json())
        .then(bookings => {
            //For analytics
            //Display number of booking
            const numBookings = bookings.length;
            document.getElementById('num-bookings').textContent = `${numBookings}`;

            //Save the amount due to display
            let amountDue = 0;

            bookings.forEach(booking => {
                //Calculate the amount due
                if(booking.payment == 'Unpaid' && booking.status !== 'Cancelled'){
                    let price = booking.price;
                    price = parseFloat(price);
                    amountDue += price;
                }

                //Find the next pending booking
                let pendingBookings = bookings.filter(booking => booking.status === 'Pending');
                let mostRecent = null;
    
                pendingBookings.forEach(booking => {
                    const bookingDate = parseDate(booking.date);
                    if (!mostRecent || parseDate(mostRecent.date) < bookingDate) {
                        mostRecent = booking;
                    }
                });
    
                if (mostRecent) {
                    const date = formatDate(parseDate(mostRecent.date));
                    document.getElementById('next-booking').textContent = `${date}`;
                } else {
                    document.getElementById('next-booking').textContent = `No upcoming bookings`;
                }

                const tr = document.createElement('tr');
                const trContent = `
                    <td>${booking.service}</td>
                    <td>${booking.date}</td>
                    <td>${booking.time}</td>
                    <td class="${
                        booking.status === 'Pending' ? 'warning' :
                        booking.status === 'Cancelled' ? 'danger' :
                        booking.status === 'Completed' ? 'success' :
                        'primary'
                    }">${booking.status}</td>
                `;
            
                tr.innerHTML = trContent;
                document.querySelector('table tbody').appendChild(tr);
            });

            //Display amount due for analytics
            document.getElementById('amount-due').textContent = `$${amountDue.toFixed(2)}`;
        })
        .catch(error => console.log('Error loading the recent client bookings: ', error));
}

//Parse date information to create a Date object
function parseDate(date) {
    const months = {
        'Jan.': 1, 'Feb.': 2, 'Mar.': 3, 'Apr.': 4, 'May.': 5, 'Jun.': 6,
        'Jul.': 7, 'Aug.': 8, 'Sep.': 9, 'Oct.': 10, 'Nov.': 11, 'Dec.': 12
    };

    const [month, day, year] = date.split(' ');
    return new Date(year, months[month] - 1, parseInt(day));
}

//Format date (reverse the parseDate)
function formatDate(date){
    const months = [
        'Jan.', 'Feb.', 'Mar.', 'Apr.', 'May.', 'Jun.',
        'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.'
    ];

    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    return `${month} ${day}, ${year}`;
}

//Initialize the page
window.onload = loadHome;