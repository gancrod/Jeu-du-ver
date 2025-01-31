const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("score");

canvas.width = 400;
canvas.height = 400;

const boxSize = 20; 
let snake = [{ x: 200, y: 200 }]; 
let direction = "RIGHT"; 
let fruit = getRandomPosition(); 
let score = 0;


function getRandomPosition() {
    return {
        x: Math.floor(Math.random() * (canvas.width / boxSize)) * boxSize,
        y: Math.floor(Math.random() * (canvas.height / boxSize)) * boxSize
    };
}


document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
});


function drawSnake() {
    ctx.fillStyle = "green";
    snake.forEach((segment, index) => {
        ctx.fillRect(segment.x, segment.y, boxSize, boxSize);
        ctx.strokeStyle = "black";
        ctx.strokeRect(segment.x, segment.y, boxSize, boxSize);
    });
}


function drawFruit() {
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(fruit.x + boxSize / 2, fruit.y + boxSize / 2, boxSize / 2, 0, Math.PI * 2);
    ctx.fill();
}


function updateSnake() {
    let head = { ...snake[0] };

    if (direction === "UP") head.y -= boxSize;
    if (direction === "DOWN") head.y += boxSize;
    if (direction === "LEFT") head.x -= boxSize;
    if (direction === "RIGHT") head.x += boxSize;

    
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        alert("💀 Fin du jeu! Votre évaluation : " + score);
        document.location.reload();
    }

    
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            alert("💀 Fin du jeu! Votre point :" + score);
            document.location.reload();
        }
    }

    snake.unshift(head);

    
    if (head.x === fruit.x && head.y === fruit.y) {
        score += 10;
        scoreDisplay.textContent = "Point: " + score;
        fruit = getRandomPosition();
    } else {
        snake.pop();
    }
}


function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFruit();
    drawSnake();
    updateSnake();
    setTimeout(gameLoop, 150); 
}


gameLoop();

