let start_time, frame_count, spawn_cooldown, spawn_timer, game_over, kill_count;

let start_game = function(){
    game_over = false;
    start_time = Date.now();
    kill_count = 0;
    frame_count = 0;
    spawn_cooldown = (5 - difficulty_slider.value) * 50;
    spawn_timer = spawn_cooldown;
    player.hp = player.max_hp;
    player.shield = 0,
    player.x = MAX_X / 2 - player.width / 2;
    player.y = MAX_Y / 2 - player.height / 2;
    score = 0;
    enemy_list = {};
    enemy_count = 0;
    item_list = {};
    item_count = 0;
    bullet_list = {};
    random_enemy();
    for(let i=0; i < difficulty_slider.value; i++){
        random_enemy();
    }
}

let draw_healthbar = function(){
    if(player.hp < 0.25 * player.max_hp)
        healthbar_ctx.fillStyle = "#ff0000";
    else if(player.hp < 0.5 * player.max_hp)
        healthbar_ctx.fillStyle = "#ff9900";
    else if(player.hp < 0.75 * player.max_hp)
        healthbar_ctx.fillStyle = "#ffff00";
    else
        healthbar_ctx.fillStyle = "#00ff00";

    healthbar_ctx.clearRect(0, 0, healthbar.width, healthbar.height);
    healthbar_ctx.fillRect(0, 0, healthbar.width * player.hp / player.max_hp, healthbar.height);
    healthbar_ctx.fillStyle = "#5599ff";
    healthbar_ctx.fillRect(0, 0, healthbar.width * (player.hp - player.max_hp) / player.max_hp, healthbar.height);
}

let update = function(){
    console.log(player.hp)
    if(!game_over){
    ctx.clearRect(0, 0, MAX_X, MAX_Y);
    score += 5;
    frame_count ++;
    if(player.i_frames > 0)
        player.i_frames --;
    if(player.i_frames < 0)
        player.i_frames = 0;
    player.attack_counter --;
    if(spawn_timer == 0){
        if(enemy_count < MAX_ENEMIES)
            random_enemy();
        spawn_timer = spawn_cooldown;
    }
    else
        spawn_timer --;

    if(frame_count % ITEM_SPAWN_COOLDOWN == 0 && item_count < MAX_ITEMS)
        random_item();
    
    if(player.shooting){
        perform_attack(player, "normal", 1, 1, 50);
    }

    for(let i in bullet_list){
        if(!update_entity(bullet_list[i])){
            delete bullet_list[i];
        }
        else if(bullet_list[i].can_damage_player == false){
            for(let j in enemy_list){
                if(collision_test(bullet_list[i], enemy_list[j])){
                    delete bullet_list[i];
                    enemy_list[j].hp --;
                    if(enemy_list[j].hp <= 0){
                        delete enemy_list[j];
                        enemy_count --;
                        kill_count ++;
                        score += 1000;
                    }
                    break;
                }
            }
        }
        else if(collision_test(bullet_list[i], player)){
            if(player.i_frames <= 0){
                player.hp -= 10;
                player.i_frames = 25;
            }
            delete bullet_list[i];
        }
    }

    for(let i in enemy_list){
        let enemy = enemy_list[i];
        update_entity(enemy);
        if(collision_test(player, enemy) && player.i_frames <= 0){
            player.hp -= 10;
            player.i_frames = 25;
        }
        if(enemy.type == "ranged"){
            enemy.attack_counter --;
            if(enemy.attack_counter <= 0){
                enemy.aim_angle = Math.atan2(player.y - enemy.y, player.x - enemy.x) * 180 / Math.PI;
                perform_attack(enemy, "normal", 1, 1, 100);
            }
        }
    }

    for(let i in item_list){
        update_entity(item_list[i]);
        if(collision_test(player, item_list[i])){
            if(activate_item(item_list[i].type)){
                delete item_list[i];
                item_count --;
            }
        }
    }

    update_entity(player);

    if(player.hp <= 0){
        console.log("Game Over! Score: " + score);
        game_over = true;
        ctx.save();
        ctx.clearRect(0, 0, MAX_X, MAX_Y);
        ctx.textAlign = "center";
        ctx.font = "50px sans-serif";
        ctx.fillStyle = "#ff0000";
        ctx.fillText("Game Over", MAX_X/2, 225);
        ctx.font = "20px sans-serif"
        ctx.fillStyle = "#000000";
        ctx.fillText(time_box.innerText, MAX_X/2, 300);
        ctx.fillText("Kills: "+kill_count, MAX_X/2, 350);
        ctx.fillText(score_box.innerText, MAX_X/2, 400);
        ctx.fillStyle = "#666666";
        ctx.fillText("refresh the page to restart", MAX_X/2, 475);
        player.hp = player.max_hp;
        ctx.restore();
    }
    
    draw_healthbar();
    score_box.innerText = "score: " + score;
    if(frame_count % 25 == 0)
        time_box.innerText = "time: " + Math.floor((Date.now() - start_time) / 1000);
    }
}

start_game();
setInterval(update, 40);
