const ORDER_ASC_BY_NAME = "AZ";
const ORDER_DESC_BY_NAME = "ZA";
const ORDER_BY_PROD_COUNT = "Cant.";
var currentCategoriesArray = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;

function obteneryMostrarUsuario() {
    let string = 'Hola, ';
    let usuarioValue = localStorage.getItem('usuario');
    if (usuarioValue == null) {
      usuarioValue = "extraño"
    }
    string += usuarioValue;
    let nombreUsuario = document.getElementById('username');
    nombreUsuario.innerHTML += string;
  }
  


//Clasificar las categorías en función de criteria y de array
function sortCategories(criteria, array){
    //Se crea una variable que es un array vacío donde se cargará lo que se ordene
    let result = [];
    //Condición cuando lo querés ascendente alfabéticamente
    if (criteria === ORDER_ASC_BY_NAME)
    {
        // Se carga en result el array ya ordenado por criteria
        result = array.sort(function(a, b) {
            // Compara de uno contra uno y devuelve el menor 
            if ( a.name < b.name ){ return -1; }
            if ( a.name > b.name ){ return 1; }
            return 0;
        });
        //Condición cuando lo querés por orden descendente alfabéticamente 
    }else if (criteria === ORDER_DESC_BY_NAME){
       // Se carga en result el array ya ordenado por criteria
        result = array.sort(function(a, b) {
            // Compara de uno contra uno y devuelve el mayor
            if ( a.name > b.name ){ return -1; }
            if ( a.name < b.name ){ return 1; }
            return 0;
        });
        // Condición cuando querés que se ordene por productos vendidos
    }else if (criteria === ORDER_BY_PROD_COUNT){
           result = array.sort(function(a, b) {
            // Variables que almacenan la cantidad de productos en enteros
            let aCount = parseInt(a.productCount);
            let bCount = parseInt(b.productCount);
            // Compara los valores de cantidad y retorna el mayor
            if ( aCount > bCount ){ return -1; }
            if ( aCount < bCount ){ return 1; }
            return 0;
        });
    }
// Devuelve el resultado que es un array 
    return result;
}

function showCategoriesList(){

    let htmlContentToAppend = "";
    for(let i = 0; i < currentCategoriesArray.length; i++){
        let category = currentCategoriesArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(category.productCount) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(category.productCount) <= maxCount))){

            htmlContentToAppend += `
            <a href="category-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + category.imgSrc + `" alt="` + category.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ category.name +`</h4>
                            <small class="text-muted">` + category.productCount + ` artículos</small>
                        </div>
                        <p class="mb-1">` + category.description + `</p>
                    </div>
                </div>
            </a>
            `
        }

        document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
    }
}
// función que ordena y muestra las categorías 
function sortAndShowCategories(sortCriteria, categoriesArray){
    currentSortCriteria = sortCriteria;
// si el array no está vacío lo copiamos en una variable auxiliar  
    if(categoriesArray != undefined){
        currentCategoriesArray = categoriesArray;
    }
// se ordena la variable auxiliar que se creó anteriormente 
    currentCategoriesArray = sortCategories(currentSortCriteria, currentCategoriesArray);

    //Muestro las categorías ordenadas
    showCategoriesList();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    obteneryMostrarUsuario()
    getJSONData(CATEGORIES_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            sortAndShowCategories(ORDER_ASC_BY_NAME, resultObj.data);
        }
    });

    document.getElementById("sortAsc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_ASC_BY_NAME);
    });

    document.getElementById("sortDesc").addEventListener("click", function(){
        sortAndShowCategories(ORDER_DESC_BY_NAME);
    });

    document.getElementById("sortByCount").addEventListener("click", function(){
        sortAndShowCategories(ORDER_BY_PROD_COUNT);
    });
//Ahí termina de identificar botones y comienza con el filtro 
    document.getElementById("clearRangeFilter").addEventListener("click", function(){
        document.getElementById("rangeFilterCountMin").value = "";
        document.getElementById("rangeFilterCountMax").value = "";

        minCount = undefined;
        maxCount = undefined;

        showCategoriesList();
    });

    document.getElementById("rangeFilterCount").addEventListener("click", function(){
        //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
        //de productos por categoría.
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

        showCategoriesList();
    });
});


 