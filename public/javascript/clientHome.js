//Fetch the client recent bookings
function loadHome(){
    fetch('/clientbookings')
        .then(response => response.json())
        .then(bookings => {
            //For analytics
            //Display number of booking
            const numBookings = bookings.length;
            document.getElementById('num-bookings').textContent = `${numBookings}`;

            //Display the amount due
            let amountDue = 0;

            bookings.forEach(booking => {
                if (booking.payment === 'Unpaid' && booking.status !== 'Cancelled') {
                    let price = parseFloat(booking.price);
                    amountDue += price;
                }
            });
            document.getElementById('amount-due').textContent = `$${amountDue.toFixed(2)}`;

            //Display the upcoming booking
            const now = new Date();
            let nextBooking = null;

            bookings.forEach(booking => {
                if(booking.status === 'Pending'){
                    const bookingDate = parseDate(booking.date);

                    //Find the earliest date
                    if(bookingDate > now && (!nextBooking || bookingDate < parseDate(nextBooking.date))){
                        nextBooking = booking;
                    }
                }
            });

            if(nextBooking){
                const date = formatDate(parseDate(nextBooking.date));
                document.getElementById('next-booking').textContent = `${date}`;
                document.getElementById('next-service').textContent = `${nextBooking.service}`;
            }else{ 
                document.getElementById('next-booking').textContent = `No Upcoming Service`;
                document.getElementById('next-service').textContent = ``;
            }

            //Create the recent bookings
            //Limit the table (caps 10)
            let recentBookings;
            if(bookings.length > 10){
                recentBookings = bookings.split(-10).reverse();
            }else{
                recentBookings = bookings;
            }
            
            const tbody = document.querySelector('table tbody');
            tbody.innerHTML = '';

            recentBookings.forEach(booking => {
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
                tbody.appendChild(tr);
            });
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