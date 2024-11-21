// Load and display services
function loadServices() {
    //Display the logo and company name
    fetch('/home-page-info/1')  
        .then(response => response.json())
        .then(data => {
            const logoContainer = document.querySelector('.logo');
            logoContainer.innerHTML = `
                    <img src="${data.logo}" alt="Logo">
                    <h1>${data.name}</h1>
                `;
        })
        .catch(error => console.error('Error loading services:', error));

    //Display the services
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