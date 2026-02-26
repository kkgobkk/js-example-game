class Enemy extends Actor{
    static AGGRO_DISTANCE = 0;
    static MAX_ENEMIES = 20;
    static colors = ["#000000", "#ff0000", "#cc0000", "#aa0000"];
    static list = {};
    static count = 0;

    constructor(type, id, x, y, speed_x, speed_y, width, height, hp){
        super(type, id, x, y, speed_x, speed_y, width, height, Enemy.colors[hp], 50, 0, hp);
    }

    static generate(){
        let rand = Math.random();
        let speed, height, width, type, hp;

        if(rand > 0.9){
            type = "ranged"; height = 15; width = 15; speed = 2; hp = 1;
        } 
        else if(rand > 0.75){
            type = "tank"; height = 30; width = 50; speed = 3; hp = 3;
        }
        else if(rand > 0.5){
            type = "runner"; height = 30; width = 20; speed = 7; hp = 1;
        }
        else if(rand > 0.4){
            type = "juggler"; height = 15; width = 15; speed = 5; hp = 1;
        }
        else{
            type = "normal"; height = 20; width = 20; speed = 5; hp = 1;
        }

        let pos_x, pos_y, counter = 0;

        do{
            counter++;
            pos_x = Math.ceil(width/2) + Math.random() * (Interface.MAX_X - width - 1);
            pos_y = Math.ceil(height/2) + Math.random() * (Interface.MAX_Y - height - 1);
        }while((Entity.distance({x:pos_x, y:pos_y}, Game.instance.player) < 100) && counter < 100)

        let enemy = new Enemy(type, rand, pos_x, pos_y, speed, speed, width, height, hp);
        Enemy.list[rand] = enemy;
    }

    updatePosition(){
        let delta_x = this.speed_x;
        let delta_y = this.speed_y;

        if(this.type != "ranged" && Entity.distance(Game.instance.player, this) <= Enemy.AGGRO_DISTANCE){
            this.aim_angle = Math.atan2(Game.instance.player.y - this.y, Game.instance.player.x - this.x) * 180 / Math.PI;
            delta_x = Math.abs(delta_x) * Math.cos(this.aim_angle * Math.PI / 180);
            delta_y = Math.abs(delta_y)* Math.sin(this.aim_angle * Math.PI / 180);
        }

        this.x += delta_x;
        this.y += delta_y;
        
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
        this.color = Enemy.colors[this.hp];
        super.draw();
    }

    update(){
        super.update()
        let player = Game.instance.player;
        if(Entity.collisionTest(player, this) && player.i_frames <= 0){
            player.hp -= 10;
            player.i_frames = 25;
        }
        if(this.type == "juggler"){
            if(this.satellites == undefined){
                this.satellites = {};
                this.spawnRotatingBullets(3);
            }
            else{
                this.updateSatellites();
            }
        }
        if(this.type == "ranged"){
           this.attack_counter --;
            if(this.attack_counter <= 0){
                this.aim_angle = Math.atan2(player.y - this.y, player.x - this.x) * 180 / Math.PI;
                this.performAttack("normal", 1, 1, 100);
            }
        }
        return true;
    }

    static updateAll(){
        for(let i in Enemy.list){
            Enemy.list[i].update();
        }
    }

    static killAll(){
        for(let i in Enemy.list){
            delete Enemy.list[i];
        }
    }
}
