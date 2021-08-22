//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok"){
            console.log (resultObj.data);
           // sortAndShowCategories(ORDER_ASC_BY_NAME, resultObj.data);
        }
    });
});




// function showCategoriesList(){

//     let htmlContentToAppend = "";
//     for(let i = 0; i < currentProductsArray.length; i++){
//         let category = currentProductsArray[i];

//             htmlContentToAppend += `
//             <a href="category-info.html" class="list-group-item list-group-item-action">
//                 <div class="row">
//                     <div class="col-3">
//                         <img src="` + category.imgSrc + `" alt="` + category.description + `" class="img-thumbnail">
//                     </div>
//                     <div class="col">
//                         <div class="d-flex w-100 justify-content-between">
//                             <h4 class="mb-1">`+ category.name +`</h4>
//                             <small class="text-muted">` + category.productCount + ` artículos</small>
//                         </div>
//                         <p class="mb-1">` + category.description + `</p>
//                     </div>
//                 </div>
//             </a>
//             `
//         }

//         document.getElementById("cat-list-container").innerHTML = htmlContentToAppend;
//     }
// }