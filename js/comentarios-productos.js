var comentarios = [];

// No sé cómo hacer esto 
function mostrarComentarios(lista){

    let AgregarAlHTML = "";
    for (let i = 0; i < lista.length; i++) {
        let comentario = lista[i];

        AgregarAlHTML += 


        `
      <div class= "card">
           <div class="card-body">
           <div>     
           <h5 class="card-title">Usuario: `+ comentario.user + `</h5>
           </div>
           <div>
                <p class="card-text">`+ comentario.description + `</p>
                </div>
                <div class="card-body text-success">
                <p class="card-text">Puntaje: `+ comentario.score +`/5 </p>
                </div>
           </div>
           <div class="card-footer">
                <small class="text-muted">`+ comentario.dateTime + `</small>
           </div>
     </div>

      `
    
        document.getElementById("container-comentarios").innerHTML = AgregarAlHTML;
    }
}



document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultado) {
        if (resultado.status === "ok") 
        {
            comentarios = resultado.data;
            //muestra los comentarios
            mostrarComentarios(comentarios);
        }

    });
});