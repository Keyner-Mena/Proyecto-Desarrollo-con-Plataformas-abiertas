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
