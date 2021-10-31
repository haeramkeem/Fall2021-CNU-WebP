/* ----- Shortcuts ----- */
const toArray = (obj) => Array.prototype.slice.call(obj);
/* ----- Main Flow ----- */
$(function() {
    checkLoginStatus();
    addLogInBtnClickEventListener();
    addSubmitBtnClickEventListener();
    addSignInBtnClickEventListener();
    addSearchBtnClickEventListener();
    addRentBtnClickEventListener();
    addMypageBtnClickEventListener();
});

function checkLoginStatus() /* => void */ {
    const sid = document.cookie.split("=")[1];
    if(sid) {
        $.get("amILogin.php?sid=" + sid, (data, status) => {
            if(status === "success") {
                if(data !== "null") {
                    setToLoggedIn(data);
                } else {
                    setToLoggedOut();
                }
            }
        });
    }
}

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

function setToLoggedIn(id /* : string */) /* => void */ {
    $("#id-show-box").text(id);
    $("#login-out-btn-box").html('<input type="button" value="로그아웃" id="logout-btn">');
    addLogOutBtnClickEventListener();
}

function addLogOutBtnClickEventListener() /* => void */ {
    $("#logout-btn").click(() => {
        $.post("logout.php", {submit: ""}, (data, status) => {
            if(status === "success" && data === "success") {
                alert("로그아웃이 되었습니다.");
                setToLoggedOut();
            }
        });
    });
}

function setToLoggedOut() /* => void */ {
    $("#id-show-box").text("");
    $("#login-out-btn-box").html('<input type="submit" value="로그인" id="login-btn">');
    addLogInBtnClickEventListener();
}

function addSubmitBtnClickEventListener() /* => void */ {
    $("#login-submit-btn").click(() => {
        const {id, pw} = idPwValidator();
        if(id !== "" && pw !== "") {
            $.post("loginSubmit.php", {id, pw}, (data, status) => {
                if(status === "success" && data === "success") {
                    alert("로그인 되었습니다.")
                    setToLoggedIn(id);
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

function addSearchBtnClickEventListener() /* => void */ {
    $("#search-btn").click(() => {
        render();
    });
}

function render() /* => void */ {
    const query = $("#query-input").val();
    if(query.length > 0) {
        $("#result-container").html(`
        <table id="result-table">
            <thead>
                <tr>
                    <th>선택</th>
                    <th>제목</th>
                    <th>저자</th>
                    <th>출판년월일</th>
                    <th>출판사</th>
                    <th>화일</th>
                    <th>대출여부</th>
                </tr>
            </thead>
            <tbody id="result-rows">
            </tbody>
        </table>`);
        $.get(`search.php?query=${query}`, (data, status) => {
            if(status === "success") {
                toArray(JSON.parse(data)).forEach((el) => {
                    $("#result-rows").append(objToResultRow(el));
                });
            }
        });
    } else {
        alert("검색어를 입력해주세요.");
    }
}

function objToResultRow(obj /* : {bookName: string, authors: Array<string>, publishDate: string, publisher: string, fileName: string, rental: string} */) /* => void */ {
    return `
    <tr>
        <td><input type="checkbox" value="${obj.bookName}" class="result-row-checkbox"></td>
        <td>${obj.bookName}</td>
        <td>${obj.authors.join()}</td>
        <td>${obj.publishDate}</td>
        <td>${obj.publisher}</td>
        <td><a href="uploads/${obj.fileName}" target="_blank">미리보기</a></td>
        <td>${obj.rental}</td>
    </tr>`;
}

function addRentBtnClickEventListener() /* => void */ {
    $("#rent-btn").click(() => {
        const arr = [];
        $(".result-row-checkbox").each((idx, el) => {
            if(el.checked) {
                arr.push(el.value);
            }
        });
        if(arr.length > 0) {
            $.post("rent.php", {
                books: JSON.stringify(arr)
            }, (data, status) => {
                if(status === "success") {
                    alert(data);
                    render();
                }
            });
        } else {
            alert("책을 선택해주세요.");
        }
    });
}

function addMypageBtnClickEventListener() /* => void */ {
    $("#mypage-btn").click(() => {
        const id = $("#id-show-box").text();
        $.get("mypage.php?id=" + id, (data, status) => {
            if(status === "success") {
                if(data === "fail") {
                    alert("로그인 후, 대출정보 보기가 가능합니다.");
                } else {
                    $("#login-out-btn-box").html('<span id="id-suffix">님</span>');
                    $("#mypage-btn").html("");
                    $("#action-box").html('<input type="button" value="반납하기" id="return-btn">');
                    addReturnBtnClickEventListener();
                    $("#search-container").html("");
                    renderMypage(data);
                }
            }
        });
    });
}

function renderMypage(data /* : string */) /* => void */ {
    $("#result-container").html(`
    <table id="mypage-table">
        <thead>
            <tr>
                <th>선택</th>
                <th>책 제목</th>
                <th>대출 날짜</th>
            </tr>
        </thead>
        <tbody id="mypage-rows">
        </tbody>
    </table>`);
    toArray(JSON.parse(data)).forEach((el) => {
        $("#mypage-rows").append(objToMypageRow(el));
    });
}

function objToMypageRow(obj /* : {bookName: string, rentalDate: string} */) /* => void */ {
    return `
        <tr>
            <td><input type="checkbox" value="${obj.bookName}" class="mypage-row-checkbox"></td>
            <td>${obj.bookName}</td>
            <td>${obj.rentalDate}</td>
        <tr>`;
}

function addReturnBtnClickEventListener() /* => void */ {
    $("#return-btn").click(() => {
        const arr = [];
        $(".mypage-row-checkbox").each((idx, el) => {
            if(el.checked) {
                arr.push(el.value);
            }
        });
        if(arr.length > 0) {
            $.post("return.php", {
                books: JSON.stringify(arr)
            }, (data, status) => {
                if(status === "success") {
                    if(data === "fail") {
                        alert("로그인이 필요합니다.");
                    } else {
                        alert("반환되었습니다.");
                        renderMypage(data);
                    }
                }
            });
        } else {
            alert("책을 선택해주세요.");
        }
    });
}