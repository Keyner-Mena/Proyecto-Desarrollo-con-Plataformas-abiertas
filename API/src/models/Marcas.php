<?php
    require_once '../src/db/Database.php';

    class Marcas {

        private $db;

        public function __construct(){
            $this->db = new Database();
        }

        // Obtener todas los datos
        public function getAll(){
            $consulta = $this->db->connect()->query("
            SELECT * FROM marca
            ");
            return $consulta->fetchAll();
        }

        // Obtener un solo dato por ID
        public function getById($id){
            $consulta = $this->db->connect()->prepare(
                " SELECT * FROM marca WHERE ID_Marca = ?
            ");

            $consulta->execute(params: [$id]);
            return $consulta->fetch();
        }

        // Crear un nuevo dato
        public function create($data){
            $consulta = $this->db->connect()->prepare(
                "INSERT INTO marca (Nombre, Descripción, País_de_origen, Categoría, Contacto) VALUES (?, ?, ?, ?, ?) ");
                
            $consulta->execute([$data['Nombre'],$data['Descripción'],$data['País_de_origen'], $data['Categoría'], $data['Contacto']]);
            return $this->db->connect()->lastInsertId();
        }
    
        // Eliminar un dato por ID
        public function delete($id){
            $consulta = $this->db->connect()->prepare(
                "DELETE FROM marca WHERE ID_Marca = ? ");
            $consulta->execute([$id]);
            return $consulta->rowCount();
        }

        // Actualizar un dato por ID
        public function update($id, $data){
            $consulta = $this->db->connect()->prepare(
                "UPDATE marca SET Nombre =?, Descripción =?, País_de_origen =?, Categoría =?, Contacto =? WHERE ID_Marca =? ");
                
            $consulta->execute([$data['Nombre'],$data['Descripción'],$data['País_de_origen'], $data['Categoría'], $data['Contacto'], $id]);
            return $consulta->rowCount();
        }
    }

?>

