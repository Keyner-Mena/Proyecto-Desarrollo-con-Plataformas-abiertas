document.addEventListener("DOMContentLoaded", () => {
  // eventos para el menu de navegacion
  document
    .getElementById("link-prendas")
    .addEventListener("click", () => mostrarSeccion("prendas"));
  document
    .getElementById("link-marcas")
    .addEventListener("click", () => mostrarSeccion("marcas"));
  document
    .getElementById("link-ventas")
    .addEventListener("click", () => mostrarSeccion("ventas"));
  document
    .getElementById("link-detalles")
    .addEventListener("click", () => mostrarSeccion("detalles"));
  /*  document
    .getElementById("link-reportes")
    .addEventListener("click", () => mostrarSeccion("reportes")); */
});

function mostrarSeccion(section) {
  document.getElementById("prendas-section").style.display = "none";
  document.getElementById("marcas-section").style.display = "none";
  document.getElementById("ventas-section").style.display = "none";
  document.getElementById("detalles-section").style.display = "none";
  //document.getElementById("reportes-section").style.display = "none";

  switch (section) {
    case "prendas":
      document.getElementById("prendas-section").style.display = "block";
      break;
    case "marcas":
      document.getElementById("marcas-section").style.display = "block";
      break;
    case "ventas":
      document.getElementById("ventas-section").style.display = "block";
      break;
    case "detalles":
      document.getElementById("detalles-section").style.display = "block";
      break;
    /*  case "reportes":
      document.getElementById("reportes-section").style.display = "block";
      break;
    default: 
      break;*/
  }
}
