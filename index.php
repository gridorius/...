<!DOCTYPE html>
<html lang="ru" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>game</title>
    <link rel="stylesheet" href="/style/main.css">
    <?php
    include_once 'Builder.php';
    (new Builder('js/'))->list("<script src='","'></script>");
    ?>
  </head>
  <body>

    <script type="text/javascript" src="Main.js"></script>
  </body>
</html>
