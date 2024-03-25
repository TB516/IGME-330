class CircleSprite{
    constructor(x, y, radius, color){
        this.x = x;
        this.y = y;
        this.rad = radius;
        this.color = color;
        this.deltaX = 0;
        this.deltaY = 0;
    }

    update(dt, width, height){
        this.x += this.deltaX * dt;
        this.y += this.deltaY * dt;

        if (this.x >= width) this.x -= width;
        else if (this.x < 0) this.x += width;

        if (this.y >= height) this.y -= height;
        else if (this.y < height) this.y += height;
    }

    draw(ctx){
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.rad, 0, 2*Math.PI, true);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

    setDeltaX(deltaX){
        this.deltaX = deltaX;
    }

    setDeltaY(deltaY){
        this.deltaY = deltaY;
    }
}

export {CircleSprite};