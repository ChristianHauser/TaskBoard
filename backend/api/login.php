<?php
require_once __DIR__ ."/../db/config.php";
/* var_dump(getenv("DB_PASS"));
var_dump($pdo);
exit; */

session_start();

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:3000");

header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");




//var_dump(session_get_cookie_params());
// Handle preflight (OPTIONS request)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$data = json_decode(file_get_contents("php://input"));

$email = $data->email ?? "";

$password = $data->password ?? "";



if(!$email || !$password){
    http_response_code(400);
    echo json_encode(["error" => "You have to fill in email and password or else"]);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid email format."]);
    exit;
}



$sql = ("SELECT * FROM user WHERE email = ?");
$stmt = $pdo->prepare($sql);
$stmt->execute([$email]);
$user = $stmt->fetch();

if($user && password_verify($password,  $user->password)){
    $_SESSION['id'] = $user->id;
    echo json_encode(["message"=> "Login successfull!"]);
}else{
    http_response_code(400);
    echo json_encode(["error"=> "Wrong email or password"]);
}



//if (isset($_SESSION["id"])) {