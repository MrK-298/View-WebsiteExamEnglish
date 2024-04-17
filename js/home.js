function getTokenFromCookie(cookieName) {
    const cookieArray = document.cookie.split(';').map(cookie => cookie.trim());
    const targetCookie = cookieArray.find(cookie => cookie.startsWith(cookieName + '='));
    if (targetCookie) {
        const token = targetCookie.split('=')[1];
        return token;
    } else {
        return null;
    }
}
window.addEventListener('load', function() {
    const token = getTokenFromCookie('kento');
    fetch(`http://localhost:3000/api/v1/auth/decodeToken/${token}`,{
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
    })
    .then(function (data) {
        return data.json()
    }).then(function (data) {
        if (data.success) {
            const logOutElement = document.getElementById('log-out');
            const loginElement = document.getElementById('login');
            const greetingElement = document.querySelector('div b');    
            greetingElement.textContent ="Xin chào " + data.data.name;
            const doneExamLink = document.getElementById('exam-done');
            doneExamLink.style.display = 'block';
            doneExamLink.querySelector('a').href = `../views/listexamdone.html?username=${data.data.username}`;
            logOutElement.style.display = 'block';
            loginElement.style.display = 'none'; 
        } else {
            console.log(data.data);
        }
    })
    .catch((err) => {
        console.log(err);
    }).finally(() => {

    })
});