import {
  ObtenerReporteTop5Marcas,
  ObtenerReportePrendas,
  ObtenerReporteMarcas,
} from "./reportes.js";

import {
  ObtenerPrendas,
  ObtenerMarcas,
  ObtenerVentas,
  ObtenerDetalles,
} from "./obtenertablas.js";

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

  ObtenerPrendas(API_URL);
  ObtenerMarcas(API_URL);
  ObtenerVentas(API_URL);
  ObtenerDetalles(API_URL);

  ObtenerReporteTop5Marcas(API_URL);
  ObtenerReportePrendas(API_URL);
  ObtenerReporteMarcas(API_URL);

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
      guardarprenda(data);
      form.reset();
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

/* Métodos de prendas (Cambiar de lugar) */

function guardarprenda(data) {
  console.log("Guardar prenda datos del formulario:");
  console.log(data);

  const xhr = new XMLHttpRequest();
  xhr.open("POST", API_URL + "/prendas", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader(
    "Authorization",
    "Bearer 2d2d1fe74f529f8bc7fbc946bde5cd7"
  );

  xhr.onload = function () {
    if (xhr.status === 200) {
      console.log("Prenda guardada exitosamente");
      ObtenerPrendas(API_URL); // Actualizar lista
    } else {
      console.error("Error al guardar la prenda:", xhr.statusText);
    }
  };
  xhr.onerror = function () {
    console.error("Error en la solicitud");
  };
  // Enviar los datos del formulario con la variable data
  xhr.send(JSON.stringify(data));
}

export function eliminarPrenda(prendaId) {
  const xhr = new XMLHttpRequest();
  // usamos delete
  xhr.open("DELETE", API_URL + "/prendas?id=" + prendaId, true);
  xhr.setRequestHeader(
    "Authorization",
    "Bearer 2d2d1fe74f529f8bc7fbc946bde5cd7"
  );

  xhr.onload = function () {
    if (xhr.status === 200) {
      console.log("Prenda eliminada exitosamente");
      ObtenerPrendas(API_URL); // Actualizar lista después de eliminar
    } else {
      console.error("Error al eliminar prenda:", xhr.statusText);
    }
  };
  xhr.onerror = function () {
    console.error("Error en la solicitud");
  };
  xhr.send();
}
