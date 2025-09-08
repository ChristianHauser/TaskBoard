<?php
require_once __DIR__ ."/../../api/init.php";
require_once __DIR__ ."/../queries/columnQueries.php";

$data = json_decode(file_get_contents("php://input"));

$columnId = $data->columnId ?? "";

if($columnId){

    //$taskArrayOfColumnId = getTasksOfColumnId($pdo,$columnId);
    //echo json_encode(["taskArrayOfColumnId" => $taskArrayOfColumnId]);
    echo json_encode(getTasksOfColumnId($pdo,$columnId));
}