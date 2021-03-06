let product = {};
let otherProducts = [];
let relatedProducts = [];



function mostrarImagenes(array) {

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="carousel-item">
                <img class="d-block w-100" src="` + imageSrc + `" alt="imagen ilustrativa">
        </div>
        `

        document.getElementById("ImagenesProducto").innerHTML = htmlContentToAppend;
    }
}


//Función que muestra los productos relacionados 
function mostrarRelatedProducts() {

    let contenidoHTML = "";
    //Se itera sobre el largo de "relatedProducts"
    //Es un índice que indica cuál de los productos de "otherProducts" llamar para mostrarlo en html
    for (let i = 0; i < relatedProducts.length; i++) {
        
        let eachProduct = otherProducts[relatedProducts[i]];
        contenidoHTML += `
       
    <div class="card">
     <img src=" `+ eachProduct.imgSrc + `" class="card-img-top" alt="Imagen">
        <div class="card-body">
          <h3 class="card-title"> $ `+ eachProduct.cost + `</h3>
          <h5 class="card-text">`+ eachProduct.name + `</h5>
          <h6 class="card-text">`+ eachProduct.description + `</h6>
          <p class="card-text"><small class="text-muted"> Cantidad disponible: `+ eachProduct.soldCount + `</small></p>
        </div>
    </div>
    
        `
        document.getElementById("related-products").innerHTML = contenidoHTML;
      
    }
}



// Función que se ejecuta una vez que se haya lanzado el evento de
// que el documento se encuentra cargado, es decir, se encuentran todos los
// elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;

            let productNameHTML = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productCostHTML = document.getElementById("productCost");
            let productCurrencyHTML = document.getElementById("productCurrency");
            let productSoldCountHTML = document.getElementById("productSoldCount");
            let productCategoryHTML = document.getElementById("productCategory");
            relatedProducts = product.relatedProducts;

            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productCostHTML.innerHTML = product.cost;
            productCurrencyHTML.innerHTML = product.currency;
            productSoldCountHTML.innerHTML = product.soldCount;
            productCategoryHTML.innerHTML = product.category;

            //Muestro las imágenes 
            mostrarImagenes(product.images);
        }

    });
        //Se hace otra petición para obtener el array de los productos 
           getJSONData(PRODUCTS_URL).then(function (result) {
              if (result.status === "ok") {
                  otherProducts = result.data;
                }
              mostrarRelatedProducts(otherProducts);
            });
});