<?php
/* require_once __DIR__ ."/../db/config.php";
require_once __DIR__ ."/../loadAnyEnv.php";

require __DIR__ ."/../vendor/autoload.php";
session_start();
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");


use Firebase\JWT\JWT;
use Firebase\JWT\Key;

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$data = json_decode(file_get_contents("php://input"));

$email = $data->email ?? "";
$user_name = $data->user_name ??"";
$password = $data->password ?? "";

if(!$email || !$password || !$user_name){
    http_response_code(400);
    echo json_encode(["error" => "You have to fill in email and password and username"]);
    exit();
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid email format."]);
    exit();
}



$checkSql ="SELECT * FROM user WHERE email = ?";
$check = $pdo->prepare($checkSql);

$check->execute([$email]);

if($check->fetch()){
    http_response_code(409);
    echo json_encode(["error"=> "Email is already registered"]);
    exit();
}

$hashedPassword = password_hash($password, PASSWORD_DEFAULT);
$sql ="INSERT INTO user(user_name,email,password) VALUES (?,?,?)";
$stmt = $pdo->prepare($sql);
$stmt->execute([$user_name,$email, $hashedPassword]);

//BLOCK JWT TOKEN TILL EMAIL IS VERIFIED?
$selectUserByMail = "SELECT * FROM user WHERE email = ?";
$checkEmailVerification = $pdo->prepare($selectUserByMail);
$checkEmailVerification->execute([$email]);
$user = $checkEmailVerification->fetch();

if($user->email_verified){
    $user_id = $user->id;

    $payload = [
        "sub" => $user_id,
        "iat" => time(),
        "exp" => time()+ 3600 * 24,
    ];

    $secretKey = getenv("TOKEN_KEY");

    $jwt = JWT::encode($payload, $secretKey, ["HS256"]);

    setcookie("token", $jwt, [
        "expires" => time()+3600*24,
        "path" => "/",
        "httponly" => true,
        "samesite" => "Lax",
        "secure" => false
    ]);
}

echo json_encode(["success"=> true,"message"=>"registered new user"]);
exit(); */