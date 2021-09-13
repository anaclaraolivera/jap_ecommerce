var comentarios = [];

function mostrarComentarios(lista){

    let AgregarAlHTML = "";
    for (let i = 0; i < lista.length; i++) {
        let comentario = lista[i];

        AgregarAlHTML += 
        `
      <div class= "card">
           <div class="card-body">
                <h5 class="card-title">Usuario: `+ comentario.user + `</h5>
                <p class="card-text">`+ comentario.description + `</p>
                <div id="puntaje"></div>
           </div>
           <div class="card-footer">
                <small class="text-muted">`+ comentario.dateTime + `</small>
           </div>
     </div>
      `
        document.getElementById("container-comentarios").innerHTML = AgregarAlHTML;
    }
}

//no sé :(
function puntajeComentarios (lista){

    let AgregarPuntaje = "";

    for (let i = 0; i < lista.length; i++) {
        let item = lista[i];
        if (item.score === 5) {
            AgregarPuntaje += `
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            `
            document.getElementById("puntaje").innerHTML = AgregarPuntaje;

        } else if (item.score === 4) {
            AgregarPuntaje += `
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>
            `
            document.getElementById("puntaje").innerHTML = AgregarPuntaje;

        } else if (item.score === 3) {
            AgregarPuntaje += `
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
            `
            document.getElementById("puntaje").innerHTML = AgregarPuntaje;
            
        }
    }
}






document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultado) {
        if (resultado.status === "ok") 
        {
            comentarios = resultado.data;
            //muestra los comentarios
            mostrarComentarios(comentarios);
            puntajeComentarios(comentarios);
            
        }

    });
});


//<div class="card-body text-success">
//<p class="card-text" id="puntaje">Puntaje: `+ comentario.score +`/5 </p>