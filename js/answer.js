window.addEventListener('load', function() {
    const username = document.getElementById("username").value;
    const urlParams = new URLSearchParams(window.location.search);
    const examName = urlParams.get('examname');
    fetch(`http://localhost:3000/api/v1/detailExam/getDetailExam`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' 
        },
        body: JSON.stringify({username:username,exam: examName})
    })
    .then(response => response.json())
    .then(data => {
        data.Answers.forEach((item, index) => {
            const tableId = (index + 1) % 2 === 0 ? 'sochan' : 'sole';
            const table = document.getElementById(tableId);
        
            const row = table.insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            const cell3 = row.insertCell(2);
        
            if(item.selectedValue === item.correctAnswer)
            {
                cell1.innerHTML = index + 1;
                cell1.style.color = "green";
                cell2.innerHTML = item.selectedValue;
                cell2.style.color = "green";
                cell3.innerHTML = `<i class="fas fa-check"></i>`;
                cell3.style.color = "green";
            }
            else
            {
                cell1.innerHTML = index + 1;
                cell1.style.color = "red";
                cell2.innerHTML = `${item.selectedValue} <i class="fas fa-times"></i>`;
                cell2.style.color = "red";
                cell3.innerHTML = item.correctAnswer;
                cell3.style.color = "red";
            }
        });       
    }); 
});