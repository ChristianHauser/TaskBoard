<?php
require_once __DIR__ ."/../../api/init.php";
require_once __DIR__ ."/../queries/userQueries.php";
require_once __DIR__ ."/../queries/userOfProjectQueries.php";
require_once __DIR__ ."/../queries/projectQueries.php";

$data = json_decode(file_get_contents("php://input"));

if($data){
    
    $pdo->beginTransaction();
    try{
        $userFb = $data->user ?? "";
        //Get user id from firebase uid
        if(!$userFb){
            error_log("Data package doesnt have firebase user: " . $userFb);
            echo json_encode(["error"=> "User not found in data"]);
            exit;
            
        }
        $user = getUserByFireBaseUid($pdo,$userFb->uid);

        if(!$user){
            error_log("User fetch returned nothing for UID: " . $userFb->uid);
            echo json_encode(["error"=> "User not found in database"]);
            exit;
        }
        $userId = $user->id;
        //Insert a new Project with default Title
        $defaultProjName = "Unbennantes Projekt";
        $projectId = insertNewProjectNameAndReturnId($pdo,$defaultProjName);



        //Now Insert Project id and userid into users_of_projects table
        $defaultRole = "owner";
        insertNewProjectIntoUOP($pdo,$defaultRole,$userId,$projectId);
        $pdo->commit();

        echo json_encode(["message"=>"project successfully added to db","project_id" => $projectId]);
    }catch(Exception $e){
        $pdo->rollBack();
        error_log("Transaction failed: " . $e->getMessage());
        echo json_encode(["error"=> $e->getMessage()]);
        exit;
    }
    
}
