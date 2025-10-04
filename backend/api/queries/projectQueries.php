<?php 

function getColumnsOfProjectWithId($pdo,$projectId){
    $projStmt = $pdo->prepare("SELECT * FROM columns WHERE project_id = ?");
        $projStmt->execute([$projectId]);  
        return $projStmt->fetchAll();
}

function getAllProjectsOfUser($pdo, $userId){
    $projectSql = "SELECT p.id AS project_id, p.project_name, uop.role,updated_at 
                FROM user u JOIN users_of_project uop ON u.id = uop.user_id
                JOIN projects p ON p.id = uop.project_id
                WHERE u.id = ?";
                    
    $projectStmt = $pdo->prepare($projectSql);
    $projectStmt->execute([$userId]);
    return $projectStmt->fetchAll(PDO::FETCH_OBJ);
}

function insertNewProjectNameAndReturnId($pdo, $projName){
    $projectSql = "INSERT INTO projects (project_name) VALUES (?)";
    $projectStmt = $pdo->prepare($projectSql);
    $projectStmt->execute([$projName]);
    return $pdo->lastInsertId();
}

function insertTemplateColumns($pdo, $projectId){
    
    $templateSql = "INSERT INTO `columns` (project_id,`name`,position) SELECT :project_id,`name`,position FROM column_template ORDER BY position";
    $templateStmt = $pdo->prepare($templateSql);
    $templateStmt->execute([":project_id"=> $projectId]);
    
}
function getProjectName($pdo,$projId){
    $projNameSql = "SELECT project_name FROM projects WHERE id=?";
    $nameStmt = $pdo->prepare($projNameSql);
    $nameStmt->execute([$projId]);

    return $nameStmt->fetch();
}

function setProjectName($pdo,$projName, $projId){
    try{
        $setNameStmt = $pdo->prepare("UPDATE projects SET project_name=? WHERE id=?");
        $setNameStmt->execute([$projName, $projId]);
        return $setNameStmt->rowCount();   
    } catch (PDOException $e) {
    error_log("DB error: " . $e->getMessage());
    return false;
    }
}