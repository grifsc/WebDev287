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

//Check credentials for user-role detection Brandons code
async function handleLogin(event) {
    event.preventDefault();

    // Get email and password from the form
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        // Make a POST request to the /login route
        const response = await fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });

        // Parse the JSON response
        const data = await response.json();

        if (response.ok) {
            // Redirect based on the user's role
            if (data.role === "admin") {
                window.location.href = "/html/admin-dashboard.html";
            } else {
                window.location.href = "/html/client-home.html";
            }
        } else {
            // Handle invalid credentials or errors
            alert(data.message || "Invalid email or password.");
        }
    } catch (error) {
        console.error("Error logging in:", error);
        alert("An error occurred while logging in. Please try again.");
    }
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

//Registering a user, Brandons code
function registerUser(event) {
    event.preventDefault();
    const form = document.getElementById('registerForm');
    const userTypeElement = form.querySelector('input[name="userType"]:checked');

    const data = {
        firstName: form.elements['firstName'].value,
        lastName: form.elements['lastName'].value,
        email: form.elements['email'].value,
        password: form.elements['password'].value,
        userType: userTypeElement ? userTypeElement.value : null // Use null or a default value if not checked
    };

    if (!data.userType) {
        alert("Please select a user type.");
        return false; // Prevent form submission if no user type selected
    }

    fetch('/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => response.json())
    .then(data => {
        alert(data.message);
        if (data.success) {
            window.location.href = data.redirect;
        }
    }).catch(error => {
        console.error('Failed to register:', error);
        alert('Failed to register: ' + error.message);
    });
    return false;
}



