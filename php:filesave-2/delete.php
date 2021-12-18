<?php 
    $word = $_POST["word"];
    $type = $_POST["type"];

    $ronly = fopen("data.txt","r");

    $map = array();

    $dbook = "";
    $dauthor = "";
    
    while(!feof($ronly)){
        $line=fgets($ronly);
        $split=explode("|",$line);
        if(count($split) === 2) {
            $book = trim($split[0]);
            $author = trim($split[1]);
            if(($type === "book" && $book === $word) || ($type === "author" && $author === $word)) {
                $dbook = $book;
                $dauthor = $author;
            } else {
                $map[] = "$book|$author";
            }
        }
    }
    fclose($ronly);
    $wonly = fopen("data.txt","w");
    fwrite($wonly, implode("\n", $map));
    if($dauthor !== "" && $dbook !== "") {
        echo "$dauthor 저자의 '$dbook'가 삭제되었습니다.\n";
    } else {
        echo "책이 존재하지 않습니다.\n";
    }

?>