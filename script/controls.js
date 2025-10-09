document.addEventListener("mousemove", (mouse) =>
    {
    let x = mouse.clientX - canvas.getBoundingClientRect().left - player.x;
    let y = mouse.clientY - canvas.getBoundingClientRect().top - player.y;
    
    player.aim_angle = 180 / Math.PI * Math.atan2(y, x);
}
);

document.addEventListener("mousedown", (e) =>
    {
        if(e.button == 0)
            player.shooting = true;
    }
);

document.addEventListener("mouseup", (e) =>
    {
        if(e.button == 0)
            player.shooting = false;
    }
);

document.addEventListener("contextmenu", (e) =>
    {
        e.preventDefault();
        if(!player.shooting)
            perform_attack(player, "alt", 3, 3, 10, 10);
    }
);

document.addEventListener("keydown", (e) =>
    {
        if(e.code == "KeyW")
            player.pressing_up = true;
        else if(e.code == "KeyD")
            player.pressing_right = true;
        else if(e.code == "KeyS")
            player.pressing_down = true;
        else if(e.code == "KeyA")
            player.pressing_left = true;
    }
);

document.addEventListener("keyup", (e) =>
    {
        if(e.code == "KeyW")
            player.pressing_up = false;
        else if(e.code == "KeyD")
            player.pressing_right = false;
        else if(e.code == "KeyS")
            player.pressing_down = false;
        else if(e.code == "KeyA")
            player.pressing_left = false;
    }
);
