const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
canvas.height = window.innerHeight - 60;
canvas.width = window.innerWidth - 30;
document.body.insertBefore(this.canvas, document.body.childNodes[0]);



window.addEventListener("resize", () => {
    canvas.height = window.innerHeight - 60;
    canvas.width = window.innerWidth - 30;
});
let score = 0;
let x = 50;
let y = 100;
let speed = 10;
let sideLength = 50;

//Pressed keys
let up = false;
let left = false;
let right = false;
let down = false;


//Target
let targetX = 0;
let targetY = 0;
let targetLength = 25;

let countdown = 60;
let id = null;

window.addEventListener('keydown', function(event) {
    event.preventDefault();
    console.log(event.key, event.code);
    if (event.code == "ArrowDown") { // DOWN
      down = true;
    }
    if (event.code == "ArrowUp") { // UP
      up = true;
    }
    if (event.code == "ArrowLeft") { // LEFT
      left = true;
    }
    if (event.code == "ArrowRight") { // RIGHT
      right = true;
    }
  });


window.addEventListener('keyup', function(event){
    event.preventDefault();
    console.log(event.key, event.code);
    if (event.code == "ArrowDown") { // DOWN
        down = false;
      }
      if (event.code == "ArrowUp") { // UP
        up = false;
      }
      if (event.code == "ArrowLeft") { // LEFT
        left = false;
      }
      if (event.code == "ArrowRight") { // RIGHT
        right = false;
      }
});



function startGameMenu(){
    end();
    ctx.fillStyle = "Black";
    ctx.font = '150px "Black"';
    ctx.textAlign = 'center';
    ctx.fillText("Capture the green square!", canvas.width / 2, canvas.height / 4);
    ctx.font = '50px "Black"';
    ctx.fillText("Start", canvas.width / 2, canvas.height / 2);
    ctx.font = '25px "Black"';
    ctx.fillText("Use arrows to move", canvas.width / 2, (canvas.height / 4) * 3);
    canvas.addEventListener("click", startGame);
}



function startGame(){
    countdown = 60;
    id = setInterval(function() {
        countdown = countdown - 1;
      }, 1000)

      canvas.removeEventListener("click", startGame);
      drawTarget();
      draw();
}


function drawTarget(){
    targetX = Math.round(Math.random() * canvas.width - targetLength);
    targetY = Math.round(Math.random() * canvas.height - targetLength);
}


function end(){
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas. width, canvas. height);
}


function endGame(){
    clearInterval(id);
    end();
    ctx.fillStyle = "Black";
    ctx.font = '150 px "Black"';
    ctx.textAlign = "center";
    ctx.fillText("Score:" + score, canvas.width / 2, canvas.height / 2);
}


function isWithin(a, b, c){
    return (a > b && a < c);
}


function draw(){
    end();
    if(up){
        y -= speed;
    }

    if(left){
        x -= speed;
    }

    if(right){
        x += speed;
    }

    if(down){
        y += speed;
    }


    if(y + sideLength > canvas.height){
        y = canvas.height - sideLength;
    }

    if(y < 0){
        y = 0;
    }

    if(x < 0){
        x = 0;
    }



    if(x + sideLength > canvas.width){
        x = canvas.width - sideLength;
    }

    if(isWithin(targetX, x, x + sideLength) || isWithin(targetX + targetLength, x, x + sideLength)){
        if(isWithin(targetY, y, y + sideLength) || isWithin(targetY + targetLength, y, y + sideLength)){
            drawTarget();
            score = score + 1;
        }
    }


    //Your hero
    ctx.fillStyle = "Red";
    ctx.fillRect(x, y, sideLength, sideLength);


    //Target of your hero
    ctx.fillStyle = "Green";
    ctx.fillRect(targetX, targetY, targetLength, targetLength);


    //Score and time left to play
    ctx.font = '10 px "Black"';
    ctx.textAlign = "left";
    ctx.fillText("Score:" + score, 15, 30);
    ctx.fillText("Time left:" + countdown, 15, 50);
    

    if(countdown <= 0){
        endGame();
    }
    else{
        window.requestAnimationFrame(draw);
    }
}

startGameMenu();
canvas.focus();
