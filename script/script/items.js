let item_list = {};

let new_item = function(id, x, y, speed_x, speed_y, width, height){
    let item = {
        type: "item",
        x: x,
        y: y,
        speed_x: speed_x,
        speed_y: speed_y,
        color: "#ff9900",
        id: id,
        width: width,
        height: height,
    }
    item_list[id] = item;
}

let random_item = function(){
    new_item(
        Math.random(),
        Math.random()*MAX_X,
        Math.random()*MAX_Y,
        0,
        0,
        10,
        10,
    );
}