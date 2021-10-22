<?php 
    $old = $_POST["old"];
    $new = $_POST["new"];

    $ronly = fopen("data.txt","r");

    $map = array();
    $mauthor = "";
    
    while(!feof($ronly)){
        $line=trim(fgets($ronly));
        $split=explode("|",$line);
        if(count($split) === 2) {
            if($split[0] === $old) {
                $mauthor = $split[1];
                $map[] = $new."|".$split[1];
            } else {
                $map[] = implode("|", $split);
            }
        }
    }
    fclose($ronly);
    $wonly = fopen("data.txt","w");
    fwrite($wonly, implode("\n", $map));
    if($mauthor !== "") {
        echo "$mauthor 저자의 '$old'가 수정되었습니다.<br>수정 후 도서명 : $new\n";
    } else {
        echo "책이 존재하지 않습니다.\n";
    }

?>