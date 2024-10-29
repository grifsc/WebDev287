// Iterate over each client in the Clients array to generate table rows dynamically
Clients.forEach(clients => {
    // Create a new table row element for each client
    const tr = document.createElement('tr');

    // Define the inner HTML content for the row with table data (td) cells
    const trContent = `
        <td>${clients.clientName}</td>    <!-- Displays client name -->
        <td>${clients.service}</td>       <!-- Displays service type -->
        <td>${clients.date}</td>          <!-- Displays appointment date -->
        <td>${clients.time}</td>          <!-- Displays appointment time -->
        
        <!-- Status column with conditional classes for styling -->
        <td class="${
            clients.status === 'Pending' ? 'warning' :
            clients.status === 'Delayed' ? 'danger' :
            clients.status === 'Complete' ? 'success' :
            'primary'
        }">${clients.status}</td>

        <!-- Paid status column with conditional classes for styling -->
        <td class="${
            clients.paid === 'Unserviced' ? 'warning' :
            clients.paid === 'Unpaid' ? 'danger' :
            clients.paid === 'Paid' ? 'success' :
            'secondary'
        }">${clients.paid}</td>

        <!-- Button to open the email popup for this client -->
        <td>
            <button onclick="openEmailPopup('${clients.clientName}')">Email</button>
        </td>
    `;

    //Assign the content to the row
    tr.innerHTML = trContent;

    //Append row to table body in the HTML document
    document.querySelector('table tbody').appendChild(tr);
});

// Function to open the email popup along with an overlay to dim the background
function openEmailPopup(clientName) {
    // Create the overlay element to dim the background
    const overlay = document.createElement('div');
    //Add class to style the overlay
    overlay.classList.add('dim-overlay');   
    
    //Attach closePopup() to close popup when overlay is clicked
    overlay.onclick = closePopup;           

    //Create the popup element for the email form
    const popup = document.createElement('div');
    //Add class to style  popup
    popup.classList.add('email-popup');      
    
    //HTML for popup, client name, text area, send and cancel button
    popup.innerHTML = `
        <div class="popup-content">
            <h2>Write email to ${clientName}</h2>   
            <textarea placeholder="Write your message here..."></textarea> 
            <button onclick="closePopup()">Send</button>   
            <button onclick="closePopup()">Cancel</button>  
        </div>
    `;
    
    //Append the overlay and popup elements to the document body so they appear on the page
    document.body.appendChild(overlay);
    document.body.appendChild(popup);
}

//Function to close the popup and remove the overlay from the DOM
function closePopup() {
    // Select the popup and overlay elements
    const popup = document.querySelector('.email-popup');
    const overlay = document.querySelector('.dim-overlay');

    // Remove popup if it exists
    if (popup) popup.remove();
    
    // Remove overlay if it exists
    if (overlay) overlay.remove();
}