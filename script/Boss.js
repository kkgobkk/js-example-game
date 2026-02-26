class Boss extends Enemy {
	static minion_distance  = 25;
	static spread_attack_cooldown = 100;

	spread_attack_counter = Boss.spread_attack_cooldown;

	minions = {};

	constructor(id, x, y){
		super("boss", id, x, y, 5, 5, 100, 100, 3);
	}

	static spawn(){
		let rand = Math.random();
		let boss = new Boss(rand, 300, 300);
		Enemy.list[rand] = boss;
		Game.instance.boss = boss;
	}

	spawn_minions(number, tiers, change_rotation){
		let step = 2*Math.PI / number;
        let angle = 0;
		let rotation;
		let starting_radius = this.width + Boss.minion_distance;
		let radius_increment = Boss.minion_distance;

        for(let i = 0; i<number; i++){
			rotation = 1;
			for(let j = 0; j < tiers; j ++){
				let radius = starting_radius + j * radius_increment;
            	new RotatingEnemy(this, radius, radius, this.x + Math.round(25 * Math.cos(angle + i*step) * 1000)/1000, this.y + Math.round(25 * Math.sin(angle + i*step) * 1000)/1000, rotation, 1);
				if(change_rotation) rotation = -rotation;
			}
		}
	}

	kill_all_minions(){
		for(let k in this.minions){
			delete (this.minions[k]);
			delete (Enemy.list[k]);
		}
	}

	spread_attack(){
		this.performAttack("special", 72, 0, 100);
	}

	spin_attack(){

	}

	update(){
        super.update()
        let player = Game.instance.player;
        if(Entity.collisionTest(player, this) && player.i_frames <= 0){
            player.hp -= 10;
            player.i_frames = 25;
        }
        this.spread_attack_counter --;
            if(this.spread_attack_counter <= 0){
                this.spread_attack();
				this.spread_attack_counter = Boss.spread_attack_cooldown;
            }
        return true;
    }
}
