window.addEventListener('DOMContentLoaded', function() {
    const token = getTokenFromCookie('kento');
    const tableBody = document.getElementById("list-user");

    fetch(`http://localhost:3000/api/v1/users/getUserDelete`, {
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
                    <a class="btn recover-btn" data-username="${item.username}">Recover</a>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }); 

    tableBody.addEventListener('click', function(event) {
        if (event.target.classList.contains('recover-btn')) {
            const username = event.target.dataset.username;
            const row = event.target.closest('tr');
            recoverUser(username,row);
        }
    });
});

function recoverUser(username,row) {
    if (confirm("Bạn có chắc muốn khôi phục lại tài khoản này")) {
        fetch(`http://localhost:3000/api/v1/users/recover/${username}`,{
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then(function(data) {
            return data.json();
        }).then(function(data) {
            if (data.success) {
                alert("Đã khôi phục tài khoản thành công");      
                row.parentNode.removeChild(row);    
            }
        }).catch(error => {
            alert("Đã xảy ra lỗi khi lấy lại tài khoản");
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
