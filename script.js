function validateLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'mdic' && password === '12345') {
       // window.location.href = 'indexx.html'; 
        window.open('indexx.html', '_blank'); // Update to your main page URL if needed
    } else {
        alert('Invalid username or password');
    }
}
