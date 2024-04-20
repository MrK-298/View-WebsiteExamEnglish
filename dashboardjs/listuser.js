window.addEventListener('DOMContentLoaded', function() {
    const token = getTokenFromCookie('kento');
    const tableBody = document.getElementById("list-user");

    fetch(`http://localhost:3000/api/v1/users/`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
    })
    .then(function(data) {
        return data.json();
    }).then(function(data) {
        data.data.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.email}</td>
                <td style="text-align: center;">${item.roleId}</td>
                <td style="text-align: center;">${item.name}</td>
                <td style="text-align: center;">
                    <a class="btn" href="../admin/userprofile.html?username=${item.username}">Edit</a> |
                    <a class="btn delete-btn" data-username="${item.username}">Delete</a>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }); 

    tableBody.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-btn')) {
            const username = event.target.dataset.username;
            const row = event.target.closest('tr');
            deleteUser(username,row);
        }
    });
});

function deleteUser(username,row) {
    if (confirm("Bạn có chắc muốn xóa tài khoản này")) {
        fetch(`http://localhost:3000/api/v1/users/delete/${username}`,{
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then(function(data) {
            return data.json();
        }).then(function(data) {
            if (data.success) {
                alert("Đã xóa tài khoản thành công");      
                row.parentNode.removeChild(row);    
            }
        }).catch(error => {
            alert("Đã xảy ra lỗi khi xóa tài khoản");
        });
    }
}

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
