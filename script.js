        const quizData = [
            { question: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyperlink and Text Markup Language", "Home Tool Markup Language"], answer: "Hyper Text Markup Language" },
            { question: "Which CSS property is used for changing text color?", options: ["background-color", "text-color", "color", "font-color"], answer: "color" },
            { question: "What is the correct syntax for linking an external JavaScript file?", options: ["<script href='script.js'>", "<script name='script.js'>", "<script src='script.js'>", "<script file='script.js'>"], answer: "<script src='script.js'>" },
            { question: "Which tag is used to create a hyperlink?", options: ["<a>", "<link>", "<h1>", "<href>"], answer: "<a>" },
            { question: "What does CSS stand for?", options: ["Cascading Style Sheets", "Creative Style System", "Computer Styled Sections", "Colorful Styling Sheets"], answer: "Cascading Style Sheets" }
        ];

        const questionEl = document.getElementById("question");
        const optionsEl = document.getElementById("options");
        const nextBtn = document.getElementById("next-btn");
        const restartBtn = document.getElementById("restart-btn");
        const progressBar = document.getElementById("progress-bar");
        const startScreen = document.getElementById("start-screen");
        const quizScreen = document.getElementById("quiz-screen");
        const usernameInput = document.getElementById("username");
        const startBtn = document.getElementById("start-btn");

        let currentQuestionIndex = 0;
        let score = 0;
        let username = "";

        startBtn.addEventListener("click", () => {
            username = usernameInput.value.trim();
            if (username === "") {
                alert("Please enter your name!");
                return;
            }
            startScreen.style.display = "none";
            quizScreen.style.display = "block";
            loadQuestion();
        });

        function loadQuestion() {
            resetState();
            const currentQuestion = quizData[currentQuestionIndex];
            questionEl.innerText = currentQuestion.question;
            progressBar.style.width = `${((currentQuestionIndex + 1) / quizData.length) * 100}%`;

            currentQuestion.options.forEach(option => {
                const button = document.createElement("button");
                button.innerText = option;
                button.addEventListener("click", () => selectAnswer(button, currentQuestion.answer));
                optionsEl.appendChild(button);
            });
        }

        function selectAnswer(button, correctAnswer) {
            const isCorrect = button.innerText === correctAnswer;
            button.classList.add(isCorrect ? "correct" : "wrong");
            if (isCorrect) score++;

            document.querySelectorAll(".options button").forEach(btn => {
                btn.disabled = true;
                if (btn.innerText === correctAnswer) btn.classList.add("correct");
            });

            nextBtn.style.display = "block";
        }

        function resetState() {
            nextBtn.style.display = "none";
            restartBtn.style.display = "none";
            optionsEl.innerHTML = "";
        }

        nextBtn.addEventListener("click", () => {
            currentQuestionIndex++;
            if (currentQuestionIndex < quizData.length) {
                loadQuestion();
            } else {
                questionEl.innerText = `Great job, ${username}! 🎉 Your Score: ${score}/${quizData.length}`;
                optionsEl.innerHTML = "";
                nextBtn.style.display = "none";
                restartBtn.style.display = "block";
            }
        });

        function restartQuiz() {
            currentQuestionIndex = 0;
            score = 0;
            startScreen.style.display = "block";
            quizScreen.style.display = "none";
        }

        function closeQuiz() {
            startScreen.style.display = "block";
            quizScreen.style.display = "none";
            usernameInput.value = "";
        }