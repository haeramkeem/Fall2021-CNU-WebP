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
            $.post("loginSubmit.php", {id, pw}, (data, status) => {
                if(status === "success" && data === "success") {
                    alert("로그인 되었습니다.")
                    $("#id-show-box").text(id);
                    $("#login-out-btn-box").html(`
                        <form action="logout.php" method="post" id="logout-form">
                            <input type="submit" value="로그아웃" name="submit">
                        </form>`);
                } else {
                    alert("아이디 혹은 비밀번호가 일치하지 않습니다.");
                }
                hideModal();
            });
        }
    });
}

function addSignInBtnClickEventListener() /* => void */ {
    $("#signin-btn").click(() => {
        const {id, pw} = idPwValidator();
        if(id !== "" && pw !== "") {
            $.post("signin.php", {id, pw}, (data, status) => {
                if(status === "success" && data === "success") {
                    alert("회원가입이 완료되었습니다.")
                } else {
                    alert("회원가입 도중 에러가 발생했습니다.");
                }
                hideModal();
            });
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