<?php
session_start();
if(isset($_SESSION["id"]) && isset($_SESSION["pw"]) && isset($_GET["id"]) && ($_SESSION["id"] === $_GET["id"])) {
    $file = fopen($_SESSION["id"].".json", "r");
    $res = [];
    while(!feof($file)) {
        $line = trim(fgets($file));
        if(strlen($line) > 0) {
            $res[] = json_decode($line, true);
        }
    }
    fclose($file);
    echo json_encode($res, true);
} else {
    session_destroy();
    echo "fail";
}
?>