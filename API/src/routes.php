<?php
require_once "../src/controllers/PrendasController.php";
require_once "../src/controllers/MarcasController.php";
require_once "../src/controllers/VentasController.php";


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



switch ($path) {

    // Endpoint de prendas
    case 'prendas':
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
            default: echo "Método no implementado";
        }
        break;


        // Endpoint de marcas
        case 'marcas':
        $marcasController = new marcasController();
        switch ($method) {
            case 'GET':
                // Extraemos los parámetros de la consulta
                $id = isset($queryParams['id']) ? $queryParams['id'] : null;
                if ($id != "") {
                    $marcasController->ObtenerPorId($id);
                } else {
                    $marcasController->ObtenerTodos();
                }
                break;
            case 'POST':
                // http://localhost/Proyecto-Desarrollo-con-Plataformas-abiertas/API/public/index.php/marcas
                $marcasController->crear();
                break;
            case 'DELETE':
                // http://localhost/Proyecto-Desarrollo-con-Plataformas-abiertas/API/public/index.php/marcas?id=1
                $id = isset($queryParams['id']) ? $queryParams['id'] : null;
                $marcasController->eliminar($id);
                break;
            case 'PUT':
                // http://localhost/Proyecto-Desarrollo-con-Plataformas-abiertas/API/public/index.php/marcas?id=1
                $id = isset($queryParams['id'])? $queryParams['id'] : null;
                $marcasController->actualizar($id);
                break;
            default: echo "Método no implementado";
        }
        break;

        
        // Endpoint de ventas
        case 'ventas':
            $ventasController = new ventasController();
            switch ($method) {
                case 'GET':
                    // Extraemos los parámetros de la consulta
                    $id = isset($queryParams['id']) ? $queryParams['id'] : null;
                    if ($id != "") {
                        $ventasController->ObtenerPorId($id);
                    } else {
                        $ventasController->ObtenerTodos();
                    }
                    break;
                case 'POST':
                    // http://localhost/Proyecto-Desarrollo-con-Plataformas-abiertas/API/public/index.php/ventas
                    $ventasController->crear();
                    break;
                case 'DELETE':
                    // http://localhost/Proyecto-Desarrollo-con-Plataformas-abiertas/API/public/index.php/ventas?id=1
                    $id = isset($queryParams['id']) ? $queryParams['id'] : null;
                    $ventasController->eliminar($id);
                    break;
                case 'PUT':
                    // http://localhost/Proyecto-Desarrollo-con-Plataformas-abiertas/API/public/index.php/ventas?id=1
                    $id = isset($queryParams['id'])? $queryParams['id'] : null;
                    $ventasController->actualizar($id);
                    break;
                default: echo "Método no implementado";
            }
            break;



    default: include "error/response.html";
} 
?>