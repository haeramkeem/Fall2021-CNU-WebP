<?php
if(isset($_GET["query"])) {
    $query = strtolower($_GET["query"]);
    $file = fopen("data.json", "r");
    $response = "";
    $idx = 0;
    while(!feof($file)) {
        $line = trim(fgets($file));
        if(strlen($line) > 0) {
            $json = json_decode($line, true);
            if(substr(strtolower($json["name"]), 0, strlen($query)) === $query) {
                $idx++;
                $response .= '<li><div><span class="major" onclick="showStudents(this.innerText, this.id)" id="s'.$idx.'">'.$json["major"].'</span>, '.$json["name"].'</div><div id="rs'.$idx.'" class="res"></div></li>';
            }
        }
    }
    fclose($file);

    echo $response;
}
?>