<?php
require_once "../src/controllers/PrendasController.php";
require_once "../src/utils/Auth.php";

// ENDPOINT PRINCIPAL: http://localhost/Proyecto-Desarrollo-con-Plataformas-abiertas/API/public/index.php/prendas
// ENDPOINT CON UN PARÁMETRO: http://localhost/Proyecto-Desarrollo-con-Plataformas-abiertas/API/public/index.php/prendas?id=1

// Crea una instancia de Auth
$auth = new Auth();
// Descomentar para activar la seguridad por autenticación
//$auth->verificarToken();

// Lógica de la API
$method = $_SERVER['REQUEST_METHOD'];
// Remueve "/" del inicio
$path = trim($_SERVER['PATH_INFO'], '/');
// Divide la ruta por "/" para obtener el endpoint y el posible parámetro
$segments = explode('/', $path);
// Captura la cadena de consulta completa después del "?" (por ejemplo: "id=123&nombre=juan")
$queryString = $_SERVER['QUERY_STRING'];
// Parseamos la cadena de consulta a un arreglo asociativo
parse_str($queryString, $queryParams);


// Endpoint de prendas
if ($path == "prendas") {
    $prendasController = new PrendasController();
    switch ($method) {
        case 'GET':
            // Extraemos los parámetros de la consulta
            $id = isset($queryParams['id']) ? $queryParams['id'] : null;
            if ($id != "") {
                $prendasController->ObtenerPorId($id);
            } else {
                $prendasController->ObtenerTodos();
            }
            break;
        case 'POST':
            // http://localhost/Proyecto-Desarrollo-con-Plataformas-abiertas/API/public/index.php/prendas
            $prendasController->crear();
            break;
        case 'DELETE':
            // http://localhost/Proyecto-Desarrollo-con-Plataformas-abiertas/API/public/index.php/prendas?id=1
            $id = isset($queryParams['id']) ? $queryParams['id'] : null;
            $prendasController->eliminar($id);
            break;
        case 'PUT':
            // http://localhost/Proyecto-Desarrollo-con-Plataformas-abiertas/API/public/index.php/prendas?id=1
            $id = isset($queryParams['id'])? $queryParams['id'] : null;
            $prendasController->actualizar($id);
            break;
        default:
            echo "Método no implementado";
    }
} else {
    include "error/response.html";
}

?>