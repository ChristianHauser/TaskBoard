<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
require_once __DIR__ . "/../vendor/autoload.php";
require_once __DIR__ ."/../db/config.php";

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");



$data = json_decode(file_get_contents("php://input"));

$userName = $data->userName ?? "";
$firebaseUid = $data->firebase_uid ?? "";

if($userName && $firebaseUid){

    try{
        $sql = "INSERT INTO user (user_name,firebase_uid) VALUES (?,?)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$userName, $firebaseUid]);

        echo json_encode(["message"=>"username and firebaseuid added"]);
    }catch(PDOException $e){
        echo json_encode(["error"=> "Database Register failed"]);
    }
    
    
}else{
    echo json_encode(["error"=> "registerphp error "]);
}
exit;