let allArticles = [];

function showCarrito() {
  
  let contenidoHTML = "";

  for (let i=0; i < allArticles.length; i++) {
    article = allArticles[i];
   
    contenidoHTML += `  
    <tr>
    <td><img src =${article.src} style="width:75px;height:75px;"></td>
    <th scope="row">${article.name}</th>
    <td> 
    <select id= "currency">

    <option id="usd">USD</option>
    
    <option id="uyu">UYU</option>
    
    </select>
    </td>
    <td>${article.unitCost}</td>
    <td><input id= "cantidad-producto${i}" type="number" value= "${article.count}" onchange="actualizarSubtotal()"></td>
    <td id="subtotal-producto${i}">${article.unitCost * article.count}</td>
    </tr>
     `
    
    }
    document.getElementById("carrito-tabla").innerHTML = contenidoHTML;
  }
// function showCarrito() {
  
//   let contenidoHTML = "";

//   for (let i=0; i < allArticles.length; i++) {
//     article = allArticles[i];
   
//     contenidoHTML += `  
//     <tr>
//     <td><img src =${article.src} style="width:75px;height:75px;"></td>
//     <th scope="row">${article.name}</th>
//     <td>${article.currency}></td>
//     <td>${article.unitCost}</td>
//     <td><input id= "cantidad-producto${i}" type="number" value= "${article.count}" onchange="actualizarSubtotal()"></td>
//     <td id="subtotal-producto${i}">${article.unitCost * article.count}</td>
//     </tr>
//      `
    
//     }
//     document.getElementById("carrito-tabla").innerHTML = contenidoHTML;
//   }

  function actualizarSubtotal(){
    let cantidad = 0;
    let costo = 0;

    for (let i=0; i < allArticles.length; i++) {

     cantidad = document.getElementById("cantidad-producto"+i+"").value;
     costo = allArticles[i].unitCost;
    
    if (cantidad<=0){
     
     document.getElementById("cantidad-producto"+i).value = 0;
     
    }
    else {
      document.getElementById("subtotal-producto"+i).innerText = costo*cantidad;
    }
  }

  }
  function cambiarCurrency(){

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
  });
});


  