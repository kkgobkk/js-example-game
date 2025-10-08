document.addEventListener("mousemove", (mouse) =>
    {
    let x = mouse.clientX - canvas.getBoundingClientRect().left - player.x;
    let y = mouse.clientY - canvas.getBoundingClientRect().top - player.y;
    
    player.aim_angle = 180 / Math.PI * Math.atan2(y, x);
}
);

document.addEventListener("click", () =>
    {
        perform_attack(player, 1, 1);
    }
);

document.addEventListener("contextmenu", (e) =>
    {
        e.preventDefault();
        perform_attack(player, 3, 3);
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
