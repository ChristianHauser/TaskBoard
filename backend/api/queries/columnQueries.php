<?php

function getTasksOfColumnId($pdo, $columnId){

    $sql = "SELECT * FROM tasks WHERE column_id = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$columnId]);
    return $stmt->fetchAll();
}

function setNameOfColumnId($pdo,$colId,$colName){

    $sql = "UPDATE columns SET name = ? WHERE id = ?";
    $stmt = $pdo->prepare($sql);
    $stmt -> execute([$colName,$colId]);

}