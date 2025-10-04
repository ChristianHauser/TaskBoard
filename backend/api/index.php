<?php 
require_once __DIR__ ."/init.php";

$path = $_GET['q'] ?? "";

switch($path){
    case "get-projectcolumns-by-id":
        require_once __DIR__ ."/handlers/getProjectColumns.php";
        break;
    
    case "get-all-projects-of-user":
        require_once __DIR__ ."/handlers/getProjectsOfUser.php";
        break;
    
    case "create-new-project":
        require_once __DIR__ ."/handlers/createANewProject.php";
        break;
    case "verify-user-with-firebase":
        require_once __DIR__ ."/handlers/verifyUser.php";
        break;
    case "register-new-user":
        require_once __DIR__ ."/handlers/registerNewUser.php";
        break;
    case "get-tasks-of-column":
        require_once __DIR__ ."/handlers/getTaskOfColumns.php";
        break;

    case "create-new-task":
        require_once __DIR__ ."/handlers/createANewTask.php";
        break;

    case "get-project-name":
        require_once __DIR__ ."/handlers/getProjectName.php";
        break;
    
    case "set-project-name":
        require_once __DIR__ ."/handlers/setProjectName.php";
        break;
    default:
        http_response_code(404);
        echo json_encode(['error' => 'Endpoint not found']);

}