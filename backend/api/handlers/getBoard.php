<?php
require_once __DIR__ . "/../queries/projectQueries.php";
$data = json_decode(file_get_contents("php://input"));


$userId = $data->userId ?? "";
$projId = $data->projId ?? "";
$boardData = getBoard($pdo, $userId, $projId);

return json_encode(["board" => $boardData]); 
