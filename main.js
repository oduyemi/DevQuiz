let currentQuestion = 0;
const totalQuestions = 50;
const userAnswers = new Array(totalQuestions);

function loadQuestion(index) {
    // Logic to load the question based on index.
    // Example: Update the question text, and options dynamically.
    // This is a placeholder to indicate where you would load each question.
}

function nextQuestion() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');
    if (selectedOption) {
        userAnswers[currentQuestion] = selectedOption.value;
        currentQuestion++;
        if (currentQuestion < totalQuestions) {
            loadQuestion(currentQuestion);
        } else {
            submitQuiz();
        }
    } else {
        alert("Please select an answer before proceeding.");
    }
}

function submitQuiz() {
    // Logic to handle the quiz submission
    // This could be sending the answers to a server or processing the result locally.
    console.log(userAnswers);
    alert("Quiz submitted!");
}
