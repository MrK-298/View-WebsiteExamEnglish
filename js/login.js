async function login() {
    var username = document.getElementById('current-username').value;
    var password = document.getElementById('current-password').value;
    if (username.length < 6 && isValidGmail(username)) {
        alert('username phải có ít nhất 6 ký tự hoặc đúng định dạng gmail.');
        return;
    }
    if (password.length < 8) {
        alert('Mật khẩu phải có ít nhất 8 ký tự.');
        return;
    }
    fetch('http://localhost:3000/api/v1/auth/login/', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({username:username,password:password})
    })
    .then(function (data) {
        return data.json()
    }).then(function (data) {
        if (data.success) {
            document.cookie = "kento=" + data.data + "; expires=" + new Date(Date.now() + 3600 * 1000).toUTCString() + "; path=/";
            if(data.role == "user"){
                window.location.href = '../views/home.html'
            }else
                window.location.href = '../views/admin/dashboard.html'
        } else {
            alert(data.data);
        }
    })
    .catch((err) => {
        alert(data.data);
    }).finally(() => {

    })
}
function isValidGmail(email) {
    var regex = /^[a-zA-Z0-9._%+-]+@gmail.com$/;
    return regex.test(email);
}
const submitButton = document.getElementById('btn-login');
submitButton.addEventListener('click', login);