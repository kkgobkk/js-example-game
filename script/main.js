let start_time, frame_count, spawn_cooldown, spawn_timer;

let start_game = function(){
    start_time = Date.now();
    frame_count = 0;
    spawn_cooldown = (5 - difficulty_slider.value) * 50;
    spawn_timer = spawn_cooldown;
    player.hp = player.max_hp;
    player.x = MAX_X / 2 - player.width / 2;
    player.y = MAX_Y / 2 - player.height / 2;
    score = 0;
    enemy_list = {};
    item_list = {};
    bullet_list = {};
    random_enemy();
    random_enemy();
    random_enemy();
}

let update = function(){
    ctx.clearRect(0, 0, MAX_X, MAX_Y);
    score += 5;
    frame_count ++;
    if(player.i_frames > 0)
        player.i_frames --;
    if(player.i_frames < 0)
        player.i_frames = 0;
    player.attack_counter ++;
    if(spawn_timer == 0){
        random_enemy();
        spawn_timer = spawn_cooldown;
    }
    else
        spawn_timer --;

    if(frame_count % 100 == 0)
        random_item();

    for(let i in bullet_list){
        if(!update_entity(bullet_list[i])){
            delete bullet_list[i];
        }
        else{
            for(let j in enemy_list){
                if(collision_test(bullet_list[i], enemy_list[j])){
                    score += 100;
                    delete bullet_list[i];
                    delete enemy_list[j];
                    break;
                }
            }
        }  
    }

    for(let i in enemy_list){
        update_entity(enemy_list[i]);
        if(collision_test(player, enemy_list[i]) && player.i_frames ==0){
            player.hp -= 5;
            player.i_frames = 25;
        }
    }

    for(let i in item_list){
        update_entity(item_list[i]);
        if(collision_test(player, item_list[i])){
            if(activate_item(item_list[i].type))
                delete item_list[i];
        }
    }

    if(player.hp <= 0){
        console.log("Game Over! Score: " + score);
        start_game();
    }

    update_entity(player);
    ctx.fillText("HP: " + player.hp, 10, 30);
    ctx.fillText("Score: " + score, 150, 30);
}

start_game();
setInterval(update, 40);
