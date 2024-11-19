// Load and display services
function loadServices() {
    fetch('/services')
        .then(response => response.json())
        .then(services => {
            const serviceList = document.querySelector('.service-list');
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

// Open Add/Edit Popup Form
function openPopupForm(action, id = '', name = '', description = '', price = '', image = '') {
    const title = action === 'edit' ? 'Edit Service' : 'Add Service';
    document.querySelector('.popup-title').textContent = title;

    // Set the input values for edit form
    document.getElementById('service-name').value = name;
    document.getElementById('service-description').value = description;
    document.getElementById('service-price').value = price;
    document.getElementById('service-img').src = image;  

    //Save data for later manipulation
    currentServiceId = id;
    currentServiceImage = image;

    //Display the popup
    const popup = document.getElementById('popup-form-service');
    popup.classList.add('active');

    // Show overlay
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'block';
    setTimeout(() => {
        overlay.style.opacity = '1';
    }, 0);
}

// Open Delete Confirmation Popup
function openDeleteForm(serviceID, serviceName) {
    document.querySelector('.confirm-msg').textContent = `Are you sure you want to delete "${serviceName}"?`;

     //Implement the onclick to delete a service
    const confirmButton = document.getElementById('confirm-btn');
    confirmButton.onclick = function() {
        deleteService(serviceID);
    };
    
    // Display delete popup
    const popup = document.getElementById('popup-form-delete');
    popup.classList.add('active');

    // Show overlay
    const overlay = document.getElementById('overlay');
    overlay.style.display = 'block';
    setTimeout(() => {
        overlay.style.opacity = '1';
    }, 0);
}

// Hide Popup Form
function hidePopup() {
    const popups = document.querySelectorAll('.popup-form');
    popups.forEach(popup => {
        popup.classList.remove('active');
    });

    const overlay = document.getElementById('overlay');
    overlay.style.opacity = '0';
    setTimeout(() => {
        overlay.style.display = 'none';
    }, 300);
}


// Add/Edit new service
function saveService(event) {
    event.preventDefault();
    
    //Get the data current saved in DB
    const name = document.getElementById('service-name').value;
    const description = document.getElementById('service-description').value;
    const price = document.getElementById('service-price').value;
    const imageFile = document.getElementById('service-img').files[0];

    //Force the image path
    let image = '';  
    if (imageFile) {
        image = '/images/' + imageFile.name;
    }

    //Service Object targeted
    const data = {
        name,
        description,
        price,
        image
    };

    if (currentServiceId) {
        // Edit service w/ the unique id
        data.id = currentServiceId;
        fetch('/edit-service', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                loadServices(); 
                hidePopup(); 
            } else {
                alert('Error editing service');
            }
        })
        .catch(error => console.error('Error editing service:', error));
    } else {
        // Add new service
        fetch('/add-service', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                loadServices(); 
                hidePopup(); 
            } else {
                alert('Error adding service');
            }
        })
        .catch(error => console.error('Error adding service:', error));
    }
}

// Delete service
function deleteService(serviceID) {
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


// Initialize the service list
window.onload = loadServices;