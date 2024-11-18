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