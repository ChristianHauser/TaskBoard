<?php

use Kreait\Firebase\JWT\Action\VerifyIdToken;
use Firebase\Auth\Token\Exception\UnknownKey;
use Kreait\Firebase\Exception\AuthException;

require_once __DIR__ ."/../vendor/autoload.php";
require_once __DIR__ . "/../db/config.php";

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");



use Kreait\Firebase\Factory;
use Kreait\Firebase\Auth;

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Just respond with 200 OK and exit
    http_response_code(200);
    exit();
}

$factory = (new Factory())->withServiceAccount(__DIR__ ."/../credentials/serviceAccount.json");

$auth = $factory->createAuth();

$header = getallheaders(); 

$authoHeader = $header["Authorization"] ?? "";

if(preg_match("/Bearer\s(\S+)/" , $authoHeader,$matches)) {

    $userToken = $matches[1];
}else{
    http_response_code(404);
    echo json_encode(["error"=>"Missing or invalid Usertoken"]);
    exit;
}

try{
    $verifyIdToken = $auth->verifyIdToken($userToken);
    $uid = $verifyIdToken->claims()->get("sub");

    $uidSql = "SELECT * FROM user WHERE firebase_uid = ?";
    $stmt = $pdo->prepare($uidSql);
    $stmt->execute([$uid]);
    $user = $stmt->fetch();

    //echo json_encode(["message" => "token verified"]);
    
}catch (UnknownKey $e) {
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


$userId = $user->id ?? "";

if(!$userId){
    http_response_code(404);
    echo json_encode(["error"=> "Missing userid"]);
    exit;
};
$projectSql = "SELECT p.id AS project_id, p.project_name, uop.role 
                FROM user u JOIN users_of_project uop ON u.id = uop.user_id
                JOIN projects p ON p.id = uop.project_id
                WHERE u.id = ?";
                    
$projectStmt = $pdo->prepare($projectSql);
$projectStmt->execute([$userId]);
$projectsFetch = $projectStmt->fetchAll(PDO::FETCH_OBJ);

echo json_encode(["projectData"=> $projectsFetch]);
exit;
