class Player extends Actor{
    shooting = false;
    pressing_up = false;
    pressing_right = false;
    pressing_down = false;
    pressing_left = false;
    alt_color = "#80bb80";
    max_hp = 50;

    constructor(){
        super("player", 11, Interface.MAX_X/2, Interface.MAX_Y/2, 10, 10, 20, 20, "#2e962e", 10, 125, 50);
    }

    updatePosition = function(){
        let MAX_X = Interface.MAX_X;
        let MAX_Y = Interface.MAX_Y;

        if(this.recoil_time > 0){
            this.recoil_time --;
            if(!(this.pressing_right || this.pressing_left))
                this.x -= this.recoil_x * this.recoil_time / 10;
            if(!(this.pressing_down || this.pressing_up))
                this.y -= this.recoil_y * this.recoil_time / 10;
        }

        if(this.pressing_right)
            this.x += this.speed_x;
        if(this.pressing_left)
            this.x -= this.speed_x;
        if(this.pressing_down)
            this.y += this.speed_y;
        if(this.pressing_up)
            this.y -= this.speed_x;


        if(this.x < Math.floor(this.width/2)) this.x = Math.floor(this.width/2);
        if(this.x > MAX_X - Math.floor(this.width/2)) this.x = MAX_X - Math.floor(this.width/2);
        if(this.y < Math.floor(this.height/2)) this.y = Math.floor(this.height/2);
        if(this.y > MAX_Y - Math.floor(this.height/2)) this.y = MAX_Y - Math.floor(this.height/2);
        return true;
    }

    draw(){
        let tmp = this.color;
        if(this.i_frames > 0 && Game.instance.frame_count%5 <= 2)
            this.color = this.alt_color;
        super.draw();
        this.color = tmp;
    }

    update(){
        if(this.hp <= 0){
            Game.instance.over = true;
            Interface.drawEndScreen();
            return 0;
        }
        if(this.i_frames > 0)
            this.i_frames --;
        if(this.i_frames < 0)
            this.i_frames = 0;
        this.attack_counter --;
        this.alt_attack_counter --;
        if(this.shooting)
            Game.instance.player.performAttack("normal", 1, 1, 50);
        this.updateSatellites();
        return super.update();
    }
}