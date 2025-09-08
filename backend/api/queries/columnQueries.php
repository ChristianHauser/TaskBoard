<?php

function getTasksOfColumnId($pdo, $columnId){

    $sql = "SELECT * FROM tasks WHERE id = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$columnId]);
    return $stmt->fetchAll();
}