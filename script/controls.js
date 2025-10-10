document.addEventListener("mousemove", (e) =>
    {
    let x = e.clientX - Interface.canvas.getBoundingClientRect().left - Game.instance.player.x;
    let y = e.clientY - Interface.canvas.getBoundingClientRect().top -  Game.instance.player.y;
    
    Game.instance.player.aim_angle = 180 / Math.PI * Math.atan2(y, x);
}
);

document.addEventListener("mousedown", (e) =>
    {
        if(e.button == 0)
            Game.instance.player.shooting = true;
    }
);

document.addEventListener("mouseup", (e) =>
    {
        if(e.button == 0)
            Game.instance.player.shooting = false;
    }
);

document.addEventListener("contextmenu", (e) =>
    {
        e.preventDefault();
        if(!Game.instance.player.shooting)
            Game.instance.player.performAttack("alt", 3, 3, 10, 10);
    }
);

document.addEventListener("keydown", (e) =>
    {
        if(e.code == "KeyW")
            Game.instance.player.pressing_up = true;
        else if(e.code == "KeyD")
            Game.instance.player.pressing_right = true;
        else if(e.code == "KeyS")
            Game.instance.player.pressing_down = true;
        else if(e.code == "KeyA")
            Game.instance.player.pressing_left = true;
    }
);

document.addEventListener("keyup", (e) =>
    {
        if(e.code == "KeyW")
            Game.instance.player.pressing_up = false;
        else if(e.code == "KeyD")
            Game.instance.player.pressing_right = false;
        else if(e.code == "KeyS")
            Game.instance.player.pressing_down = false;
        else if(e.code == "KeyA")
            Game.instance.player.pressing_left = false;
    }
);
