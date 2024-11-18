<?php
    require_once '../src/db/Database.php';

    class Ventas {

        private $db;

        public function __construct(){
            $this->db = new Database();
        }

        // Obtener todas los datos
        public function getAll(){
            $consulta = $this->db->connect()->query("
            SELECT * FROM ventas
            ");
            return $consulta->fetchAll();
        }

        // Obtener un solo dato por ID
        public function getById($id){
            $consulta = $this->db->connect()->prepare(
                " SELECT * FROM ventas WHERE ID_venta = ?
            ");

            $consulta->execute(params: [$id]);
            return $consulta->fetch();
        }

        // Crear un nuevo dato
        public function create($data){
            $consulta = $this->db->connect()->prepare(
                "INSERT INTO ventas (Fecha_venta, Metodo_pago, Total_venta) VALUES (?, ?, ?) ");
                
            $consulta->execute([$data['Fecha_venta'],$data['Metodo_pago'],$data['Total_venta']]);
            return $this->db->connect()->lastInsertId();
        }
    
        // Eliminar un dato por ID
        public function delete($id){
            $consulta = $this->db->connect()->prepare(
                "DELETE FROM ventas WHERE ID_venta = ? ");
            $consulta->execute([$id]);
            return $consulta->rowCount();
        }

        // Actualizar un dato por ID
        public function update($id, $data){
            $consulta = $this->db->connect()->prepare(
                "UPDATE ventas SET Fecha_Venta =?, Metodo_pago =?, Total_venta =? WHERE ID_Venta =? ");

            $consulta->execute([$data['Fecha_venta'],$data['Metodo_pago'],$data['Total_venta'], $id]);
            return $consulta->rowCount();
        }
    }
?>

