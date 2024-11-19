<?php

    require_once '../src/models/Detalles_ventas.php';

    class DetallesController {

        public function ObtenerTodos(){
            $modeloDetalle = new Detalles_ventas();
            echo json_encode(value: ["Resultado" =>   $modeloDetalle->getAll()]);
        }

        public function ObtenerPorId($id){
            $modeloDetalle = new Detalles_ventas();
            echo json_encode(value: ["Resultado" =>   $modeloDetalle->getById($id)]);
        }

        public function crear()
        {
            $data = json_decode(file_get_contents("php://input"), true);

            $modeloDetalle = new Detalles_ventas();
            echo json_encode(value: ["Resultado" =>   $modeloDetalle->create($data)]);
            
        }

        public function eliminar($id){
            $modeloDetalle = new Detalles_ventas();
            echo json_encode(value: ["Resultado" =>   $modeloDetalle->delete($id)]);
        }

        
        public function actualizar($id)
        {
            $data = json_decode(file_get_contents("php://input"), true);

            $modeloDetalle = new Detalles_ventas();        
            echo json_encode(value: ["Resultado" =>   $modeloDetalle->update($id,$data)]);
        }
        
    }
?>