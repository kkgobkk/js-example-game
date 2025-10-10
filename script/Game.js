class Game{
    static instance;

    start_time;
    frame_count;
    spawn_cooldown;
    spawn_timer;
    over;
    kill_count;
    player;
    score;

    constructor(){
        this.start_time = Date.now();
        this.frame_count = 0;
        this.spawn_timer = 0;
        this.kill_count = 0;
        this.score = 0;
        this.over = false;
    }

    static start(){
        Interface.init();
        let instance = new Game();
        instance.player = new Player();

        instance.spawn_cooldown = 50;
        instance.spawn_timer =  instance.spawn_cooldown;

        Game.instance = instance;

        for(let i=0; i < 3; i++){
            Enemy.generate();
        }
    }
}