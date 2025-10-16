<?php 
require_once __DIR__ ."/init.php";

$path = $_GET['q'] ?? "";

$routes = [
    "get-projectcolumns-by-id" => "getProjectColumns.php",
    "get-all-projects-of-user" => "getProjectsOfUser.php",
    "create-new-project" => "createANewProject.php",
    "verify-user-with-firebase" => "verifyUser.php",
    "register-new-user" => "registerNewUser.php",
    "get-tasks-of-column" => "getTaskOfColumns.php",
    "create-new-task" => "createANewTask.php",
    "get-project-name" => "getProjectName.php",
    "set-project-name" => "setProjectName.php",
    "set-column-name" => "setColumnName.php",
    "get-board" => "getBoard.php",
    "move-task" => "moveTask.php",
];

if (array_key_exists($path, $routes)) {
    require_once __DIR__ . "/handlers/" . $routes[$path];
} else {
    http_response_code(404);
    echo json_encode(['error' => 'Endpoint not found']);
}

