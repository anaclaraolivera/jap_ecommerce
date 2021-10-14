let allArticles = [];
let subtotalPesos = 0;
let subtotalDolares = 0;

const DOLARES = "USD";
const PESOS = "UYU";


function showCarrito() {

  let contenidoHTML = "";

  for (let i = 0; i < allArticles.length; i++) {
    article = allArticles[i];

    contenidoHTML += `  
    <tr class= "espacio-columnas">
    <td><img src =${article.src} style="width:75px;height:75px;"></td>
    <td scope="row">${article.name}</th>
    <td>${article.currency}</td>
    <td>${article.unitCost}</td>
    <td class= "alineado"><input id= "cantidad-producto${i}" type="number" style="width: 35px;" value= "${article.count}" onchange="actualizarSubtotal()"></td>
    <td id="subtotal-producto${i}">${article.unitCost * article.count}</td>
    </tr>
     `

  }
  document.getElementById("carrito-tabla").innerHTML += contenidoHTML;
}

function actualizarSubtotal() {


  for (let i = 0; i < allArticles.length; i++) {
    let cantidad = 0;
    let costo = 0;

    cantidad = document.getElementById("cantidad-producto" + i).value;
    costo = allArticles[i].unitCost;

    if (cantidad <= 0) {

      document.getElementById("cantidad-producto" + i).value = 0;
      document.getElementById("subtotal-producto" + i).innerText = 0;

    }
    else {
      document.getElementById("subtotal-producto" + i).innerText = costo * cantidad;

    }
  }
  calcularSubtotal();
}

function calcularSubtotal() {
  subtotalPesos= 0;
  subtotalDolares= 0;

  for (let i = 0; i < allArticles.length; i++) {

    cantidad = document.getElementById("cantidad-producto" + i).value;
    costo = allArticles[i].unitCost;

    if (allArticles[i].currency === PESOS) {
      subtotalPesos += costo * cantidad;
      subtotalDolares += (costo * cantidad) / 40;
    }
    else {
      subtotalPesos += (costo * cantidad) * 40;
      subtotalDolares += costo * cantidad;
    }
  }
  document.getElementById("total-pago-dolares").innerText = subtotalDolares;
  document.getElementById("total-pago-pesos").innerText = subtotalPesos;
}

function selectCurrency(option) {
  if (option === DOLARES) {
    document.getElementById("total-pago-dolares").style.display = "block";
    document.getElementById("total-pago-pesos").style.display = "none";
  }
  else {
    document.getElementById("total-pago-pesos").style.display = "block";
    document.getElementById("total-pago-dolares").style.display = "none";
  }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(CART_2PROD_INFO).then(function (jsonCarrito) {
    if (jsonCarrito.status === "ok") {
      allArticles = jsonCarrito.data.articles;
    }
    showCarrito();
    calcularSubtotal();

  });
  document.getElementById("pesos").addEventListener("click", function () {
    selectCurrency(PESOS);
  });
  document.getElementById("dólares").addEventListener("click", function () {
    selectCurrency(DOLARES);
  });
});




