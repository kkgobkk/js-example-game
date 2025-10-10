class Actor extends Entity{
    recoil_time = 0;
    recoil_x = 0;
    recoil_y = 0;
    aim_angle = 0;
    attack_cooldown;
    attack_counter = 0;
    alt_attack_counter = 0;
    i_frames;
    hp;
    satellites = undefined;

    constructor(type, id, x, y, speed_x, speed_y, width, height, color, attack_cooldown, i_frames, hp){
        super(type, id, x, y, speed_x, speed_y, width, height, color);
        this.attack_cooldown = attack_cooldown;
        this.i_frames = i_frames;
        this.hp = hp;
    }

    performAttack(type, number, cooldown_factor, bullet_lifetime, recoil){
        if(number >= 72)  number = 72;
        if((type == "normal" && this.attack_counter <= 0) || (type == "alt" && this.alt_attack_counter <= 0) || type == "special"){
            for(let i = - Math.floor(number/2); i < Math.ceil(number/2); i++){
                Bullet.create(this, this.aim_angle + (i * 5), bullet_lifetime);
            }
            if(recoil != undefined){
                this.recoil_time = 10;
                this.recoil_x = recoil * Math.cos(this.aim_angle / (180 / Math.PI));
                this.recoil_y = recoil * Math.sin(this.aim_angle / (180 / Math.PI));
            }
            if(type == "normal")
                this.attack_counter = this.attack_cooldown * cooldown_factor;
            else if(type == "alt"){
                this.alt_attack_counter = this.attack_cooldown * cooldown_factor;
                this.attack_counter = 0;
            }
        }
    }

    spawnRotatingBullets(number){
        let step = 2*Math.PI / number;
        let angle = 0;
        for(let i = 0; i<number; i++){
            new RotatingBullet(this.x + Math.round(25 * Math.cos(angle + i*step) * 1000)/1000, this.y + Math.round(25 * Math.sin(angle + i*step) * 1000)/1000, this, 25, 50, 1);
        }
    }

    updateSatellites(){
        if(this.satellites != undefined){
            for(let i in this.satellites){
                this.satellites[i].update();
            }
        }
    }
}