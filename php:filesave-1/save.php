<?php 
    $bookName = $_GET["name"];
    $author = $_GET["author"];
    
    $f = fopen("data.txt","a");
    fwrite($f, $bookName . "|" . $author . "\n");
    fclose($f);
    
    echo "<h1>저장되었습니다.";
?>