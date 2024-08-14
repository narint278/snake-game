const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const startBtn = document.getElementById("startBtn");
const restartBtn = document.getElementById("restartBtn");
const scoreDisplay = document.getElementById("score");
const speedDisplay = document.getElementById("speed");

const gridSize = 20;
const canvasSize = 400;
canvas.width = canvasSize;
canvas.height = canvasSize;

let snake = [
    { x: gridSize * 5, y: gridSize * 5 },
    { x: gridSize * 4, y: gridSize * 5 },
    { x: gridSize * 3, y: gridSize * 5 }
];
let direction = { x: gridSize, y: 0 };
let food = { x: gridSize * 10, y: gridSize * 10 };
let score = 0;
let speed = 5;
let gameInterval;

function drawSnake() {
    snake.forEach(segment => {
        ctx.fillStyle = "#2ecc71";
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
        ctx.strokeStyle = "#27ae60";
        ctx.strokeRect(segment.x, segment.y, gridSize, gridSize);
    });
}

function drawFood() {
    ctx.fillStyle = "#e74c3c";
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
    ctx.strokeStyle = "#c0392b";
    ctx.strokeRect(food.x, food.y, gridSize, gridSize);
}

function moveSnake() {
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score += 10;
        scoreDisplay.textContent = score;
        placeFood();
    } else {
        snake.pop();
    }

    if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize || checkCollision()) {
        clearInterval(gameInterval);
        alert("Game Over!");
    }
}

function placeFood() {
    food.x = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
    food.y = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
}

function checkCollision() {
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    return false;
}

function changeDirection(event) {
    const keyPressed = event.keyCode;
    if (keyPressed === 37 && direction.x === 0) {
        direction = { x: -gridSize, y: 0 };
    } else if (keyPressed === 38 && direction.y === 0) {
        direction = { x: 0, y: -gridSize };
    } else if (keyPressed === 39 && direction.x === 0) {
        direction = { x: gridSize, y: 0 };
    } else if (keyPressed === 40 && direction.y === 0) {
        direction = { x: 0, y: gridSize };
    }
}

function startGame() {
    snake = [
        { x: gridSize * 5, y: gridSize * 5 },
        { x: gridSize * 4, y: gridSize * 5 },
        { x: gridSize * 3, y: gridSize * 5 }
    ];
    direction = { x: gridSize, y: 0 };
    score = 0;
    scoreDisplay.textContent = score;
    placeFood();
    gameInterval = setInterval(() => {
        ctx.clearRect(0, 0, canvasSize, canvasSize);
        drawFood();
        moveSnake();
        drawSnake();
    }, 1000 / speed);
}

startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", startGame);
window.addEventListener("keydown", changeDirection);
