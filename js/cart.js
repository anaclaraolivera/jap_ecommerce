let allArticles = [];
let subtotalPesos = 0;
let subtotalDolares = 0;
let subtotalFinal = 0;
let porcentEnvio = 0.15;
let cantidadArticulos = 0;

const DOLARES = "USD";
const PESOS = "UYU";


//Función que crea el carrito a traves de los elementos del JSON
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

    if (cantidad <= 1) {

      document.getElementById("cantidad-producto" + i).value = 1;

    }
    else {
      document.getElementById("subtotal-producto" + i).innerText = costo * cantidad;

    }
  }
  calcularSubtotal();
  // actualizarCostos()
}

function calcularSubtotal() {
  subtotalPesos = 0;
  subtotalDolares = 0;

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
  // actualizarCostos()
}

function selectCurrency(option) {
  if (option === DOLARES) {
    document.getElementById("total-pago-dolares").style.display = "block";
    document.getElementById("total-pago-pesos").style.display = "none";
    //sirve para borrar el texto que aparece si no apretó moneda
    //se borra al elegir una moneda
    document.getElementById("texto-no-moneda").style.display ="none";
  }
  else {
    document.getElementById("total-pago-pesos").style.display = "block";
    document.getElementById("total-pago-dolares").style.display = "none";
    //sirve para borrar el texto que aparece si no apretó moneda
    //se borra al elegir una moneda
    document.getElementById("texto-no-moneda").style.display ="none";
  }
  // Acá lo que hace es ver con qué moneda se quedó, y a partir de eso se calcula el subtotal para el envío
  if (option === DOLARES) {
    subtotalFinal = document.getElementById("total-pago-dolares").innerText;
  }
  else {
    subtotalFinal = document.getElementById("total-pago-pesos").innerText;
  }
  actualizarCostos();
}
//problema es q solo se actualiza cuando toco el botón de cambiar moneda
function actualizarCostos() {
  //Obtiene el valor del subtotal si es pesos o dólares
  subtotal = parseInt(subtotalFinal);
  envio = parseInt(subtotal * porcentEnvio);
  total = parseInt(subtotal + envio);

  document.getElementById("costo-subt").innerHTML = subtotal;
  document.getElementById("costo-envio").innerHTML = envio;
  document.getElementById("costo-total").innerHTML = total;

}
function validarCampos() {
  let direccion = document.getElementById("direccion-dir").value;
  let numero = document.getElementById("numero-dir").value;
  let esquina = document.getElementById("esquina-dir").value;
  let subPESOS = document.getElementById("total-pago-pesos").style.display ="none";
  let subDOLARES = document.getElementById("total-pago-dolares").style.display ="none";
  if (direccion === "" || numero === "" || esquina === "") {
    alert ("Debes llenar los campos de dirección de envío")
   if(direccion === "") {
     document.getElementById("no-dir").style.visibility = "visible";
   }
   if(numero === "") {
    document.getElementById("no-num").style.visibility = "visible";
   }
   if (esquina === "") {
    document.getElementById("no-esq").style.visibility = "visible";
   }
  }
  if ( subPESOS|| subDOLARES) {
    document.getElementById("texto-no-moneda").style.display ="block";
    alert("Debes elegir una moneda para continuar")
  }
} 

// Función que se fija cuál es el método de pago seleccionado y muestra en pantalla 
//Además se cerciora de que haya ingresado datos dentro del método de pago seleccionado antes de dar guardar
function guardarMetodoPago() {
  let tarjeta = document.getElementById("radio-tarj-credito").checked;
  let transferencia = document.getElementById("radio-transf").checked;
  if (tarjeta === true && transferencia === false) {
document.getElementById("forma-pago-tarjeta").style.display = "block";
if ( document.getElementById("numero-tarj").value === "" ||
document.getElementById("codigo-tarj").value === "" ||
document.getElementById("vencimiento-tarj").value === "") {
  document.getElementById("forma-pago-tarjeta").style.display = "none";
  alert ("Tienes que llenar todos los campos")
}
if (document.getElementById("numero-tarj").value === "") {
  document.getElementById("no-num-tarj").style.visibility = "visible";
}
if (document.getElementById("codigo-tarj").value === "") {
  document.getElementById("no-cod").style.visibility = "visible";
}
if (document.getElementById("vencimiento-tarj").value === "") {
  document.getElementById("no-venc").style.visibility = "visible";
}
}
  else if (tarjeta === false && transferencia === true){
    document.getElementById("forma-pago-transferencia").style.display = "block";
    if (document.getElementById("numero-transf").value === "") {
      document.getElementById("forma-pago-transferencia").style.display = "none";
      alert ("Tienes que llenar todos los campos")
    }
    if (document.getElementById("numero-transf").value ==="") {
      document.getElementById("no-cuenta").style.visibility = "visible";
    }
  }
}
 // document.getElementById("no-cod").style.visibility = "visible";
  // document.getElementById("no-venc").style.visibility = "visible";


//al clickear ese radio button se deshabilita el input de la transf y se habilitan los de la tarj
function tarjetaClick() {
  document.getElementById("numero-transf").readOnly = true;
  document.getElementById("numero-tarj").readOnly = false;
  document.getElementById("codigo-tarj").readOnly = false;
  document.getElementById("vencimiento-tarj").readOnly = false;
//acá se asegura de limpiar los campos del otro lugar
  document.getElementById('numero-transf').value = '';
  document.getElementById("no-cuenta").style.visibility = "hidden";
  
}
//al clickear este se deshabilitan los input de la tarj y se habilitan los de la trasnf
function transferClick() {
  document.getElementById("numero-tarj").readOnly = true;
  document.getElementById("codigo-tarj").readOnly = true;
  document.getElementById("vencimiento-tarj").readOnly = true;
  document.getElementById("numero-transf").readOnly = false;
//acá se asegura de limpiar los campos del otro lugar
  document.getElementById('numero-tarj').value = '';
  document.getElementById('codigo-tarj').value = '';
  document.getElementById('vencimiento-tarj').value = '';
  document.getElementById("no-num-tarj").style.visibility = "hidden";
  document.getElementById("no-cod").style.visibility = "hidden";
  document.getElementById("no-venc").style.visibility = "hidden";
}
//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  //Desafiate 5, el json tiene dos artículos 
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
  //Botones radio para elegir el tipo de envio 
  document.getElementById("envio-premium").addEventListener("change", function () {
    porcentEnvio = 0.15;
    actualizarCostos();
  });

  document.getElementById("envio-express").addEventListener("change", function () {
    porcentEnvio = 0.07;
    actualizarCostos();
  });

  document.getElementById("envio-standard").addEventListener("change", function () {
    porcentEnvio = 0.05;
    actualizarCostos();
  });

});

