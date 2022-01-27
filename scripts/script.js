// ---------- GAME CANVAS ----------

const myGameArea = {
    canvas: document.createElement('canvas'),
    frames: 0,
    start: function(){
        this.canvas.width = 480;
        this.canvas.height = 270;
        this.context = this.canvas.getContext('2d');
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateGameArea, 20);
    },
    clear: function(){
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function(){
        clearInterval(this.interval);
    },
    score: function() {
        const points = Math.floor(this.frames / 5);
        this.context.font = '18px serif';
        this.context.fillStyle = 'black';
        this.context.fillText(`Score: ${points}`, 350, 50);
    },
};

// ---------- PLAYER & OBSTACLES ----------

const player = new Component(30, 30, 'red', 0, 110)

const myObstacles = []

function updateGameArea() {
    myGameArea.clear();
    // update the player position before drawing
    player.newPos();
    player.update();
    // update the obstacles array
    updateObstacles();
    // check if the game should stop
    gameOver();
    myGameArea.score();
}

function updateObstacles() {
    myGameArea.frames += 1;
    if (myGameArea.frames % 120 === 0) {
      let x = myGameArea.canvas.width;
      let minHeight = 20;
      let maxHeight = 200;
      let height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
      let minGap = 50;
      let maxGap = 200;
      let gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap);
      myObstacles.push(new Component(10, height, 'green', x, 0));
      myObstacles.push(new Component(10, x - height - gap, 'green', x, height + gap));
    }
    for (let i = 0; i < myObstacles.length; i++){
        myObstacles[i].x += -1;
        myObstacles[i].update();
    }
}

function gameOver() {
    const crashed = myObstacles.some(function (obstacle){
        return player.crashWith(obstacle)
    });

    if (crashed) {
        myGameArea.stop();
    }
}

myGameArea.start()

// ---------- MOVEMENT ----------

document.addEventListener(
    'keydown',
    (event)=>{
        switch (event.key) {
            case 'ArrowUp':
                player.speedY -= 1
                break;
            case 'ArrowDown':
                player.speedY += 1
                break;
            case 'ArrowLeft':
                player.speedX -= 1
                break;
            case 'ArrowRight':
                player.speedX += 1
                break;
        }
    }
);

document.addEventListener(
    'keyup',
    (event)=>{
        player.speedX = 0;
        player.speedY = 0;
    }
);