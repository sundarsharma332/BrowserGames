document.addEventListener("DOMContentLoaded", () => {
    const gameBox = document.getElementById("gameBox");
    const timerDisplay = document.getElementById("timer");
    const reflexScoreDisplay = document.getElementById("reflexScore");
    const startPopup = document.getElementById("startPopup");
    const endPopup = document.getElementById("endPopup");
    const overlay = document.getElementById("overlay");
    const startButton = document.getElementById("startButton");
    const restartButton = document.getElementById("restartButton");
    const timeInput = document.getElementById("timeInput");
    const themeToggle = document.getElementById("themeToggle");
    const finalScoreDisplay = document.getElementById("finalScore");
    const reflexesLogDisplay = document.getElementById("reflexesLog");

    let timer;
    let ballCreationTime;
    let bestReflexTime = Infinity;
    let reflexesLog = [];

    // Function to create a ball
    function createBall() {
        const ball = document.createElement("div");
        ball.classList.add("ball");
        const { x, y } = getRandomPosition();
        ball.style.left = `${x}px`;
        ball.style.top = `${y}px`;
        ball.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
        ballCreationTime = new Date().getTime();

        ball.addEventListener("click", () => {
            const clickTime = new Date().getTime();
            const reactionTime = clickTime - ballCreationTime;
            reflexesLog.push(reactionTime);
            if (reactionTime < bestReflexTime) {
                bestReflexTime = reactionTime;
                reflexScoreDisplay.textContent = `Best Reflex: ${bestReflexTime} ms`;
            }
            ball.classList.add("disappear");
            setTimeout(() => {
                if (gameBox.contains(ball)) {
                    gameBox.removeChild(ball);
                }
            }, reactionTime / 2);
        });

        gameBox.appendChild(ball);

        // Ball disappears after 3 seconds if not clicked
        setTimeout(() => {
            if (gameBox.contains(ball)) {
                gameBox.removeChild(ball);
            }
        }, 3000);
    }

    // Function to generate random positions for balls
    function getRandomPosition() {
        const x = Math.random() * (gameBox.clientWidth - 50);
        const y = Math.random() * (gameBox.clientHeight - 50);
        return { x, y };
    }

    // Function to start the game timer
    function startTimer() {
        const interval = setInterval(() => {
            timer--;
            timerDisplay.textContent = `Timer: ${timer}`;
            if (timer <= 0) {
                clearInterval(interval);
                endGame();
            }
        }, 1000);
    }

    // Function to end the game
    function endGame() {
        finalScoreDisplay.textContent = `Your best reflex time is: ${bestReflexTime} ms`;
        reflexesLogDisplay.innerHTML = reflexesLog.map(time => `<li>${time} ms</li>`).join('');
        startPopup.style.display = "none";
        endPopup.style.display = "block";
        overlay.style.display = "block";
        bestReflexTime = Infinity;
        reflexesLog = [];
        reflexScoreDisplay.textContent = `Best Reflex: N/A`;
    }

    // Function to start the game
    function startGame() {
        timer = parseInt(timeInput.value, 10);
        timerDisplay.textContent = `Timer: ${timer}`;
        startPopup.style.display = "none";
        endPopup.style.display = "none";
        overlay.style.display = "none";
        startTimer();
        createBall(); // Create the first ball immediately
        setInterval(createBall, 2000); // Continue creating balls every 2 seconds
    }

    // Event listeners
    startButton.addEventListener("click", () => {
        const theme = themeToggle.checked ? "dark" : "light";
        document.body.setAttribute("data-theme", theme);
        startGame();
    });

    restartButton.addEventListener("click", () => {
        startPopup.style.display = "block";
        endPopup.style.display = "none";
    });

    // Show start popup initially
    startPopup.style.display = "block";
    overlay.style.display = "block";
});
