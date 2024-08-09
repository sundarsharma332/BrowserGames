const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const welcomeScreen = document.getElementById('welcomeScreen');
const countdown = document.getElementById('countdown');
const scoreDisplay = document.getElementById('scoreDisplay');
const speedSelect = document.getElementById('speedSelect');
const foodColorInput = document.getElementById('foodColor');
const snakeColorInput = document.getElementById('snakeColor');
const borderToggle = document.getElementById('borderToggle');
const startButton = document.getElementById('startButton');
const bottomNav = document.getElementById('bottomNav');
let gameLoop;
let snakeColor = snakeColorInput.value;
let foodColor = foodColorInput.value;
let speed = parseInt(speedSelect.value);
let bordersOn = borderToggle.checked;

// Set up canvas size with 20px margin from all sides
const scale = 20;
const margin = 20;
canvas.width = window.innerWidth - margin * 2;
canvas.height = window.innerHeight - margin * 2;

let rows = Math.floor(canvas.height / scale);
let columns = Math.floor(canvas.width / scale);

let snake;
let food;

class Snake {
    constructor() {
        this.x = Math.floor(columns / 2) * scale;
        this.y = Math.floor(rows / 2) * scale;
        this.xSpeed = scale;
        this.ySpeed = 0;
        this.total = 0;
        this.tail = [];
    }

    draw() {
        ctx.fillStyle = snakeColor;
        for (let i = 0; i < this.tail.length; i++) {
            ctx.fillRect(this.tail[i].x, this.tail[i].y, scale, scale);
        }

        ctx.fillRect(this.x, this.y, scale, scale);
    }

    update() {
        for (let i = 0; i < this.tail.length - 1; i++) {
            this.tail[i] = this.tail[i + 1];
        }

        if (this.total >= 1) {
            this.tail[this.total - 1] = { x: this.x, y: this.y };
        }

        this.x += this.xSpeed;
        this.y += this.ySpeed;

        if (bordersOn) {
            // If borders are on, end the game if the snake hits the border
            if (this.x >= canvas.width || this.y >= canvas.height || this.x < 0 || this.y < 0) {
                this.showGameOver();
            }
        } else {
            // If borders are off, snake wraps around the screen
            if (this.x >= canvas.width) this.x = 0;
            if (this.y >= canvas.height) this.y = 0;
            if (this.x < 0) this.x = canvas.width - scale;
            if (this.y < 0) this.y = canvas.height - scale;
        }
    }

    changeDirection(direction) {
        switch (direction) {
            case 'Up':
                if (this.ySpeed === 0) {
                    this.xSpeed = 0;
                    this.ySpeed = -scale;
                }
                break;
            case 'Down':
                if (this.ySpeed === 0) {
                    this.xSpeed = 0;
                    this.ySpeed = scale;
                }
                break;
            case 'Left':
                if (this.xSpeed === 0) {
                    this.xSpeed = -scale;
                    this.ySpeed = 0;
                }
                break;
            case 'Right':
                if (this.xSpeed === 0) {
                    this.xSpeed = scale;
                    this.ySpeed = 0;
                }
                break;
        }
    }

    eat(food) {
        if (this.x === food.x && this.y === food.y) {
            this.total++;
            return true;
        }
        return false;
    }

    checkCollision() {
        for (let i = 0; i < this.tail.length; i++) {
            if (this.x === this.tail[i].x && this.y === this.tail[i].y) {
                this.showGameOver();
            }
        }
    }

    showGameOver() {
        scoreDisplay.innerText = `Your Score is: ${this.total}`;
        scoreDisplay.style.display = 'block';
        bottomNav.style.display = 'flex';
        clearInterval(gameLoop);
        this.removeCanvasBorder();
    }

    removeCanvasBorder() {
        canvas.style.border = 'none';
    }
}

class Food {
    constructor() {
        this.x;
        this.y;
        this.pickLocation();
    }

    pickLocation() {
        this.x = Math.floor(Math.random() * columns) * scale;
        this.y = Math.floor(Math.random() * rows) * scale;
    }

    draw() {
        ctx.fillStyle = foodColor;
        ctx.beginPath();
        ctx.arc(this.x + scale / 2, this.y + scale / 2, scale / 2, 0, Math.PI * 2);
        ctx.fill();
    }
}

function setup() {
    snake = new Snake();
    food = new Food();
    scoreDisplay.style.display = 'none';
    countdown.style.display = 'none';
    bottomNav.style.display = 'none';
    gameLoop = window.setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        food.draw();
        snake.update();
        snake.draw();

        if (snake.eat(food)) {
            food.pickLocation();
        }

        snake.checkCollision();
    }, speed);

    if (bordersOn) {
        canvas.style.border = '2px solid white'; // Add border to the canvas
    } else {
        canvas.style.border = 'none'; // Remove border if borders are off
    }
}

function startGame() {
    snakeColor = snakeColorInput.value;
    foodColor = foodColorInput.value;
    speed = parseInt(speedSelect.value);
    bordersOn = borderToggle.checked;

    scoreDisplay.style.display = 'none';  // Hide the score display
    welcomeScreen.style.display = 'none';
    canvas.style.display = 'block';

    let count = 3;
    countdown.innerText = count;
    countdown.style.display = 'block';

    const countdownInterval = setInterval(() => {
        count--;
        countdown.innerText = count;

        if (count === 0) {
            clearInterval(countdownInterval);
            countdown.style.display = 'none';
            setup();
        }
    }, 1000);
}

startButton.addEventListener('click', startGame);

window.addEventListener('keydown', (event) => {
    const direction = event.key.replace('Arrow', '');
    if (canvas.style.display === 'block') {
        snake.changeDirection(direction);
    }
});
