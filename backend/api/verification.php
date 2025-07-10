<?php

require_once __DIR__ ."/../vendor/autoload.php";
require_once __DIR__ ."/../db/config.php";

use Kreait\Firebase\Factory;
use Kreait\Firebase\Auth;
use Kreait\Firebase\Exception\AuthException;
use Firebase\Auth\Token\Exception\UnknownKey;

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");



if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: http://localhost:3000");
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type, Authorization");
    http_response_code(200);
    exit();
}
$factory = (new Factory())->withServiceAccount(__DIR__ ."/../credentials/serviceAccount.json");

$auth = $factory->createAuth();

$headers = array_change_key_case(getallheaders(), CASE_LOWER);
//var_dump(getallheaders());
$authoHeader = $headers["authorization"] ?? $_SERVER["HTTP_AUTHORIZATION"] ?? "";

if(preg_match("/Bearer\s(\S+)/", $authoHeader, $matches)) {

    $userToken = $matches[1];
}else{
    http_response_code(401);
    echo json_encode(["error"=> "Missing or invalid Auth Header"]);
    exit;
}
//$data = json_decode(file_get_contents("php://input"));

//$userToken = $data->tokenId ?? "";


try{
    //DOES NOT WORK LOCALLY
    //$verifyIdToken = $auth->verifyIdToken($userToken);

    //$uid = $verifyIdToken->claims()->get('sub');
    
    //DOING THIS ONLY LOCALLY xxxx.yyyyy.cccc.
    $parts = explode('.', $userToken);
    $payloadBase64 = strtr($parts[1], '-_', '+/');
    $payloadJson = base64_decode($payloadBase64);
    $payload = json_decode($payloadJson, true);
    $uid = $payload['sub'] ?? null;

    $userSql = "SELECT * FROM user WHERE firebase_uid = ?";
    $userStmt = $pdo->prepare($userSql);
    $userStmt->execute([$uid]);
    $user = $userStmt->fetch();

    if(!$user){
        http_response_code(404);
        echo json_encode(["error"=> "User not found"]);
        exit;
    }
    
    echo json_encode(["Message" => "Token is verified", "user" => $user]);
    exit;

} catch (UnknownKey $e) {
    http_response_code(401);
    echo json_encode(["error" => "Token verification failed: " . $e->getMessage()]);
    exit;
} catch (AuthException $e) {
    http_response_code(401);
    echo json_encode(["error" => "Authorization not successful: " . $e->getMessage()]);
    exit;
} catch (\Throwable $e) {
    http_response_code(500);
    echo json_encode(["error" => "Internal server error: " . $e->getMessage()]);
    exit;
}





