
let datosCarrito = {};


function showCarrito() {
  let articulosCarrito = datosCarrito.articles;
  console.log(articulosCarrito.value)
  let contenidoHTML = "";
  for (let i=0; i > articulosCarrito.length; i++) {
    contenidoHTML += `
    <tr>
        <th scope="row">${articulosCarrito.name}</th>
        <td>${articulosCarrito.currency}</td>
        <td>${articulosCarrito.unitCost}</td>
        <td>${articulosCarrito.count}</td>
        <td> </td>
      </tr>
    `
    }
    document.getElementById("carrito-tabla").innerHTML = contenidoHTML;
  }
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(CART_2PROD_INFO).then(function (jsonCarrito) {
    if (jsonCarrito.status === "ok") {
      datosCarrito = jsonCarrito.data;
      
    }
    showCarrito(datosCarrito);
  });
});


  