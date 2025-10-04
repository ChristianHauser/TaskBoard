<?php

   
//$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    require_once __DIR__ ."/../loadAnyEnv.php";


    loadEnv(__DIR__ .'/../.env');
    //var_dump(getenv("DB_HOST"), getenv("DB_USER"), getenv("DB_NAME"));
    $host = getenv("DB_HOST");
    
    $user = getenv("DB_USER");
    $passwordEnv = getenv("DB_PASS");
    
    $dbName = getenv("DB_NAME");

    //data source n dsn
    $dsn = "mysql:host=$host;dbname=$dbName";

    //Pdo instanz
    $pdo = new PDO(dsn: $dsn,username: $user, password: $passwordEnv);
    $pdo -> setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

