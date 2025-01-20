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
} from "./obtenerTablas.js";

import { Guardar, Actualizar } from "./metodos.js";

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
      Guardar(data, API_URL, "prendas");
      form.reset();
    });

  // Evento para agregar una marca
  document
    .getElementById("agregar-marca-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const form = this;
      const data = {
        Nombre: form.nombre_marca.value,
        Descripción: form.descripcion.value,
        País_de_origen: form.pais.value,
        Categoría: form.categoria.value,
        Contacto: form.contacto.value,
      };
      Guardar(data, API_URL, "marcas");
      form.reset();
    });

  // Evento para agregar una venta
  document
    .getElementById("agregar-venta-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const form = this;
      const data = {
        Fecha_venta: form.fecha_venta.value,
        Metodo_pago: form.metodo_de_pago.value,
        Total_venta: form.total_venta.value,
      };
      Guardar(data, API_URL, "ventas");
      form.reset();
    });

  // Evento para agregar un detalle de venta
  document
    .getElementById("agregar-detalle-venta-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const form = this;
      const data = {
        ID_prenda: parseInt(form.d_id_prenda.value),
        ID_venta: parseInt(form.d_id_venta.value),
        Cantidad: parseInt(form.cantidad.value),
        Subtotal: parseInt(form.subtotal.value),
      };
      Guardar(data, API_URL, "detalles_ventas");
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
      Actualizar(data, data.ID_Prenda, API_URL, "prendas");
      // reiniciar el formulario y ocultarlo.
      form.reset();
      form.classList.add("seccion_secundaria");
    });

  // Evento para actualizar una marca
  document
    .getElementById("update-marca-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const form = this;
      console.log(form.id_marca.value);

      // Guarda los datos del formulario
      const data = {
        ID_Marca: form.id_marca.value,
        Nombre: form.nombre_marca.value,
        Descripción: form.descripcion.value,
        País_de_origen: form.pais.value,
        Categoría: form.categoria.value,
        Contacto: form.contacto.value,
      };
      Actualizar(data, data.ID_Marca, API_URL, "marcas");
      // reiniciar el formulario y ocultarlo.
      form.reset();
      form.classList.add("seccion_secundaria");
    });

  // Evento para actualizar una venta
  document
    .getElementById("update-venta-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const form = this;
      console.log(form.id_venta.value);

      // Guarda los datos del formulario
      const data = {
        ID_venta: form.id_venta.value,
        Fecha_venta: form.fecha_venta.value,
        Metodo_pago: form.metodo_de_pago.value,
        Total_venta: form.total_venta.value,
      };
      Actualizar(data, data.ID_venta, API_URL, "ventas");
      // reiniciar el formulario y ocultarlo.
      form.reset();
      form.classList.add("seccion_secundaria");
    });

  // Evento para actualizar un detalle de venta
  document
    .getElementById("update-detalle-venta-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const form = this;
      console.log(form.id_detalle_venta.value);

      // Guarda los datos del formulario
      const data = {
        ID_detalle: parseInt(form.id_detalle_venta.value),
        ID_prenda: parseInt(form.d_id_prenda.value),
        ID_venta: parseInt(form.d_id_venta.value),
        Cantidad: parseInt(form.cantidad.value),
        Subtotal: parseInt(form.subtotal.value),
      };
      Actualizar(data, data.ID_detalle, API_URL, "detalles_ventas");
      // reiniciar el formulario y ocultarlo.
      form.reset();
      form.classList.add("seccion_secundaria");
    });

  // Calcular el subtotal en el formulario Detalle de ventas
  const input_cantidad = document.getElementsByName("cantidad");
  for (let i = 0; i < input_cantidad.length; i++) {
    input_cantidad[i].addEventListener("keyup", function (event) {
      const form = event.target.closest("form");
      calcularSubtotal(form);
    });
  }
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

export function mostrarFormActualizarPrenda(
  id_prenda,
  tipoPrenda,
  idMarca,
  material,
  talla,
  color,
  precio,
  stock
) {
  const FormActualizar = document.getElementById("update-prenda-form");

  //Muestra el form con los datos seleccionados
  FormActualizar.querySelector("#update-id_prenda").value = id_prenda;
  FormActualizar.querySelector("#update-tipo_de_prenda").value = tipoPrenda;
  FormActualizar.querySelector("#update-marca").value = idMarca;
  FormActualizar.querySelector("#update-material").value = material;
  FormActualizar.querySelector("#update-talla").value = talla;
  FormActualizar.querySelector("#update-color").value = color;
  FormActualizar.querySelector("#update-precio").value = precio;
  FormActualizar.querySelector("#update-stock").value = stock;

  // Muestra el form al usuario
  FormActualizar.classList.remove("seccion_secundaria");
  FormActualizar.scrollIntoView();
}

export function mostrarFormActualizarMarca(
  id_marca,
  nombre,
  desc,
  pais,
  categoria,
  contacto
) {
  const FormActualizar = document.getElementById("update-marca-form");

  //Muestra el form con los datos seleccionados
  FormActualizar.querySelector("#update-id_marca").value = id_marca;
  FormActualizar.querySelector("#update-nombre_marca").value = nombre;
  FormActualizar.querySelector("#update-descripcion").value = desc;
  FormActualizar.querySelector("#update-pais").value = pais;
  FormActualizar.querySelector("#update-categoria").value = categoria;
  FormActualizar.querySelector("#update-contacto").value = contacto;

  // Muestra el form al usuario
  FormActualizar.classList.remove("seccion_secundaria");
  FormActualizar.scrollIntoView();
}

export function mostrarFormActualizarVenta(
  id_venta,
  fecha,
  metodo_de_pago,
  total_venta
) {
  const FormActualizar = document.getElementById("update-venta-form");

  //Muestra el form con los datos seleccionados
  FormActualizar.querySelector("#update-id_venta").value = id_venta;
  FormActualizar.querySelector("#update-fecha_venta").value = fecha;
  FormActualizar.querySelector("#update-metodo_de_pago").value = metodo_de_pago;
  FormActualizar.querySelector("#update-total_venta").value = total_venta;

  // Muestra el form al usuario
  FormActualizar.classList.remove("seccion_secundaria");
  FormActualizar.scrollIntoView();
}

export function mostrarFormActualizarDetalle(
  id_detalle,
  Id_prenda,
  Id_venta,
  cantidad,
  subtotal
) {
  const FormActualizar = document.getElementById("update-detalle-venta-form");

  //Muestra el form con los datos seleccionados
  FormActualizar.querySelector("#update-id_detalle_venta").value = id_detalle;
  FormActualizar.querySelector("#update-d_id_prenda").value = Id_prenda;
  FormActualizar.querySelector("#update-d_id_venta").value = Id_venta;
  FormActualizar.querySelector("#update-cantidad").value = cantidad;
  FormActualizar.querySelector("#update-subtotal").value = subtotal;

  // Muestra el form al usuario
  FormActualizar.classList.remove("seccion_secundaria");
  FormActualizar.scrollIntoView();
}

export function calcularSubtotal(form) {
  // Obtener la cantidad y el Id de la prenda
  let cantidad = parseInt(form.cantidad.value);
  let ID_prenda = parseInt(form.d_id_prenda.value);

  // Buscar el precio de la prenda
  const IDs = document.getElementsByName("id_de_prenda");
  for (let x = 0; x < IDs.length; x++) {
    if (IDs[x].innerText === ID_prenda.toString()) {
      // Obtener el precio de la prenda
      const precios = document.getElementsByName("precio_de_prenda");
      let precio = parseFloat(precios[x].innerText);

      // mostrar el resultado en el campo subtotal
      form.subtotal.value = cantidad * precio;
    }
  }
}
