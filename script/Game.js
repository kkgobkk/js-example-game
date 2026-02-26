class Game{
    static instance;

    start_time;
    frame_count;
    spawn_cooldown;
    spawn_timer;
    over;
    kill_count;
    player;
    boss;
    score;
    debug;

    constructor(debug = false){
        this.start_time = Date.now();
        this.frame_count = 0;
        this.spawn_timer = 0;
        this.kill_count = 0;
        this.score = 0;
        this.over = false;
        this.debug = debug;
    }

    static update(){
        if(!Game.instance.over){
            //update game information
            Interface.clearScreen();
            Game.instance.frame_count ++;
            Game.instance.score += 5;
            Interface.updateScoreboard();
            
            //spawn enemies and items
            if(Game.instance.spawn_timer == 0 && !Game.instance.debug){
                if(Enemy.count < Enemy.MAX_ENEMIES)
                    Enemy.generate();
                Game.instance.spawn_timer = Game.instance.spawn_cooldown;
            }
            else
                Game.instance.spawn_timer --;

            if(Game.instance.frame_count % Item.SPAWN_COOLDOWN == 0 && Item.count < Item.MAX_ITEMS && !Game.instance.debug)
                Item.generate();

            //update all entities
            Bullet.updateAll();
            Item.updateAll();
            Enemy.updateAll();
            Game.instance.player.update();
            
            Interface.drawHealthbar();
        }
    }

    static start(){
        Interface.init();
        let instance = new Game(true);
        instance.player = new Player();

        instance.spawn_cooldown = 50;
        instance.spawn_timer =  instance.spawn_cooldown;

        Game.instance = instance;
        
        if(!Game.instance.debug){
            for(let i=0; i < 3; i++){
                Enemy.generate();
            }
        }

        setInterval(Game.update, 40);
    }
}
