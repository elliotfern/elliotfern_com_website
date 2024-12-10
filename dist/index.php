<?php
// Elimina la barra final de la URL
$requestUri = $_SERVER['REQUEST_URI'];
if (substr($requestUri, -1) === '/' && strlen($requestUri) > 1) {
    $newUri = rtrim($requestUri, '/');
    header("Location: $newUri", true, 301);
    exit();
}

// Servir React (cambia la ruta a la carpeta de tu build)
require __DIR__ . '/dist/index.html';
?>