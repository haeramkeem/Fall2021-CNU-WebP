const eventDataSend = (event) => { event.originalEvent.dataTransfer.setData('text',event.target.id)};
const setPreventDefault = (event) => { event.preventDefault(); }

function incIdx() {
    const idx = parseInt(localStorage.getItem("idx"))
    localStorage.setItem("idx", idx + 1);
}

function render() {
    $("#plans").html("");
    $("#today").html("");
    $("#tomorrow").html("");
    for(let i = 0; i < localStorage.length; i++) {
        const eid = localStorage.key(i);
        if(eid === "idx") {continue;}
        const par = localStorage.getItem(eid).split("->")[0];
        const plan = localStorage.getItem(eid).split("->")[1];
        switch(par) {
            case "plans" :
                $("#plans").append(`<div class="plan" id="${eid}" draggable="true">${plan}</div>`); break;
            case "today" : 
                $("#today").append(`<div class="plan" id="${eid}" draggable="true">${plan}</div>`); break;
            case "tomorrow" : 
                $("#tomorrow").append(`<div class="plan" id="${eid}" draggable="true">${plan}</div>`); break;
        }
    }
}

$(document).ready(function(){
    // init idx
    if(!localStorage.getItem("idx")) {
        localStorage.setItem("idx", "0");
    }

    // add plan
    $("#add-plan-btn").click(() => {
        const plan = $("#add-plan-input").val();
        $("#add-plan-input").val("");

        const idx = localStorage.getItem("idx");
        const id = `plan-${idx}`;

        localStorage.setItem(id, `plans->${plan}`);
        $("#plans").append(`<div class="plan" id="${id}" draggable="true">${plan}</div>`);
        $(`#${id}`).on("dragstart", eventDataSend);
        incIdx();
    });

    // read btn
    $("#readBtn").click(function() {
        render();
    });

    // clear btn
    $("#clearBtn").click(function() {
        $(".plan").each((idx, el) => {
            if(localStorage.getItem(el.id) === "plans") { return; }
            localStorage.removeItem(el.id);
        });
        render();
    });

    // on drag over
    $("table").on("dragover", setPreventDefault);

    // on drop
    $("table").on("drop", (event) => {
        event.preventDefault();
        const id = event.originalEvent.dataTransfer.getData("text");
        const el = document.getElementById(id);
        event.target.appendChild(el);
        localStorage.setItem(id, `${event.target.id}->${el.innerText}`);
    })
});