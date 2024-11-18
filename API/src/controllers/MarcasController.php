<?php

    require_once '../src/models/Marcas.php';

    class MarcasController{

        public function ObtenerTodos(){
            $modeloMarca = new Marcas();
            echo json_encode(value: ["Resultado" =>   $modeloMarca->getAll()]);
        }

        public function ObtenerPorId($id){
            $modeloMarca = new Marcas();
            echo json_encode(value: ["Resultado" =>   $modeloMarca->getById($id)]);
        }

        public function crear()
        {
            $data = json_decode(file_get_contents("php://input"), true);

            $modeloMarca = new Marcas();
            echo json_encode(value: ["Resultado" =>   $modeloMarca->create($data)]);
            
        }

        public function eliminar($id){
            $modeloMarca = new Marcas();
            echo json_encode(value: ["Resultado" =>   $modeloMarca->delete($id)]);
        }

        
        public function actualizar($id)
        {
            $data = json_decode(file_get_contents("php://input"), true);

            $modeloMarca = new Marcas();        
            echo json_encode(value: ["Resultado" =>   $modeloMarca->update($id,$data)]);
        }
        
    }
?>