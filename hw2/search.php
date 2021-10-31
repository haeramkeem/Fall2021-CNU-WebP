<?php
if(isset($_GET["query"])) {
    $query = $_GET["query"];

    $file = fopen("bookList.json", "r");

    $res = [];
    while(!feof($file)) {
        $line = trim(fgets($file));
        if(strlen($line) > 0) {
            $json = json_decode($line, true);
            $is_bookname_includes = (strpos($json["bookName"], $query) !== false);
            $is_authors_includes = false;
            foreach ($json["authors"] as $author) {
                if(strpos($author, $query) !== false) {
                    $is_authors_includes = true;
                }
            }
            $is_publish_date_includes = (strpos($json["publishDate"], $query) !== false);
            $is_publisher_includes = (strpos($json["publisher"], $query) !== false);
            if($is_bookname_includes || $is_authors_includes || $is_publish_date_includes || $is_publisher_includes) {
                $res[] = $json;
            }
        }
    }

    fclose($file);
    echo json_encode($res, true);
}
?>