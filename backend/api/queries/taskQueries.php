<?php 

function createANewTask($pdo , $title, $content, $colId, $projectId ){

    $stmt = $pdo->prepare("INSERT INTO tasks (head_line,content,column_id,project_id) VALUES (?,?,?,?)");
    $stmt->execute([$title,$content, $colId, $projectId]);
    return $pdo->lastInsertId();

}

function moveTaskToCol($pdo,$colId,$taskId){
    $stmt = $pdo->prepare("UPDATE tasks SET column_id = ? WHERE id=?");
    $stmt->execute([$colId,$taskId]);
    return $stmt->rowCount();
}