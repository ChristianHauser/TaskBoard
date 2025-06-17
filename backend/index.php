<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    Hello
</body>
</html>

<?php

    $host = "localhost";
    $user = "root";
    $password = "12345";
    $dbName = "taskboard";

    //data source n dsn
    $dsn = "mysql:host=$host;dbname=$dbName";

    //Pdo instanz
    $pdo = new PDO($dsn,$user, $password);

    //pdo query
    $stmt = $pdo->query("SELECT * FROM user");


    while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
        echo $row["user_name"] . "<br>";
    }
