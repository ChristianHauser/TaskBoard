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

    $uid = $verifiedIdToken->claims()->get('sub');

    $userSql = "SELECT * FROM user WHERE firebase_uid = ?";
    $userStmt = $pdo->prepare($userSql);
    $userStmt->execute([$uid]);
    $user = $userStmt->fetch();
    

    $projectSql = "SELECT p.id AS project_id, p.project_name, uop.role 
                   FROM user u JOIN users_of_project uop ON u.id = uop.user_id
                   JOIN projects p ON p.id = uop.project_id
                   WHERE u.id = ?";
                    
    $projectStmt = $pdo->prepare($projectSql);
    $projectStmt->execute([$user->id]);
    $projectsFetch = $projectStmt->fetchAll(PDO::FETCH_OBJ);

    

    foreach( $projectsFetch as $projects){
        echo $projects->project_name;
        echo $projects->role;
    }

    echo json_encode(["Message" => "Token is verified", "user" => $user]);

}catch(\Kreait\Firebase\Exception\AuthException $e){
    echo json_encode(["error"=> "Invalid token" . $e->getMessage()]);
}




$sql = "SELECT * FROM user WHERE token_id = ?";
$stmt = $pdo->prepare($sql);
$stmt->execute([$userToken]);
$dataBaseUserIdToken = $stmt->fetch();


if($dataBaseUserIdToken && $dataBaseUserIdToken->token_id === $userToken) {
    echo json_encode(["message" => "TokenId verified"]);
}

