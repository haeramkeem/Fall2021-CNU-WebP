<?php
session_start();
if(isset($_GET["sid"]) && (session_id() === $_GET["sid"]) && isset($_SESSION["id"]) && isset($_SESSION["pw"])) {
    echo $_SESSION["id"];
} else {
    echo "null";
}
?>