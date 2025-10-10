class Bullet extends Entity{
    static list = {};

    can_damage_player;
    timer;

    constructor(id, x, y, speed_x, speed_y, width, height, timer, can_damage_player){
            super("bullet", id, x, y, speed_x, speed_y, width, height, can_damage_player ? "#660000" : "#006600");
            this.timer = timer;
            this.can_damage_player = can_damage_player;
    }

    static create(actor, angle, lifetime){
        angle = angle / (180 / Math.PI);
        let id = Math.random();
        let bullet = new Bullet(
            id,
            actor.x,
            actor.y,
            15* Math.cos(angle),
            15* Math.sin(angle),
            5,
            5,
            lifetime,
            actor.type == "player" ? 0 : 1,
        );
        Bullet.list[id] = bullet;
    }

    updatePosition(){
        this.timer --;
        this.x += this.speed_x;
        this.y += this.speed_y;
        
        return (this.timer > 0 && this.x <= Interface.MAX_X && this.x > 0 && this.y < Interface.MAX_Y && this.y > 0);
    }

    update(){
        let retv = this.updatePosition();
        if(retv){
            let player = Game.instance.player;
            this.draw();
            if(this.can_damage_player == false){
                for(let j in Enemy.list){
                    if(Entity.collisionTest(this, Enemy.list[j])){
                        delete Bullet.list[this.id];
                        Enemy.list[j].hp --;
                        if(Enemy.list[j].hp <= 0){
                            delete Enemy.list[j];
                            Enemy.count --;
                            Game.instance.kill_count ++;
                            Game.instance.score += 1000;
                        }
                        break;
                    }
                }
            }
            else if(Entity.collisionTest(this, player)){
                delete Bullet.list[this.id];
                if(player.i_frames <= 0){
                    player.hp -= 10;
                    player.i_frames = 25;
                }
            }
        }
        else{
            delete Bullet.list[this.id];
        }
    }

    static updateAll(){
        for(let i in Bullet.list)
            Bullet.list[i].update();
    }
}