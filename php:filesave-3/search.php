<?php
    if(isset($_GET["search-word"]) && isset($_GET["type"]) && isset($_GET["min-grade"]) && isset($_GET["max-grade"])) {
        $word = $_GET["search-word"];
        $type = $_GET["type"];
        $min = (int)$_GET["min-grade"];
        $max = (int)$_GET["max-grade"];

        $file = fopen("data.json", "r");
        $res = [];
        while(!feof($file)) {
            $line = trim(fgets($file));
            if(strlen($line) > 1) {
                $json = json_decode($line);
                if($min <= $json->grade && $json->grade <= $max) {
                    if($type === "major" && strpos($json->major, $word) !== false) {
                        $res[] = $json;
                    } else if($type === "name" && strpos($json->name, $word) !== false) {
                        $res[] = $json;
                    }
                }
            }
        }
        fclose($file);

        if(count($res) < 1) {
            echo "검색된 결과가 없습니다.";
        } else {
            echo "<ul>";
            foreach($res as $el) {
                echo "<li>".$el->major.", ".$el->name.", ".$el->grade."</li>";
            }
            echo "</ul>";
        }
    }
?>