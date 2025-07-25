<?php
require_once __DIR__ ."/../db/config.php";
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$data = json_decode(file_get_contents("php://input"));

if($data){
    
    $pdo->beginTransaction();
    try{
        $userFb = $data->user ?? "";
        //Get user id from firebase uid
        $userSql = "SELECT id FROM user WHERE firebase_uid = ?";
        $userStmt = $pdo->prepare($userSql);
        $userStmt->execute([$userFb->uid]);
        $user = $userStmt->fetch();

        if(!$user){
            error_log("User fetch returned nothing for UID: " . $userFb->uid);
            echo json_encode(["error"=> "User not found in database"]);
            exit;
        }
        $userId = $user->id;
        //Insert a new Project with default Title
        $projectSql = "INSERT INTO projects (project_name) VALUES (?)";
        $projectStmt = $pdo->prepare($projectSql);
        $projectStmt->execute(["Unbenanntes Projekt"]);
        $projectID = $pdo->lastInsertId();

        //Now Insert Project id and userid into users_of_projects table
        $uopSql = "INSERT INTO users_of_project (role,user_id,project_id) VALUES (?,?,?)";
        $uopStmt = $pdo->prepare($uopSql);
        $uopStmt->execute(["owner", $userId, $projectID]);
        $pdo->commit();

        echo json_encode(["message"=>"project successfully added to db","project_id" => $projectID]);
    }catch(Exception $e){
        $pdo->rollBack();
        error_log("Transaction failed: " . $e->getMessage());
        echo json_encode(["error"=> $e->getMessage()]);
        exit;
    }
    
}
