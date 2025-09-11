<?php
require_once __DIR__ ."/../../api/init.php";
require_once __DIR__ . "/../queries/taskQueries.php";

$data = json_decode(file_get_contents("php://input"));

$title = $data->title ?? "";
$content = $data->content ?? "";
$colId = $data->colId ?? "";
$projectId = $data->projectId ?? "";

$insertId = createANewTask($pdo, $title, $content, $colId,$projectId);

echo json_encode(["insertId" => $insertId]);