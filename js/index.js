// Récuperation du contexte des canvas
var canvas = document.getElementById("player1");
var ctx = canvas.getContext("2d");
var canvas2 = document.getElementById("player2");
var ctx2 = canvas2.getContext("2d");
canvas2.style.visibility = "hidden";
var avatar2 = document.querySelector("#player2-container .avatar");
avatar2.style.visibility = "hidden";

const X = canvas.width;
const Y = canvas.height;
const video = document.getElementById("video");
const arrowWidth = 4 * X / 19;
const arrowMargin = X / 19;


// Chargement des images
var movingArrowsImages = ["arrow-down", "arrow-left", "arrow-up", "arrow-right"].map(name => createImage(name));
var staticArrowsImages = ["arrow-down-faded", "arrow-left-faded", "arrow-up-faded", "arrow-right-faded"].map(name => createImage(name));

function createImage(name) {
    var image = new Image();
    image.src = `images/${name}.png`;
    return image
}

// Définition de la class "arrow"
class Arrow {
    constructor(direction, position) {
        this.direction = direction;
        this.y = Y + position * (arrowWidth + arrowMargin);
    }
    move() {
        this.y = this.y - 4;
        ctx.drawImage(movingArrowsImages[this.direction], this.direction * (arrowWidth + arrowMargin), this.y, arrowWidth, arrowWidth);
        ctx2.drawImage(movingArrowsImages[this.direction], this.direction * (arrowWidth + arrowMargin), this.y, arrowWidth, arrowWidth);
    }
}

// Création des fleches de la partie en aleatoire
let arrows = [];
for (var i = 0; i < 1000; i++) {
    let arrow = new Arrow(Math.floor(Math.random() * movingArrowsImages.length), i);
    arrows.push(arrow);
}

// Gestion du start/stop
var startButton = document.getElementById("start-button");
startButton.onclick = startStop;
var animationFrameId;

function startStop() {
    if (startButton.innerHTML == "Stop") {
        startButton.innerHTML = "Start";
        video.pause();
        window.cancelAnimationFrame(animationFrameId);
    } else {
        startButton.innerHTML = "Stop";
        video.play();
        updateCanvas();
    }
}

function updateCanvas() {
    ctx.clearRect(0, 0, X, Y);
    ctx2.clearRect(0, 0, X, Y);
    drawArrowFixed(ctx);
    drawArrowFixed(ctx2);
    arrows.forEach(arrow => arrow.move());
    animationFrameId = requestAnimationFrame(updateCanvas);
}

function drawArrowFixed(context) {
    context.drawImage(staticArrowsImages[0], 0, 0, arrowWidth, arrowWidth);
    context.drawImage(staticArrowsImages[1], (arrowWidth + arrowMargin), 0, arrowWidth, arrowWidth);
    context.drawImage(staticArrowsImages[2], 2 * (arrowWidth + arrowMargin), 0, arrowWidth, arrowWidth);
    context.drawImage(staticArrowsImages[3], 3 * (arrowWidth + arrowMargin), 0, arrowWidth, arrowWidth);
}

document.body.addEventListener("keydown", event => {
    progress1 = document.querySelector('#player1-container progress');
    handleKey(event, ['ArrowDown', 'ArrowLeft', 'ArrowUp', 'ArrowRight'], progress1);
    progress2 = document.querySelector('#player2-container progress');
    handleKey(event, ['KeyS', 'KeyQ', 'KeyZ', 'KeyD'], progress2);
});

function handleKey(event, keys, progressBar) {
    var currentArrow = arrows.filter(a => a.y > 0 && a.y < arrowWidth)[0];
    var score = progressBar.value;
    if (currentArrow && (match(0, currentArrow, keys[0], event)
        || match(1, currentArrow, keys[1], event)
        || match(2, currentArrow, keys[2], event)
        || match(3, currentArrow, keys[3], event))) {
        if (currentArrow.y < 10) {
            score = score + 50;
        } else if (currentArrow.y < 30) {
            score = score + 30;
        }
        else {
            score = score + 10;
        }
    }
    progressBar.value = score;
}

function match(direction, currentArrow, keyCode, event) {
    return currentArrow.direction === direction && event.code === keyCode;
}

//Gestion du second joueur

var players = document.getElementById("2-Player-button");
players.onclick = switchPlayerMode;
function switchPlayerMode() {
    if (players.innerHTML == "1 Player") {
        players.innerHTML = "2 Players";
        canvas2.style.visibility = "visible";
        avatar2.style.visibility ="visible";
    }
    else {
        players.innerHTML = "1 Player";
        canvas2.style.visibility = "hidden";
        avatar2.style.visibility ="hidden";
    }
}

