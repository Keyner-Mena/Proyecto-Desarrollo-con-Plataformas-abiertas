<?php

    require_once '../src/reports/Reportes.php';

    class ReportesController{

        public function ObtenerTop5(){
            $modeloReportes = new Reportes();
            echo json_encode(value: ["Resultado" =>   $modeloReportes->get_top5marcasvendidas()]);
        }

        public function ObtenerPrendasvendidas(){
            $modeloReportes = new Reportes();
            echo json_encode(value: ["Resultado" =>   $modeloReportes->get_prendasvendidasystock()]);
        }

        public function ObtenerMarcasconventas(){
            $modeloReportes = new Reportes();
            echo json_encode(value: ["Resultado" =>   $modeloReportes->get_marcasconventas()]);
        }
    }

?>