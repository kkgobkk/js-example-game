let canvas = document.getElementById("ctx");
let ctx = canvas.getContext("2d");
let MAX_X = canvas.width;
let MAX_Y = canvas.height;
ctx.font = "30px Arial";

let healthbar = document.getElementById("healthbar");
let healthbar_ctx = healthbar.getContext("2d");
healthbar_ctx.fillStyle = "#ff0000";
let time_box = document.getElementById("time_box");
let score_box = document.getElementById("score_box");

let difficulty_slider = document.getElementById("difficulty_slider");
