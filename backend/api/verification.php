<?php

require_once __DIR__ ."../db/config.php";

header("Content-Type: application/json");
header("Access-Controll-Allow-Origin: http://localhost:3000");


$data = json_decode(file_get_contents("php://input"));

$userToken = $data->tokenId ?? "";

$sql = "SELECT * FROM user WHERE token_id = ?";
$stmt = $pdo->prepare($sql);
$stmt->execute([$userToken]);
$dataBaseUserIdToken = $stmt->fetch();

if($userToken || $dataBaseUserIdToken) {
    if($dataBaseUserIdToken == $userToken) {
        echo json_encode("user logged in");
    }
}
