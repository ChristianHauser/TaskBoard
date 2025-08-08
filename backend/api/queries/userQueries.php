<?php

function getUserByFireBaseUid($pdo,$uid){

    $uidSql = "SELECT * FROM user WHERE firebase_uid = ?";
    $stmt = $pdo->prepare($uidSql);
    $stmt->execute([$uid]);
    return $stmt->fetch();
}