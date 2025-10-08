let item_list = {};
let item_count = 0;

let new_item = function(type, id, x, y, speed_x, speed_y, width, height, color){
    let item = {
        type: type,
        x: x,
        y: y,
        speed_x: speed_x,
        speed_y: speed_y,
        color: color,
        alt_color: color,
        id: id,
        width: width,
        height: height,
        i_frames: 0,
    }
    item_list[id] = item;
    item_count ++;
}

let random_item = function(){
    let type, color;
    let rand = Math.random();
    if(rand > 0.9){
        type = "shoot";
        color = "#992299";
    }
    else if(rand > 0.8){
        type = "shield";
        color = "#5599ff";
    }
    else if(rand > 0.6){
        type = "heal";
        color = "#00ff00"
    }
    else{
        type = "points";
        color = "#ff9900";
    }

    new_item(
        type,
        Math.random(),
        10 + Math.random()*(MAX_X - 20),
        10 + Math.random()*(MAX_Y - 20),
        0,
        0,
        10,
        10,
        color
    );
}

let activate_item = function(type){
    let done = false;

    if(type == "points"){
        score += 500;
        done = true;
    }
    else if(type == "heal" && player.hp < player.max_hp){
        player.hp += 10;
        if(player.hp > 100) player.hp = 100;
        done = true;
    }
    else if(type == "shoot"){
        perform_attack(player, 72, 0);
        done = true;
    }
    else if(type == "shield"){
        player.i_frames = 125;
        return true;
    }

    return done;
}
