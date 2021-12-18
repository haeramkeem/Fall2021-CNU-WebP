<?php
    if(isset($_POST["major"]) && isset($_POST["name"]) && isset($_POST["grade"])) {
        $major = $_POST["major"];
        $name = $_POST["name"];
        $grade = (int)$_POST["grade"];

        $json = new stdClass();
        $json->major = $major;
        $json->name = $name;
        $json->grade = $grade;

        $json_str = json_encode($json);

        $file = fopen("data.json", "a");
        fwrite($file, $json_str."\n");

        echo "저장되었습니다.<br>";

        fclose($file);
    }
?>