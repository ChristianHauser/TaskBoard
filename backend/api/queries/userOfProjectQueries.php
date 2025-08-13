<?php

function insertNewProjectIntoUOP($pdo,$role,$userId,$projectId){
    $uopSql = "INSERT INTO users_of_project (role,user_id,project_id) VALUES (?,?,?)";
    $uopStmt = $pdo->prepare($uopSql);
    $uopStmt->execute([$role, $userId, $projectId]);
}