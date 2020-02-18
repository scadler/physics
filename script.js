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

const ball = {
    x : canvas.width/2,
    y : canvas.height/2,
    radius : 15,
    speed : 0,
    velocityX : 0,
    velocityY : 0,
    color : "White",
}
const user = {
    x : canvas.width/2,
    y : canvas.height/2,
    radius : 15,
    speed : 0,
    vx : 0,
    vx : 0,
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
    user.vx= directionX * Math.sqrt((oldX - user.x)*(oldX - user.x));
    user.vy= directionY * Math.sqrt((oldY - user.y)*(oldY - user.y));
    console.log(user.vx +" "+ oldX + "X")
    console.log(user.vy +" "+ oldY + "Y")

}
function update(){
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;
    if( ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0){
        //ball has hit top or bottom
        ball.velocityY = - ball.velocityY;
    }
    if( ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0){
        //ball has hit top or bottom
        ball.velocityX = - ball.velocityX;
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
}
function game(){
    render();
    update();
}
setInterval(game, 20);
canvas.addEventListener("mousemove", moveUser);