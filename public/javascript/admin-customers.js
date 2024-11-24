

/*

//iterate over each client in the Clients array to generate table rows dynamically
Clients.forEach(clients => {
    //create a new table row element for each client
    const tr = document.createElement('tr');

    //define the inner HTML content for the row with table data (td) cells
    const trContent = `
        <td>${clients.clientName} ${clients.clientName}</td>    <!-- Displays client name -->
        <td>${clients.service}</td>       <!-- Displays service type -->
        <td>${clients.date}</td>          <!-- Displays appointment date -->
        <td>${clients.time}</td>          <!-- Displays appointment time -->
        
        <!-- Status column with conditional classes for styling -->
        <td class="${
            clients.status === 'Pending' ? 'warning' :
            clients.status === 'Delayed' ? 'danger' :
            clients.status === 'Complete' ? 'success' :
            'primary' //color
        }">${clients.status}</td>

        <!-- Paid status column with conditional classes for styling -->
        <td class="${
            clients.paid === 'Unserviced' ? 'warning' :
            clients.paid === 'Unpaid' ? 'danger' :
            clients.paid === 'Paid' ? 'success' :
            'primary'
        }">${clients.paid}</td>

        <!-- Button to open the email popup for this client -->
        <td>
            <button onclick="openEmailPopup('${clients.clientName}')">Email</button>
        </td>
    `;

    //assign the content to the row
    tr.innerHTML = trContent;

    //append row to table body in the HTML document
    document.querySelector('table tbody').appendChild(tr);
});

//Function to close the popup and remove the overlay from the DOM
function closePopup() {
    //select the popup and overlay elements
    const popup = document.querySelector('.email-popup');
    const overlay = document.querySelector('.dim-overlay');

    //remove popup if it exists
    if (popup) popup.remove();
    
    //remove overlay if it exists
    if (overlay) overlay.remove();
}

//function to toggle the visibility of the sort dropdown menu
function toggleSortDropdown() {
    const sortDropdownMenu = document.getElementById("sortDropdownMenu");
    sortDropdownMenu.classList.toggle("show-dropdown"); // Toggle the show-dropdown class
}

//close the sort dropdown if the user clicks outside of it
window.addEventListener("click", function (event) {
    const sortDropdownMenu = document.getElementById("sortDropdownMenu");
    if (!event.target.closest('.dropdown-sort') && sortDropdownMenu.classList.contains('show-dropdown')) {
        sortDropdownMenu.classList.remove('show-dropdown');
    }
});

*/