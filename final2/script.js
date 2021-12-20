let cnt = 0.01;
let timer = null;
const rank = [];

$(() => {
    $("#start-btn").click((event) => {
        makePuzzle();
        draggable();
        timer = setInterval(counter, 10);
        event.target.disabled = true;
    });

    $("#stop-btn").click(() => {
        endPuzzle(false);
    });
});

function draggable() {
    for(let i = 1; i < 10; i++) {
        const target = document.getElementById(`img${i}.jpg`);
        target.addEventListener("dragstart", dragstart);
        target.addEventListener("dragover", dragover);
        target.addEventListener("drop", drop);
    }
}

function undraggable() {
    for(let i = 1; i < 10; i++) {
        const target = document.getElementById(`img${i}.jpg`);
        target.removeEventListener("dragstart", dragstart);
        target.removeEventListener("dragover", dragover);
        target.removeEventListener("drop", drop);
    }
}

function isSorted() {
    for(let i = 1; i < 10; i++) {
        const target = document.getElementById(`img${i}.jpg`);
        if(target.parentElement.id !== `img${i}`) {
            return false;
        }
    }
    return true;
}

function makePuzzle() {
    const visited = [false, false, false, false, false, false, false, false, false];

    for(let i = 1; i < 10; i++) {
        const target = document.getElementById(`img${i}.jpg`);
        let rand = getRandomInt(1, 9);
        for(; visited[rand - 1]; rand = getRandomInt(1, 10)) {}
        document.getElementById(`img${rand}`).appendChild(target);
        visited[rand - 1] = true;
    }
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function endPuzzle(isWin) {
    clearInterval(timer);
    for(let i = 1; i > 10; i++) {
        const target = document.getElementById(`img${i}.jpg`);
        const par = document.getElementById(`img${i}`);
        par.appendChild(target);
    }
    if(isWin) {
        rank.push(cnt);
        rank.sort();
        $("#ranking-out").empty();
        for(let el of rank) {
            $("#ranking-out").append(`<li>${el}</li>`);
        }
        alert("게임이 종료되었습니다.");
        alert(`소요시간: ${cnt}`);
    }

    $("#start-btn").disabled = false;
    cnt = 0;
    timer = null;
    undraggable();
}

function counter() {
    cnt = Math.round((cnt + 0.01) * 100) / 100;
    $("#timer-out").text(cnt);
}

function dragstart(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function dragover(event) {
    event.preventDefault();
}

function drop(event) {
    event.preventDefault();
    const fromId = event.dataTransfer.getData("text");
    const toId = event.target.id;

    const fromEl = document.getElementById(fromId);
    const toEl = document.getElementById(toId);

    const fromPar = fromEl.parentElement;
    const toPar = toEl.parentElement;

    fromPar.appendChild(toEl);
    toPar.appendChild(fromEl);

    if(isSorted()) {
        endPuzzle(true);
    }
}