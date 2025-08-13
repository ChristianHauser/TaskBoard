<?php

require_once __DIR__ . "/../../vendor/autoload.php";
require_once __DIR__ ."/../db/api/init.php";





$data = json_decode(file_get_contents("php://input"));

$userName = $data->userName ?? "";
$firebaseUid = $data->firebase_uid ?? "";

if($userName && $firebaseUid){

    try{
        insertANewUser($pdo,$userName, $firebaseUid );

        echo json_encode(["message"=>"username and firebaseuid added"]);
    }catch(PDOException $e){
        echo json_encode(["error"=> "Database Register failed"]);
    }
    
    
}else{
    echo json_encode(["error"=> "registerphp error "]);
}
exit;