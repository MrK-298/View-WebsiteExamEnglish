window.addEventListener('DOMContentLoaded', function() {
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
            const inputElement = document.createElement('input');
            inputElement.labels = 'username';
            inputElement.id = 'username';
            inputElement.style.display = "none";
            inputElement.value = data.data.username;
            inputElement.placeholder = "Nhập tên người dùng"; // Thêm placeholder vào đây
            document.body.appendChild(inputElement);

            // Di chuyển dòng dưới vào đây để tránh lỗi 'Uncaught TypeError'
            const username = document.getElementById("username").value;
            console.log(username); // hoặc thực hiện bất kỳ thao tác nào khác bạn muốn ở đây
        } else {
            console.log(data.data);
        }
    })
    .catch((err) => {
        console.log(err);
    }).finally(() => {

    })
});

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
