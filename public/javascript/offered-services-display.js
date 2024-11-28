
function loadServices() {

    // Display All Services on the Horizontal List
    fetch('/services')
        .then(response => response.json())
        .then(services => {
            const serviceList = document.querySelector('.horizontal-list');
            serviceList.innerHTML = '';  // Clear the horizontal list

            const dropdownList = document.querySelector('.dropdown-option');
            dropdownList.innerHTML = '';  // Clear the dropdown list

            services.forEach(service => {
                const serviceListIndex = document.createElement('li');
                serviceListIndex.classList.add('service-option');
                serviceListIndex.id = 'service-' + service.id;

                const serviceInfo = `
                    <h2>${service.name}
                    <br>$${service.price}
                    </h2>
                    <img src="${service.image}" alt="404">
                `;
                
                serviceListIndex.innerHTML = serviceInfo;
                serviceList.appendChild(serviceListIndex);
                
                const dropdownListOption = document.createElement('option');
                dropdownListOption.value = service.name; // Set value as service name
                dropdownListOption.innerText = service.name; // Set text as service name
                dropdownList.appendChild(dropdownListOption);
            });
        })
        .catch(error => console.error('Error loading service checkbox:', error));
}
window.onload=loadServices;