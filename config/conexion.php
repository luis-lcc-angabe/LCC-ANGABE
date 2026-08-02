<?php
// Esto activa los errores de MySQL
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

$servidor= "localhost";
$usuario= "root";
$contrasena= "";
$basedatos= "angabe";

// Crear conexión
$conn = new mysqli($servidor, $usuario, $contrasena, $basedatos);

// Poner UTF8 para tildes
$conn->set_charset("utf8mb4");

// Verificar conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}
?>