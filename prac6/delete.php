<?php
    if(isset($_POST["name"])) {
        $name = $_POST["name"];

        $rfile = fopen("data.json", "r");
        $save = [];
        $res = [];
        while(!feof($rfile)) {
            $line = trim(fgets($rfile));
            if(strlen($line) > 1) {
                $json = json_decode($line);
                if($json->name !== $name) {
                    $save[] = $json;
                } else {
                    $res[] = $json;
                }
            }
        }
        fclose($rfile);

        $wfile = fopen("data.json", "w");
        foreach($save as $el) {
            fwrite($wfile, json_encode($el)."\n");
        }

        if(count($res) > 0) {
            foreach($res as $el) {
                echo $el->name." 학생을 삭제합니다.<br>";
            }
        } else {
            echo "학생이 없습니다.<br>";
        }
    }
?>