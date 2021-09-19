let comentarios = [];

function saveComment() {
    let todayDate = new Date();
    let stringDate = todayDate.getFullYear() + "-" + todayDate.getMonth() + "-" + todayDate.getDate() + " " + todayDate.toLocaleTimeString("es-UY");
    let comentarioString = document.getElementById("descripcion-comentario").value;
    let scoreNumber = document.getElementById("puntaje").value;

    if (comentarioString === "" || isNaN(scoreNumber)) {
        alert("Debe llenar un comentario y puntaje");
    } else {
        // tiene las mismas keys que lo que viene del json
        let comentario = {
            description: comentarioString,
            dateTime: stringDate,
            score: scoreNumber,
            user: localStorage.getItem("usuario")
        }
        // a la lista del json se le pushean los comentarios nuevos
        comentarios.push(comentario);
        // se recarga la lista y se muestra el nuevo comentario 
        showComment();
    }
}

function estrellas(starsNumber) {

    let number = parseInt(starsNumber);
    let retorno = "";
    for (let i = 1; i <= number; i++) {
        retorno += `<span class="fa fa-star checked"></span>`

    }
    for (let j = number + 1; j <= 5; j++) {
        retorno += `<span class="fa fa-star"></span>`
    }
    return retorno;

}

function showComment() {
    let html = ""
    for (let i = comentarios.length - 1; i >= 0; i--) {
        let comentario = comentarios[i];
        html += ` 
        <div class= "card deck mt-4" >
         <div class="card-body">
                    <h5 class="card-title"> <i class='far fa-user-circle' style='font-size:24px'></i> ${comentario.user}</h5>
                    <p class="card-text">${comentario.description}</p>
                    <p class="card-text"> ${estrellas(comentario.score)}</p>
                    <h6 class="card-subtitle mb-2 text-muted">${comentario.dateTime}</h6>
                    
             </div>      
        </div>`

    }

    document.getElementById("comentarios").innerHTML = html;
    document.getElementById("formulario").reset();
}


document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultado) {
        if (resultado.status === "ok") {
            comentarios = resultado.data;
            // muestra los comentarios
            showComment(comentarios);
        }

    });
});



