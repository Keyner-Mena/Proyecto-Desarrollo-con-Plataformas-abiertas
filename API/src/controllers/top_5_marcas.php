<?php
require_once '../src/models/5_top_marcas.php';
require_once '../src/db/Database.php';

class Prendas_top_Controller {

    public function listarTop5MarcasVendidas() {
        $query = "
            SELECT m.nombre, SUM(v.cantidad) AS total_vendido
            FROM marcas m
            JOIN prendas p ON m.id = p.marca_id
            JOIN ventas v ON p.id = v.prenda_id
            GROUP BY m.id
            ORDER BY total_vendido DESC
            LIMIT 5
        ";
        $stmt = $db->prepare($query);
        $stmt->execute();
        $marcas = $stmt->fetchAll(PDO::FETCH_ASSOC);
        header('Content-Type: application/json');
        echo json_encode($marcas);
    }
    
}
?>