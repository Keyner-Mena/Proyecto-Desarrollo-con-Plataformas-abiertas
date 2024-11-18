<?php

    require_once '../src/models/Ventas.php';

    class VentasController {

        public function ObtenerTodos(){
            $modeloVenta = new Ventas();
            echo json_encode(value: ["Resultado" =>   $modeloVenta->getAll()]);
        }

        public function ObtenerPorId($id){
            $modeloVenta = new Ventas();
            echo json_encode(value: ["Resultado" =>   $modeloVenta->getById($id)]);
        }

        public function crear()
        {
            $data = json_decode(file_get_contents("php://input"), true);

            $modeloVenta = new Ventas();
            echo json_encode(value: ["Resultado" =>   $modeloVenta->create($data)]);
            
        }

        public function eliminar($id){
            $modeloVenta = new Ventas();
            echo json_encode(value: ["Resultado" =>   $modeloVenta->delete($id)]);
        }

        
        public function actualizar($id)
        {
            $data = json_decode(file_get_contents("php://input"), true);

            $modeloVenta = new Ventas();        
            echo json_encode(value: ["Resultado" =>   $modeloVenta->update($id,$data)]);
        }
        
    }
?>