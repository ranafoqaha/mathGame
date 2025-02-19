let score = 0;
let num1, num2, correctAnswer, operation;
let level = 1;
let timer = 600; // 10 minutes in seconds
let timerInterval;

document.getElementById("startGame").addEventListener("click", function() {
    document.getElementById("startGame").style.display = "none";
    document.getElementById("gameContent").style.display = "block";
    startTimer();
    generateQuestion();
});

function startTimer() {
    let timerElement = document.getElementById("timer");

    timerInterval = setInterval(() => {
        let minutes = Math.floor(timer / 60);
        let seconds = timer % 60;
        timerElement.innerText = `الوقت المتبقي: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        if (timer === 0) {
            clearInterval(timerInterval);
            nextLevel();
        }
        timer--;
    }, 1000);
}

function generateQuestion() {
    if (level === 1) {
        num1 = Math.floor(Math.random() * 12) + 1; // 1-12
        num2 = Math.floor(Math.random() * 12) + 1;
    } else if (level === 2) {
        num1 = Math.floor(Math.random() * 90) + 10; // 10-99
        num2 = Math.floor(Math.random() * 12) + 1; // 1-12
    } else {
        num1 = Math.floor(Math.random() * 900) + 100; // 100-999
        num2 = Math.floor(Math.random() * 90) + 10; // 10-99
    }

    if (Math.random() > 0.5) {
        operation = "×";
        correctAnswer = num1 * num2;
    } else {
        operation = "÷";
        correctAnswer = Math.floor(num1 / num2); // Round down for whole number answers
        num1 = correctAnswer * num2; // Adjust to ensure division works
    }

    document.getElementById("question").innerText = `ما هو ${num1} ${operation} ${num2}?`;
}

document.getElementById("submit").addEventListener("click", function() {
    let userAnswer = parseInt(document.getElementById("answer").value);

    if (userAnswer === correctAnswer) {
        score++;
        document.getElementById("feedback").innerText = "✅ إجابة صحيحة!";
    } else {
        document.getElementById("feedback").innerText = `❌ إجابة خاطئة. الإجابة الصحيحة هي ${correctAnswer}.`;
    }

    document.getElementById("score").innerText = score;
    document.getElementById("answer").value = "";
    generateQuestion();
});

function nextLevel() {
    if (level < 3) {
        level++;
        timer = 600; // Reset 10 minutes
        document.getElementById("level").innerText = `المستوى: ${level}`;
        startTimer();
        generateQuestion();
    } else {
        document.getElementById("game").innerHTML = `<h2>🎉 انتهت اللعبة! لقد حصلت على ${score} نقطة 🎉</h2>`;
    }
}
