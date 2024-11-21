function loadHomePage() {
    fetch('/home-page-info/1')
        .then(response => response.json())
        .then(data => {
            // Display the logo and company name
            const logoContainer = document.querySelector('.logo');
            logoContainer.innerHTML = `
                <img src="${data.logo}" alt="Logo">
                <h1>${data.name}</h1>
            `;

            // Display the welcome view
            const welcomeContainer = document.querySelector('.text-box');
            welcomeContainer.innerHTML = `
                <h1>${data.welcome}</h1>
                <p>${data.hook}</p>
            `;

            // Display the benefits view
            const benefitsContainer = document.querySelector('.why-us');
            benefitsContainer.innerHTML = `
                <div class="container">
                    <h2>${data.why}</h2>
                    <div class="benefits">
                        <div class="benefit">
                            <h3>${data.reason1}</h3> <!-- Fixed the typo here -->
                            <p>${data.description1}</p>
                        </div>
                        <div class="benefit">
                            <h3>${data.reason2}</h3> <!-- Fixed reason2 -->
                            <p>${data.description2}</p>
                        </div>
                        <div class="benefit">
                            <h3>${data.reason3}</h3> <!-- Fixed reason3 -->
                            <p>${data.description3}</p> <!-- Fixed description3 -->
                        </div>
                        <div class="benefit">
                            <h3>${data.reason3}</h3> <!-- Fixed reason3 -->
                            <p>${data.description3}</p> <!-- Fixed description3 -->
                        </div>
                    </div>
                </div>
            `;

            // Display the slideshow
            const slideshowContainer = document.querySelector('.slidesshow-container');
            slideshowContainer.innerHTML = `
                <div class="slides fade">
                    <div class="number-text">1 / 4</div>
                    <img src="${data.slide1}" style="width: 100%;">
                    <div class="caption">${data.caption1}</div> <!-- Replaced caption1 -->
                </div>

                <div class="slides fade">
                    <div class="number-text">2 / 4</div>
                    <img src="${data.slide2}" style="width: 100%;">
                    <div class="caption">${data.caption2}</div> <!-- Replaced caption2 -->
                </div>

                <div class="slides fade">
                    <div class="number-text">3 / 4</div>
                    <img src="${data.slide3}" style="width: 100%;">
                    <div class="caption">${data.caption3}</div> <!-- Replaced caption3 -->
                </div>

                <div class="slides fade">
                    <div class="number-text">4 / 4</div>
                    <img src="${data.slide4}" style="width: 100%;">
                    <div class="caption">${data.caption4}</div> <!-- Replaced caption4 -->
                </div>

                <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
                <a class="next" onclick="plusSlides(1)">&#10095;</a>
            `;

            //Function to handle the slideshow animation
            var slideIndex = 1;
            showSlides(slideIndex);

            function plusSlides(n){
                showSlides(slideIndex += n);
            }

            function currentSlide(n){
                showSlides(slideIndex = n);
            }

            function showSlides(n){
                let i;
                let slides = document.getElementsByClassName("slides");
                let dots = document.getElementsByClassName("dot");
                if(n > slides.length){
                    slideIndex = 1;
                }
                if(n < 1){
                    slideIndex = slides.length;
                }
                for(i = 0; i < slides.length; i++){
                    slides[i].style.display = "none";
                }
                for(i = 0; i < dots.length; i++){
                    dots[i].className = dots[i].className.replace(" active", "");
                }   
                slides[slideIndex-1].style.display = "block";
                dots[slideIndex-1].className += " active";
            }
        })
        .catch(error => console.error('Error loading home page information:', error));

        //Fetch the data for everything that relates to the services
        fetch('/services')
        .then(response => response.json())
        .then(services => {
            //Display popular services
            const popularServiceContainer = document.querySelector('.grid');
            popularServiceContainer.innerHTML = '';

            services.forEach(service => {
                if (service.popular === 1){
                    const serviceDiv = document.createElement('div');
                    serviceDiv.classList.add('service');
                    serviceDiv.innerHTML = `
                        <img src="${service.image}">
                        <h3>${service.name} 
                            <br>${service.price}
                        </h3>
                        <p>${service.description}</p>
                    `;
                    popularServiceContainer.appendChild(serviceDiv);
                }
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

// Initialize the home page
window.onload = loadHomePage;
