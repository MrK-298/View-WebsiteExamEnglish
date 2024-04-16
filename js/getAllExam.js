window.onload = async function() {
    fetch('http://localhost:3000/api/v1/exams/')
    .then(response => response.json())
    .then(data => {
        const examList= document.getElementById('list-exam');
        data.forEach(exam => {
            const readingDiv = document.createElement('div');
            readingDiv.setAttribute('id',exam.name);
            readingDiv.className = 'col-lg-4 col-12';
            readingDiv.style.marginTop = '20px';
            const singleInfoDiv = document.createElement('div');
            singleInfoDiv.className = 'single-info';
            const icon = document.createElement('i');
            icon.className = 'fas fa-book-open';
            const contentDiv = document.createElement('div');
            contentDiv.className = 'content';
            const heading = document.createElement('h3');
            heading.textContent = 'Reading';
            const paragraph = document.createElement('p');
            paragraph.textContent = "Test " + exam.name;
            contentDiv.appendChild(heading);
            contentDiv.appendChild(paragraph);
            singleInfoDiv.appendChild(icon);
            singleInfoDiv.appendChild(contentDiv);
            readingDiv.appendChild(singleInfoDiv);
            examList.appendChild(readingDiv);
            singleInfoDiv.addEventListener('click',function(){
                const token = getTokenFromCookie('kento');
                if(token)
                {
                    window.location.href = `../views/exam.html?examname=${exam.name}`;
                }
                else{
                    alert("Hãy đăng nhập để làm bài")
                }
            });                   
        });
    });
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