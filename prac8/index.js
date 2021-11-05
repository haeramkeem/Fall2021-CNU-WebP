const eventDataSend = (event) => { event.originalEvent.dataTransfer.setData('text',event.target.id)};
const setPreventDefault = (event) => { event.preventDefault(); }

let idx = 0;
$(document).ready(function(){
    // add plan
    $("#add-plan-btn").click(() => {
        const plan = $("#add-plan-input").val();
        $("#add-plan-input").val("");
        $("#plans").append(`<div class="plan" id="plan-${idx}" draggable="true">${plan}</div>`);
        $(`#plan-${idx}`).on("dragstart", eventDataSend);
        idx++;
    });

    // read btn
    $("#readBtn").click(function() {
        const img1 = localStorage.getItem("img1");
        const img2 = localStorage.getItem("img2");
        const img3 = localStorage.getItem("img3");

        if (!img1 && !img2 && !img3){
          alert("바구니에 담겨 있는 이미지가 없습니다.");
        }

        if(img1 != undefined) {
            $("#img1").appendTo(`#${img1}`);
        }

        if(img2 != undefined){
            $("#img2").appendTo(`#${img2}`);
        }
        if(img3 != undefined) {
            $("#img3").appendTo(`#${img3}`);
        }
    });

    // clear btn
    $("#clearBtn").click(function() {
        $("#img1").appendTo("#div1"); 
        $("#img2").appendTo("#div1");
        $("#img3").appendTo("#div1");
        
        localStorage.clear();
    });

    // on drag over
    $("table").on("dragover", setPreventDefault);

    // on drop
    $("table").on("drop", (event) => {
        event.preventDefault();
        const id = event.originalEvent.dataTransfer.getData("text");
        event.target.appendChild(document.getElementById(id));
        localStorage.setItem(id, event.target.id);
    })
});