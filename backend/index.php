<?php session_start(); ?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    Hello
    
</html>

<?php
    
    require_once __DIR__ . "/db/config.php";
    //pdo query
    /* $stmt = $pdo->query("SELECT * FROM user");


    while($row = $stmt->fetch()){
        echo $row->user_name . "<br>";
    } */


    /* $email = "mr.chris.chris1@gmail.com";
    $newPass = "12345";
    $hashedPass = password_hash($newPass, PASSWORD_DEFAULT);
    $sql = ("UPDATE user SET password = ? WHERE email = ?");
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$hashedPass ,$email]); */




    //$user = $stmt->fetch();

    //UNSAFE
    //$sql = "SELECT * FROM taskboard WHERE user = $user";

    //FETCH MULTIPLE POSTS
    $password = "1234";
    $createdAt = "2025-06-17";
    $_SESSION ["password"] = $password;
    $_SESSION ["createdAt"] = $createdAt;
    //POSITIONAL PARAMETERS
    /* $sql = "SELECT * FROM user WHERE password = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$password]);
    $users = $stmt->fetchAll(); */

    //NAMED PARAMETERS
    /* $sql = "SELECT * FROM user WHERE password = :password && created_at >= :createdAt1 && created_at < DATE_ADD( :createdAt2 , INTERVAL 1 DAY)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(["password" => $password, "createdAt1" => $createdAt, "createdAt2" => $createdAt]);
    $users = $stmt->fetchAll(); */

    //var_dump($users);

    /* foreach($users as $user){
        echo $user->user_name . "<br>";
    } */

    
    //FETCH SINGLE POST
    /* $sql = "SELECT * FROM user WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(["id" => $id]);
    $users = $stmt->fetch(); */

    //GET ROW COUNT

    /* $stmt = $pdo->prepare("SELECT * FROM user WHERE password = ?");
    $stmt->execute([$password]);
    $postCount = $stmt->rowCount();
    echo $postCount; */

    //INSERT DATA
    /* $newUser = "Marcel";
    $newPassword = "12345";
    $sql = "INSERT INTO user(user_name,password) VALUES(?,?)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$newUser,$newPassword]);
    echo "User added"; */

    //UPDATE DATA
    $id = 5;
    /* $newUser = "Marcel Davis";
    $newPassword = "123456";
    $sql = "UPDATE user SET user_name = :username , password = :password WHERE(id = :id)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(["username" => $newUser,"password" =>$newPassword,"id"=>$id]);
    echo "User Updated"; */


    //DELETE DATA
    
    /* $sql = "DELETE FROM user WHERE id = :id";
    $stmt = $pdo->prepare($sql);
    $stmt->execute(["id"=>$id]);
    echo "User Deleted"; */

    //SEARCH DATA
   /*  $search = "%2025-06-18%";
    $sql = "SELECT * FROM user WHERE created_at LIKE ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$search]);
    
    $users = $stmt->fetchAll();

    foreach($users as $user){
        echo $user->user_name . "<br>";
    } */
    
?>


 
