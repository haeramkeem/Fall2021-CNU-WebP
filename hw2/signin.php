<?php
if(isset($_POST["id"]) && isset($_POST["pw"])) {
    $id = $_POST["id"];
    $pw = $_POST["pw"];
    $json = new stdClass();
    $json->id = $id;
    $json->Password = $pw;
    $str_json = json_encode($json);

    $file = fopen("person.json", "a");
    fwrite($file, $str_json."\n");
    fclose($file);
    echo "success";
}
?>