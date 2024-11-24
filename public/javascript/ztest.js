// Reference: https://youtu.be/7LGpIQ6ceJs?si=1uRItCreLZjrrce8
const form = document.querySelector('.bookingForm');

form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent Default Page Refresh
    
    // Fetch Client ID!!! For now hardcoded Client ID, say 2
    const hardcodedClientID = 2;
    // Generate booking ID !!! For now hardcoded booking ID, say 2
    const hardcodedBookingID = 2;
    const hardcodedPriceFetchFromService = 2;
    
    const id = hardcodedBookingID
    const clientID = hardcodedClientID;
    const service = document.getElementById('pickService').value;
    const status = "Pending";
    const payment = "Unpaid";
    const price = hardcodedPriceFetchFromService;
    const date = document.getElementById('date').value;
    const time = "unused";

    const bookingData = {
        id,
        clientID,
        service,
        status,
        payment,
        price,
        date,
        time
    }
})