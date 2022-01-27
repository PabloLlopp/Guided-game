class Component {
    constructor(width, height, color, x, y){
        this.width = width;
        this.height = height;
        this.color = color;
        this.x = x;
        this.y = y;
        //speed.properties
        this.speedX = 0;
        this.speedY = 0;
    }

    update() {
        const ctx = myGameArea.context;
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }

    newPos() {
        this.x += this.speedX;
        this.y += this.speedY;
    }

    left() {
        return this.x;
    }

    right() {
        return this.x + this.width;
    }

    top() {
        return this.y;
    }

    bottom() {
        return this.y + this.height;
    }

    crashWith(obstacle) {
        return !(this.bottom() < obstacle.top() || this.top() > obstacle.bottom() || this.right() < obstacle.left() || this.left() > obstacle.right());
    }

}