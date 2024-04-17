function sendCode() {
    var email = document.getElementById('email').value;    
    if (isValidGmail(email)==false) {
        alert('Phải nhập đúng định dạng gmail');
        return;
    }    
    fetch('http://localhost:3000/api/v1/auth/forgotPassword/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ email: email })
    })
    .then(function (data) {
        return data.json()
    }).then(function (data) {
        if (data.success) {                     
            alert("Gửi gmail thành công! Hãy check email của bạn");
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
function isValidGmail(email) {
    var regex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    return regex.test(email);
}
const sendcodeBtn = document.getElementById('send-code-btn');
sendcodeBtn.addEventListener('click', sendCode);