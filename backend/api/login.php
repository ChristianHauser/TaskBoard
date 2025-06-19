<?php

session_start();

header(header: "Content-Type: application/json");
header(header: "Access-Control-Allow-Origin: http://localhost:3000");
header(header: "Access-Control-Allow-Credentials: true");

$data = json_decode(json: file_get_contents(filename: "php://input"));