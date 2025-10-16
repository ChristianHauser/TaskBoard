<?php
require_once __DIR__ ."/../queries/taskQueries.php";
$data = json_decode(file_get_contents("php://input"));


$taskId = $data->taskId ?? "";
$colId = $data->colId ?? "";


$res = moveTaskToCol($pdo,$colId,$taskId);

echo json_encode($res);