document.addEventListener('DOMContentLoaded', () => {
    let questionBank = [];
    let currentQuestionIndex = 0;
    let shuffledQuestions = [];
    let timer;
    const totalQuestions = 50;
    const quizDuration = 30 * 60; // 30 minutes in seconds

    // Fetch questions from the JSON file
    fetch('questionBank.json')
        .then(response => response.json())
        .then(data => {
            questionBank = data;
            console.log('Fetched questions:', questionBank); 
            startQuiz();
        })
        .catch(error => console.error('Error fetching questions:', error));

    function startQuiz() {
        shuffledQuestions = shuffleArray(questionBank).slice(0, totalQuestions);
        console.log('Shuffled questions:', shuffledQuestions); 
        displayQuestion();
        startTimer();
    }

    function displayQuestion() {
        if (currentQuestionIndex >= totalQuestions) {
            endQuiz();
            return;
        }

        const question = shuffledQuestions[currentQuestionIndex];
        
        if (!question) {
            console.error('Question is undefined at index:', currentQuestionIndex);
            endQuiz();
            return;
        }
        
        document.getElementById('question').innerText = question.question;
        document.getElementById('options').innerHTML = question.options.map((option, index) => 
            `<button class="option" data-index="${index}">${option}</button>`
        ).join('');

        document.querySelectorAll('.option').forEach(button => 
            button.addEventListener('click', () => selectOption(button.dataset.index))
        );

        document.getElementById('next-btn').style.display = 'block';
        document.getElementById('submit-btn').style.display = 'none';
    }

    function selectOption(selectedIndex) {
        // Logic to record selected answer can be added here

        // Show 'Submit' button after selecting an option
        document.getElementById('next-btn').style.display = 'block';
    }

    document.getElementById('next-btn').addEventListener('click', () => {
        currentQuestionIndex++;
        
        if (currentQuestionIndex < totalQuestions) {
            displayQuestion();
        } else {
            endQuiz();
        }
    });

    function startTimer() {
        let timeRemaining = quizDuration;
        timer = setInterval(() => {
            const minutes = Math.floor(timeRemaining / 60);
            const seconds = timeRemaining % 60;
            document.getElementById('timer').innerText = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
            timeRemaining--;

            if (timeRemaining < 0) {
                clearInterval(timer);
                endQuiz();
            }
        }, 1000);
    }

    function endQuiz() {
        document.getElementById('question-container').innerHTML = '<h2>Quiz Completed</h2>';
        document.getElementById('next-btn').style.display = 'none';
        document.getElementById('submit-btn').style.display = 'none';
    }

    function shuffleArray(array) {
        let currentIndex = array.length, randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
        }

        return array;
    }
});
