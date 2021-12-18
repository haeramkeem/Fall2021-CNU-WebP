function showResult(str) {
  if (str.length == 0) {
    $("#liveSearch").html("");
    return;
  }
  // liveSearch를 비움
  $("#liveSearch").empty();

  let xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      $("#liveSearch").html(this.responseText);
    }
  };

  xmlhttp.open("GET", "search.php?query=" + str, true);
  xmlhttp.send();
}

function showStudents(major, id) {
  const req = new XMLHttpRequest();
  req.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      $(`#r${id}`).html(this.responseText);
    }
  };

  req.open("GET", "searchStudent.php?query=" + major, true);
  req.send();
}