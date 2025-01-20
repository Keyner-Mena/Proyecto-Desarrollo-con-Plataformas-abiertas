import { Eliminar } from "./metodos.js";
import {
  mostrarFormActualizarPrenda,
  mostrarFormActualizarMarca,
  mostrarFormActualizarVenta,
  mostrarFormActualizarDetalle,
  calcularSubtotal,
} from "./main.js";

export function ObtenerPrendas(API_URL) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", API_URL + "prendas", true);
  xhr.setRequestHeader(
    "Authorization",
    "Bearer 2d2d1fe74f529f8bc7fbc946bde5cd7"
  );

  xhr.onload = function () {
    if (this.status === 200) {
      const cleanedText = this.responseText.replace(/^\uFEFF/, "").trim();
      try {
        const response = JSON.parse(cleanedText);
        const prendas = response.Resultado;
        const tbody = document.querySelector("#prenda-table tbody");
        tbody.innerHTML = "";
        prendas.forEach((prenda) => {
          const tr = document.createElement("tr");
          tr.innerHTML = `
                              <td name="id_de_prenda">${prenda.ID_Prenda}</td>
                              <td>${prenda.Tipo_de_prenda}</td>
                              <td>${prenda.ID_Marca}</td>
                              <td>${prenda.Material}</td>
                              <td>${prenda.Talla}</td>
                              <td>${prenda.Color}</td>
                              <td name="precio_de_prenda">${prenda.Precio}</td>
                              <td>${prenda.Stock}</td>
                              <td>
                                <button class="btn btn-primary actualizar-prenda" name="${prenda.ID_Prenda}">Actualizar</button>
                                <button class="btn btn-danger eliminar-prenda" name="${prenda.ID_Prenda}" id="eliminar-prenda-${prenda.ID_Prenda}">Eliminar</button>
                              </td>
                          `;
          tbody.appendChild(tr);
        });

        // Llenar el select de prendas en los formularios
        const prendasSelects = document.querySelectorAll(
          'select[name="d_id_prenda"]'
        );
        prendasSelects.forEach((select) => {
          select.innerHTML = '<option value="">Selecciona una prenda</option>'; // Opción predeterminada
          prendas.forEach((prenda) => {
            const option = document.createElement("option");
            option.value = prenda.ID_Prenda;
            option.textContent = `${prenda.Tipo_de_prenda}`;
            select.appendChild(option);
          });
          // Evento
          select.addEventListener("change", function (event) {
            const form = event.target.closest("form");
            calcularSubtotal(form);
          });
        });

        // Obtiene todos los botones con la clase "eliminar-prenda"
        const botonesEliminar =
          document.getElementsByClassName("eliminar-prenda");
        // Itera sobre la colección
        for (let i = 0; i < botonesEliminar.length; i++) {
          botonesEliminar[i].addEventListener("click", (event) => {
            let id_prenda_eliminar = event.target.name;
            Eliminar(id_prenda_eliminar, API_URL, "prendas");
          });
        }

        // Obtiene todos los botones con la clase "actualizar"
        const botonesActualizar =
          document.getElementsByClassName("actualizar-prenda");
        // Itera sobre la colección
        for (let i = 0; i < botonesActualizar.length; i++) {
          botonesActualizar[i].addEventListener("click", (event) => {
            let id_prenda_actualizar = event.target.name;
            // Encuentra la fila del botón clickeado
            const fila = event.target.closest("tr");

            const tipoPrenda = fila.cells[0].textContent; // Columna 1
            const idMarca = fila.cells[1].textContent; // Columna 2
            const material = fila.cells[2].textContent; // Columna 3
            const talla = fila.cells[3].textContent; // Columna 4
            const color = fila.cells[4].textContent; // Columna 5
            const precio = fila.cells[5].textContent; // Columna 6
            const stock = fila.cells[6].textContent; // Columna 7

            mostrarFormActualizarPrenda(
              id_prenda_actualizar,
              tipoPrenda,
              idMarca,
              material,
              talla,
              color,
              precio,
              stock
            );
          });
        }
      } catch (e) {
        console.error("Error parsing JSON:", e);
      }
    } else {
      console.error("Error fetching prendass:", this.statusText);
    }
  };
  xhr.onerror = function () {
    console.error("Request error...");
  };
  xhr.send();
}

export function ObtenerMarcas(API_URL) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", API_URL + "marcas", true);
  xhr.setRequestHeader(
    "Authorization",
    "Bearer 2d2d1fe74f529f8bc7fbc946bde5cd7"
  );

  xhr.onload = function () {
    if (this.status === 200) {
      const cleanedText = this.responseText.replace(/^\uFEFF/, "").trim();
      try {
        const response = JSON.parse(cleanedText);
        const marcas = response.Resultado;
        const tbody = document.querySelector("#marca-table tbody");
        tbody.innerHTML = "";
        marcas.forEach((marca) => {
          const tr = document.createElement("tr");
          tr.innerHTML = `
                                  <td>${marca.Nombre}</td>
                                  <td>${marca.Descripción}</td>
                                  <td>${marca.País_de_origen}</td>
                                  <td>${marca.Categoría}</td>
                                  <td>${marca.Contacto}</td>
                                  <td>
                                    <button class="btn btn-primary actualizar-marca" name="${marca.ID_Marca}">Actualizar</button>
                                    <button class="btn btn-danger eliminar-marca" name="${marca.ID_Marca}">Eliminar</button>
                                  </td>
                              `;
          tbody.appendChild(tr);
        });
        // Llenar el select de marcas en los formularios
        const marcasSelects = document.querySelectorAll('select[name="marca"]');
        marcasSelects.forEach((select) => {
          select.innerHTML = '<option value="">Selecciona una marca</option>'; // Opción predeterminada
          marcas.forEach((marca) => {
            const option = document.createElement("option");
            option.value = marca.ID_Marca;
            option.textContent = `${marca.Nombre}`;
            select.appendChild(option);
          });
        });

        // Obtiene todos los botones con la clase "eliminar-marca"
        const botonesEliminar =
          document.getElementsByClassName("eliminar-marca");
        // Itera sobre la colección
        for (let i = 0; i < botonesEliminar.length; i++) {
          botonesEliminar[i].addEventListener("click", (event) => {
            let id_marca_eliminar = event.target.name;
            Eliminar(id_marca_eliminar, API_URL, "marcas");
          });
        }

        // Obtiene todos los botones con la clase "actualizar"
        const botonesActualizar =
          document.getElementsByClassName("actualizar-marca");
        // Itera sobre la colección
        for (let i = 0; i < botonesActualizar.length; i++) {
          botonesActualizar[i].addEventListener("click", (event) => {
            let id_marca_actualizar = event.target.name;
            // Encuentra la fila del botón clickeado
            const fila = event.target.closest("tr");

            const nombre = fila.cells[0].textContent; // Columna 1
            const desc = fila.cells[1].textContent; // Columna 2
            const pais = fila.cells[2].textContent; // Columna 3
            const categoria = fila.cells[3].textContent; // Columna 4
            const contacto = fila.cells[4].textContent; // Columna 5

            mostrarFormActualizarMarca(
              id_marca_actualizar,
              nombre,
              desc,
              pais,
              categoria,
              contacto
            );
          });
        }
      } catch (e) {
        console.error("Error parsing JSON:", e);
      }
    } else {
      console.error("Error fetching marcas:", this.statusText);
    }
  };
  xhr.onerror = function () {
    console.error("Request error...");
  };
  xhr.send();
}

export function ObtenerVentas(API_URL) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", API_URL + "ventas", true);
  xhr.setRequestHeader(
    "Authorization",
    "Bearer 2d2d1fe74f529f8bc7fbc946bde5cd7"
  );

  xhr.onload = function () {
    if (this.status === 200) {
      const cleanedText = this.responseText.replace(/^\uFEFF/, "").trim();
      try {
        const response = JSON.parse(cleanedText);
        const ventas = response.Resultado;
        const tbody = document.querySelector("#venta-table tbody");
        tbody.innerHTML = "";
        ventas.forEach((venta) => {
          const tr = document.createElement("tr");
          tr.innerHTML = `
                                  <td>${venta.ID_venta}</td>
                                  <td>${venta.Fecha_venta}</td>
                                  <td>${venta.Metodo_pago}</td>
                                  <td>${venta.Total_venta}</td>
                                  <td>
                                    <button class="btn btn-primary actualizar-venta" name="${venta.ID_venta}">Actualizar</button>
                                    <button class="btn btn-danger eliminar-venta" name="${venta.ID_venta}">Eliminar</button>
                                  </td>
                              `;
          tbody.appendChild(tr);
        });

        // Llenar el select de ventas en los formularios
        const ventasSelects = document.querySelectorAll(
          'select[name="d_id_venta"]'
        );
        ventasSelects.forEach((select) => {
          select.innerHTML = '<option value="">Selecciona un ID</option>'; // Opción predeterminada
          ventas.forEach((venta) => {
            const option = document.createElement("option");
            option.value = venta.ID_venta;
            option.textContent = `${venta.ID_venta}`;
            select.appendChild(option);
          });
        });

        // Obtiene todos los botones con la clase "eliminar-venta"
        const botonesEliminar =
          document.getElementsByClassName("eliminar-venta");
        // Itera sobre la colección
        for (let i = 0; i < botonesEliminar.length; i++) {
          botonesEliminar[i].addEventListener("click", (event) => {
            let id_venta_eliminar = event.target.name;
            Eliminar(id_venta_eliminar, API_URL, "ventas");
          });
        }

        // Obtiene todos los botones con la clase "actualizar"
        const botonesActualizar =
          document.getElementsByClassName("actualizar-venta");
        // Itera sobre la colección
        for (let i = 0; i < botonesActualizar.length; i++) {
          botonesActualizar[i].addEventListener("click", (event) => {
            let id_venta_actualizar = event.target.name;
            // Encuentra la fila del botón clickeado
            const fila = event.target.closest("tr");

            const fecha = fila.cells[1].textContent; // Columna 1
            const metodo_de_pago = fila.cells[2].textContent; // Columna 2
            const total_venta = fila.cells[3].textContent; // Columna 3

            mostrarFormActualizarVenta(
              id_venta_actualizar,
              fecha,
              metodo_de_pago,
              total_venta
            );
          });
        }
      } catch (e) {
        console.error("Error parsing JSON:", e);
      }
    } else {
      console.error("Error fetching prendass:", this.statusText);
    }
  };
  xhr.onerror = function () {
    console.error("Request error...");
  };
  xhr.send();
}

export function ObtenerDetalles(API_URL) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", API_URL + "detalles_ventas", true);
  xhr.setRequestHeader(
    "Authorization",
    "Bearer 2d2d1fe74f529f8bc7fbc946bde5cd7"
  );

  xhr.onload = function () {
    if (this.status === 200) {
      const cleanedText = this.responseText.replace(/^\uFEFF/, "").trim();
      try {
        const response = JSON.parse(cleanedText);
        const detalles = response.Resultado;
        const tbody = document.querySelector("#detalle-venta-table tbody");
        tbody.innerHTML = "";
        detalles.forEach((detalle) => {
          const tr = document.createElement("tr");
          tr.innerHTML = `
                                  <td>${detalle.ID_detalle}</td>
                                  <td>${detalle.ID_prenda}</td>
                                  <td>${detalle.ID_venta}</td>
                                  <td>${detalle.Cantidad}</td>
                                  <td>${detalle.Subtotal}</td>                                
                                  <td>
                                    <button class="btn btn-primary actualizar-detalle" name="${detalle.ID_detalle}">Actualizar</button>
                                    <button class="btn btn-danger eliminar-detalle" name="${detalle.ID_detalle}">Eliminar</button>
                                  </td>
                              `;
          tbody.appendChild(tr);
        });

        // Obtiene todos los botones con la clase "eliminar-detalle"
        const botonesEliminar =
          document.getElementsByClassName("eliminar-detalle");
        // Itera sobre la colección
        for (let i = 0; i < botonesEliminar.length; i++) {
          botonesEliminar[i].addEventListener("click", (event) => {
            let id_detalle_eliminar = event.target.name;
            Eliminar(id_detalle_eliminar, API_URL, "detalles_ventas");
          });
        }

        // Obtiene todos los botones con la clase "actualizar"
        const botonesActualizar =
          document.getElementsByClassName("actualizar-detalle");
        // Itera sobre la colección
        for (let i = 0; i < botonesActualizar.length; i++) {
          botonesActualizar[i].addEventListener("click", (event) => {
            let id_detalle_actualizar = event.target.name;
            // Encuentra la fila del botón clickeado
            const fila = event.target.closest("tr");

            const Id_prenda = fila.cells[1].textContent; // Columna 1
            const Id_venta = fila.cells[2].textContent; // Columna 2
            const cantidad = fila.cells[3].textContent; // Columna 3
            const subtotal = fila.cells[4].textContent; // Columna 3

            mostrarFormActualizarDetalle(
              id_detalle_actualizar,
              Id_prenda,
              Id_venta,
              cantidad,
              subtotal
            );
          });
        }
      } catch (e) {
        console.error("Error parsing JSON:", e);
      }
    } else {
      console.error("Error fetching prendass:", this.statusText);
    }
  };
  xhr.onerror = function () {
    console.error("Request error...");
  };
  xhr.send();
}
