import { CircleSprite } from "./circleSprite.js";
import { Assets } from "../loader.js"

class KirbySprite extends CircleSprite{
    constructor(x, y, radius, color){
        super(x, y, radius, color);
        this.eyes = Assets.eyes;
        this.mouth = new CircleSprite(x, y + this.rad/2, this.rad/3, "black");
        this.rotation = 0;
        this.deltaRotation = 0;
    }

    update(dt, deltaRotation, mouthSize){ 
        this.rotation += dt * deltaRotation;   
        this.mouth.rad = mouthSize;
    }

    draw(ctx){
        ctx.save();

        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.translate(-this.x, -this.y);

        super.draw(ctx);
        this.mouth.draw(ctx);
        ctx.drawImage(this.eyes, this.x - this.eyes.width/2, this.y - this.eyes.height);

        ctx.restore();
    }
}

export {KirbySprite};