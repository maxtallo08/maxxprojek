document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    // Simple authentication logic (replace with your own logic)
    if (authenticateUser(username, password)) {
        localStorage.setItem('loggedIn', 'true');
        window.location.href = 'index.html'; // Redirect to the CRUD page
    } else {
        alert('Login failed. Please check your username and password.');
    }
});

function authenticateUser(username, password) {
    // This is where you would implement your authentication logic
    // For simplicity, we're using hardcoded credentials
    return username === 'max' && password === '08';
}
