class Entity{
    type;
    id;
    x;
    y;
    speed_x;
    speed_y;
    width;
    height;
    color;

    constructor(type, id, x, y, speed_x, speed_y, width, height, color){
        this.type = type;
        this.id = id;
        this.x = x;
        this.y = y;
        this.speed_x = speed_x;
        this.speed_y = speed_y;
        this.width = width;
        this.height = height;
        this.color = color;
    }

    static distance = function(entity1, entity2){
        let dx = entity1.x - entity2.x;
        let dy = entity1.y - entity2.y;
        return Math.sqrt(dx*dx + dy*dy);
    }

    static collisionTest = function(entity1, entity2){
        let x1 = entity1.x - Math.round(entity1.width / 2);
        let y1 = entity1.y - Math.round(entity1.height / 2);
        let x2 = entity2.x - Math.round(entity2.width / 2);
        let y2 = entity2.y - Math.round(entity2.height / 2);

        return x1 <= x2 + entity2.width
            && x2 <= x1 + entity1.width
            && y1 <= y2 + entity2.height
            && y2 <= y1 + entity1.height;
    }

    updatePosition(){
        this.x += this.speed_x;
        this.y += this.speed_y;
        
        let x = this.x - Math.round(this.width / 2);
        let y = this.y - Math.round(this.height / 2);

        if(x + this.width >= Interface.MAX_X || x <= 0){
            this.speed_x = -this.speed_x;
        }
        if(y + this.height >= Interface.MAX_Y || y <= 0){
            this.speed_y = -this.speed_y;
        }
        return true;
    }

    draw(){
        let ctx = Interface.ctx;
        ctx.save();
        ctx.fillStyle = this.color;
        let width_offset = Math.round(this.width/2);
        let height_offset = Math.round(this.height/2);
        ctx.fillRect(this.x - width_offset, this.y - height_offset, this.width, this.height);
        ctx.restore();
    }

    update(){
        let retv = this.updatePosition();
        if(retv) 
            this.draw();
        return retv;
    }
}