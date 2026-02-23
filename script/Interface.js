class Interface{
    static canvas;
    static ctx;
    static MAX_X;
    static MAX_Y;
    static healthbar;
    static healthbar_ctx;
    static time_box;
    static score_box;

    static init(){
        Interface.canvas = document.getElementById("ctx");
        Interface.ctx = Interface.canvas.getContext("2d");
        Interface.MAX_X = Interface.canvas.width;
        Interface.MAX_Y = Interface.canvas.height;
        Interface.ctx.font = "30px Arial";

        Interface.healthbar = document.getElementById("healthbar");
        Interface.healthbar_ctx = Interface.healthbar.getContext("2d");
        
        Interface.time_box = document.getElementById("time_box");
        Interface.score_box = document.getElementById("score_box");

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
    }

    static clearScreen(){
        Interface.ctx.clearRect(0, 0, Interface.MAX_X, Interface.MAX_Y)
    }

    static drawHealthbar = function(){
        let player = Game.instance.player;
        let healthbar = Interface.healthbar;
        let healthbar_ctx = Interface.healthbar_ctx;
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

    static updateScoreboard = function(){
        Interface.score_box.innerText = "score: " + Game.instance.score;
        Interface.time_box.innerText = "time: " + Math.floor((Date.now() - Game.instance.start_time) / 1000);
    }

    static drawEndScreen =function(){
        let ctx = Interface.ctx;
        let MAX_X = Interface.MAX_X;
        let MAX_Y = Interface.MAX_Y;
        let player = Game.instance.player;
        ctx.save();
        ctx.clearRect(0, 0, MAX_X, MAX_Y);
        ctx.textAlign = "center";
        ctx.font = "50px sans-serif";
        ctx.fillStyle = "#ff0000";
        ctx.fillText("Game Over", MAX_X/2, 225);
        ctx.font = "20px sans-serif"
        ctx.fillStyle = "#000000";
        ctx.fillText(Interface.time_box.innerText, MAX_X/2, 300);
        ctx.fillText("Kills: "+Game.instance.kill_count, MAX_X/2, 350);
        ctx.fillText(Interface.score_box.innerText, MAX_X/2, 400);
        ctx.fillStyle = "#666666";
        ctx.fillText("refresh the page to restart", MAX_X/2, 475);
        player.hp = player.max_hp;
        ctx.restore();
    }
}