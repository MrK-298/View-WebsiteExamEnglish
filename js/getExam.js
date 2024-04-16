function saveSelectedAnswer(questionId, selectedAnswer) {
    localStorage.setItem(questionId, selectedAnswer);
}
function setSelectedAnswersFromPart5() {
    var questionElements = document.querySelectorAll('.question');
    questionElements.forEach(function(questionElement) {
        var questionId = questionElement.getAttribute('id');
        const button = document.querySelector(`#question-list button[id="${questionId}"]`);
        var selectedAnswer = localStorage.getItem(questionId);
        if (selectedAnswer !== null) {
            var answerElement = questionElement.querySelector('input[type="radio"][value="' + selectedAnswer + '"]');
            if (answerElement !== null) {
                answerElement.checked = true;
                button.setAttribute("style","background-color:aqua");
            }
        }
    });
}
function setSelectedAnswersFromPart7() {
    var questionElements = document.querySelectorAll('.sub-question');
    questionElements.forEach(function(questionElement) {
        var questionId = questionElement.getAttribute('id');
        const button = document.querySelector(`#question-list button[id="${questionId}"]`);
        var selectedAnswer = localStorage.getItem(questionId);
        if (selectedAnswer !== null) {
            var answerElement = questionElement.querySelector('input[type="radio"][value="' + selectedAnswer + '"]');
            if (answerElement !== null) {
                answerElement.checked = true;
                button.setAttribute("style","background-color:aqua");
            }
        }
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
window.addEventListener('load', function() {
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
    .then(data => {
      const questionListDiv = document.getElementById('question-list');
      const listitem = document.createElement('ul');
      let count = 1;
      //part5
      const part5Questions = data.Questions.filter(question => question.type === "Part 5");
      part5Questions.forEach((question, index) => {
          const questionDiv = document.createElement('div');
          const questionId = `${index + 1}`;
          questionDiv.id = `${questionId}`;
          questionDiv.classList.add('question');
          questionDiv.innerHTML = `
              <p>${count}. ${question.questionText}</p>
              <div class="options">
              ${question.Answers.map(answer => `
                  <label><input type="radio" name="question${questionId}" id="${questionId}" value="${answer.text}">${answer.text}</label>
              `).join('')}
          </div>
          `;  
          //sự kiện button
          const subQuestionLi = document.createElement('li'); 
          const questionButton = document.createElement('button');
          questionButton.setAttribute("id",questionId)
          questionButton.textContent = count++;
          questionButton.addEventListener('click', () => {
              document.getElementById('part5').setAttribute("style","display:block");
              document.getElementById('part7').setAttribute("style","display:none");
              document.getElementById('next').setAttribute("style","display:block");
              document.getElementById('previous').setAttribute("style","display:none");
              const subQuestionElement = document.getElementById(questionId);
              subQuestionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          });
          subQuestionLi.appendChild(questionButton)
          listitem.appendChild(subQuestionLi);     
          document.getElementById('part5').appendChild(questionDiv);
      });
      questionListDiv.appendChild(listitem);
      //part 7
      const part7Questions = data.Questions.filter(question => question.type === "Part 7");
      part7Questions.forEach((question, index) => {
          const questionDiv = document.createElement('div');
          questionDiv.id = `Question${index + 1}`;
          questionDiv.classList.add('question');
          questionDiv.innerHTML = `
              <p>${question.questionText}</p>
              <div class="image-container">
                  <img src="${question.imageUrl}">  
              </div>
          `;
          question.SubQuestions.forEach((subQuestion, subIndex) => {                
              const subQuestionId = `${index + 1}_${subIndex + 1}`;                          
              const subQuestionDiv = document.createElement('div');
              subQuestionDiv.classList.add('sub-question');
              subQuestionDiv.setAttribute('id',subQuestionId);
              subQuestionDiv.innerHTML = `
                  <p>${subQuestion.text}</p>
                  <div class="options">
                      ${subQuestion.Answers.map(answer => `
                          <label><input type="radio" name="question${subQuestionId}" id="${subQuestionId}" value="${answer.text}">${answer.text}</label>
                      `).join('')}
                  </div>
              `;
              //sự kiện button
              const subQuestionLi = document.createElement('li'); 
              const subQuestionButton = document.createElement('button');
              subQuestionButton.setAttribute("id",subQuestionId);
              subQuestionButton.textContent = count++;
              subQuestionButton.addEventListener('click', () => {
                  document.getElementById('part5').setAttribute("style","display:none");
                  document.getElementById('part7').setAttribute("style","display:block");
                  document.getElementById('previous').setAttribute("style","display:block");
                  document.getElementById('next').setAttribute("style","display:none");
                  const subQuestionElement = document.getElementById(subQuestionId);
                  subQuestionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
              });
              subQuestionLi.appendChild(subQuestionButton)
              listitem.appendChild(subQuestionLi);
              questionDiv.appendChild(subQuestionDiv);               
          });      
          document.getElementById('part7').appendChild(questionDiv);
      });           
      questionListDiv.appendChild(listitem);
      const inputElements = document.querySelectorAll('#quiz-container input[type="radio"]');
      inputElements.forEach(input => {
          input.addEventListener('change', () => {
              const subQuestionId = input.getAttribute("id");
              const selectedAnswer = input.value;
              const button = document.querySelector(`#question-list button[id="${subQuestionId}"]`);
              saveSelectedAnswer(subQuestionId,selectedAnswer);
              if (button) {
                  button.setAttribute("style","background-color:aqua");
              }
          });
      });
      if(localStorage.length !== 0) {
        setSelectedAnswersFromPart5();
        setSelectedAnswersFromPart7();
      }
    })
    .catch(error => {
      this.alert("Hãy đăng nhập để làm bài")
    });
});