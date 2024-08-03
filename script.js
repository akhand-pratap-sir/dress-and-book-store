function validateLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'anuragyadavakhand@gmail.com' && password === 'hagalbaba.com') {
       // window.location.href = 'indexx.html'; 
        window.open('indexx.html', '_blank'); // Update to your main page URL if needed
    } else {
        alert('Invalid username or password');
    }
}