<?php
require_once "../src/controllers/PrendasController.php";
require_once "../src/controllers/MarcasController.php";
require_once "../src/controllers/VentasController.php";
require_once "../src/controllers/DetallesController.php";

require_once "../src/controllers/VistasController.php";
require_once "../src/utils/Auth.php";

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


// Función para manejar la lógica de cada endpoint
function manejarSolicitud($controller, $method, $queryParams) {
    
    // Extraemos los parámetros de la consulta
    $id = isset($queryParams['id']) ? $queryParams['id'] : null;

    // Endpoint sin parámetros: http://localhost/Proyecto-Desarrollo-con-Plataformas-abiertas/API/public/index.php/NOMBRE_DE_EMDPOINT
    // Endpoint con parámetro: http://localhost/Proyecto-Desarrollo-con-Plataformas-abiertas/API/public/index.php/NOMBRE_DE_EMDPOINT?id=NUM_DE_ID
    
    switch ($method) {
        case 'GET':
            if ($id != "") {
                $controller->ObtenerPorId($id);
            } else {
                $controller->ObtenerTodos();
            }
            break;
        case 'POST':
            $controller->crear();
            break;
        case 'DELETE':
            $controller->eliminar($id);
            break;
        case 'PUT':
            $controller->actualizar($id);
            break;
        default:
            echo "Método no implementado";
    }
}

function manejarReportes($controller, $method, $reporte){
    if ($method === 'GET') {    
        
        switch ($reporte) {
            case 'top_5_marcas':
                $controller->ObtenerTop5();
                break;
            case 'prendas_vendidas':
                $controller->ObtenerPrendasvendidas();
                break;
            case 'marcas_con_ventas':
                $controller->ObtenerMarcasconventas();
                break;
            default:
                include "error/response.html";
        }

    }else {
        echo "Método no implementado";
    }
}

// Endpoints a controladores
switch ($segments[0]) {
    case 'prendas':
        $prendasController = new PrendasController();
        manejarSolicitud($prendasController, $method, $queryParams);
        break;
    case 'marcas':
        $marcasController = new MarcasController();
        manejarSolicitud($marcasController, $method, $queryParams);
        break;
    case 'ventas':
        $ventasController = new VentasController();
        manejarSolicitud($ventasController, $method, $queryParams);
        break;
    case 'detalles_ventas':
        $detallesController = new DetallesController();
        manejarSolicitud($detallesController, $method, $queryParams);
        break;
    case 'reportes':
        if (isset($segments[1])) {
            $reportesController = new VistasController();
            manejarReportes($reportesController, $method, $segments[1]);
        }else {
            echo "Debe indicar que reporte desea ver";
        }
        break;
    default:
        include "error/response.html";
}
?>