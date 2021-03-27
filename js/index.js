//Récuperation du contexte du canvas
var canvas = document.getElementById("player1");
var ctx = canvas.getContext("2d");
const X = canvas.width;
const Y = canvas.height;
const video = document.getElementById("video");

//chargement des fleches mouvantes 
var arrowDown = new Image();
arrowDown.src = "images/arrow-down.png";
var arrowLeft = new Image();
arrowLeft.src = "images/arrow-left.png";
var arrowUp = new Image();
arrowUp.src = "images/arrow-up.png";
var arrowRight = new Image();
arrowRight.src = "images/arrow-right.png";
var movingArrowsImages = [arrowDown, arrowLeft, arrowUp, arrowRight];

// chargement fleches fixes
var arrowDownFaded = new Image();
arrowDownFaded.src = "images/arrow-down-faded.png";
var arrowLeftFaded = new Image();
arrowLeftFaded.src = "images/arrow-left-faded.png";
var arrowUpFaded = new Image();
arrowUpFaded.src = "images/arrow-up-faded.png";
var arrowRightFaded = new Image();
arrowRightFaded.src = "images/arrow-right-faded.png";

//démarrage du jeu lorsque toutes les images sont "loaded"
var images = [arrowDown, arrowLeft, arrowUp, arrowRight, arrowDownFaded, arrowLeftFaded, arrowUpFaded, arrowRightFaded];
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
    ctx.drawImage(arrowDownFaded, 0, 0, 80, 80);
    ctx.drawImage(arrowLeftFaded, 100, 0, 80, 80);
    ctx.drawImage(arrowUpFaded, 200, 0, 80, 80);
    ctx.drawImage(arrowRightFaded, 300, 0, 80, 80);
}

document.body.addEventListener("keydown", event => {
    var currentArrow = arrows.filter(a => a.y > 0 && a.y < 80)[0];
    if (currentArrow && currentArrow.direction === 0 && event.code === 'ArrowDown') {
        console.log("success");
    } else if (currentArrow && currentArrow.direction === 1 && event.code === 'ArrowLeft') {
        console.log("success");
    } else if (currentArrow && currentArrow.direction === 2 && event.code === 'ArrowUp') {
        console.log("success");
    } else if (currentArrow && currentArrow.direction === 3 && event.code === 'ArrowRight') {
        console.log("success");
    } else {
        console.log("failure");
    }
});




