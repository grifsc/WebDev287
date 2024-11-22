//Swap animation for the login and registration
const wrapper = document.querySelector('.wrapper');
const loginLink = document.querySelector('.login-link');
const registerLink = document.querySelector('.register-link');

registerLink.addEventListener('click', () => {
    wrapper.classList.add('active');
});

loginLink.addEventListener('click', () => {
    wrapper.classList.remove('active');
});

//Check credentials for user-role detection
function handleLogin(event) {
    event.preventDefault(); 
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    for (const user of Users) {
        if (user.email === email && user.password === password) {
            if (user.role === 'admin') {
                window.location.href = "/html/admin-dashboard.html"; // Redirect to admin dashboard
            } else {
                window.location.href = "/html/client-home.html"; // Redirect to client dashboard
            }
            return;
        }
    }

    alert("Invalid email or password.");
}

function loadLogin(){
    fetch('/home-page-info/1') 
    .then(response => response.json())
    .then(data => {
        const logoContainer = document.querySelector('.logo');
        logoContainer.innerHTML = `
                <img src="${data.logo}" alt="Logo">
                <h1>${data.name}</h1>
            `;
    }).catch(error => console.error('Error loading logo info:', error));

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
        .catch(error => console.error('Error loading footer info:', error));
}

//Initialize page
window.onload = loadLogin;