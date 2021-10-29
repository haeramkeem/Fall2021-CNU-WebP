let idx = 0;

$(function() {
    $("#add-author-btn").click(() => {
        if(idx < 2) {
            idx++;
            $(`#book-author-input-${idx - 1}`).after($(`<input type="text" id="book-author-input-${idx}" name="bauthor${idx}" required>`));
        }
    });

    $("#del-author-btn").click(() => {
        if(idx > 0) {
            $(`#book-author-input-${idx}`).remove();
            idx--;
        }
    });
});