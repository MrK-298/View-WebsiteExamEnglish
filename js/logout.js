async function logout(){
    const logOutElement = document.getElementById('log-out');
    const loginElement = document.getElementById('login');
    document.cookie = "kento" + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    const greetingElement = document.querySelector('div b'); 
    logOutElement.style.display = 'none';
    loginElement.style.display = 'block';
    greetingElement.style.display = 'none';
}
const logoutBtn = document.getElementById('log-out');
logoutBtn.addEventListener('click', logout);