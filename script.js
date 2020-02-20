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
    y : canvas.height/2 + 40,
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
    drawText("X: "+Math.round(ball.x)+" Y: "+Math.round(ball.y), 0, 10, "White");
    drawText("Vx: "+ball.velocityX+" Vy: "+ball.velocityY, 0, 20, "White");
    if( ball.y)
    if( ball.y + ball.radius > canvas.height || ball.y - ball.radius < 0){
        ball.velocityY = - ball.velocityY;
        if( ball.y + ball.radius > canvas.height){
            ball.y = canvas.height - ball.radius;
        }
        else{
            ball.y = ball.radius;
        }
    }
    else if( ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0){
        ball.velocityX = - ball.velocityX;
        if(ball.x + ball.radius > canvas.width){
            ball.x = canvas.width - ball.radius;
        }
        else{
            ball.x = ball.radius;
        }
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
        ball.velocityX = user.vx/4
        ball.velocityY = user.vy/4
        //ball.velocityY = user.vy
            //if this code is activated it makes red and white act like magnets
            // ball.x = ball.x +((15-closeX)*directionX)
            // ball.y = ball.y +((15-closeY)*directionY)

    }
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
function reset(){
    ball.x = canvas.width/2;
    ball.y = canvas.height/2;
    ball.velocityX = 0;
    ball.velocityY = 0;
}
setInterval(game,);
canvas.addEventListener("mousedown",reset);
canvas.addEventListener("mousemove",moveUser);