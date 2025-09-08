<?php

function getUserByFireBaseUid($pdo,$uid){

    $uidSql = "SELECT * FROM user WHERE firebase_uid = ?";
    $stmt = $pdo->prepare($uidSql);
    $stmt->execute([$uid]);
    return $stmt->fetch();
}

function insertANewUser($pdo,$userName, $firebaseUid ){
    $sql = "INSERT INTO user (user_name,firebase_uid) VALUES (?,?)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$userName, $firebaseUid]);
}