const table = document.getElementById("table");
let queue = [];
let tableSize = 0;
let tableArray = [];

document.getElementById("table-size-btn").addEventListener("click", (event) => {
    event.preventDefault();
    if(table.children.length == 0) {
        queue = [];
        tableArray = [];
        tableSize = parseInt(document.getElementById("table-size-input").value);
        for(let row = 0; row < tableSize; row++) {
            const tr = document.createElement("tr");
            let tableRow = [];
            for(let col = 0; col < tableSize; col++) {
                tr.appendChild(getTableCell(row, col));
                tableRow.push(Math.round(Math.random()));
            }
            table.appendChild(tr);
            tableArray.push(tableRow);
        }
        addTableDataEventListener();   
    }
});

document.getElementById("table-delete-btn").addEventListener("click", (event) => {
    event.preventDefault();
    const tableItems = table.children;
    while(tableItems.length != 0) {
        tableItems.item(0).remove();
    }
    setRes(0);
});

function addTableDataEventListener() {
    document.querySelectorAll("td").forEach((el) => {
        el.addEventListener("click", tdClickEventListener);
    });
}

function removeTableDataEventListener() {
    document.querySelectorAll("td").forEach((el) => {
        el.removeEventListener("click", tdClickEventListener);
    });
}

function tdClickEventListener(event) {
    event.preventDefault();
    const el = event.target;
    if(!el.childNodes[0]) {
        const targetXY = el.id.substring(1).split("-");
        const row = targetXY[0];
        const col = targetXY[1];
        const rand = tableArray[parseInt(row)][parseInt(col)];
        if(el.childNodes.length == 0) {
            el.appendChild(document.createTextNode(rand));
        }
        
        queue.push({ row, col, rand, });
    
        if(queue.length >= 2) {
            const t1 = queue.pop();
            const t2 = queue.pop();
            const c1 = document.getElementById(`c${t1.row}-${t1.col}`).childNodes[0];
            const c2 = document.getElementById(`c${t2.row}-${t2.col}`).childNodes[0];
            if(t1.rand !== t2.rand) {
                alert("값이 다릅니다.");
                c1.remove()
                c2.remove()
            } else {
                checkBingo();
            }
        }
    }
}

function getTableCell(row, col) {
    const td = document.createElement("td");
    td.id = `c${row}-${col}`;
    return td;
}

function setRes(bingoCnt) {
    const res = document.getElementById("line-result");
    res.childNodes[0].remove();
    res.appendChild(document.createTextNode(bingoCnt));
}

function checkBingo() {
    let bingo = 0;
    // row
    for(let row = 0; row < tableSize; row++) {
        let cnt = 0;
        for(let col = 0; col < tableSize; col++) {
            cnt += document.getElementById(`c${row}-${col}`).childNodes[0] ? 1 : 0;
        }
        bingo += cnt === tableSize ? 1 : 0;
    }

    // col
    for(let col = 0; col < tableSize; col++) {
        let cnt = 0;
        for(let row = 0; row < tableSize; row++) {
            cnt += document.getElementById(`c${row}-${col}`).childNodes[0] ? 1 : 0;
        }
        bingo += cnt === tableSize ? 1 : 0;
    }

    let cnt = 0;
    for(let down = 0; down < tableSize; down++) {
        cnt += document.getElementById(`c${down}-${down}`).childNodes[0] ? 1 : 0;
    }
    bingo += cnt === tableSize ? 1 : 0;

    cnt = 0;
    for(let up = 0; up < tableSize; up++) {
        cnt += document.getElementById(`c${up}-${tableSize - up - 1}`).childNodes[0] ? 1 : 0;
    }
    bingo += cnt === tableSize ? 1 : 0;

    // check
    if(bingo >= 4) {
        alert("BINGO!!!");
        setRes(bingo);
        removeTableDataEventListener();
    }
}