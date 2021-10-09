/* Global variables */
const items = [];

/* Shortcuts */
const id = (idName) => document.getElementById(idName);
const make = (tagName) => document.createElement(tagName);
const text = (textContent) => document.createTextNode(textContent);

/* Modal */
// Show modal
id("add-item-btn").addEventListener("click", (event) => {
    event.preventDefault();
    id("modal-container").style.display = "block";
});

// Cancel
id("cancel-item-btn").addEventListener("click", (event) => {
    event.preventDefault();
    closeModal();
    clearInput();
});

// Clear
function clearInput() {
    id("image-input").value = "";
    id("name-input").value = "";
    id("price-input").value = "";
    id("item-num-input").value = "";
}

// Close
function closeModal() {
    id("modal-container").style.display = "none";
}

// Save
id("save-item-btn").addEventListener("click", (event) => {
    event.preventDefault();
    if(saveItem()) { closeModal(); }
    clearInput();
});

function saveItem() {
    const imgSrc = `./image/${id("image-input").value.substring(12)}`;
    const name = id("name-input").value;
    const price = id("price-input").value;
    const num = id("item-num-input").value;
    
    const imgError = imgValidate(imgSrc); errorHandler(imgError);
    const nameError = nameValidate(name); errorHandler(nameError);
    const priceError = priceValidate(price); errorHandler(priceError);
    const numError = numValivate(num); errorHandler(numError);
    if(imgError || nameError || priceError || numError) { return false; }

    addItem(imgSrc, name, price, num);
    return true;
}

function errorHandler(err) {
    if(err) { alert(err); }
}

function imgValidate(src) {
    if(!src) { return "상품 이미지를 추가하시오."; }
    if(!/(.png|.jpe?g)$/.test(src)) { return "이미지 파일이 아닙니다. ‘jpg’, ‘jpeg’ 또는 ‘png’을 확장자 로 가진 파일을 추가하시오."; }
    if(isImgUploaded(src)) { return "등록된 상품이 이미 있습니다."; }
    return "";
}

function isImgUploaded(src) {
    return items.filter(item => item.imgSrc == src).length != 0;
}

function nameValidate(name) {
    if(!name) { return "상품 이름을 입력하시오."; }
    if(!/[a-zA-Z]+/.test(name)) { return "문자로된 상품 이름을 입력하시오."; }
    return "";
}

function priceValidate(price) {
    if(!price) { return "상품 가격을 입력하시오."; }
    const refined = parseInt(price);
    if(isNaN(refined)) { return "상품 가격에 숫자를 입력하시오."; }
    if(parseInt(price) < 100) { return "상품 가격을 100 원 이상으로 입력하시오."; }
    return "";
}

function numValivate(num) {
    if(!num) { return "상품 개수를 입력하시오."; }
    const refined = parseInt(num);
    if(isNaN(refined)) { return "상품 개수에 숫자를 입력하시오."; }
    if(refined > 100) { return "최대 100개 이하로 입력하시오."; }
    if(refined < 1) { return "최소 1개 이상으로 입력하시오."; }
    return "";
}

/* Store */
function addItem(imgSrc, name, price, num) {
    items.push({ imgSrc, name, price, num, });
    render();
}

function render() {
    const itemContainer = id("item-container");
    const itemIter = itemContainer.children;
    while(itemIter.length != 0) {
        itemIter.item(0).remove();
    }
    items.forEach((item, idx) => {
        itemContainer.appendChild(getAnItem(item, idx));
    });
}

function getAnItem(item, idx) {
    // item box
    const itemBox = make("div");
    itemBox.classList.add("item-box");

    // table
    const table = make("table");

    // checkbox
    let el = make("input");
    el.type = "checkbox";
    table.appendChild(getTableRow(true, el));

    // item image
    el = make("img");
    el.src = item.imgSrc;
    table.appendChild(getTableRow(false, el));

    // item name
    el = text(item.name);
    table.appendChild(getTableRow(true, el));

    // item price
    el = text(item.price);
    table.appendChild(getTableRow(true, el, text(" 원")));

    // item num input
    el = make("input");
    el.type = "text";
    el.setAttribute("size", "10");
    table.appendChild(getTableRow(true, el, text(" 개")));

    // total amount
    el = make("span");
    el.appendChild(text("0"));
    table.appendChild(getTableRow(true, text("합계 "), el, text("원")));
    
    // remaining
    el = make("span");
    el.appendChild(text(item.num));
    table.appendChild(getTableRow(true, text("총 "), el, text("개 남음")));

    itemBox.appendChild(table);
    return itemBox;
}

function getTableRow(isTextCell, ...innerNodes) {
    const tr = make("tr");

    const td = make("td");
    td.classList.add("item-cell");
    td.classList.add(isTextCell ? "item-text" : "item-img");

    innerNodes.forEach((node) => {
        td.appendChild(node);
    });
    tr.appendChild(td);

    return tr;
}

function commit(imgSrc, name, price, num) {
    console.warn("TODO: commit item to state");
    console.log(imgSrc);
    console.log(name);
    console.log(price);
    console.log(num);
}