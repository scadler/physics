class Square extends GameObject
{
    constructor (context, x, y, vx, vy){
        super(context, x, y, vx, vy);

        //Set default width and height
        this.width = 50;
        this.height = 50;
    }

    draw(){
        //Draw a simple square
        this.context.fillStyle = this.isColliding?'#ff8080':'#0099b0';
        this.context.fillRect(this.x, this.y, this.width, this.height);
    }

    update(secondsPassed){
        //Move with set velocity
        this.x += this.vx * secondsPassed;
        this.y += this.vy * secondsPassed;
    }
}

class GameObject
{
    constructor (context, x, y, vx, vy){
        this.context = context;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;

        this.isColliding = false;
    }
}

var gameObjects;

function createWorld(){
    gameObjects = [
        new Square(context, 250, 50, 0, 50),
        new Square(context, 250, 300, 0, -50),
        new Square(context, 150, 0, 50, 50),
        new Square(context, 250, 150, 50, 50),
        new Square(context, 350, 75, -50, 50),
        new Square(context, 300, 300, 50, -50)
    ];
}
function gameLoop(timeStamp) {
    var secondsPassed = (timeStamp - oldTimeStamp) / 1000;
    oldTimeStamp = timeStamp;

    // Loop over all game objects
    for (var i = 0; i < gameObjects.length; i++) {
        gameObjects[i].update(secondsPassed);
    }

    clearCanvas();

    // Do the same to draw
    for (var i = 0; i < gameObjects.length; i++) {
        gameObjects[i].draw();
    }

    window.requestAnimationFrame(gameLoop);
}