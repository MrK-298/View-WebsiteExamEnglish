async function addExam() {
    fetch('http://localhost:7114/api/Exam/NewExam/', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
    })
    .then(function (response) {
        if (!response.ok) {
          alert('Lấy bài không thành công');
        }
        alert('Lấy bài thành công');
        return response.json();
    }).catch(function (error) {
        console.error('There was an error!', error);
    });
}

const submitButton = document.getElementById('add-btn');
submitButton.addEventListener('click', addExam);

window.addEventListener('DOMContentLoaded', function() {
    const token = getTokenFromCookie('kento');
    const tableBody = document.getElementById("list-user");

    fetch(`http://localhost:3000/api/v1/exams/getAllExam`, {
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
                <td>${count++}</td>
                <td>Test ${item.name}</td>
                <td>${item.isDelete}</td>
                <td>
                    ${item.isDelete ? '<a class="btn recover-btn" data-examname="' + item.name + '">Recover</a>' : '<a class="btn delete-btn" data-examname="' + item.name + '">Delete</a>'}
                </td>

            `;
            tableBody.appendChild(row);
        });
    });
    tableBody.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-btn')) {
            const examname = event.target.dataset.examname;
            deleteExam(examname);
        }
        if (event.target.classList.contains('recover-btn')) {
            const examname = event.target.dataset.examname;
            recoverExam(examname);
        }
    }); 
});

function deleteExam(examname) {
    if (confirm("Bạn có chắc muốn xóa exam ?")) {
        fetch(`http://localhost:3000/api/v1/exams/delete/${examname}`,{
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
function recoverExam(examname) {
    if (confirm("Bạn có chắc khôi phục exam ?")) {
        fetch(`http://localhost:3000/api/v1/exams/recover/${examname}`,{
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