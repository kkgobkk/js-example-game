let update = function(){
    if(!Game.instance.over){
        //update game information
        Interface.clearScreen();
        Game.instance.frame_count ++;
        Game.instance.score += 5;
        Interface.updateScoreboard();
        
        //spawn enemies and items
        if(Game.instance.spawn_timer == 0){
            if(Enemy.count < Enemy.MAX_ENEMIES)
                Enemy.generate();
            Game.instance.spawn_timer = Game.instance.spawn_cooldown;
        }
        else
            Game.instance.spawn_timer --;

        if(Game.instance.frame_count % Item.SPAWN_COOLDOWN == 0 && Item.count < Item.MAX_ITEMS)
            Item.generate();

        //update all entities
        Bullet.updateAll();
        Item.updateAll();
        Enemy.updateAll();
        Game.instance.player.update();
        
        Interface.drawHealthbar();
    }
}

Game.start();
setInterval(update, 40);
