/* Shortcuts */
const id = (idName) => document.getElementById(idName);

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
    if(saveItem()) {
        closeModal();
    } else {
        clearInput();
    }
});

function saveItem() {
    let imgSrc = id("image-input").value;
    const name = id("name-input").value;
    const price = id("price-input").value;
    const num = id("item-num-input").value;
    
    const imgError = imgValidate(imgSrc); errorHandler(imgError);
    const nameError = nameValidate(name); errorHandler(nameError);
    const priceError = priceValidate(price); errorHandler(priceError);
    const numError = numValivate(num); errorHandler(numError);
    if(imgError || nameError || priceError || numError) { return false; }

    imgSrc = `./image/${imgSrc.substring(12)}`;
    commit(imgSrc, name, price, num);
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

// State management

function isImgUploaded(src) {
    console.warn("TODO: image uploaded validation");
    return false;
}

function commit(imgSrc, name, price, num) {
    console.warn("TODO: commit item to state");
    console.log(imgSrc);
    console.log(name);
    console.log(price);
    console.log(num);
}