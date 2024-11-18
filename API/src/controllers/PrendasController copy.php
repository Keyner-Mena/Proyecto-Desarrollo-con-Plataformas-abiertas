<?php

    require_once '../src/models/Prendas.php';

    class PrendasController{

        public function ObtenerTodos(){
            $modeloPrenda = new Prendas();
            echo json_encode(value: ["Resultado" =>   $modeloPrenda->getAll()]);
        }

        public function ObtenerPorId($id){
            $modeloPrenda = new Prendas();
            echo json_encode(value: ["Resultado" =>   $modeloPrenda->getById($id)]);
        }

        public function crear()
        {
            $data = json_decode(file_get_contents("php://input"), true);

            $modeloPrenda = new Prendas();
            echo json_encode(value: ["Resultado" =>   $modeloPrenda->create($data)]);
            
        }

        public function eliminar($id){
            $modeloPrenda = new Prendas();
            echo json_encode(value: ["Resultado" =>   $modeloPrenda->delete($id)]);
        }

        
        public function actualizar($id)
        {
            $data = json_decode(file_get_contents("php://input"), true);

            $modeloPrenda = new Prendas();        
            echo json_encode(value: ["Resultado" =>   $modeloPrenda->update($id,$data)]);
        }
        
    }
?>