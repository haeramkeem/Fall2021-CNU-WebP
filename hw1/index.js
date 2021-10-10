/* Global variables */
const items = [];
const cart = {};

/* Shortcuts */
const id = (idName) => document.getElementById(idName);
const make = (tagName) => document.createElement(tagName);
const text = (textContent) => document.createTextNode(textContent);
const clas = (className) => Array.prototype.slice.call(document.querySelectorAll(`.${className}`));
const index = (target) => parseInt(target.id.split('-')[2]);

/* Modal */
// Show modal
id("add-item-btn").addEventListener("click", () => {
    id("modal-container").style.display = "block";
});

// Cancel
id("cancel-item-btn").addEventListener("click", () => {
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
id("save-item-btn").addEventListener("click", () => {
    if (saveItem()) { closeModal(); }
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
    if (imgError || nameError || priceError || numError) { return false; }

    addItem(imgSrc, name, price, num);
    return true;
}

function errorHandler(err) {
    if (err) { alert(err); }
}

function imgValidate(src) {
    if (src === "./image/") { return "상품 이미지를 추가하시오."; }
    if (!/(.png|.jpe?g)$/.test(src)) { return "이미지 파일이 아닙니다. ‘jpg’, ‘jpeg’ 또는 ‘png’을 확장자 로 가진 파일을 추가하시오."; }
    if (isImgUploaded(src)) { return "등록된 상품이 이미 있습니다."; }
    return "";
}

function isImgUploaded(src) {
    return items.filter(item => item.imgSrc == src).length != 0;
}

function nameValidate(name) {
    if (!name) { return "상품 이름을 입력하시오."; }
    if (!/[a-zA-Z]+/.test(name)) { return "문자로된 상품 이름을 입력하시오."; }
    return "";
}

function priceValidate(price) {
    if (!price) { return "상품 가격을 입력하시오."; }
    const refined = parseInt(price);
    if (isNaN(refined)) { return "상품 가격에 숫자를 입력하시오."; }
    if (parseInt(price) < 100) { return "상품 가격을 100 원 이상으로 입력하시오."; }
    return "";
}

function numValivate(num) {
    if (!num) { return "상품 개수를 입력하시오."; }
    const refined = parseInt(num);
    if (isNaN(refined)) { return "상품 개수에 숫자를 입력하시오."; }
    if (refined > 100) { return "최대 100개 이하로 입력하시오."; }
    if (refined < 1) { return "최소 1개 이상으로 입력하시오."; }
    return "";
}

/* Store */
function addItem(imgSrc, name, price, num) {
    items.push({ imgSrc, name, price, num, });
    render();
}

function render() {
    // Rendering items
    const itemContainer = id("item-container");
    const itemIter = itemContainer.children;
    while (itemIter.length > 0) {
        itemIter.item(0).remove();
    }
    items.forEach((item, idx) => {
        itemContainer.appendChild(getAnItem(item, idx));
    });

    // Rendering cart
    const cartContainer = id("cart-container");
    const cartIter = cartContainer.children;
    while (cartIter.length > 0) {
        cartIter.item(0).remove();
    }
    Object.entries(cart).forEach((item) => {
        cartContainer.appendChild(getAnCartItem(item[0], item[1]));
    });

    refreshCartTotal();
    setSelectAllBtn();
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
    el.classList.add("item-checkbox");
    el.id = `item-checkbox-${idx}`;
    table.appendChild(getItemTableRow(true, el));

    // item image
    el = make("img");
    el.src = item.imgSrc;
    table.appendChild(getItemTableRow(false, el));

    // item name
    el = text(item.name);
    table.appendChild(getItemTableRow(true, el));

    // item price
    el = text(item.price);
    table.appendChild(getItemTableRow(true, el, text(" 원")));

    // item num input
    el = make("input");
    el.type = "text";
    el.value = 1;
    el.setAttribute("size", "10");
    el.id = `item-num-${idx}`;
    el.addEventListener("keyup", inputNumCallback);
    table.appendChild(getItemTableRow(true, el, text(" 개")));

    // total amount
    el = make("span");
    el.appendChild(text(item.price));
    el.id = `item-total-${idx}`;
    table.appendChild(getItemTableRow(true, text("합계 "), el, text("원")));

    // remaining
    el = make("span");
    el.appendChild(text(item.num));
    table.appendChild(getItemTableRow(true, text("총 "), el, text("개 남음")));

    itemBox.appendChild(table);
    return itemBox;
}

function getItemTableRow(isTextCell, ...innerNodes) {
    const tr = make("tr");

    const td = make("td");
    td.classList.add("item-cell");
    if (isTextCell) { td.classList.add("item-text"); }

    innerNodes.forEach((node) => {
        td.appendChild(node);
    });
    tr.appendChild(td);

    return tr;
}

function inputNumCallback(event) {
    const target = event.target;
    const inputNum = parseInt(target.value);
    const idx = index(target);
    const total = id(`item-total-${idx}`);
    total.removeChild(total.childNodes.item(0));
    if (!isNaN(inputNum)) {
        total.appendChild(text(inputNum * items[idx].price));
    } else {
        total.appendChild(text("0"));
    }
}

function getAnCartItem(idx, item) {
    const tr = make("tr");

    // Checkbox
    let el = make("input");
    el.type = "checkbox";
    el.checked = item.isChecked;
    el.classList.add("cart-checkbox");
    el.id = `cart-checkbox-${idx}`;
    el.addEventListener("click", cartCheckboxCallback(idx));
    tr.appendChild(getCartTableData(el));

    // Cart item image
    el = make("img");
    el.src = item.imgSrc;
    tr.appendChild(getCartTableData(el));

    // Cart item name
    tr.appendChild(getCartTableData(text(item.name)));

    // Cart item price
    tr.appendChild(getCartTableData(text(item.price)));

    // Cart item num
    el = make("input");
    el.type = "text";
    el.value = item.num;
    el.id = `cart-input-${idx}`;
    const btn = make("button");
    btn.appendChild(text("변경"));
    btn.id = `cart-modify-${idx}`;
    btn.addEventListener("click", modifyNumCallback);
    tr.appendChild(getCartTableData(el, btn));

    // Cart item total
    el = make("span");
    el.appendChild(text(item.price * item.num));
    el.id = `cart-total-${idx}`;
    tr.appendChild(getCartTableData(el));

    return tr;
}

function getCartTableData(...innerNodes) {
    const td = make("td");
    innerNodes.forEach((node) => {
        td.appendChild(node);
    });
    return td;
}

function refreshCartTotal() {
    let acc = 0;
    clas("cart-checkbox").filter(item => item.checked).forEach((item) => {
        acc += parseInt(id(`cart-total-${index(item)}`).innerText);
    });
    id("cart-total").innerText = acc;
}

function cartCheckboxCallback(idx) {
    return () => {
        cart[idx].isChecked = !cart[idx].isChecked;
        refreshCartTotal();
        setSelectAllBtn();
    };
}

function setSelectAllBtn() {
    const cartCheckbox = clas("cart-checkbox");
    let acc = true;
    if (cartCheckbox.length == 0) {
        acc = false;
    } else {
        cartCheckbox.forEach((item) => {
            acc = item.checked ? acc : false;
        });
    }
    id("select-all-btn").checked = acc;
}

function modifyNumCallback(event) {
    const idx = index(event.target);
    const margin = parseInt(id(`cart-input-${idx}`).value) - cart["" + idx].num;
    if (items[idx].num < margin) {
        alert("남아있는 상품의 수가 부족합니다.");
        id(`cart-input-${idx}`).value = cart["" + idx].num;
    } else {
        items[idx].num -= margin;
        cart["" + idx].num += margin;
        render();
    }
}

/* Add to cart */
id("add-cart-btn").addEventListener("click", () => {
    clas("item-checkbox").filter(item => item.checked).forEach((checkbox) => {
        const idx = index(checkbox);
        const item = items[idx];
        const total = parseInt(id(`item-total-${idx}`).innerText);
        const num = total / item.price;
        if (0 < num && num <= item.num) {
            addCart(idx, num);
        }
    });
});

function addCart(idx, num) {
    if (cart["" + idx]) {
        cart["" + idx].num += num;
    } else {
        cart["" + idx] = {
            isChecked: true,
            imgSrc: items[idx].imgSrc,
            name: items[idx].name,
            price: items[idx].price,
            num,
        }
    }
    items[idx].num -= num;
    render();
}

id("select-all-btn").addEventListener("click", (event) => {
    const checkboxes = clas("cart-checkbox");
    for (let i = 0; i < checkboxes.length; i++) {
        checkboxes.item(i).checked = event.target.checked;
    }
    refreshCartTotal();
});

id("delete-selection-btn").addEventListener("click", () => {
    clas("cart-checkbox").filter(item => item.checked).forEach(item => {
        const idx = "" + index(item);
        items[index(item)].num += cart[idx].num;
        delete cart[idx];
    });
    render();
});