<?php
require_once __DIR__ ."/../../api/init.php";
require_once __DIR__ . "/../queries/projectQueries.php";


    $data = json_decode(file_get_contents("php://input"));
if($data){
    $projectId = $data->projId ?? "";

    $projName = getProjectName($pdo,$projectId);

    echo json_encode(["projName" => $projName]);
}
