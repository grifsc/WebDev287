// Load and display services
function loadServices() {
    fetch('/services')
        .then(response => response.json())
        .then(services => {
            const container = document.querySelector('.container');
            // Clear the container
            container.innerHTML = '';

            //Initialized each row
            let row = null;

            // Dynamically display each service saved in DB
            services.forEach((service, index) => {
                // Divide services into rows (3 services per row)
                if (index % 3 === 0) {
                    row = document.createElement('div');
                    row.classList.add('row');
                    container.appendChild(row);
                }

                // Create each service card
                const serviceDiv = document.createElement('div');
                serviceDiv.classList.add('service');
                serviceDiv.innerHTML = `
                    <img src="${service.image}">
                    <h3>${service.name} 
                        <br>${service.price}
                    </h3>
                    <p>${service.description}</p>
                `;

                row.appendChild(serviceDiv);
            });
        })
        .catch(error => console.error('Error loading services:', error));
}

// Initialize the service list
window.onload = loadServices;