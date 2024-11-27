//Display the logo and the client name dynamically
fetch('/home-page-info/1')
.then(response => response.json())
.then(data => {
    const logoContainer = document.querySelector('.logo');
    logoContainer.innerHTML = `
        <img src="${data.logo}" alt="Logo">
    `;
})
.catch(error => console.error('Error loading logo:', error));

fetch('/admin')
.then(response => response.json())
.then(users => {
    const name = users.first;
    const container = document.getElementById('admin-name');
    if (container) {
        container.textContent = name; 
    }
}).catch(error => console.error('Error loading client name:', error));

// Load and display services
function loadServices() {
    fetch('/services')
        .then(response => response.json())
        .then(services => {
            const serviceList = document.querySelector('.service-list');
            serviceList.innerHTML = '';  // Clear the list

            services.forEach(service => {
                const serviceDiv = document.createElement('div');
                serviceDiv.classList.add('service-option');
                serviceDiv.id = 'service-' + service.id;

                const serviceInfo = `
                    <img src="${service.image}" alt="Service Image">
                    <h2 style="color: ${service.popular ? '#41f1b6' : '#fff'};">Popular</h2>
                    <p><b>Service Name:</b> <span class="service-name">${service.name}</span></p>
                    <p><b>Description:</b><br><span class="service-description">${service.description}</span></p>
                    <p><b>Price:</b> $<span class="service-price">${service.price}</span></p>
                    <button class="btn edit-btn" onclick="openPopupForm('edit', '${service.id}', '${service.name}', '${service.description}', ${service.price}, '${service.image}', ${service.popular})">Edit</button>
                    <button class="btn delete-btn" onclick="openDeleteForm('${service.id}', '${service.name}')">Remove</button>
                `;

                serviceDiv.innerHTML = serviceInfo;
                serviceList.appendChild(serviceDiv);
            });
        })
        .catch(error => console.error('Error loading service checkbox:', error));
}

// Open Add/Edit Popup Form
function openPopupForm(action, id = '', name = '', description = '', price = '', image = '', isPopular = false) {
    const title = action === 'edit' ? 'Edit Service' : 'Add Service';
    document.querySelector('.popup-title').textContent = title;

    document.getElementById('service-name').value = name;
    document.getElementById('service-description').value = description;
    document.getElementById('service-price').value = price;
    document.getElementById('service-img').src = image;

    const serviceCheckbox = document.getElementById('service-checkbox');
    serviceCheckbox.checked = isPopular;

    currentServiceId = id;
    currentServiceImage = image;

    const popup = document.getElementById('popup-form-service');
    popup.classList.add('active');

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

    const name = document.getElementById('service-name').value;
    const description = document.getElementById('service-description').value;
    const price = document.getElementById('service-price').value;
    const imageFile = document.getElementById('service-img').files[0];
    const popular = document.getElementById('service-checkbox').checked;

    let image = '';  
    if (imageFile) {
        image = '/images/' + imageFile.name;
    }

    const data = {
        name,
        popular,
        description,
        price,
        image
    };

    submitServiceData(data);
    
}

// Submit the updated service data to the DB
function submitServiceData(data) {
    if (currentServiceId) {
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

// Attach event listener to the form
document.getElementById('add-service-form').addEventListener('submit', saveService);
