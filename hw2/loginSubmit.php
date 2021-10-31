<?php
session_start();
if(isset($_POST["id"]) && isset($_POST["pw"])) {
    $id = $_POST["id"];
    $pw = $_POST["pw"];
    $found = false;
    if(isset($_SESSION["id"]) && $_SESSION["id"] === $id && isset($_SESSION["pw"]) && $_SESSION["pw"] === $pw) {
        echo "success";
        exit;
    }
    $file = fopen("person.json", "r");
    while(!feof($file) && !$found) {
        $line = trim(fgets($file));
        if(strlen($line) > 0) {
            $json = json_decode($line, true);
            if($json["id"] === $id && $json["Password"] === $pw) {
                $found = true;
            }
        }
    }   
    fclose($file); 
    if($found) {
        $_SESSION["id"] = $id;
        $_SESSION["pw"] = $pw;
        echo "success";
    } else {
        session_destroy();
        echo "fail";
    }
}
?>