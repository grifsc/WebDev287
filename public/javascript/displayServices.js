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

            //Display all services title in footer
            const footerServiceContainer = document.querySelector('.service-name');
            footerServiceContainer.innerHTML = '';

            services.forEach(service => {
                const serviceP = document.createElement('p');
                serviceP.innerHTML = service.name;
                footerServiceContainer.appendChild(serviceP);
            });
        })
        .catch(error => console.error('Error loading services:', error));

        //Fetch the contact information for the footer
        fetch('/contact-info/1')
        .then(response => response.json())
        .then(data => {
            const contactContainer = document.querySelector('.contact-details');
            contactContainer.innerHTML = `
                <p><i class="fa-solid fa-location-dot"></i>${data.address}, ${data.city}, ${data.state}</p>    
                <p><i class="fa-solid fa-phone"></i>${data.phone}</p>    
                <p><i class="fa-solid fa-envelope"></i>${data.email}</p>    
            `;
        })
        .catch(error => console.error('Error loading contact info:', error));

        //Fetch the remaining information for the footer
        fetch('/footer-info/1')
        .then(response => response.json())
        .then(data => {
            //About us section in footer
            const aboutUsContainer = document.querySelector('.about-us-content');
            const aboutUsP = document.createElement('p');
            aboutUsP.innerHTML = data.aboutUs;
            aboutUsContainer.appendChild(aboutUsP);

            //Socials link
            const socialsContainer = document.querySelector('.socials-link');
            socialsContainer.innerHTML = `
                <a class="socials-btn" href="${data.facebook}" role="button"><i class="fa-brands fa-facebook"></i></a>
                <a class="socials-btn" href="${data.twitter}" role="button"><i class="fa-brands fa-twitter"></i></a>
                <a class="socials-btn" href="${data.instagram}" role="button"><i class="fa-brands fa-instagram"></i></a>
            `;
        })
        .catch(error => console.error('Error loading contact info:', error));
}

// Initialize the service list
window.onload = loadServices;