$(function() {
    addSearchBtnClickEventListener();
});

function addSearchBtnClickEventListener() /* => void */ {
    $("#search-btn").click(() => {
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

        $.get(`search.php?query=${$("#query-input").val()}`, (data, status) => {
            if(status === "success") {
                Array.prototype.slice.call(JSON.parse(data)).forEach((el) => {
                    $("#result-rows").append(objToTableRow(el));
                });
            }
        });
    });
}

function objToTableRow(obj /* : {bookName: string, authors: array<string>, publishDate: string, publisher: string, fileName: string, rental: string} */) /* => void */ {
    return `
    <tr>
        <td><input type="checkbox"></td>
        <td>${obj.bookName}</td>
        <td>${obj.authors.join()}</td>
        <td>${obj.publishDate}</td>
        <td>${obj.publisher}</td>
        <td><a href="uploads/${obj.fileName}" target="_blank">미리보기</a></td>
        <td>${obj.rental}</td>
    </tr>`;
}