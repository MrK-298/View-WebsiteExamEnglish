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
async function changePassword() {
    const token = getTokenFromCookie('kento');
    fetch('http://localhost:3000/api/v1/auth/changePassword/', {
        method: 'PUT',
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }, body: JSON.stringify({
            oldpassword: document.getElementById('oldPassword').value,
            newpassword: document.getElementById('newPassword').value
        })
    })
        .then(function (data) {
            return data.json()
        }).then(function (data) {
            if (data.success) {               
                console.log(data);
                alert("ok")
            } else {
                alert("!ok")
            }
        })
        .catch((err) => {
            alert("okn't")
        }).finally(() => {

        })
}
const btn = document.getElementById('btn-change');
btn.addEventListener('click', changePassword);