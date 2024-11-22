function loadContact(){
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

    fetch('/contact-info/1')
        .then(response => response.json())
        .then(data => {
            //Display small description
            const initialContentContainer = document.querySelector('.content');
            const descriptionP = document.createElement('p');
            descriptionP.innerHTML = data.description;
            initialContentContainer.appendChild(descriptionP);

            //Display Address
            const addressContainer = document.querySelector('.address-info');
            addressContainer.innerHTML = `
                <h2 class="address">Address</h2>
                <p>${data.address}, <br>${data.city}, ${data.state} <br>${data.zipcode}</p>
            `;

            //Display Contact
            const phoneContainer = document.querySelector('.phone-info');
            phoneContainer.innerHTML = `
                <h2 class="phone">Phone Number</h2>
                <p>${data.phone}</p>
            `;

            //Display email
            const emailContainer = document.querySelector('.email-info');

            //Send email to business
            const emailForm = document.querySelector('.email-form');
            emailForm.action = `mailto: ${data.email}`;

            emailForm.addEventListener('submit', (event) => {
                event.preventDefault();

                //Get the values from the form
                const fullname = document.querySelector('input[type="text"]').value;
                const userEmail = document.querySelector('input[type="email"]').value;
                const msg = document.querySelector('textarea').value;
                const businessEmail = data.email;

                const subject = 'Inquiry About Pokerent Services';
                const body = `Dear Pokerent Team,\n${msg}\nBest regards,\n${fullname} \n${userEmail}
                `;

                //set up mailto attribute in html
                window.location.href = `mailto:${businessEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
            });
        })
        .catch(error => console.error('Error loading contact info:', error));

    fetch('/footer-info/1')
        .then(response => response.json())
        .then(data => {
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

//Initialize contact page
window.onload = loadContact();