// Handle registration form submission
document.getElementById('registrationForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    // Add registration logic here
    alert(`User ${username} registered successfully!`);
});

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const loginUsername = document.getElementById('loginUsername').value;
    const loginPassword = document.getElementById('loginPassword').value;
    // Add login logic here
    alert(`User ${loginUsername} logged in successfully!`);
});
