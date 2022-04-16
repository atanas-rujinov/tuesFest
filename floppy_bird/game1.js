/*
space between bars = 184
bars width = 50
gap = 60
*/

/*document.getElementById("button").addEventListener("dblclick", function(e) {
    e.preventDefault();
});*/

var flyLoop;
var flyIndex;

window.addEventListener('keydown', function (e) {
    if(e.key == " "){
        e.preventDefault();
        flyLoop = setInterval(jump, 2);
        flyIndex=0;
    }
})

function jump(){
    bird.birdY--;
    flyIndex++;
    if(flyIndex==27) clearInterval(flyLoop);
}

var gameStatus = "start";
var barsLoop, birdLoop;
var speed=1;

window.onload = function(){
    document.getElementById('button').onclick = function(){
        switch(gameStatus){
            case "start":
                gameStatus = "running";
                barsLoop = setInterval(game, 25);
                birdLoop = setInterval(gif, 350);
                document.getElementById("button").innerHTML = "FLY";
                document.getElementById("button").blur();
                break;
                
            case "running":
                flyLoop = setInterval(jump, 2);
                flyIndex=0;
                document.getElementById("button").blur();
                break;
            
            case "restart":
                score = 0;
                document.getElementById("newHighscoreText").innerHTML = "<br>";
                document.getElementById("button").blur();
                document.getElementById("button").innerHTML = "FLY";
                
                bar1.pos = 130;
                bar1.lowerHight = 185;
                bar1.upperHeight = 175;

                bar2.pos = 364;
                bar2.lowerHight = Math.floor(Math.random() * 360);
                bar2.upperHeight = 360 - bar2.lowerHight;

                bar3.pos = 598;
                bar3.lowerHight = Math.floor(Math.random() * 360);
                bar3.upperHeight = 360 - bar3.lowerHight;
                
                bar4.pos = 832;
                bar4.lowerHight = Math.floor(Math.random() * 360);
                bar4.upperHeight = 360 - bar4.lowerHight;
                
                bird.birdY = 195;
                barsLoop = setInterval(game, 25);
                birdLoop = setInterval(gif, 350);
                gameStatus = "running";
                console.log(gameStatus);
                break;
        }
    }
}
//setup
var canvas1 = document.getElementById("canvas1");
var context = canvas1.getContext("2d");
context.fillStyle = "#FF0000";
context.drawImage
var score = 0;
var highscore = 0;
 
//check collision function
function colliding(){
    /*if((bird.birdX+36 >= bar1.pos && bird.birdX <= bar1.pos+50) && (bird.birdY <= bar1.upperHeight || bird.birdY+21 >= 450-bar1.lowerHight)) return true;
    if((bird.birdX+36 >= bar2.pos && bird.birdX <= bar2.pos+50) && (bird.birdY <= bar2.upperHeight || bird.birdY+21 >= 450-bar2.lowerHight)) return true;
    if((bird.birdX+36 >= bar3.pos && bird.birdX <= bar3.pos+50) && (bird.birdY <= bar3.upperHeight || bird.birdY+21 >= 450-bar3.lowerHight)) return true;
    if((bird.birdX+36 >= bar4.pos && bird.birdX <= bar4.pos+50) && (bird.birdY <= bar4.upperHeight || bird.birdY+21 >= 450-bar4.lowerHight)) return true;
    if(bird.birdY<=0 || bird.birdY+20>=450) return true;*/

    //tail
    if((bird.birdX+5 >= bar1.pos && bird.birdX <= bar1.pos+50) && (bird.birdY+10 <= bar1.upperHeight || bird.birdY+15 >= 450-bar1.lowerHight)) return true;
    if((bird.birdX+5 >= bar2.pos && bird.birdX <= bar2.pos+50) && (bird.birdY+10 <= bar2.upperHeight || bird.birdY+15 >= 450-bar2.lowerHight)) return true;
    if((bird.birdX+5 >= bar3.pos && bird.birdX <= bar3.pos+50) && (bird.birdY+10 <= bar3.upperHeight || bird.birdY+15 >= 450-bar3.lowerHight)) return true;
    if((bird.birdX+5 >= bar4.pos && bird.birdX <= bar4.pos+50) && (bird.birdY+10 <= bar4.upperHeight || bird.birdY+15 >= 450-bar4.lowerHight)) return true;

    //body
    if((bird.birdX+22 >= bar1.pos && bird.birdX+6 <= bar1.pos+50) && (bird.birdY+5 <= bar1.upperHeight || bird.birdY+21 >= 450-bar1.lowerHight)) return true;
    if((bird.birdX+22 >= bar2.pos && bird.birdX+6 <= bar2.pos+50) && (bird.birdY+5 <= bar2.upperHeight || bird.birdY+21 >= 450-bar2.lowerHight)) return true;
    if((bird.birdX+22 >= bar3.pos && bird.birdX+6 <= bar3.pos+50) && (bird.birdY+5 <= bar3.upperHeight || bird.birdY+21 >= 450-bar3.lowerHight)) return true;
    if((bird.birdX+22 >= bar4.pos && bird.birdX+6 <= bar4.pos+50) && (bird.birdY+5 <= bar4.upperHeight || bird.birdY+21 >= 450-bar4.lowerHight)) return true;

    //neck
    if((bird.birdX+26 >= bar1.pos && bird.birdX+23 <= bar1.pos+50) && (bird.birdY <= bar1.upperHeight || bird.birdY+21 >= 450-bar1.lowerHight)) return true;
    if((bird.birdX+26 >= bar2.pos && bird.birdX+23 <= bar2.pos+50) && (bird.birdY <= bar2.upperHeight || bird.birdY+21 >= 450-bar2.lowerHight)) return true;
    if((bird.birdX+26 >= bar3.pos && bird.birdX+23 <= bar3.pos+50) && (bird.birdY <= bar3.upperHeight || bird.birdY+21 >= 450-bar3.lowerHight)) return true;
    if((bird.birdX+26 >= bar4.pos && bird.birdX+23 <= bar4.pos+50) && (bird.birdY <= bar4.upperHeight || bird.birdY+21 >= 450-bar4.lowerHight)) return true;

    //head
    if((bird.birdX+36 >= bar1.pos && bird.birdX+27 <= bar1.pos+50) && (bird.birdY <= bar1.upperHeight || bird.birdY+12 >= 450-bar1.lowerHight)) return true;
    if((bird.birdX+36 >= bar2.pos && bird.birdX+27 <= bar2.pos+50) && (bird.birdY <= bar2.upperHeight || bird.birdY+12 >= 450-bar2.lowerHight)) return true;
    if((bird.birdX+36 >= bar3.pos && bird.birdX+27 <= bar3.pos+50) && (bird.birdY <= bar3.upperHeight || bird.birdY+12 >= 450-bar3.lowerHight)) return true;
    if((bird.birdX+36 >= bar4.pos && bird.birdX+27 <= bar4.pos+50) && (bird.birdY <= bar4.upperHeight || bird.birdY+12 >= 450-bar4.lowerHight)) return true;

    if(bird.birdY<=0 || bird.birdY+36>=450) return true;

    return false;
}

var bird = {
    birdX : 40,
    birdY : 195
}
 
var bar1 = {
    upperHeight:175,
    lowerHight:185,
    pos : 130
}
 
var bar2 = {
    upperHeight:175,
    lowerHight:185,
    pos : 364
}
 
var bar3 = {
    upperHeight:175,
    lowerHight:185,
    pos : 598
}

var bar4 = {
    upperHeight:175,
    lowerHight:185,
    pos : 832
}

var frame=1;
var framegap=1;
function gif(){
    if(frame==1){
        context.drawImage(document.getElementById("frame1"), bird.birdX, bird.birdY);
        frame=0;
    } else {
        context.drawImage(document.getElementById("frame2"), bird.birdX, bird.birdY);
        frame=1;
    }
    console.log(frame);
}

function game(){
    context.clearRect(0,0,canvas1.width, canvas1.height);

    //generating & moving bars
    if(bar1.pos < -50){
        bar1.pos = 886;
        bar1.lowerHight = Math.floor(Math.random() * 360);
        bar1.upperHeight = 360 - bar1.lowerHight;
    } else bar1.pos -= speed;

    if(bar2.pos < -50){
        bar2.pos = 886;
        bar2.lowerHight = Math.floor(Math.random() * 360);
        bar2.upperHeight = 350 - bar2.lowerHight;
    } else bar2.pos -= speed;

    if(bar3.pos < -50){
        bar3.pos = 886;
        bar3.lowerHight = Math.floor(Math.random() * 360);
        bar3.upperHeight = 360 - bar3.lowerHight;
    } else bar3.pos -= speed;

    if(bar4.pos < -50){
        bar4.pos = 886;
        bar4.lowerHight = Math.floor(Math.random() * 360);
        bar4.upperHeight = 360 - bar4.lowerHight;
    } else bar4.pos -= speed;

    //gravity
    bird.birdY+=speed;
    
    //drawing
    
    context.drawImage(document.getElementById("backgroundImage"), 0, 0, 702, 450);

    context.drawImage(document.getElementById("upperBar"), bar1.pos, -360+bar1.upperHeight, 50, 360);
    context.drawImage(document.getElementById("lowerBar"), bar1.pos, 450-bar1.lowerHight, 50, bar1.lowerHight);
    context.drawImage(document.getElementById("upperBar"), bar2.pos, -360+bar2.upperHeight, 50, 360);
    context.drawImage(document.getElementById("lowerBar"), bar2.pos, 450-bar2.lowerHight, 50, bar2.lowerHight);
    context.drawImage(document.getElementById("upperBar"), bar3.pos, -360+bar3.upperHeight, 50, 360);
    context.drawImage(document.getElementById("lowerBar"), bar3.pos, 450-bar3.lowerHight, 50, bar3.lowerHight);
    context.drawImage(document.getElementById("upperBar"), bar4.pos, -360+bar4.upperHeight, 50, 360);
    context.drawImage(document.getElementById("lowerBar"), bar4.pos, 450-bar4.lowerHight, 50, bar4.lowerHight);

    if(framegap==9){
        if(frame==1) frame=0;
        else frame=1;
        framegap=1;
    }
    if(frame==1) context.drawImage(document.getElementById("frame1"), bird.birdX, bird.birdY);
    else context.drawImage(document.getElementById("frame2"), bird.birdX, bird.birdY);

    if(colliding()){
        clearInterval(barsLoop);
        clearInterval(birdLoop);
        gameStatus = "restart";
        document.getElementById("button").innerHTML = "RESTART";
    } else{
        score++;
        if(score%1000==0){
            speed++;
        }
        if(score>highscore){
            highscore = score;
            document.getElementById("newHighscoreText").innerHTML = "NEW HIGHSCORE!";
        }
        document.getElementById("scoreText").innerHTML = `${score}`;
        document.getElementById("highscoreText").innerHTML = `${highscore}`;
    }
}
