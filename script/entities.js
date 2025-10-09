let AGGRO_DISTANCE = 200;
let MAX_ENEMIES = 20;

let = enemy_list = {};
let enemy_count = 0;

let new_enemy = function(type, id, x, y, speed_x, speed_y, width, height, hp){
    let enemy = {
        type: type,
        x: x,
        y: y,
        speed_x: speed_x,
        speed_y: speed_y,
        color: "#ff0000",
        alt_color: "#ff0000",
        id: id,
        width: width,
        height: height,
        aim_angle: 0,
        attack_cooldown: 50,
        attack_counter: 0,
        alt_attack_counter: 0,
        i_frames: 0,
        hp: hp,
    }
    enemy_list[id] = enemy;
    enemy_count ++;
}

let random_enemy = function(){
    let rand = Math.random();
    let speed, height, width, type;


    if(rand > 0.9){
        type = "ranged"; height = 15; width = 15; speed = 2; hp = 1;
    } 
    else if(rand > 0.75){
        type = "tank"; height = 30; width = 50; speed = 3; hp = 3;
    }
    else if(rand > 0.5){
        type = "runner"; height = 30; width = 20; speed = 7; hp = 1;
    }
    else{
        type = "normal"; height = 20; width = 20; speed = 5; hp = 1;
    }

    let pos_x, pos_y, counter = 0;

    do{
        counter++;
        pos_x = Math.ceil(width/2) + Math.random() * (MAX_X - width - 1);
        pos_y = Math.ceil(height/2) + Math.random() * (MAX_Y - height - 1);
    }while((distance({x:pos_x, y:pos_y}, player) < 100) && counter < 100)

    new_enemy(
        type,
        rand,
        pos_x,
        pos_y,
        speed,
        speed,
        width,
        height,
        hp,
    );
}

let distance = function(entity1, entity2){
    let dx = entity1.x - entity2.x;
    let dy = entity1.y - entity2.y;
    return Math.sqrt(dx*dx + dy*dy);
}

let collision_test = function(entity1, entity2){
    let x1 = entity1.x - Math.round(entity1.width / 2);
    let y1 = entity1.y - Math.round(entity1.height / 2);
    let x2 = entity2.x - Math.round(entity2.width / 2);
    let y2 = entity2.y - Math.round(entity2.height / 2);

    return x1 <= x2 + entity2.width
        && x2 <= x1 + entity1.width
        && y1 <= y2 + entity2.height
        && y2 <= y1 + entity1.height;
}

let bullet_list = {};

let new_bullet = function(id, x, y, speed_x, speed_y, width, height, timer, can_damage_player){
    let bullet = {
        type: "bullet",
        x: x,
        y: y,
        speed_x: speed_x,
        speed_y: speed_y,
        color: can_damage_player ? "#aa0000" : "#006600",
        alt_color: "#000000",
        id: id,
        width: width,
        height: height,
        timer: timer,
        i_frames: 0,
        can_damage_player: can_damage_player,
    }
    bullet_list[id] = bullet;
}

let shoot_bullet = function(actor, angle, bullet_lifetime){
    angle = angle / (180 / Math.PI)
    new_bullet(
        Math.random(),
        actor.x,
        actor.y,
        15* Math.cos(angle),
        15* Math.sin(angle),
        5,
        5,
        bullet_lifetime,
        actor.type == "player" ? 0 : 1,
    );
}

let perform_attack = function(actor, type, number, cooldown_factor, bullet_lifetime, recoil){
    if(number >= 72)  number = 72;
    if((type == "normal" && actor.attack_counter <= 0) || (type == "alt" && actor.alt_attack_counter <= 0) || type == "special"){
        for(let i = - Math.floor(number/2); i < Math.ceil(number/2); i++){
            shoot_bullet(actor, actor.aim_angle + (i * 5), bullet_lifetime);
        }
        if(recoil != undefined){
            actor.recoil_time = 10;
            actor.recoil_x = recoil * Math.cos(actor.aim_angle / (180 / Math.PI));
            actor.recoil_y = recoil * Math.sin(actor.aim_angle / (180 / Math.PI));
        }
        if(type == "normal")
            actor.attack_counter = actor.attack_cooldown * cooldown_factor;
        else if(type == "alt"){
            actor.alt_attack_counter = actor.attack_cooldown * cooldown_factor;
            actor.attack_counter = 0;
        }
    }
}

let update_bullet_position = function(bullet){
    bullet.timer --;
    bullet.x += bullet.speed_x;
    bullet.y += bullet.speed_y;
    
    return (bullet.timer > 0 && bullet.x <= MAX_X && bullet.x > 0 && bullet.y < MAX_Y && bullet.y > 0);

}

let update_entity_position = function(entity){
    if(entity.type == "player"){
        return update_player_position(entity);
    }
    else if(entity.type == "bullet"){
        return update_bullet_position(entity);
    }
    else{
        let delta_x = entity.speed_x;
        let delta_y = entity.speed_y;

        if(entity.type != "ranged" && distance(player, entity) <= AGGRO_DISTANCE){
            entity.aim_angle = Math.atan2(player.y - entity.y, player.x - entity.x) * 180 / Math.PI;
            delta_x = Math.abs(delta_x) * Math.cos(entity.aim_angle * Math.PI / 180);
            delta_y = Math.abs(delta_y)* Math.sin(entity.aim_angle * Math.PI / 180);
        }

        entity.x += delta_x;
        entity.y += delta_y;
        
        let x = entity.x - Math.round(entity.width / 2);
        let y = entity.y - Math.round(entity.height / 2);

        if(x + entity.width >= MAX_X || x <= 0){
            entity.speed_x = -entity.speed_x;
        }
        if(y + entity.height >= MAX_Y || y <= 0){
            entity.speed_y = -entity.speed_y;
        }
        return true;
    }
}

let draw_entity = function(entity){
    ctx.save();
    if(entity.i_frames <= 0)
        ctx.fillStyle = entity.color;
    else
        ctx.fillStyle = entity.alt_color;
    let width_offset = Math.round(entity.width/2);
    let height_offset = Math.round(entity.height/2);
    ctx.fillRect(entity.x - width_offset, entity.y - height_offset, entity.width, entity.height);
    ctx.restore();
}

let update_entity = function(entity){
    entity.attack_counter --;
    entity.alt_attack_counter --;
    let retv = update_entity_position(entity);
    if(retv) draw_entity(entity);
    return retv;
}

