<?php
if(isset($_GET["query"])) {
    $query = $_GET["query"];
    $file = fopen("data.json", "r");
    $response = "";
    while(!feof($file)) {
        $line = trim(fgets($file));
        if(strlen($line) > 0) {
            $json = json_decode($line, true);
            if($json["major"] === $query) {
                $response .= "<div>".$json["name"]."</div>";
            }
        }
    }
    fclose($file);

    echo $response;
}
?>