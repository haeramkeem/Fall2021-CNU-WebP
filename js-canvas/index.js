let canvas = document.getElementById('myCanvas');
let ctx    = canvas.getContext('2d');

let x = -9999; let y = -9999;
let dir;
let timer;
let radius;

const cwidth = canvas.width;
const cheight = canvas.height;

$("#tryIt").click(function(){
    radius = parseInt($("#radius-inp").val());
    if(isNaN(radius) || radius < 5 || radius > 50) {
        alert("반지름을 다시 입력하세요");
    } else if(!isOut()) {
        if(x == -9999 && y == -9999) {
            x = -(2 * radius);
            y = radius;
            dir = "r";
        }
        move(dir);
    }
});

$("#stopIt").click(() => {
    clearInterval(timer);
});

function reset() {
    clearInterval(timer);
    ctx.clearRect(0, 0, cwidth, cheight);
}

function isOut() {
    if(x == -9999 && x == -9999) {
        return false;
    }
    if(x < -(2*radius) || y < -(2*radius) || x > cwidth + 2*radius || y > cheight + 2*radius) {
        return true;
    }
    return false;
}

$("#up-btn").click(() => {
    move("u");
});

$("#left-btn").click(() => {
    move("l");
});

$("#down-btn").click(() => {
    move("d");
});

$("#right-btn").click(() => {
    move("r");
});

function move(direction) {
    dir = direction;
    clearInterval(timer);
    dx = 0; dy = 0;
    switch(direction) {
        case "u": dy = -1; break;
        case "d": dy = 1; break;
        case "l": dx = -1; break;
        case "r": dx = 1; break;
    }
    timer = setInterval(function(){
        ctx.clearRect(0, 0, cwidth, cheight);
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2*Math.PI);
        ctx.stroke();
        x += dx;
        y += dy;
        if(isOut()){
            console.log("end");
            reset();
        }
    }, 10);
}