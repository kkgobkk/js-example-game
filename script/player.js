let score = 0;

let player = {
    type: "player",
    x: 250,
    y: 70,
    speed_x: 10,
    speed_y: 10,
    color: "#2e962e",
    alt_color: "#80bb80",
    max_hp: 100,
    hp: 100,
    width: 20,
    height: 20,
    attack_cooldown: 10,
    attack_counter: 0,
    pressing_up: false,
    pressing_right:false,
    pressing_down: false,
    pressing_left: false,
    aim_angle: 0,
    shooting: false,
    i_frames: 0,
}

let update_player_position = function(){
    if(player.pressing_right)
        player.x += player.speed_x;
    if(player.pressing_left)
        player.x -= player.speed_x;
    if(player.pressing_down)
        player.y += player.speed_y;
    if(player.pressing_up)
        player.y -= player.speed_x;

    if(player.x < Math.floor(player.width/2)) player.x = Math.floor(player.width/2);
    if(player.x > MAX_X - Math.floor(player.width/2)) player.x = MAX_X - Math.floor(player.width/2);
    if(player.y < Math.floor(player.height/2)) player.y = Math.floor(player.height/2);
    if(player.y > MAX_Y - Math.floor(player.height/2)) player.y = MAX_Y - Math.floor(player.height/2);
    return true;
}
