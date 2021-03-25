window.addEventListener("DOMContentLoaded", (event) => {

    var canvas = document.getElementById("example");
    var ctx = canvas.getContext("2d");
    const X = canvas.width;
    const Y = canvas.height;

    var arrowDown = new Image();
    arrowDown.src = "images/arrow-down.jpeg";
    var arrowLeft = new Image();
    arrowLeft.src = "images/arrow-left.jpeg";
    var arrowUp = new Image();
    arrowUp.src = "images/arrow-up.jpeg";
    var arrowRight = new Image();
    arrowRight.src = "images/arrow-right.jpeg";

    var images = [arrowDown, arrowLeft, arrowUp, arrowRight];
    var imageCount = images.length;
    var imagesLoaded = 0;

    for (var i = 0; i < imageCount; i++) {
        images[i].onload = function () {
            imagesLoaded++;
            if (imagesLoaded == imageCount) {
                updateCanvas();
            }
        }
    }




    class Arrow {
        constructor(direction, position) {
            this.direction = direction;
            this.y = Y + position * 100;
        }
        move() {
            this.y = this.y - 7;
            ctx.drawImage(images[this.direction], this.direction * 100, this.y, 80, 80);
        }
    }



    let arrows = [];
    for ( var i = 0; i < 100; i ++) {
       let arrow = new Arrow (Math.floor (Math.random()*images.length) , i);
       arrows.push (arrow);
    }

    function updateCanvas() {
        ctx.clearRect(0, 0, X, Y);
        arrows.forEach(arrow => arrow.move());
        requestAnimationFrame(updateCanvas);
    }


});
