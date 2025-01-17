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
