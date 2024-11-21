<?php
    require_once '../src/db/Database.php';

    class Reportes {

        private $db;

        public function __construct(){
            $this->db = new Database();
        }

        public function get_top5marcasvendidas(){
            $consulta = $this->db->connect()->query("
            SELECT * FROM top5marcasvendidas
            ");
            return $consulta->fetchAll();
        }

        public function get_prendasvendidasystock(){
            $consulta = $this->db->connect()->query("
            SELECT * FROM prendasvendidasystock
            ");
            return $consulta->fetchAll();
        }

        public function get_marcasconventas(){
            $consulta = $this->db->connect()->query("
            SELECT * FROM marcasconventas
            ");
            return $consulta->fetchAll();
        }
        
    }
?>

