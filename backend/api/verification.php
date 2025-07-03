<?php

require_once __DIR__ ."../vendor/autoload.php";

use Kreait\Firebase\Factory;
use Kreait\Firebase\Auth;

header("Content-Type: application/json");
header("Access-Controll-Allow-Origin: http://localhost:3000");

$factory = (new Factory())->withServiceAccount(__DIR__ ."/../credentials/serviceAccount.json");


$auth = $factory->createAuth();

$data = json_decode(file_get_contents("php://input"));

$userToken = $data->tokenId ?? "";

if(!$userToken){
    echo json_encode(["error"=> "Missing token from clientside"]);
    exit;
}
try{
    $verifyIdToken = $auth->verifyIdToken($userToken);
}catch(\Kreait\Firebase\Exception\AuthException $e){
    echo json_encode(["error"=> $e->getMessage()]);
}
$sql = "SELECT * FROM user WHERE token_id = ?";
$stmt = $pdo->prepare($sql);
$stmt->execute([$userToken]);
$dataBaseUserIdToken = $stmt->fetch();


if($dataBaseUserIdToken && $dataBaseUserIdToken->token_id === $userToken) {
    echo json_encode(["message" => "TokenId verified"]);
}

