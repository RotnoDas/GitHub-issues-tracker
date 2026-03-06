const signInButton = document.getElementById('sign-in-button');
signInButton.addEventListener('click', () => {
    const userName = document.getElementById('input-username').value;
    const password = document.getElementById('input-password').value;
    if(userName === 'admin' && password === 'admin123') {
        alert('Login successful!');
        window.location.assign('../pages/home.html');
    }
    else {
        if(userName !== 'admin' && password !== 'admin123') {
            alert('Invalid username and password!');
        }
        else if(userName !== 'admin' && password === 'admin123') {
            alert('Invalid username!');
        }
        else if(userName === 'admin' && password !== 'admin123') {
            alert('Invalid password!');
        }
    }
});
