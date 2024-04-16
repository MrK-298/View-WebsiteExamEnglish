async function register() {
    var username = document.getElementById('username').value;
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirmpassword').value;
    if (name.length < 8 || name.length > 30) {
        alert('Họ và tên phải nằm trong 8 đến 30 ký tự');
        event.preventDefault();
        return;
    }
    if (username.length < 6) {
        alert('username phải có ít nhất 6 ký tự.');
        event.preventDefault();
        return;
    }
    if (password.length < 8) {
        alert('Mật khẩu phải có ít nhất 8 ký tự.');
        event.preventDefault();
        return;
    }     
    if (password !== confirmPassword) {
        alert('Xác nhận mật khẩu không khớp. Vui lòng nhập lại.');
        event.preventDefault();
        return;
    }
    fetch('http://localhost:3000/api/v1/auth/register/', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: email, password:password,username:username,name:name})
    })
    .then(function (data) {
        return data.json()
    }).then(function (data) {
        if (data.success) {
            alert("Đăng ký tài khoản thành công");
            window.location.href = '../views/login.html';
        } else {
            alert(data.data);
        }
    })
    .catch((err) => {
        alert(data.data);
    }).finally(() => {

    })
}
const btn = document.getElementById('btn-register');
btn.addEventListener('click', register);