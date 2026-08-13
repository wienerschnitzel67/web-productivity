<?php

$host = 'localhost';
$dbname = 'webtool';
$username = 'webtool_user';
$password = 'password123';

$pdo = new PDO(
    "mysql:host=$host;dbname=$dbname",
    $username,
    $password
);