Clients.forEach(clients => {
    const tr = document.createElement('tr');
    const trContent = `
        <td>${clients.clientName}</td>
        <td>${clients.service}</td>
        <td>${clients.date}</td>
        <td>${clients.time}</td>
        <td class="${
            clients.status === 'Pending' ? 'warning' :
            clients.status === 'Delayed' ? 'danger' :
            clients.status === 'Complete' ? 'success' :
            'primary'
        }">${clients.status}</td>
        <td class="${
            clients.paid === 'Unserviced' ? 'warning' :
            clients.paid === 'Unpaid' ? 'danger' :
            clients.paid === 'Paid' ? 'success' :
            'secondary'
        }">${clients.paid}</td>
        <td>
            <button onclick="openEmailPopup('${clients.clientName}')">Email</button>
        </td>
    `;

    tr.innerHTML = trContent;
    document.querySelector('table tbody').appendChild(tr);
});

// Function to open the popup with overlay
function openEmailPopup(clientName) {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.classList.add('dim-overlay');
    overlay.onclick = closePopup; // Close popup if clicking on the overlay
    
    // Create popup
    const popup = document.createElement('div');
    popup.classList.add('email-popup');
    popup.innerHTML = `
        <div class="popup-content">
            <h2>Write email to ${clientName}</h2>
            <textarea placeholder="Write your message here..."></textarea>
            <button onclick="closePopup()">Send</button>
            <button onclick="closePopup()">Cancel</button>
        </div>
    `;
    
    // Append overlay and popup to the body
    document.body.appendChild(overlay);
    document.body.appendChild(popup);
}

// Function to close the popup and remove overlay
function closePopup() {
    const popup = document.querySelector('.email-popup');
    const overlay = document.querySelector('.dim-overlay');

    if (popup) popup.remove();
    if (overlay) overlay.remove();
}