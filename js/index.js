// Récuperation du contexte du canvas
var canvas = document.getElementById("player1");
var ctx = canvas.getContext("2d");
const X = canvas.width;
const Y = canvas.height;
const video = document.getElementById("video");

// Chargement des images
var movingArrowsImages = ["arrow-down", "arrow-left", "arrow-up", "arrow-right"].map(name => createImage(name));
var staticArrowsImages = ["arrow-down-faded", "arrow-left-faded", "arrow-up-faded", "arrow-right-faded"].map(name => createImage(name));

function createImage(name) {
    var image = new Image();
    image.src = `images/${name}.png`;
    return image
}

// Démarrage du jeu lorsque toutes les images sont "loaded"
var images = movingArrowsImages.concat(staticArrowsImages);
var imageCount = images.length;
var imagesLoaded = 0;

for (var i = 0; i < imageCount; i++) {
    images[i].onload = function () {
        imagesLoaded++;
        if (imagesLoaded == imageCount) {
            // updateCanvas();
        }
    }
}

//Définition de la class "arrow"
class Arrow {
    constructor(direction, position) {
        this.direction = direction;
        this.y = Y + position * 100;
    }
    move() {
        this.y = this.y - 4;
        ctx.drawImage(movingArrowsImages[this.direction], this.direction * 100, this.y, 80, 80);
    }
}

//création des fleches de la partie en aleatoire
let arrows = [];
for (var i = 0; i < 1000; i++) {
    let arrow = new Arrow(Math.floor(Math.random() * movingArrowsImages.length), i);
    arrows.push(arrow);
}

//
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
    drawArrowFixed();
    arrows.forEach(arrow => arrow.move());
    animationFrameId = requestAnimationFrame(updateCanvas);
}

function drawArrowFixed() {
    ctx.drawImage(staticArrowsImages[0], 0, 0, 80, 80);
    ctx.drawImage(staticArrowsImages[1], 100, 0, 80, 80);
    ctx.drawImage(staticArrowsImages[2], 200, 0, 80, 80);
    ctx.drawImage(staticArrowsImages[3], 300, 0, 80, 80);
}


var score = 0;
document.body.addEventListener("keydown", event => {
    var currentArrow = arrows.filter(a => a.y > 0 && a.y < 80)[0];
    if (currentArrow && (match(0, currentArrow, 'ArrowDown', event)
        || match(1, currentArrow, 'ArrowLeft', event)
        || match(2, currentArrow, 'ArrowUp', event)
        || match(3, currentArrow, 'ArrowRight', event))) {
        if (currentArrow.y < 10) {
            score = score + 50;
        } else if (currentArrow.y < 30) {
            score = score + 30;
        }
        else { 
            score = score + 10; 
        }
    } else {
        console.log("failure");
    }
    document.getElementById("player-one-score").innerHTML = score;
});

function match(direction, currentArrow, keyCode, event) {
    return currentArrow.direction === direction && event.code === keyCode;
}

