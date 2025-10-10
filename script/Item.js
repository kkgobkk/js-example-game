class Item extends Entity{
    static MAX_ITEMS = 10;
    static SPAWN_COOLDOWN = 100;
    static MAGNET_RADIUS = 50;
    static list = {};
    static count = 0;

    constructor(type, id, x, y, color){
        super(type, id, x, y, 0, 0, 10, 10, color);
    }

    static generate(){
        let type, color;
        let rand = Math.random();
        if(rand > 0.9){
            type = "shoot";
            color = "#992299";
        }
        else if(rand > 0.8){
            type = "shield";
            color = "#5599ff";
        }
        else if(rand > 0.5){
            type = "heal";
            color = "#00ff00"
        }
        else{
            type = "points";
            color = "#ff9900";
        }

        let item = new Item(
            type,
            rand,
            10 + Math.random()*(Interface.MAX_X - 20),
            10 + Math.random()*(Interface.MAX_Y - 20),
            color
        );
        Item.list[rand] = item;
        Item.count ++;
    }

    activate(){
        let player = Game.instance.player;
        let done = false;

        if(this.type == "points"){
            Game.instance.score += 1000;
            done = true;
        }
        else if(this.type == "heal" && player.hp < player.max_hp + player.max_hp/2){
            player.hp += 5;
            if(player.hp > player.max_hp + player.max_hp/2){
                player.hp = player.max_hp + player.max_hp/2;
            }
            done = true;
        }
        else if(this.type == "shoot"){
            player.performAttack("special", 72, 0, 100);
            done = true;
        }
        else if(this.type == "shield"){
            player.i_frames = 125;
            return true;
        }

        return done;
    }

    updatePosition(){
        let delta_x = 0;
        let delta_y = 0;

        if(Entity.distance(this, Game.instance.player) <= Item.MAGNET_RADIUS){
            this.aim_angle = Math.atan2(Game.instance.player.y - this.y, Game.instance.player.x - this.x) * 180 / Math.PI;
            delta_x = 5 * Math.cos(this.aim_angle * Math.PI / 180);
            delta_y = 5 * Math.sin(this.aim_angle * Math.PI / 180);
        }

        this.x += delta_x;
        this.y += delta_y;
       return true;
    }

    static updateAll(){
        for(let i in Item.list){
            Item.list[i].update();
            if(Entity.collisionTest(Game.instance.player, Item.list[i])){
                if(Item.list[i].activate()){
                    delete Item.list[i];
                    Item.count --;
                }
            }
        }
    }
}