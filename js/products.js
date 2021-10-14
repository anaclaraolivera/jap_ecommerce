const ORDER_ASC_BY_PRICE = "UP";
const ORDER_DESC_BY_PRICE = "DOWN";
const ORDER_BY_PROD_SOLD = "Sold";
var currentProductsArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;
var stringBusqueda = undefined;

//Clasificar los productos en función de criteria y de array
function sortProducts(criteria, array) {
    //Se crea una variable que es un array vacío donde se cargará lo que se ordene
    let result = [];
    //Condición cuando lo querés ascendente 
    if (criteria === ORDER_DESC_BY_PRICE) {
        // Se carga en result el array ya ordenado por criteria
        result = array.sort(function(a, b) {
            // Compara de uno contra uno y devuelve el menor 
            if (a.cost < b.cost) { return -1; }
            if (a.cost > b.cost) { return 1; }
            return 0;
        });
        //Condición cuando lo querés por orden descendente  
    } else if (criteria === ORDER_ASC_BY_PRICE) {
        // Se carga en result el array ya ordenado por criteria
        result = array.sort(function(a, b) {
            // Compara de uno contra uno y devuelve el mayor
            if (a.cost > b.cost) { return -1; }
            if (a.cost < b.cost) { return 1; }
            return 0;
        });
        // Condición cuando querés que se ordene por productos vendidos
    } else if (criteria === ORDER_BY_PROD_SOLD) {
        result = array.sort(function(a, b) {
            // Variables que almacenan la cantidad de productos en enteros
            let aCount = parseInt(a.soldCount);
            let bCount = parseInt(b.soldCount);
            // Compara los valores de cantidad y retorna el mayor
            if (aCount > bCount) { return -1; }
            if (aCount < bCount) { return 1; }
            return 0;
        });
    }
    // Devuelve el resultado que es un array 
    return result;
}

// Función que sirve para mostrar los productos en pantalla
function showProductsList() {


    let htmlContentToAppend = "";
    for (let i = 0; i < currentProductsArray.length; i++) {
        let product = currentProductsArray[i];
        let nombreProductos = product.name.toLowerCase();
        let descripcionProductos = product.description.toLowerCase();
        //Cuando se llama a la función showProductsList si minCount y maxCount no son undefined se van a mostrar los 
        //productos comprendidos en ese rango
        if (((minCount == undefined) || (minCount != undefined && parseInt(product.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(product.cost) <= maxCount)) &&
           //Se agrega otro filtro por string 
            (stringBusqueda == undefined) || ((nombreProductos.includes(stringBusqueda)) || (descripcionProductos.includes(stringBusqueda)))
        ) {
            //construye el html
            htmlContentToAppend += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + product.imgSrc + `" alt="` + product.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">` + product.name + `</h4>
                            <h3 class="mb-1">` + product.currency + ` ` + product.cost + `</h3>
                            <small class="text-muted">` + product.soldCount + ` Artículos vendidos </small>
                        </div>
                        <p class="mb-1">` + product.description + `</p>
                    </div>
                </div>
            </a>
            `
        }

    }
    document.getElementById("prod-list-container").innerHTML = htmlContentToAppend;
}

// función que ordena y muestra los productos
function sortAndShowProducts(sortCriteria, productsArray) {
    currentSortCriteria = sortCriteria;
    // si el array no está vacío lo copiamos en una variable auxiliar  
    if (productsArray != undefined) {
        currentProductsArray = productsArray;
    }
    // se ordena la variable auxiliar que se creó anteriormente 
    currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);

    //Muestro las categorías ordenadas
    showProductsList();
}



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e) {

    getJSONData(PRODUCTS_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            sortAndShowProducts(ORDER_ASC_BY_PRICE, resultObj.data);
        }
    });
    document.getElementById("sortAsc").addEventListener("click", function() {
        sortAndShowProducts(ORDER_ASC_BY_PRICE);
    });

    document.getElementById("sortDesc").addEventListener("click", function() {
        sortAndShowProducts(ORDER_DESC_BY_PRICE);
    });

    document.getElementById("sortBySold").addEventListener("click", function() {
        sortAndShowProducts(ORDER_BY_PROD_SOLD);
    });

    //Limpia las variables globales de minCount y maxCount 
    document.getElementById("clearRangeFilter").addEventListener("click", function() {
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showProductsList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function() {
        //Obtengo el mínimo y máximo de los intervalos para filtrar por rango de precio 
        minCount = document.getElementById("rangeFilterCountMin").value;
        maxCount = document.getElementById("rangeFilterCountMax").value;
        //validar que los valores de minCount y maxCount sean números positivos y luego los asigna a las variables globales
        if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0) {
            minCount = parseInt(minCount);
        } else {
            minCount = undefined;
        }

        if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0) {
            maxCount = parseInt(maxCount);
        } else {
            maxCount = undefined;
        }
        //Muestra los productos según el rango que se haya definido en minCount y maxCount
        showProductsList();
    });

    document.getElementById("búsqueda-productos").addEventListener("keydown", function(event) {
        console.log(document.getElementById("búsqueda-productos").value);
        stringBusqueda = document.getElementById("búsqueda-productos").value.toLowerCase();
        showProductsList();
    });
});