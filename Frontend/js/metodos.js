import {
  ObtenerPrendas,
  ObtenerMarcas,
  ObtenerVentas,
  ObtenerDetalles,
} from "./obtenerTablas.js";

export function Guardar(data, API_URL, endpoint) {
  console.log("Guardar datos del formulario:");
  console.log(data);

  const xhr = new XMLHttpRequest();
  xhr.open("POST", API_URL + "/" + endpoint, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader(
    "Authorization",
    "Bearer 2d2d1fe74f529f8bc7fbc946bde5cd7"
  );

  xhr.onload = function () {
    if (xhr.status === 200) {
      console.log("Info guardada exitosamente");
      // Actualizar listas
      ObtenerPrendas(API_URL);
      ObtenerMarcas(API_URL);
      ObtenerVentas(API_URL);
      ObtenerDetalles(API_URL);
      const nav = document.getElementById("barra_principal");
      nav.scrollIntoView();
    } else {
      console.error("Error al guardar la info:", xhr.statusText);
    }
  };
  xhr.onerror = function () {
    console.error("Error en la solicitud");
  };
  // Enviar los datos del formulario con la variable data
  xhr.send(JSON.stringify(data));
}

export function Eliminar(ID, API_URL, endpoint) {
  const xhr = new XMLHttpRequest();
  // usamos delete
  xhr.open("DELETE", API_URL + "/" + endpoint + "?id=" + ID, true);
  xhr.setRequestHeader(
    "Authorization",
    "Bearer 2d2d1fe74f529f8bc7fbc946bde5cd7"
  );

  xhr.onload = function () {
    if (xhr.status === 200) {
      console.log("Datos eliminados exitosamente");
      // Actualizar listas
      ObtenerPrendas(API_URL);
      ObtenerMarcas(API_URL);
      ObtenerVentas(API_URL);
      ObtenerDetalles(API_URL);
    } else {
      console.error("Error al eliminar datos:", xhr.statusText);
    }
  };
  xhr.onerror = function () {
    console.error("Error en la solicitud");
  };
  xhr.send();
}

export function Actualizar(data, ID, API_URL, endpoint) {
  console.log("contenido de la data");
  console.log(data);

  const xhr = new XMLHttpRequest();
  xhr.open("PUT", API_URL + "/" + endpoint + "?id=" + ID, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.setRequestHeader(
    "Authorization",
    "Bearer 2d2d1fe74f529f8bc7fbc946bde5cd7"
  );

  xhr.onload = function () {
    if (xhr.status === 200) {
      console.log("Datos actualizados exitosamente");
      // Actualizar listas
      ObtenerPrendas(API_URL);
      ObtenerMarcas(API_URL);
      ObtenerVentas(API_URL);
      ObtenerDetalles(API_URL);
      const nav = document.getElementById("barra_principal");
      nav.scrollIntoView();
    } else {
      console.error("Error al actualizar los datos:", xhr.statusText);
    }
  };
  xhr.onerror = function () {
    console.error("Error en la solicitud");
  };

  xhr.send(JSON.stringify(data));
}
