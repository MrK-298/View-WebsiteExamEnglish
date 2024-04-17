function reset() {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    var password = document.getElementById('password').value;    
    if (password.length < 8) {
        alert('Mật khẩu phải có ít nhất 8 ký tự.');
        event.preventDefault();
        return;
    }    
    fetch(`http://localhost:3000/api/v1/auth/resetPassword/${token}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ password: password })
    })
    .then(function (data) {
        return data.json()
    }).then(function (data) {
        if (data.success) {                     
            alert("Mật khẩu đã đổi thành công");
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
const resetBtn = document.getElementById('btn-reset');
resetBtn.addEventListener('click', reset);