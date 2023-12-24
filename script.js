const gameBoard = document.getElementById('gameBoard');
const context = gameBoard.getContext('2d');
const scoreText = document.getElementById('score');


const WIDTH = gameBoard.width;
const HEIGHT = gameBoard.height;
const UNIT = 25;
let xVel = 25;
let yVel = 0;

let foodX;
let foodY;
let score = 0;
let active = true;
let started = false;

let snake = [
    { x: UNIT * 3, y: 0 },
    { x: UNIT * 2, y: 0 },
    { x: UNIT * 1, y: 0 },
    { x: 0, y: 0 },
];


window.addEventListener('keydown', keyPress);

startGame();
function startGame() {
    context.fillStyle = 'black';
    context.fillRect(0, 0, WIDTH, HEIGHT);
    createFood();
    displayFood();
    createSnake();
    // moveSnake();
    // createSnake();
}

function clearBoard() {
    context.fillStyle = 'black';
    context.fillRect(0, 0, WIDTH, HEIGHT);
}

function createFood() {
    foodX = Math.floor(Math.random() * WIDTH / UNIT) * UNIT;
    foodY = Math.floor(Math.random() * HEIGHT / UNIT) * UNIT;
    console.log(foodX);
    console.log(foodY);
}

function displayFood() {
    context.fillStyle = 'white';
    context.fillRect(foodX, foodY, UNIT, UNIT);
}

function createSnake() {
    snake.forEach((snakePart) => {
        context.fillStyle = 'blue';
        context.strokeStyle = 'white';
        context.fillRect(snakePart.x, snakePart.y, UNIT, UNIT);
        context.strokeRect(snakePart.x, snakePart.y, UNIT, UNIT);
    });
}


function moveSnake() {
    const head = { x: snake[0].x + xVel, y: snake[1].y + yVel };

    snake.unshift(head);
    if (snake[0].x == foodX && snake[0].y == foodY) {
        score += 1;
        scoreText.textContent = "score: " + score;
        createFood();
    }
    else snake.pop();
}

function nextTick() {
    if (active) {
        setTimeout(() => {
            clearBoard();
            displayFood();
            moveSnake();
            createSnake();

            checkGameover();
            nextTick();
        }, 200)
    }
    else {
        clearBoard();
        context.fillStyle = 'white';
        context.font = 'bold 50px serif';
        context.textAlign = 'center';
        context.fillText('Game Over !', WIDTH / 2, HEIGHT / 2);
    }
}

function keyPress(event) {
    if (!started) {
        started = true;
        nextTick();
    }

    const LEFT = 37;
    const RIGHT = 39;
    const UP = 38;
    const DOWN = 40;

    // console.log(event.keyCode);

    switch (true) {
        case (event.keyCode == LEFT && xVel != UNIT):
            xVel = -UNIT;
            yVel = 0;
            break;
        case (event.keyCode == RIGHT && yVel != -UNIT):
            xVel = UNIT;
            yVel = 0;
            break;
        case (event.keyCode == UP && yVel != UNIT):
            xVel = 0;
            yVel = -UNIT;
            break;
        case (event.keyCode == DOWN && yVel != -UNIT):
            xVel = 0;
            yVel = UNIT;
            break;
    }
}

function checkGameover() {
    switch (true) {
        case (snake[0].x < 0):
        case (snake[0].x >= WIDTH):
        case (snake[0].y < 0):
        case (snake[0].y >= HEIGHT):
            active = false;
            break;
    }

}