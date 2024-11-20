<?php

    require_once '../src/views/Vistas.php';

    class VistasController{

        public function ObtenerTop5(){
            $modeloVista = new Vistas();
            echo json_encode(value: ["Resultado" =>   $modeloVista->get_top5marcasvendidas()]);
        }

        public function ObtenerPrendasvendidas(){
            $modeloVista = new Vistas();
            echo json_encode(value: ["Resultado" =>   $modeloVista->get_prendasvendidasystock()]);
        }

        public function ObtenerMarcasconventas(){
            $modeloVista = new Vistas();
            echo json_encode(value: ["Resultado" =>   $modeloVista->get_marcasconventas()]);
        }
    }

?>