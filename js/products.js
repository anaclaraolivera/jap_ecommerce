var currentProductsArray = [];



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            console.log(resultObj.data);
            currentProductsArray = resultObj.data;
            showProductoList();
            // sortAndShowCategories(ORDER_ASC_BY_NAME, resultObj.data);
        }
    });
});


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
