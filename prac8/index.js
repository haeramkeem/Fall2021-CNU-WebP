$(document).ready(function(){
    //dragstart
    $("#img1").on("dragstart", function(evt){
        evt.originalEvent.dataTransfer.setData('text',evt.target.id);
    });
    $("#img2").on("dragstart", function (evt) {
        evt.originalEvent.dataTransfer.setData('text', evt.target.id);
    });
    $("#img3").on("dragstart", function (evt) {
        evt.originalEvent.dataTransfer.setData('text', evt.target.id);
    });
    
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

    $("#clearBtn").click(function() {
        $("#img1").appendTo("#div1"); 
        $("#img2").appendTo("#div1");
        $("#img3").appendTo("#div1");
        
        localStorage.clear();
    });

    $("#div2").on("dragover", function (e){ e.preventDefault(); });
    $("#div3").on("dragover", function (e){ e.preventDefault(); });



    //drop
    $("#div2").on("drop", function(ev){
        ev.preventDefault();
        var data = ev.originalEvent.dataTransfer.getData("text");
        ev.target.appendChild(document.getElementById(data));
        localStorage.setItem(data, "div2");
    });

     //drop
     $("#div3").on("drop", function(ev){
        ev.preventDefault();
        var data = ev.originalEvent.dataTransfer.getData("text");
        ev.target.appendChild(document.getElementById(data));
        localStorage.setItem(data, "div3");
    });
});
