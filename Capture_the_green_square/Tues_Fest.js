const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
canvas.height = window.innerHeight - 60;
canvas.width = window.innerWidth - 30;
document.body.insertBefore(this.canvas, document.body.childNodes[0]);

var frameSide = "left";
var frameNumber = "1";
var frameOrder = "1";
var frame = "left1";

var phantomVersion=Math.floor(Math.random()*2);

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
        if(down) frameNumber++;
        else frameNumber=1;
        down = true;
        frameSide = "down";
    }
    if (event.code == "ArrowUp") { // UP
        if(up) frameNumber++;
        else frameNumber=1;
        up = true;
      frameSide = "up";
    }
    if (event.code == "ArrowLeft") { // LEFT
        if(left) frameNumber++;
        else frameNumber=1;
        left = true;
      frameSide = "left";
    }
    if (event.code == "ArrowRight") { // RIGHT
        if(right) frameNumber++;
        else frameNumber=1;
        right = true;
      frameSide = "right";
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
    ctx.font = '90px "Black"';
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
            phantomVersion=Math.floor(Math.random()*2)
            drawTarget();
            score = score + 1;
        }
    }


    //backgr
    ctx.drawImage(document.getElementById("background"),0,0);

    //Your hero
    /*if(frameNumber%10==0){
        if(((frameSide=="right" || frameSide=="left") && frameOrder==2) || ((frameSide=="up" || frameSide=="down") && frameOrder==4)) frameOrder=1;
        else frameOrder++;
    }
    frame = frameSide+frameOrder;
    console.log(document.getElementById(frame));
    console.log(frame);
    ctx.drawImage(document.getElementById(frame), x, y, sideLength, sideLength);
    */

    frame = frameSide+1;
    ctx.drawImage(document.getElementById(frame), x, y, sideLength, sideLength);

    //Target of your hero
    /**ctx.fillStyle = "Green";
    ctx.fillRect(targetX, targetY, targetLength, targetLength);
    **/
    

    console.log(phantomVersion);
    ctx.drawImage(document.getElementById(`phantom${phantomVersion}`), targetX, targetY, targetLength, targetLength);

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
