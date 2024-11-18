let currentServiceName = null;

// Display Service Dynamically
Services.forEach(service => { 
    const serviceDiv = document.createElement('div');
    serviceDiv.classList.add('service-option');

    const serviceInfo = `
        <img src="${service.image}">
        <p><b>Service Name:</b> ${service.name}</p>
        <p><b>Description:</b> <br>${service.description}</p>
        <p><b>Price:</b> $${service.price}</p>
        <button class="btn edit-btn" onclick="openPopupForm('edit', '${service.name}', '${service.description}', ${service.price})">Edit</button>
        <button class="btn delete-btn" onclick="openDeleteForm('${service.name}')">Remove</button>
    `;

    serviceDiv.innerHTML = serviceInfo;
    document.querySelector('.form-section .service-list').appendChild(serviceDiv);
});

// Open Add/Edit Popup Form
function openPopupForm(action, name = '', description = '', price = '') {
    const title = action === 'edit' ? 'Edit Service' : 'Add Service';
    document.querySelector('.popup-title').textContent = title;
    
    // Set the input values 
    document.getElementById('service-name').value = name;
    document.getElementById('service-description').value = description;
    document.getElementById('service-price').value = price;
    
    // Track the current service being edited
    currentServiceName = action === 'edit' ? name : null;

    // Show the popup
    const popup = document.getElementById('popup-form-service');
    popup.classList.add('active');
    
    // Show overlay if you have one
    const overlay = document.getElementById('overlay'); 
    overlay.style.display = 'block';
    setTimeout(() => {
        overlay.style.opacity = '1'; 
    }, 0);
}

// Open Delete Confirmation Popup
function openDeleteForm(serviceName) {
    currentServiceName = serviceName;
    document.querySelector('.confirm-msg').textContent = `Are you sure you want to delete "${serviceName}"?`;
    
    // Show the delete popup
    const popup = document.getElementById('popup-form-delete');
    popup.classList.add('active');

    // Show overlay if you have one
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



