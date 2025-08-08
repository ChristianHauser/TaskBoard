<?php

require_once __DIR__ ."/../../api/init.php";
require_once __DIR__ . "/../queries/userQueries.php";
require_once __DIR__ . "/../queries/projectQueries.php";

$data = json_decode(file_get_contents("php://input"));

$uid = $data->uid ?? "";

$user = getUserByFireBaseUid($pdo,$uid);

$userId = $user->id ?? "";

if(!$userId){
    http_response_code(404);
    echo json_encode(["error"=> "Missing userid"]);
    exit;
};

$projectsFetch = getAllProjectsOfUser($pdo,$userId);

echo json_encode(["projectData"=> $projectsFetch]);
exit;
