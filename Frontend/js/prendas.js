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
                                <button class="btn btn-primary actualizar" name="${prenda.ID_Prenda}">Actualizar</button>
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
            let id_prenda_eliminar = event.target.name;
            eliminarPrenda(id_prenda_eliminar, API_URL);
          });
        }

        // Obtiene todos los botones con la clase "actualizar"
        const botonesActualizar = document.getElementsByClassName("actualizar");
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

export function GuardarPrenda(data, API_URL) {
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

function eliminarPrenda(prendaId, API_URL) {
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

export function ActualizarPrenda(data, API_URL) {
  console.log("contenido de la data");
  console.log(data);

  const xhr = new XMLHttpRequest();
  xhr.open("PUT", API_URL + "/prendas?id=" + data.ID_Prenda, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader(
    "Authorization",
    "Bearer 2d2d1fe74f529f8bc7fbc946bde5cd7"
  );

  xhr.onload = function () {
    if (xhr.status === 200) {
      console.log("Prenda actualizada exitosamente");
      ObtenerPrendas(API_URL); // Actualizar lista de libros después de actualizar
      const Tabla_prendas = document.getElementById("prenda-table");
      Tabla_prendas.scrollIntoView();
    } else {
      console.error("Error al actualizar la prenda:", xhr.statusText);
    }
  };
  xhr.onerror = function () {
    console.error("Error en la solicitud");
  };

  xhr.send(JSON.stringify(data));
}

function mostrarFormActualizarPrenda(
  id_prenda_actualizar,
  tipoPrenda,
  idMarca,
  material,
  talla,
  color,
  precio,
  stock
) {
  const FormActualizar = document.getElementById("update-prenda-form");

  FormActualizar.querySelector("#update-id_prenda").value =
    id_prenda_actualizar;
  FormActualizar.querySelector("#update-tipo_de_prenda").value = tipoPrenda;
  FormActualizar.querySelector("#update-marca").value = idMarca;
  FormActualizar.querySelector("#update-material").value = material;
  FormActualizar.querySelector("#update-talla").value = talla;
  FormActualizar.querySelector("#update-color").value = color;
  FormActualizar.querySelector("#update-precio").value = precio;
  FormActualizar.querySelector("#update-stock").value = stock;

  FormActualizar.classList.remove("seccion_secundaria");
  FormActualizar.scrollIntoView();
}
