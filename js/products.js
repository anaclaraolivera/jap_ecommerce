var currentProductsArray = [];
const ORDER_ASC_BY_PRICE = "UP";
const ORDER_DESC_BY_PRICE = "DOWN";
const ORDER_BY_PROD_SOLD = "Sold.";
var minCount = undefined;
var maxCount = undefined;


//Clasificar las categorías en función de criteria y de array
function sortProducts(criteria, array){
    //Se crea una variable que es un array vacío donde se cargará lo que se ordene
    let result = [];
    //Condición cuando lo querés ascendente 
    if (criteria === ORDER_ASC_BY_PRICE)
    {
        // Se carga en result el array ya ordenado por criteria
        result = array.sort(function(a, b) {
            // Compara de uno contra uno y devuelve el menor 
            if ( a.cost < b.cost ){ return -1; }
            if ( a.cost > b.cost ){ return 1; }
            return 0;
        });
        //Condición cuando lo querés por orden descendente  
    }else if (criteria === ORDER_DESC_BY_PRICE){
       // Se carga en result el array ya ordenado por criteria
        result = array.sort(function(a, b) {
            // Compara de uno contra uno y devuelve el mayor
            if ( a.cost > b.cost ){ return -1; }
            if ( a.cost < b.cost ){ return 1; }
            return 0;
        });
        // Condición cuando querés que se ordene por productos vendidos
    }else if (criteria === ORDER_BY_PROD_SOLD){
           result = array.sort(function(a, b) {
            // Variables que almacenan la cantidad de productos en enteros
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);
            // Compara los valores de cantidad y retorna el mayor
            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }
// Devuelve el resultado que es un array 
    return result;
}



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            currentProductsArray = resultObj.data;
            showProductoList();
        }
    });
   
});

// Función que sirve para mostrar los productos en pantalla
function showProductoList() {
    let htmlContentToAppend = "";
    for (let i = 0; i < currentProductsArray.length; i++) {
        let product = currentProductsArray[i];
        htmlContentToAppend += `
            <a href="" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ product.name + `</h4>
                            <h3 class="mb-1">`+ product.currency + ` ` + product.cost + `</h3>
                            <small class="text-muted">` + product.soldCount + ` Artículos vendidos </small>
                        </div>
                        <p class="mb-1">` + product.description + `</p>
                    </div>
                </div>
            </a>
            `
    }
    document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
}


document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowCategories(ORDER_ASC_BY_PRICE, resultObj.data);
        }
    });
    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_ASC_BY_PRICE);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_DESC_BY_PRICE);
    });

    document.getElementById("sortBySold").addEventListener("click", function(){
        sortAndShowCategories(ORDER_BY_PROD_SOLD);
    });
//Ahí termina de identificar botones y comienza con el filtro 
    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showCategoriesList();

document.getElementById("rangeFilterCount").addEventListener("click", function(){
    //Obtengo el mínimo y máximo de los intervalos para filtrar por rango de precio 
    minCount = document.getElementById("rangeFilterCountMin").value;
    maxCount = document.getElementById("rangeFilterCountMax").value;

    if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
        minCount = parseInt(minCount);
    }
    else{
        minCount = undefined;
    }

    if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
        maxCount = parseInt(maxCount);
    }
    else{
        maxCount = undefined;
    }

    showProductoList();
}))