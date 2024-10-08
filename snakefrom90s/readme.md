This is the Snake Game in HTML, css and JS
### `README.md`

```markdown
# Snake Game

This project is a customizable Snake Game built using HTML, CSS, and JavaScript. It provides an engaging way to practice web development skills, with a focus on game mechanics, user interaction, and responsive design. This README will guide you through the game's features, the logic behind the implementation, and how you can extend or modify the game.

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [File Structure](#file-structure)
4. [How It Works](#how-it-works)
    - [HTML Structure](#html-structure)
    - [CSS Styling](#css-styling)
    - [JavaScript Logic](#javascript-logic)
5. [Game Logic Explained](#game-logic-explained)
    - [Snake Movement](#snake-movement)
    - [Food Generation](#food-generation)
    - [Collision Detection](#collision-detection)
    - [Score Display](#score-display)
    - [Responsive Design](#responsive-design)
6. [Getting Started](#getting-started)
7. [Extending the Game](#extending-the-game)
8. [Conclusion](#conclusion)

## Overview

The Snake Game is a classic arcade game where the player controls a snake that moves around the screen, eating food and growing in length. The objective is to score as many points as possible by eating food without running into the snake's own body or the borders (if borders are enabled).

This implementation adds modern web features such as customizable speed, colors, and border settings, making it a fun and interactive way to explore basic web development concepts.

## Features

- **Speed Control**: Select between Slow, Medium, and Fast speeds for the snake.
- **Color Customization**: Choose custom colors for the snake and food.
- **Border Toggle**: Enable or disable borders around the game area. If enabled, hitting the border ends the game.
- **Responsive Design**: The game automatically adjusts to fit the screen size with a 20px margin.
- **Score Display**: After the game ends, the player's score is displayed on the screen.
- **Countdown Timer**: A 3-second countdown appears before the game starts.

## File Structure

- `index.html`: Contains the HTML structure for the game.
- `styles.css`: Contains the CSS for styling the game.
- `script.js`: Contains the JavaScript code for game logic and interactivity.
- `README.md`: This file, detailing the game and its implementation.

## How It Works

### HTML Structure

The `index.html` file provides the structure for the game. Key elements include:

- **Canvas Element**: The `<canvas>` element is where the game is rendered. The snake, food, and any visual elements are drawn here.

```html
<canvas id="gameCanvas"></canvas>
```

- **Control Panel**: A set of controls allows users to customize the game before starting.

```html
<div id="bottomNav">
    <div class="nav-item">
        <label for="speedSelect">Speed</label>
        <select id="speedSelect">
            <option value="150">Slow</option>
            <option value="100" selected>Medium</option>
            <option value="50">Fast</option>
        </select>
    </div>
    <div class="nav-item">
        <label for="foodColor">Food</label>
        <input type="color" id="foodColor" value="#FF0000">
    </div>
    <div class="nav-item">
        <label for="snakeColor">Snake</label>
        <input type="color" id="snakeColor" value="#00FF00">
    </div>
    <div class="nav-item">
        <label for="borderToggle">Borders</label>
        <input type="checkbox" id="borderToggle">
    </div>
    <div class="nav-item">
        <button id="startButton" class="bg-blue-500 text-white font-bold py-2 px-4 rounded">Start</button>
    </div>
</div>
```

### CSS Styling

The `styles.css` file provides the styling for the game, ensuring a consistent and visually appealing interface. 

- **Body Styling**: The body is centered, and a dark background is applied for contrast with the game elements.

```css
body {
    margin: 0;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #000;
    font-family: Arial, sans-serif;
    color: #fff;
}
```

- **Canvas Styling**: The canvas element is styled to ensure it is properly sized and positioned.

```css
#gameCanvas {
    background-color: #111;
    position: relative;
    box-sizing: border-box;
}
```

- **Control Panel Styling**: The controls are arranged in a fixed position at the bottom of the screen.

```css
#bottomNav {
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: fixed;
    bottom: 50px;
    width: 400px;
    height: 100px;
    background-color: #fff;
    color: #000;
    border-radius: 20px;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    z-index: 10;
}
```

### JavaScript Logic

The `script.js` file contains the logic that drives the game. This includes handling user input, updating the game state, and rendering the game elements.

#### Key Classes and Functions

- **Snake Class**: Manages the snake's position, movement, growth, and collision detection.

```javascript
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
```

- **Food Class**: Manages the placement and drawing of the food on the canvas.

```javascript
class Food {
    constructor() {
        this.x;
        this.y;
        this.pickLocation();
    }

    pickLocation() {
        this.x = Math.floor(Math.random() * columns) * scale;
        this.y = Math.floor(Math.random

() * rows) * scale;
    }

    draw() {
        ctx.fillStyle = foodColor;
        ctx.beginPath();
        ctx.arc(this.x + scale / 2, this.y + scale / 2, scale / 2, 0, Math.PI * 2);
        ctx.fill();
    }
}
```

- **setup() Function**: Initializes the game by setting up the snake, food, and game loop.

```javascript
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
```

- **startGame() Function**: Handles the game's start sequence, including the countdown timer.

```javascript
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
```

## Game Logic Explained

### Snake Movement

The snake moves based on the direction chosen by the player using the arrow keys. The snake's position is updated each frame, and its tail follows the head.

- **changeDirection()**: Changes the snake's direction based on the player's input. The snake cannot move in the opposite direction of its current movement.

```javascript
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
```

### Food Generation

The food is generated at a random position on the grid. When the snake eats the food, a new piece of food is generated, and the snake grows in length.

- **pickLocation()**: Randomly places the food on the grid.

```javascript
pickLocation() {
    this.x = Math.floor(Math.random() * columns) * scale;
    this.y = Math.floor(Math.random() * rows) * scale;
}
```

### Collision Detection

Collision detection is crucial to determining when the game should end. The game checks if the snake has collided with its tail or the borders.

- **checkCollision()**: Checks if the snake has collided with itself or the borders (if enabled). If a collision is detected, the game ends.

```javascript
checkCollision() {
    for (let i = 0; i < this.tail.length; i++) {
        if (this.x === this.tail[i].x && this.y === this.tail[i].y) {
            this.showGameOver();
        }
    }
}
```

### Score Display

When the game ends, the player's score is displayed on the screen. The score is based on the number of food items the snake has eaten.

- **showGameOver()**: Displays the score and ends the game.

```javascript
showGameOver() {
    scoreDisplay.innerText = `Your Score is: ${this.total}`;
    scoreDisplay.style.display = 'block';
    bottomNav.style.display = 'flex';
    clearInterval(gameLoop);
    this.removeCanvasBorder();
}
```

### Responsive Design

The game is designed to be responsive, meaning it will adapt to different screen sizes. The canvas size is set dynamically based on the screen size, with a 20px margin.

```javascript
const scale = 20;
const margin = 20;
canvas.width = window.innerWidth - margin * 2;
canvas.height = window.innerHeight - margin * 2;

let rows = Math.floor(canvas.height / scale);
let columns = Math.floor(canvas.width / scale);
```

## Getting Started

1. **Clone the repository**:
   ```
   git clone <repository-url>
   ```
2. **Open `index.html`** in your browser to start playing the game.

3. **Customize the Game**:
   - Select the snake's speed.
   - Choose the snake and food colors.
   - Enable or disable borders.

4. **Start the Game**: Click the "Start" button to begin playing.

## Extending the Game

Here are some ideas for extending the game:

1. **Add Levels**: Create different levels with varying difficulty.
2. **High Score**: Implement a high score feature that stores the highest score achieved.
3. **Obstacles**: Add obstacles on the grid that the snake must avoid.
4. **Multiplayer Mode**: Implement a multiplayer mode where two players control different snakes.

## Conclusion

This Snake Game is a great way to practice and understand basic web development concepts. It provides a fun, interactive experience while demonstrating how HTML, CSS, and JavaScript can be used together to create a dynamic web application. By following this guide, you should now have a solid understanding of the game's structure, logic, and how to customize or extend it.
```
