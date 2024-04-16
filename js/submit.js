var array = [];
var correctAnswers = 0;
var totalQuestions = 0;
async function submitAnswers() {
    const token = getTokenFromCookie('kento');
    const urlParams = new URLSearchParams(window.location.search);
    const examName = urlParams.get('examname');
    fetch(`http://localhost:3000/api/v1/exams/getExam/${examName}`,{
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
    })
    .then(response => response.json())
    .then(async data => {
        await submitPart5(data);
        await submitPart7(data);
        if (confirm("Bạn có chắc muốn nộp bài không?")) {
            DetailExam(examName,array);
        }
    }).catch(error => {
        this.alert("Hãy đăng nhập để nộp bài");
    });
}
const submitButton = document.getElementById('submit-button');
submitButton.addEventListener('click', submitAnswers);

function DetailExam(exam,arr){
    const username = document.getElementById("username").value;
    const arrJSON = JSON.stringify(arr);
    const requestBody = JSON.stringify({ username: username, exam: exam,score:correctAnswers, arr: arrJSON });
    fetch(`http://localhost:3000/api/v1/detailExam/`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' 
        },
        body: requestBody
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {       
            alert("Nộp bài thành công");
            localStorage.clear();
            window.location.href = `../views/answer.html?examname=${exam}`;
        } else {
            alert(data.data);
        }
    });
}
async function submitPart5(data)
{
    const part5Questions = data.Questions.filter(question => question.type === "Part 5");
    part5Questions.forEach((question, index) => {
        let select = "Chưa trả lời";
        let correct;
        totalQuestions++;
        const selectedAnswers = document.querySelectorAll(`input[name="question${index + 1}"]`);
        selectedAnswers.forEach(selectedAnswer => {
            const selectedValue = selectedAnswer.value;             
            const answer = question.Answers.find(answer => answer.text === selectedValue);
            const correctAnswer = question.Answers.find(p=>p.isTrue === true);
            correct = correctAnswer.text;
            select = selectedAnswer.checked ? selectedValue : select;
            if (selectedAnswer.checked && answer.isTrue) {
                correctAnswers++;              
            }           
        });
        const newObj = {
            selectedValue: select, 
            correctAnswer: correct
        };
        array.push(newObj);
    });
}
async function submitPart7(data)
{
    const part7Questions = data.Questions.filter(question => question.type === "Part 7");
    part7Questions.forEach((question, index) => {
        question.SubQuestions.forEach((subQuestion, subIndex) => {
            let select = "Chưa trả lời";
            let correct;
            totalQuestions++;
            const selectedAnswers = document.querySelectorAll(`input[name="question${index + 1}_${subIndex + 1}"]`);
            selectedAnswers.forEach(selectedAnswer => {
                const selectedValue = selectedAnswer.value;
                const answer = subQuestion.Answers.find(p=>p.text===selectedValue);
                const correctAnswer = subQuestion.Answers.find(p=>p.isTrue === true);
                correct = correctAnswer.text
                select = selectedAnswer.checked ? selectedValue : select;
                if (selectedAnswer.checked && answer.isTrue) {
                    correctAnswers++;               
                }              
            });
            const newObj = {
                selectedValue: select, 
                correctAnswer: correct
            };
            array.push(newObj);
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