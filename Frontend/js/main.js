import {
  ObtenerReporteTop5Marcas,
  ObtenerReportePrendas,
  ObtenerReporteMarcas,
} from "./reportes.js";

import { ObtenerPrendas, GuardarPrenda, ActualizarPrenda } from "./prendas.js";
import { ObtenerMarcas } from "./marcas.js";
import { ObtenerVentas } from "./ventas.js";
import { ObtenerDetalles } from "./detalles.js";

const API_URL =
  "http://localhost/Proyecto-Desarrollo-con-Plataformas-abiertas/API/public/index.php/";

document.addEventListener("DOMContentLoaded", () => {
  // eventos para el menu de navegación
  document.getElementById("nav").addEventListener("click", (event) => {
    // Verifica si el elemento clicado es un link del menu
    const link = event.target.closest("a");
    if (link) {
      mostrarSeccion(link.id);
    }
  });

  // Rellenar Tablas
  ObtenerPrendas(API_URL);
  ObtenerMarcas(API_URL);
  ObtenerVentas(API_URL);
  ObtenerDetalles(API_URL);

  ObtenerReporteTop5Marcas(API_URL);
  ObtenerReportePrendas(API_URL);
  ObtenerReporteMarcas(API_URL);

  // Evento para agregar una prenda
  document
    .getElementById("agregar-prenda-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const form = this;
      const data = {
        ID_Marca: parseInt(form.marca.value),
        Tipo_de_prenda: form.tipo_de_prenda.value,
        Material: form.material.value,
        Talla: form.talla.value,
        Color: form.color.value,
        Precio: parseInt(form.precio.value),
        Stock: parseInt(form.stock.value),
      };
      GuardarPrenda(data, API_URL);
      form.reset();
    });

  // Evento para actualizar una prenda
  document
    .getElementById("update-prenda-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const form = this;
      console.log(form.id_prenda.value);

      // Guarda los datos del formulario
      const data = {
        ID_Prenda: parseInt(form.id_prenda.value),
        Tipo_de_prenda: form.tipo_de_prenda.value,
        ID_Marca: parseInt(form.marca.value),
        Material: form.material.value,
        Talla: form.talla.value,
        Color: form.color.value,
        Precio: parseInt(form.precio.value),
        Stock: parseInt(form.stock.value),
      };
      ActualizarPrenda(data, API_URL);
      // reiniciar el formulario y ocultarlo.
      form.reset();
      form.classList.add("seccion_secundaria");
    });
});

function mostrarSeccion(section) {
  if (section !== "link-reportes") {
    /* tablas */
    document.getElementById("prendas-section").style.display = "none";
    document.getElementById("marcas-section").style.display = "none";
    document.getElementById("ventas-section").style.display = "none";
    document.getElementById("detalles-section").style.display = "none";
    /* reportes */
    document.getElementById("reporte-prendas-section").style.display = "none";
    document.getElementById("reporte-marcas-section").style.display = "none";
    document.getElementById("reporte-top-section").style.display = "none";
  }

  switch (section) {
    case "link-prendas":
      document.getElementById("prendas-section").style.display = "block";
      break;
    case "link-marcas":
      document.getElementById("marcas-section").style.display = "block";
      break;
    case "link-ventas":
      document.getElementById("ventas-section").style.display = "block";
      break;
    case "link-detalles":
      document.getElementById("detalles-section").style.display = "block";
      break;
    case "reporte-marcas":
      document.getElementById("reporte-marcas-section").style.display = "block";
      break;
    case "reporte-prendas":
      document.getElementById("reporte-prendas-section").style.display =
        "block";
      break;
    case "reporte-top":
      document.getElementById("reporte-top-section").style.display = "block";
      break;
    default:
      break;
  }
}
