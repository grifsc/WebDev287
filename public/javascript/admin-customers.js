

document.addEventListener("DOMContentLoaded", () => {
    const userTableContainer = document.getElementById("userTableContainer");

    // Fetch users from the API
    fetch("/users")
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch user data.");
            }
            return response.json();
        })
        .then((users) => {
            if (users.length === 0) {
                userTableContainer.innerHTML = "<p>No users found.</p>";
                return;
            }

            const table = document.createElement("table");
            table.classList.add("user-table");

            // Add table headers
            const thead = document.createElement("thead");
            const headerRow = document.createElement("tr");

            const headers = ["ID", "Name", "Email", "Send Email", "Remove"];
            headers.forEach((header) => {
                const th = document.createElement("th");
                th.textContent = header;
                headerRow.appendChild(th);
            });

            thead.appendChild(headerRow);
            table.appendChild(thead);

            // Add table body
            const tbody = document.createElement("tbody");

            users.forEach((user) => {
                const row = document.createElement("tr");

                // ID column
                const idCell = document.createElement("td");
                idCell.textContent = user.id;
                row.appendChild(idCell);

                // Name column (First name + Last name)
                const nameCell = document.createElement("td");
                nameCell.textContent = `${user.first}  ${user.last}`;
                row.appendChild(nameCell);

                // Email column
                const emailCell = document.createElement("td");
                emailCell.textContent = user.email;
                row.appendChild(emailCell);

                // Actions column
                const actionsCell = document.createElement("td");

                // Contact button
                const contactButton = document.createElement("button");
                contactButton.textContent = "Contact";
                contactButton.classList.add("contact-button");
                contactButton.addEventListener("click", () => {
                    window.location.href = `mailto:${user.email}`;
                });

                // Delete button
                const deleteButton = document.createElement("button");
                deleteButton.textContent = "Delete";
                deleteButton.classList.add("delete-button");
                deleteButton.addEventListener("click", () => deleteUser(user.id, row));

                actionsCell.appendChild(contactButton);
                actionsCell.appendChild(deleteButton);
                row.appendChild(actionsCell);

                tbody.appendChild(row);
            });

            table.appendChild(tbody);
            userTableContainer.appendChild(table);
        })
        .catch((error) => {
            console.error(error);
            userTableContainer.innerHTML = "<p>Error loading user data.</p>";
        });

    // Function to delete a user
    function deleteUser(userId, tableRow) {
        if (confirm("Are you sure you want to delete this user?")) {
            fetch(`/delete-user/${userId}`, { method: "DELETE" })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Failed to delete user.");
                    }
                    // Remove row from table
                    tableRow.remove();
                    alert("User deleted successfully.");
                })
                .catch((error) => {
                    console.error(error);
                    alert("Error deleting user.");
                });
        }
    }
});

// Load and display services
function loadBookings() {
    fetch('/services')
        .then(response => response.json())
        .then(services => {
            const serviceList = document.querySelector('.admin-bookings-list');
            //Clear the list to update it
            serviceList.innerHTML = '';  

            //Dynamically display each service saved in DB
            services.forEach(service => {
                const serviceDiv = document.createElement('div');
                serviceDiv.classList.add('service-option');
                serviceDiv.id = 'service-' + service.id;

                const serviceInfo = `
                    <img src="${service.image}">
                    <p><b>Service Name:</b> <span class="service-name">${service.name}</span></p>
                    <p><b>Description:</b> <br><span class="service-description">${service.description}</span></p>
                    <p><b>Price:</b> $<span class="service-price">${service.price}</span></p>
                    <button class="btn edit-btn" onclick="openPopupForm('edit', '${service.id}', '${service.name}', '${service.description}', ${service.price}, '${service.image}')">Edit</button>
                    <button class="btn delete-btn" onclick="openDeleteForm('${service.id}', '${service.name}')">Remove</button>
                `;

                serviceDiv.innerHTML = serviceInfo;
                serviceList.appendChild(serviceDiv);
            });
        })
        .catch(error => console.error('Error loading services:', error));
}

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

// Function to open the email popup along with an overlay to dim the background
function openEmailPopup(clientName) {
    //create the overlay element to dim the background
    const overlay = document.createElement('div');
    //add class to style the overlay
    overlay.classList.add('dim-overlay');   
    
    //attach closePopup() to close popup when overlay is clicked
    overlay.onclick = closePopup;           

    //create the popup element for the email form
    const popup = document.createElement('div');
    //add class to style  popup
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
    
    //append the overlay and popup elements to the document body so they appear on the page
    document.body.appendChild(overlay);
    document.body.appendChild(popup);
}

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