const eventDataSend = (event) => { event.originalEvent.dataTransfer.setData('text',event.target.id)};
const setPreventDefault = (event) => { event.preventDefault(); }

function render() {
    $("#plans").html("");
    $("#today").html("");
    $("#tomorrow").html("");
    for(let i = 0; i < localStorage.length; i++) {
        const eid = localStorage.key(i);
        if(eid === "idx") { continue; }
        const par = localStorage.getItem(eid).split("->")[0];
        const plan = localStorage.getItem(eid).split("->")[1];
        switch(par) {
            case "plans" :
                $("#plans").append(`<div class="plan" id="${eid}" draggable="true">${plan}</div>`);
                break;
            case "today" : 
                $("#today").append(`<div class="plan" id="${eid}" draggable="true">${plan}</div>`);
                break;
            case "tomorrow" : 
                $("#tomorrow").append(`<div class="plan" id="${eid}" draggable="true">${plan}</div>`);
                break;
        }
        $(`#${eid}`).on("dragstart", eventDataSend);
    }
}

$(document).ready(function(){
    // init idx
    if(!localStorage.getItem("idx")) {
        localStorage.setItem("idx", "0");
    }

    // add plan
    $("#add-plan-btn").click(() => {
        localStorage.setItem(`plan-${localStorage.getItem("idx")}`, `plans->${$("#add-plan-input").val()}`);
        $("#add-plan-input").val("");
        render();
        localStorage.setItem("idx", parseInt(localStorage.getItem("idx")) + 1);
    });

    // read btn
    $("#readBtn").click(function() {
        render();
    });

    // clear btn
    $("#clearBtn").click(function() {
        $(".plan").each((idx, el) => {
            if(localStorage.getItem(el.id).startsWith("plans")) { return; }
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