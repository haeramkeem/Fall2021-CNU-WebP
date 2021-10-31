<?php
if(isset($_POST["submit"])) {
    session_start();
    session_destroy();
}
?>
<meta http-equiv="refresh" content="0;url=search.html" />