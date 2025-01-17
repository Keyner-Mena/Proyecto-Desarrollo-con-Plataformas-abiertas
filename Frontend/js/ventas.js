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
