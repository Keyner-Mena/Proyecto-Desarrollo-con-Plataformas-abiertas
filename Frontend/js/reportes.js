export function ObtenerReporteTop5Marcas(API_URL) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", API_URL + "reportes/top_5_marcas", true);
  xhr.setRequestHeader(
    "Authorization",
    "Bearer 2d2d1fe74f529f8bc7fbc946bde5cd7"
  );

  xhr.onload = function () {
    if (this.status === 200) {
      const cleanedText = this.responseText.replace(/^\uFEFF/, "").trim();
      try {
        const response = JSON.parse(cleanedText);
        const report = response.Resultado;
        const tbody = document.querySelector("#reporte-top-table tbody");
        tbody.innerHTML = "";
        report.forEach((row) => {
          const tr = document.createElement("tr");
          tr.innerHTML = `
                          <td>${row.Marca}</td>
                          <td>${row.Total_vendido}</td>
                      `;
          tbody.appendChild(tr);
        });
      } catch (e) {
        console.error("Error parsing JSON:", e);
      }
    } else {
      console.error("Error fetching reports:", this.statusText);
    }
  };
  xhr.onerror = function () {
    console.error("Request error...");
  };
  xhr.send();
}

export function ObtenerReportePrendas(API_URL) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", API_URL + "reportes/prendas_vendidas", true);
  xhr.setRequestHeader(
    "Authorization",
    "Bearer 2d2d1fe74f529f8bc7fbc946bde5cd7"
  );

  xhr.onload = function () {
    if (this.status === 200) {
      const cleanedText = this.responseText.replace(/^\uFEFF/, "").trim();
      try {
        const response = JSON.parse(cleanedText);
        const report = response.Resultado;
        const tbody = document.querySelector("#reporte-prendas-table tbody");
        tbody.innerHTML = "";
        report.forEach((row) => {
          const tr = document.createElement("tr");
          tr.innerHTML = `
                            <td>${row.Tipo_de_prenda}</td>
                            <td>${row.Cantidad_vendida}</td>
                            <td>${row.Stock}</td>
                        `;
          tbody.appendChild(tr);
        });
      } catch (e) {
        console.error("Error parsing JSON:", e);
      }
    } else {
      console.error("Error fetching reports:", this.statusText);
    }
  };
  xhr.onerror = function () {
    console.error("Request error...");
  };
  xhr.send();
}

export function ObtenerReporteMarcas(API_URL) {
  const xhr = new XMLHttpRequest();
  xhr.open("GET", API_URL + "reportes/marcas_con_ventas", true);
  xhr.setRequestHeader(
    "Authorization",
    "Bearer 2d2d1fe74f529f8bc7fbc946bde5cd7"
  );

  xhr.onload = function () {
    if (this.status === 200) {
      const cleanedText = this.responseText.replace(/^\uFEFF/, "").trim();
      try {
        const response = JSON.parse(cleanedText);
        const report = response.Resultado;
        const tbody = document.querySelector("#reporte-marcas-table tbody");
        tbody.innerHTML = "";
        report.forEach((row) => {
          const tr = document.createElement("tr");
          tr.innerHTML = `
                            <td>${row.Nombre}</td>
                            <td>${row.Cantidad_vendida}</td>
                        `;
          tbody.appendChild(tr);
        });
      } catch (e) {
        console.error("Error parsing JSON:", e);
      }
    } else {
      console.error("Error fetching reports:", this.statusText);
    }
  };
  xhr.onerror = function () {
    console.error("Request error...");
  };
  xhr.send();
}
