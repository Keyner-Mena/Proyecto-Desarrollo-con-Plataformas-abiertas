import {
  ObtenerReporteTop5Marcas,
  ObtenerReportePrendas,
  ObtenerReporteMarcas,
} from "./reportes.js";

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

  ObtenerReporteTop5Marcas(API_URL);
  ObtenerReportePrendas(API_URL);
  ObtenerReporteMarcas(API_URL);
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
