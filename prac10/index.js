const infoArray = [];

function StudentInfo(n, k, m, e, d) {
    this.name = n;
    this.korean = parseInt(k);
    this.math = parseInt(m);
    this.english = parseInt(e);
    this.dept = d;
    this.sum = 0;
    this.avg = 0;
}

StudentInfo.prototype.calcSum = function(koreanChecked, mathChecked, englishChecked) {
    this.sum = 0;
    if(koreanChecked) {
        this.sum += this.korean;
    }

    if(mathChecked) {
        this.sum += this.math;
    }

    if(englishChecked) {
        this.sum += this.english;
    }
}

StudentInfo.prototype.calcAvg = function(koreanChecked, mathChecked, englishChecked) {
    let acc = 0;
    let divider = 0;
    if(koreanChecked) {
        acc += this.korean;
        divider++;
    }

    if(mathChecked) {
        acc += this.math;
        divider++;
    }

    if(englishChecked) {
        acc += this.english;
        divider++;
    }
    this.avg = divider === 0 ? 0 : acc / divider;
}

$("document").ready(function() {
    $("#save").click(function() {
        const name = $("#name").val();
        const korean = $("#korean").val();
        const math = $("#math").val();
        const english = $("#english").val();
        const dept = $("#dept-select option:selected").val();
        infoArray.push(new StudentInfo(name, korean, math, english, dept));
        alert(infoArray.length + "개의 학생정보가 저장되었습니다.");
    });

    $("#search").click(function() {
        $("#search-result").empty();

        const kchecked = $("#korean-check").is(":checked");
        const mchecked = $("#math-check").is(":checked");
        const echecked = $("#english-check").is(":checked");
        for(const student of infoArray) {
            const sum = student.calcSum(kchecked, mchecked, echecked);
            const avg = student.calcAvg(kchecked, mchecked, echecked);
        }

        const order = $("#order-select option:selected").val();
        if(order === "asc") {
            infoArray.sort((a, b) => (a.avg - b.avg));
        } else {
            infoArray.sort((a, b) => (b.avg - a.avg));
        }

        let acc = 0;
        let cnt = 0;
        const dept = $("#search-dept-select option:selected").val();
        for(const student of infoArray) {
            if(dept === "모두" || student.dept === dept) {
                const name = student.name;
                const sum = student.sum;
                acc += sum;
                cnt++;
                const avg = student.avg;
                $("#search-result").append(`<li>${name}) 총점: ${sum} 평균점수 : ${avg}</li>`);
            }
        }

        if(cnt !== 0) {
            $("#search-result").append(`<br><br>${dept === "모두" ? "모든 " : ""}학과 평균: ${acc / cnt}`);
        }
    });
});

