const canvas = document.getElementById("pong");
const context = canvas.getContext("2d");

function drawCircle(x, y, r, color){
    context.fillStyle = color;
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI*2, false);
    context.closePath();
    context.fill();
}
function drawRect(x, y, w, h, color){
    context.fillStyle = color;
    context.fillRect(x, y, w, h);
}
function drawText(text,x, y, color){
    context.fillStyle = color;
    context.font = "12px arial";
    context.fillText(text, x, y);
}
const ball = {
    x : canvas.width/2,
    y : canvas.height/2,
    radius : 15,
    speed : 0,
    velocityX : 40,
    velocityY : 0,
    color : "White",
}
const user = {
    x : canvas.width/2,
    y : canvas.height/2,
    radius : 15,
    speed : 0,
    vx : 0,
    vy : 0,
    v : 0,
    color : "Red",
}
function moveUser(event){
    let oldX = user.x
    let oldY = user.y
    let rect = canvas.getBoundingClientRect();
    user.y = event.clientY - rect.top - user.radius/2;
    user.x = event.clientX - rect.top - user.radius/2;
    let directionX = (oldX > user.x) ? -1 : 1
    let directionY = (oldY > user.y) ? -1 : 1
    user.vx = directionX * Math.sqrt((oldX - user.x)*(oldX - user.x));
    user.vy = directionY * Math.sqrt((oldY - user.y)*(oldY - user.y));
    user.v = Math.sqrt((user.vx*user.vx)+(user.vy*user.vy))
    // console.log(user.v)
    // console.log(user.vx +" "+ oldX + "X")
    // console.log(user.vy +" "+ oldY + "Y")
}
function update(){
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    drawText("X: "+ball.x+" Y: "+ball.y, 0, 10, "White");
    drawText("Vx: "+ball.velocityX+" Vy: "+ball.velocityY, 0, 20, "White");
    if( ball.y)
    if( ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0){
        //ball has hit top or bottom
        ball.velocityY = - ball.velocityY;
    }
    else if( ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0){
        //ball has hit top or bottom
        ball.velocityX = - ball.velocityX;
    }
    let closeX = Math.sqrt((ball.x - user.x)*(ball.x - user.x))
    let closeY = Math.sqrt((ball.y - user.y)*(ball.y - user.y))
    let closeXY = Math.sqrt((closeX*closeX)+(closeY*closeY))
    if(closeXY <= 30){
        console.log("collision")
        let diffX = ball.x - user.x
        let directionX = (ball.x > user.x) ? 1 : -1;
        let diffY = ball.y - user.y
        let directionY = (ball.y > user.y) ? 1 : -1;
        let diffXY = Math.sqrt((diffX*diffX)+(diffY*diffY))
        ball.velocityX = user.vx
        ball.velocityY = user.vy
        //ball.velocityY = user.vy
    }

    // //computerLevel is difficult, higher=harder, 
    // let computerLevel = 0.08
    // comp.y += (ball.y - (comp.y + comp.height/2)) * computerLevel
    // // this is saying if (ball.x < canvas.width/2 (on the right side)){ paddle = user} else {paddle = comp}
    // let paddle = (ball.x < canvas.width/2) ? user : comp;
    // if( collision(ball,paddle) ){
    //     //need to find point of impact so rebound angle can be calculated
    //     let collidePoint = (ball.y - (paddle.y + paddle.height/2));
    //     collidePoint = collidePoint / (paddle.height/2);
    //     let angleRadian = (Math.PI/4) * collidePoint;
    //     //the ball moves right after hitting user paddle, left after comp
    //     let direction = (ball.x < canvas.width/2) ? 1 : -1;
    //     ball.velocityX = direction * ball.speed * Math.cos(angleRadian)
    //     ball.velocityY = direction * ball.speed * Math.sin(angleRadian)
    //     //the ball moves faster every rebound
    //     ball.speed += 0.2;
    // }
    // if(ball.x - ball.radius < 0){
    //     comp.score++;
    //     resetBall();
    // }else if(ball.x + ball.radius > canvas.width){
    //     user.score++;
    //     resetBall();
    // }
}
function render(){
drawRect(0, 0, canvas.width, canvas.height, "black");
drawCircle(ball.x, ball.y, ball.radius, ball.color)
drawCircle(user.x, user.y, user.radius, user.color)
drawText("X: "+ball.x+" Y: "+ball.y, 0, 10, "White");
drawText("Vx: "+ball.velocityX+" Vy: "+ball.velocityY, 0, 20, "White");
}
function game(){
    render();
    update();
}
setInterval(game,);

canvas.addEventListener("mousemove",moveUser);