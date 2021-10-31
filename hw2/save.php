<?php
/************************************************************************
 *      PHP flie upload                                                 *
 *      reference: https://www.w3schools.com/php/php_file_upload.asp    *
 ************************************************************************/
$target_dir = "uploads/";
$target_file = $target_dir . basename($_FILES["bimage"]["name"]);
$uploadOk = 1;
$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

// Check if image file is a actual image or fake image
if(isset($_POST["submit"])) {
  $check = getimagesize($_FILES["bimage"]["tmp_name"]);
  if($check === false) {
    echo "이미지 파일이 아닙니다.\n";
    $uploadOk = 0;
  }
}

// Check if file already exists
if (file_exists($target_file)) {
  echo "파일이 이미 존재합니다.\n";
  $uploadOk = 0;
}

// Check file size
if ($_FILES["bimage"]["size"] > 500000) {
  echo "파일의 크기가 너무 큽니다.\n";
  $uploadOk = 0;
}

// Allow certain file formats
if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg" && $imageFileType != "gif" ) {
  echo ".jpg, .png, .jpeg, .gif 파일만 업로드 가능합니다.\n";
  $uploadOk = 0;
}

// Check if $uploadOk is set to 0 by an error
if ($uploadOk == 0) {
  echo "파일 업로드에 실패했습니다.";
// if everything is ok, try to upload file
} else {
  if (move_uploaded_file($_FILES["bimage"]["tmp_name"], $target_file)) {
      // Write to JSON
      if(isset($_POST["bname"]) && isset($_POST["bauthor0"]) && isset($_POST["bdate"]) && isset($_POST["bpublish"])) {
        $json = new stdClass();
        $json->bookName = $_POST["bname"];
        $json->authors = [$_POST["bauthor0"]];
        if(isset($_POST["bauthor1"])) {
            $json->authors[] = $_POST["bauthor1"];
        }
        if(isset($_POST["bauthor2"])) {
            $json->authors[] = $_POST["bauthor2"];
        }
        $json->publishDate = $_POST["bdate"];
        $json->publisher = $_POST["bpublish"];
        $json->fileName = basename($_FILES["bimage"]["name"]);
        $json->rental = "keep";
        $str_json = json_encode($json);
        $dfile = fopen("bookList.json", "a");
        fwrite($dfile, $str_json."\n");
        fclose($dfile);
        echo "저장되었습니다.\n";
      }
  } else {
    echo "Sorry, there was an error uploading your file.";
  }
}
?>