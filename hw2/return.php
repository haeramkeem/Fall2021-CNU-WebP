<?php
session_start();
if(!isset($_SESSION["id"]) || !isset($_SESSION["pw"])) {
    echo "fail";
}
if(isset($_POST["books"])) {
    $books = json_decode($_POST["books"], true);

    $fname = $_SESSION["id"].".json";
    $file = fopen($fname, "r");
    $to_write = [];
    while(!feof($file)) {
        $line = trim(fgets($file));
        if(strlen($line) > 0) {
            $json = json_decode($line, true);
            $found = false;
            foreach ($books as $book) {
                if($json["bookName"] === $book) {
                    $found = true;
                }
            }
            if(!$found) {
                $to_write[] = $json;
            }
        }
    }
    fclose($file);

    $file = fopen($fname, "w");
    foreach ($to_write as $json) {
        fwrite($file, json_encode($json)."\n");
    }
    fclose($file);

    $file = fopen("bookList.json", "r");
    $blist = [];
    while(!feof($file)) {
        $line = trim(fgets($file));
        if(strlen($line) > 0) {
            $json = json_decode($line, true);
            foreach ($books as $book) {
                if($json["bookName"] === $book) {
                    $json["rental"] = "keep";
                }
            }
            $blist[] = json_encode($json);
        }
    }
    fclose($file);

    $file = fopen("bookList.json", "w");
    foreach ($blist as $line) {
        fwrite($file, $line."\n");
    }
    fclose($file);

    echo json_encode($to_write);
}
?>