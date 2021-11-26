let allArticles = [];
let article = {};
let subtotalPesos = 0;
let subtotalDolares = 0;
let subtotalFinal = 0;
// let monedaSubtotal = "";
// let monedaCosto = "";
// let monedaTotal = "";
let porcentEnvio = 0.15;
let msgCompraRealizada = "";


const DOLARES = "USD";
const PESOS = "UYU";


//Función que crea el carrito a traves de los elementos del JSON
function showCarrito() {
  //Limpia el html que haya dentro de carrito-tabla
  document.getElementById("carrito-tabla").innerHTML = "";

  let contenidoHTML = "";

  for (let i = 0; i < allArticles.length; i++) {
    article[i] = allArticles[i];

    contenidoHTML += `  
    <div id="articulo${i}">
    <tr class= "espacio-columnas">
    <td><button onclick="eliminarArt(this.value)" value="${i}"><i class="far fa-trash-alt fa-2x"></i></button></td>
    <td><img src =${article[i].src} style="width:75px;height:75px;"></td>
    <td scope="row">${article[i].name}</th>
    <td>${article[i].currency}</td>
    <td>${article[i].unitCost}</td>
    <td class= "alineado"><input id= "cantidad-producto${i}" type="number" style="width: 35px;" value= "${article[i].count}" onchange="actualizarSubtotal()"></td>
    <td id="subtotal-producto${i}">${article[i].unitCost * article[i].count}</td>
    </tr>
    </div>
     `

  }
  document.getElementById("carrito-tabla").innerHTML += contenidoHTML;
}
//DESAFIATE 7
function eliminarArt(value) {
  allArticles.splice(value, 1);
  showCarrito();
  //Para que se actualice el subtotal al eliminar art
  actualizarSubtotal();
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
  selectCurrency();
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
    document.getElementById("texto-no-moneda").style.display = "none";
  }
  else {
    document.getElementById("total-pago-pesos").style.display = "block";
    document.getElementById("total-pago-dolares").style.display = "none";
    //sirve para borrar el texto que aparece si no apretó moneda
    //se borra al elegir una moneda
    document.getElementById("texto-no-moneda").style.display = "none";
  }
  // Acá lo que hace es ver con qué moneda se quedó, y a partir de eso se calcula el subtotal para el envío 
  // Y pone el símbolo de la moneda correspondiente 
  if (option === DOLARES) {
    subtotalFinal = document.getElementById("total-pago-dolares").innerText;
    document.getElementById("mon-subt").innerHTML = "US$"
    document.getElementById("mon-costo").innerHTML = "US$"
    document.getElementById("mon-total").innerHTML = "US$"
  }
  else {
    subtotalFinal = document.getElementById("total-pago-pesos").innerText;
    document.getElementById("mon-subt").innerHTML = "$"
    document.getElementById("mon-costo").innerHTML = "$"
    document.getElementById("mon-total").innerHTML = "$"
  }
  actualizarCostos();
}

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
  let subPESOSnone = document.getElementById("total-pago-pesos").style.display === "none";
  let subDOLARESnone = document.getElementById("total-pago-dolares").style.display === "none";
  let tarjetaNone = document.getElementById("forma-pago-tarjeta").style.display = "none";
  let transferNone =  document.getElementById("forma-pago-transferencia").style.display = "none";

  //Valida los campos de dirección
  if (direccion === "" || numero === "" || esquina === "") {
    alert("Debes llenar los campos de dirección de envío")
    if (direccion === "") {
      document.getElementById("no-dir").style.visibility = "visible"; 
    }
    if (numero === "") {
      document.getElementById("no-num").style.visibility = "visible";
    }
    if (esquina === "") {
      document.getElementById("no-esq").style.visibility = "visible";
    }
  }
//Valida que no se activen los dos totales a la vez
  if (document.getElementById("total-pago-pesos").style.display === "block") {
    document.getElementById("total-pago-dolares").style.display = "none";
  }
  //Valida que no se activen los dos totales a la vez
  if (document.getElementById("total-pago-dolares").style.display === "block") {
    document.getElementById("total-pago-pesos").style.display = "none";
  } 
  //Valida que haya alguna moneda ingresada
  if (subPESOSnone && subDOLARESnone) {
    document.getElementById("texto-no-moneda").style.display = "block";
    alert("Debes elegir una moneda para continuar");
  }
  //Valida que haya al menos un artículo en el carrito
  if (allArticles.length === 0) {
    alert("No hay ningún artículo en el carrito");
  }
//FUNCIONA MAL cuando doy click al botón finalizar compra y seleccione una sigue diciendo el alert
// y además se borra el que seleccioné :(
  if (tarjetaNone && transferNone) {
alert ("Debes seleccionar una forma de pago")

  }
//Muestra el mensaje compra realizada con exito
 if (direccion !== "" && numero !== "" && esquina !== ""  && (!subPESOSnone || !subDOLARESnone) && (!tarjetaNone && !transferNone)) {
   //Pega el mensaje que viene del json al html
   document.getElementById("mensaje-compra-exito").innerHTML = msgCompraRealizada;
   //Hace que el popup aparezca solamente si se validaron los campos
document.getElementById("popup1").style.display ="block";
 }
}

function onDireccionKeyUp(value) {
if (value.length > 0) {
  document.getElementById("no-dir").style.visibility = "hidden";
}
else {
  document.getElementById("no-dir").style.visibility = "visible";
}
}
function onNumeroKeyUp(value) {
  if (value.length > 0) {
    document.getElementById("no-num").style.visibility = "hidden";
  }
  else {
    document.getElementById("no-num").style.visibility = "visible";
  }
}
function onEsquinaKeyUp(value) {
  if (value.length > 0) {
    document.getElementById("no-esq").style.visibility = "hidden";
  }
  else {
    document.getElementById("no-esq").style.visibility = "visible";
  }
}
function onNumTarjKeyUp(value) {
  if (value.length > 0) {
    document.getElementById("no-num-tarj").style.visibility = "hidden";
  }
  else {
    document.getElementById("no-num-tarj").style.visibility = "visible";
  }
}
function onCodigoKeyUp(value) {
  if (value.length > 0) {
    document.getElementById("no-cod").style.visibility = "hidden";
  }
  else {
    document.getElementById("no-cod").style.visibility = "visible";
  }
}
function onVencKeyUp(value) {
  if (value.length > 0) {
    document.getElementById("no-venc").style.visibility = "hidden";
  }
  else {
    document.getElementById("no-venc").style.visibility = "visible";
  }
}
function onNumCuentaKeyUp(value) {
  if (value.length > 0) {
    document.getElementById("no-cuenta").style.visibility = "hidden";
  }
  else {
    document.getElementById("no-cuenta").style.visibility = "visible";
  }
}

// Función que se fija cuál es el método de pago seleccionado y muestra en pantalla 
//Además se cerciora de que haya ingresado datos dentro del método de pago seleccionado antes de dar guardar
function guardarMetodoPago() {
  let tarjeta = document.getElementById("radio-tarj-credito").checked;
  let transferencia = document.getElementById("radio-transf").checked;
  let transfNone= document.getElementById("forma-pago-transferencia").style.display = "none";
  let tarjNone = document.getElementById("forma-pago-tarjeta").style.display = "none";
  if (tarjeta === true && transferencia === false) {
    //Acá muestra "Tarjeta de crédito en pantalla"
    document.getElementById("forma-pago-tarjeta").style.display = "block";
    document.getElementById("forma-pago-transferencia").style.display = "none";
    if (document.getElementById("numero-tarj").value === "" ||
      document.getElementById("codigo-tarj").value === "" ||
      document.getElementById("vencimiento-tarj").value === "") {
      document.getElementById("forma-pago-tarjeta").style.display = "none";

      
      // document.getElementById("boton-guardar-modal").disabled = true;
      
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
  else if (tarjeta === false && transferencia === true) {
    //Acá muestra "Transfe"
    document.getElementById("forma-pago-transferencia").style.display = "block";
    document.getElementById("forma-pago-tarjeta").style.display = "none";
    if (document.getElementById("numero-transf").value === "") {
      document.getElementById("forma-pago-transferencia").style.display = "none";
      alert("Tienes que llenar todos los campos")
    }
    if (document.getElementById("numero-transf").value === "") {
      document.getElementById("no-cuenta").style.visibility = "visible";
    }
  }
  //CREO QUE ESTO ES UN PROBLEMA 
  if (tarjNone && transfNone) {
    document.getElementById("forma-pago-transferencia").style.display = "none";
    document.getElementById("forma-pago-tarjeta").style.display = "none";
    document.getElementById("no-forma-pago").style.visibility="visible";
  }
}

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

  //Traigo el mensaje de compra realizada con éxito
getJSONData(CART_BUY_URL).then(function (mensaje) {
  if (mensaje.status === "ok") {
    console.log(mensaje.data.msg)
    msgCompraRealizada = mensaje.data.msg;
    console.log("mensajeGLOBAL" + msgCompraRealizada);
  }

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

