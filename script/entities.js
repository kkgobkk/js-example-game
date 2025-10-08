let = enemy_list = {};

let new_enemy = function(id, x, y, speed_x, speed_y, width, height){
    let enemy = {
        type: "enemy",
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
        attack_cooldown: 20,
        attack_counter: 0,
        i_frames: 0,
    }
    enemy_list[id] = enemy;
}

let random_enemy = function(){
    let rand = Math.random();
    let pos_x = rand*MAX_X;
    let pos_y = Math.random()*MAX_Y;
    let speed, height, width, type;

    if(pos_x == player.x && pos_y == player.y){
        pos_x += 30;
        if(pos_x >= MAX_X)
            pos_x -= 60;
    }

    if(rand > 0.9){
        type = "ranged"; height = 15; width = 15; speed = 2;
    } else if(rand > 0.75){
        type = "tank"; height = 30; width = 50; speed = 2;
    } else if(rand > 0.5){
        type = "runner"; height = 30; width = 20; speed = 7;
    } else{
        type == "normal"; height = 20; width = 20; speed = 4;
    }

    new_enemy(
        Math.random(),
        pos_x,
        pos_y,
        speed,
        speed,
        width,
        height,
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

let new_bullet = function(id, x, y, speed_x, speed_y, width, height){
    let bullet = {
        type: "bullet",
        x: x,
        y: y,
        speed_x: speed_x,
        speed_y: speed_y,
        color: "#000000",
        alt_color: "#000000",
        id: id,
        width: width,
        height: height,
        timer: 0,
        i_frames: 0,
    }
    bullet_list[id] = bullet;
}

let shoot_bullet = function(actor, angle){
    angle = angle / (180 / Math.PI)
    new_bullet(
        Math.random(),
        actor.x,
        actor.y,
        15* Math.cos(angle),
        15* Math.sin(angle),
        5,
        5,
    );
}

let perform_attack = function(actor, number, cooldown_factor){
    if(number == undefined)  number = 1;
    if(number >= 72)  number = 72;
    if(actor.attack_counter > actor.attack_cooldown * cooldown_factor){
        for(let i = - Math.floor(number/2); i < Math.ceil(number/2); i++){
            shoot_bullet(actor, actor.aim_angle + (i * 5));
        }
        actor.attack_counter = 0;
    }
}

let update_bullet_position = function(bullet){
    bullet.timer ++;
    bullet.x += bullet.speed_x;
    bullet.y += bullet.speed_y;
    
    return (bullet.timer < 50 && bullet.x <= MAX_X && bullet.x > 0 && bullet.y < MAX_Y && bullet.y > 0);

}

let update_entity_position = function(entity){
    if(entity.type == "player"){
        return update_player_position(entity);
    }
    else if(entity.type == "bullet"){
        return update_bullet_position(entity);
    }
    else{
        entity.x += entity.speed_x;
        entity.y += entity.speed_y;
        
        if(entity.x > MAX_X || entity.x < 0){
            entity.speed_x = -entity.speed_x;
        }
        if(entity.y > MAX_Y || entity.y < 0){
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
    let width_offset = Math.floor(entity.width/2);
    let height_offset = Math.floor(entity.height/2);
    ctx.fillRect(entity.x - width_offset, entity.y - height_offset, entity.width, entity.height);
    ctx.restore();
}

let update_entity = function(entity){
    let retv = update_entity_position(entity);
    draw_entity(entity);
    return retv;
}
