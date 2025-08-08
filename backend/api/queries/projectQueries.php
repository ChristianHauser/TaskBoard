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

