window.addEventListener('DOMContentLoaded', function() {
    const token = getTokenFromCookie('kento');
    const tableBody = document.getElementById("list-user");

    fetch(`http://localhost:3000/api/v1/role/getAll`, {
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
    })
    .then(function(data) {
        return data.json();
    }).then(function(data) {
        let count = 0;
        data.data.forEach(item => {           
            const row = document.createElement('tr');
            row.innerHTML = `
                <td style="text-align: center;">${count++}</td>
                <td style="text-align: center;">${item.roleId}</td>
                <td style="text-align: center;">${item.name}</td>
                <td style="text-align: center;">${item.isDelete}</td>
                <td style="text-align: center;">
                    ${item.isDelete ? '<a class="btn recover-btn" data-role="' + item.roleId + '">Recover</a>' : '<a class="btn delete-btn" data-role="' + item.roleId + '">Delete</a>'}
                </td>

            `;
            tableBody.appendChild(row);
        });
    });
    tableBody.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-btn')) {
            const role = event.target.dataset.role;
            deleteExam(role);
        }
        if (event.target.classList.contains('recover-btn')) {
            const role = event.target.dataset.role;
            recoverExam(role);
        }
    }); 
});

function deleteExam(role) {
    if (confirm("Bạn có chắc muốn xóa exam ?")) {
        fetch(`http://localhost:3000/api/v1/role/delete/${role}`,{
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then(function(data) {
            return data.json();
        }).then(function(data) {
            if (data.success) {
                alert("Đã xóa exam thành công");    
                location.reload();    
            }
        }).catch(error => {
            alert("Đã xảy ra lỗi khi xóa exam");
        });
    }
}
function recoverExam(role) {
    if (confirm("Bạn có chắc khôi phục exam ?")) {
        fetch(`http://localhost:3000/api/v1/role/recover/${role}`,{
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
        })
        .then(function(data) {
            return data.json();
        }).then(function(data) {
            if (data.success) {
                alert("Đã khôi phục exam thành công");    
                location.reload();    
            }
        }).catch(error => {
            alert("Đã xảy ra lỗi khi khôi phục exam");
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