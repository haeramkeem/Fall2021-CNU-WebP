<?php
session_start();
if(!isset($_SESSION["id"]) || !isset($_SESSION["pw"])) {
    session_destroy();
    echo "로그인 후 대출 가능합니다.";
} else if(isset($_POST["books"])) {
    $books = json_decode($_POST["books"]);

    $file = fopen("bookList.json", "r");
    $to_rent = [];
    $remain = [];
    while(!feof($file)) {
        $line = trim(fgets($file));
        if(strlen($line) > 0) {
            $json = json_decode($line, true);
            $found = false;
            foreach ($books as $book) {
                if($json["bookName"] === $book) {
                    if($json["rental"] !== "keep") {
                        fclose($file);
                        echo "대출 가능한 도서만 선택해주세요.";
                        exit;
                    } else {
                        $found = true;
                    }
                }
            }
            if($found) {
                $to_rent[] = $json;              
            } else {
                $remain[] = $json;
            }
        }
    }
    fclose($file);

    $file = fopen($_SESSION["id"].".json", "a");
    foreach ($to_rent as $book) {
        $book["rental"] = "rented";
        $remain[] = $book;
        $info = new stdClass();
        $info->bookName = $book["bookName"];
        $info->rentalDate = date("Y-m-d");
        fwrite($file, json_encode($info)."\n");
    }
    fclose($file);

    $file = fopen("bookList.json", "w");
    foreach ($remain as $book) {
        fwrite($file, json_encode($book, true)."\n");
    }
    fclose($file);

    echo "대출되었습니다.";
}
?>