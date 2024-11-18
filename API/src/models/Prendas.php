<?php
    require_once '../src/db/Database.php';

    class Prendas {

        private $db;

        public function __construct(){
            $this->db = new Database();
        }

        // Obtener todas los datos
        public function getAll(){
            $consulta = $this->db->connect()->query("
            SELECT * FROM prenda
            ");
            return $consulta->fetchAll();
        }

        // Obtener un solo dato por ID
        public function getById($id){
            $consulta = $this->db->connect()->prepare(
                " SELECT * FROM prenda WHERE ID_Prenda = ?
            ");

            $consulta->execute(params: [$id]);
            return $consulta->fetch();
        }

        // Crear un nuevo dato
        public function create($data){
            $consulta = $this->db->connect()->prepare(
                "INSERT INTO prenda (ID_Marca, Tipo_de_prenda, Material, Talla, Color, Precio, Stock) VALUES (?, ?, ?, ?, ?, ?, ?) ");
            
            $consulta->execute([$data['ID_Marca'],$data['Tipo_de_prenda'],$data['Material'], $data['Talla'], $data['Color'], $data['Precio'], $data['Stock']]);
            return $this->db->connect()->lastInsertId();
        }
    
        // Eliminar un dato por ID
        public function delete($id){
            $consulta = $this->db->connect()->prepare(
                "DELETE FROM prenda WHERE ID_Prenda = ? ");
            $consulta->execute([$id]);
            return $consulta->rowCount();
        }

        // Actualizar un dato por ID
        public function update($id, $data){
            $consulta = $this->db->connect()->prepare(
                "UPDATE prenda SET ID_Marca =?, Tipo_de_prenda =?, Material =?, Talla =?, Color =?, Precio =?, Stock =? WHERE ID_Prenda =? ");
                
            $consulta->execute([$data['ID_Marca'],$data['Tipo_de_prenda'],$data['Material'], $data['Talla'], $data['Color'], $data['Precio'], $data['Stock'], $id]);
            return $consulta->rowCount();
        }
    }
?>