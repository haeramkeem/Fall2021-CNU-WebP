<?php 
    $search_word = $_GET["word"];

    $title_array=array();
    $author_array=array();

    $myfile = fopen("data.txt","r");
    
    while(!feof($myfile)){
        $now_str=fgets($myfile);
        $array_1=explode("|",$now_str);
        if(count($array_1) === 2) {
            array_push($title_array, $array_1[0]);
            array_push($author_array, $array_1[1]);
        }
    }
    
    
    $book=($_GET["type"] === "name");
    $author=($_GET["type"] === "author");
    
    if($book || $author){
        $now_array;
        if($book) $now_array=$title_array;
        else if($author) $now_array=$author_array;
    
        foreach ($now_array as $key => $value) {
            if(strpos($value, $search_word) !== false){
                echo("*".$value."<br>");
            }
        }
    }
?>