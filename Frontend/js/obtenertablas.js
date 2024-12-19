import { eliminarPrenda } from "./scripts.js";
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
                              <td>${prenda.Tipo_de_prenda}</td>
                              <td>${prenda.ID_Marca}</td>
                              <td>${prenda.Material}</td>
                              <td>${prenda.Talla}</td>
                              <td>${prenda.Color}</td>
                              <td>${prenda.Precio}</td>
                              <td>${prenda.Stock}</td>
                              <td>
                                <button class="btn btn-primary disabled">Actualizar</button>
                                <button class="btn btn-danger" name="${prenda.ID_Prenda}" id="eliminar-prenda-${prenda.ID_Prenda}">Eliminar</button>
                              </td>
                          `;
          tbody.appendChild(tr);
        });
        // Obtiene todos los botones con la clase "btn-danger"
        const botonesEliminar = document.getElementsByClassName("btn-danger");
        // Itera sobre la colección
        for (let i = 0; i < botonesEliminar.length; i++) {
          botonesEliminar[i].addEventListener("click", (event) => {
            let id_prenda = event.target.name;
            eliminarPrenda(id_prenda);
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
                                  <button class="btn btn-primary">Actualizar</button>
                                  <button class="btn btn-danger">Eliminar</button>
                                </td>
                            `;
          tbody.appendChild(tr);
        });
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
                                  <button class="btn btn-primary">Actualizar</button>
                                  <button class="btn btn-danger">Eliminar</button>
                                </td>
                            `;
          tbody.appendChild(tr);
        });
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
                                  <button class="btn btn-primary">Actualizar</button>
                                  <button class="btn btn-danger">Eliminar</button>
                                </td>
                            `;
          tbody.appendChild(tr);
        });
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
