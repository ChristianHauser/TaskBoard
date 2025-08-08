<?php
require_once __DIR__ ."/../../api/init.php";
require_once __DIR__ ."/../queries/projectQueries.php";

$data = json_decode(file_get_contents("php://input"));

if($data){
    
    $pdo->beginTransaction();
    try{
        $projectId = $data->projectId ?? "";
        
        
        $columnsOfProj = getColumnsOfProjectWithId($pdo,$projectId);

        $pdo->commit();

        echo json_encode(["message"=>"project successfully added to db","columnsOfProj" => $columnsOfProj]);
    }catch(Exception $e){
        $pdo->rollBack();
        error_log("Transaction failed: " . $e->getMessage());
        echo json_encode(["error"=> $e->getMessage()]);
        exit;
    }
    
}
