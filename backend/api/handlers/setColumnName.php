<?php
require_once __DIR__ . "/../queries/columnQueries.php";

$data = json_decode(file_get_contents("php://input"));

$colId = $data->colId ?? "";
$colName = $data->newColName ?? "";

try{
    setNameOfColumnId($pdo,$colId, $colName);
    echo json_encode(["message" => "Column name successfully changed"]);
}catch(e){
    echo json_encode(["message" => $e]);
}

