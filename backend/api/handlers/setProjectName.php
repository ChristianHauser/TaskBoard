<?php
require_once __DIR__ ."/../../api/init.php";
require_once __DIR__ . "/../queries/projectQueries.php";

$data = json_decode(file_get_contents("php://input"));

$projName = $data->projectName ?? "";
$projId = $data->projectId ?? "";
setProjectName($pdo,$projName,$projId);

echo json_encode(["message"=>"success"]);