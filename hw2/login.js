/* ----- Main Flow ----- */
$(function() {
    addLogInBtnClickEventListener();
    addSubmitBtnClickEventListener();
    addSignInBtnClickEventListener();
});

let modalVisible = false;
function addLogInBtnClickEventListener() /* => void */ {
    $("#login-btn").click(() => {
        if(modalVisible) {
            hideModal();
        } else {
            showModal();
        }
    });
}

function showModal() /* => void */ {
    $("#modal-container").show();
    modalVisible = true;
}

function hideModal() /* => void */ {
    $("#modal-container").hide();
    $("#id-input").val("");
    $("#pw-input").val("");
    modalVisible = false;
}

function addSubmitBtnClickEventListener() /* => void */ {
    $("#login-submit-btn").click(() => {
        const {id, pw} = idPwValidator();
        if(id !== "" && pw !== "") {
            console.log(id);
            console.log(pw);
        }
    });
}

function addSignInBtnClickEventListener() /* => void */ {
    $("#signin-btn").click(() => {
        const {id, pw} = idPwValidator();
        if(id !== "" && pw !== "") {
            console.log(id);
            console.log(pw);
        }
    });
}

function idPwValidator() /* => {id: string, pw: string} */ {
    const id = $("#id-input").val();
    const pw = $("#pw-input").val();
    if(!id || !pw || !/^([A-Za-z0-9]){6,15}$/.test(id) || !/^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/.test(pw)) {
        alert("아이디 또는 패스워드의 입력양식을 체크해주세요");
        if(id || pw) {
            hideModal();
        }
        return {id: "", pw: ""};
    }
    return {id, pw};
}