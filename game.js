var gc = document.getElementById("gc");
var g = gc.getContext("2d");

var size = 320;

gc.width = size;
gc.height = size;

var cellSize = size / 20;

document.onkeypress = okp;
var direction = 0;


function Sprite(x, y) {
    this.x = x;
    this.y = y;
    this.color = "#fff";

    this.render = function() {
        g.fillStyle = this.color;
        g.fillRect(this.x * cellSize + 1, this.y * cellSize + 1, cellSize - 2, cellSize - 2);
    }
}

var snake = new Sprite(5, 5);
var snakes = [];
snakes.push(snake);
addTail();
addTail();

var fruit = new Sprite(0, 0);
fruit.color = "#f00";
spawnFruit();

function addTail() {
    snakes.push(new Sprite(snake.x, snake.y));
}

function spawnFruit() {
    var xx = Math.floor(Math.random() * size / cellSize);
    var yy = Math.floor(Math.random() * size / cellSize);
    fruit.x = xx;
    fruit.y = yy;
}

function render() {
    g.fillStyle = "#000";
    g.fillRect(0, 0, size, size);

    for (var i = 0; i < snakes.length; i++) {
        snakes[i].render();
    }

    fruit.render();




    for (var i = snakes.length - 1; i > 0; i--) {
        snakes[i].x = snakes[i - 1].x;
        snakes[i].y = snakes[i - 1].y;
    }

    switch (direction) {
        case 0:
            snake.x--;
            break;
        case 1:
            snake.y--;
            break;
        case 2:
            snake.x++;
            break;
        case 3:
            snake.y++;
            break;
    }

    if (snake.x < 0) {
        reset();
    }
    if (snake.x > size / cellSize - 1) {
        reset();
    }
    if (snake.y < 0) {
        reset();
    }
    if (snake.y > size / cellSize - 1) {
        reset();
    }

    for (var i = 1; i < snakes.length; i++) {
        if (snake.x == snakes[i].x && snake.y == snakes[i].y) {
            reset();
        }
    }

    if (snake.x == fruit.x && snake.y == fruit.y) {
        spawnFruit();
        addTail();
    }

    setTimeout(render, 250);
}

render();

function okp(e) {
    switch (e.keyCode) {
        case 37:
            direction = 0;
            break;
        case 38:
            direction = 1;
            break;
        case 39:
            direction = 2;
            break;
        case 40:
            direction = 3;
            break;
    }
}

function reset() {
    spawnFruit();
    snake.x = snake.y = 5;
    snakes.splice(1, snakes.length);
    addTail();
    addTail();
}