<?php
    require_once '../src/db/Database.php';

    class Detalles_ventas {

        private $db;

        public function __construct(){
            $this->db = new Database();
        }

        // Obtener todas los datos
        public function getAll(){
            $consulta = $this->db->connect()->query("
            SELECT * FROM detalle_venta
            ");
            return $consulta->fetchAll();
        }

        // Obtener un solo dato por ID
        public function getById($id){
            $consulta = $this->db->connect()->prepare(
                " SELECT * FROM detalle_venta WHERE ID_detalle = ?
            ");

            $consulta->execute(params: [$id]);
            return $consulta->fetch();
        }

        // Crear un nuevo dato
        public function create($data){
            $consulta = $this->db->connect()->prepare(
                "INSERT INTO detalle_venta (ID_prenda, ID_venta, Cantidad, Subtotal) VALUES (?, ?, ?, ?) ");
                
            $consulta->execute([$data['ID_prenda'],$data['ID_venta'],$data['Cantidad'], $data['Subtotal']]);
            return $this->db->connect()->lastInsertId();
        }
    
        // Eliminar un dato por ID
        public function delete($id){
            $consulta = $this->db->connect()->prepare(
                "DELETE FROM detalle_venta WHERE ID_detalle = ? ");
            $consulta->execute([$id]);
            return $consulta->rowCount();
        }

        // Actualizar un dato por ID 
        public function update($id, $data){
            $consulta = $this->db->connect()->prepare(
                "UPDATE detalle_venta SET ID_prenda =?, ID_venta =?, Cantidad =?, Subtotal =? WHERE ID_detalle =? ");
                
            $consulta->execute([$data['ID_prenda'],$data['ID_venta'],$data['Cantidad'], $data['Subtotal'], $id]);
            return $consulta->rowCount();
        }
    }
?>

