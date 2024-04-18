window.onload = async function loadUser(){
    const token = getTokenFromCookie('kento');
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');
    fetch(`http://localhost:3000/api/v1/users/findbyUsername/${username}`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
    })
    .then(function(data) {
        return data.json();
    }).then(function(data) {
        document.getElementById("text-input").value = data.data.name;
        document.getElementById("email-input").value = data.data.email;
        getRole(data.data.roleId);
    });
}
function getRole(userRole){
    fetch(`http://localhost:3000/api/v1/role/getAll`)
    .then(function (data) {
        return data.json()
    }).then(function (data) {
        const roleIdInput = document.getElementById("roleId-input");
        data.data.forEach(function(role) {
            const option = document.createElement("option");
            option.value = role.roleId;
            option.textContent = role.roleId;
            roleIdInput.appendChild(option);
            if (role.roleId === userRole) {
                option.selected = true;
            }
        });
    });
}
function editUser() {
        const urlParams = new URLSearchParams(window.location.search);
        const username = urlParams.get('username');
        const name = document.getElementById("text-input").value;
        const email = document.getElementById("email-input").value;
        const roleId = document.getElementById("roleId-input").value;

        fetch(`http://localhost:3000/api/v1/users/edit/${username}`,{
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                roleId: roleId
            })
        })
        .then(function(data) {
            return data.json();
        }).then(function(data) {
            if (data.success) {
                alert("Đổi tài khoản thành công");      
                window.location.href = "../admin/dashboard.html"
            }
        }).catch(error => {
            alert("Đã xảy ra lỗi khi xóa tài khoản");
        });
}
const submitButton = document.getElementById('submit-btn');
submitButton.addEventListener('click', editUser);

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
