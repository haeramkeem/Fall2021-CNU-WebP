document.getElementById("add-item-btn").addEventListener("click", event => {
    event.preventDefault();
    let itemLabel = "";
    if(itemLabel = prompt("추가할 목록을 입력하세요.")) {
        const root = document.getElementById("root");
        if(!root.lastChild) {
            newItem(root, itemLabel);
        } else {
            let it = root;
            for(; it.lastChild.lastChild; it = it.lastChild) {}
            newItem(it.parentNode, itemLabel);
        }
    } else {
        alert("값을 입력해주세요.");
    }
});

function newItem(parent, label) {
    const itemToAdd = document.createElement("li");
    itemToAdd.innerText = label;
    const childrenItems = document.createElement("ol");
    itemToAdd.appendChild(childrenItems);
    itemToAdd.addEventListener("click", moveItem);

    const level = parseInt(parent.getAttribute("level")) + 1;
    itemToAdd.setAttribute("level", level);
    childrenItems.setAttribute("level", level);
    parent.appendChild(itemToAdd);
}

function moveItem(event) {
    event.preventDefault();
    if(confirm("들여쓰기를 원하시나요?")) {
        let level = 0;
        if(level = parseInt(event.target.getAttribute("level")) < 3) {
            const prev = event.target.previousSibling;
            if(!prev) {
                alert("들여쓰기가 가능하지 않습니다.");
            } else {
                prev.lastChild.appendChild(event.target);
                event.target.setAttribute("level", level + 1);
                event.target.lastChild.setAttribute("level", level + 1);
                while(event.target.lastChild.children.length > 0) {
                    prev.lastChild.appendChild(event.target.lastChild.children[0]);
                }
            }
        } else {
            alert("들여쓰기가 가능하지 않습니다.");
        }
    } else {
        alert("들여쓰기가 취소되었습니다.");
    }
    event.stopPropagation();
}