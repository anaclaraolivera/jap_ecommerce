var comentarios = [];

function mostrarComentarios(lista) {

    let AgregarAlHTML = "";
    for (let i = 0; i < lista.length; i++) {
        let comentario = lista[i];
        let stringHTMLestrellas = puntajeComentarios(comentario.score);
        AgregarAlHTML +=
            `
      <div class= "card">
           <div class="card-body">
                <h5 class="card-title">Usuario: ` + comentario.user + `</h5>
                <p class="card-text">`+ comentario.description + `</p>
                <div>`+ stringHTMLestrellas +`</div>
           </div>
           <div class="card-footer">
                <small class="text-muted">`+ comentario.dateTime + `</small>
           </div>
     </div>
      `
        document.getElementById("container-comentarios").innerHTML = AgregarAlHTML;
    }
}

function puntajeComentarios(cantidad) {
    let retorno = "";

    if (cantidad === 5) {
        retorno += `
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                `
    } else if (cantidad === 4) {
        retorno += `
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star"></span>
                `
    } else if (cantidad === 3) {
        retorno += `
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
                `
    }
    return retorno;

}

document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultado) {
        if (resultado.status === "ok") {
            comentarios = resultado.data;
            //muestra los comentarios
            mostrarComentarios(comentarios);
            console.log("estos son los comentarios" + comentarios)
            //debería poner las estrellitas :(
            puntajeComentarios(comentarios);
        }

    });
});


//<div class="card-body text-success">
//<p class="card-text" id="puntaje">Puntaje: `+ comentario.score +`/5 </p>