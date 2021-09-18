var comentarios = [];

function saveComment() {
    let date = new Date(Date.UTC(2012, 11, 20, 3, 0, 0));
    let options = { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' };

    comentario = {
        description: document.getElementById("descripcion-comentario").value,
        completeDate: date.toLocaleDateString (undefined, options),
        score: document.getElementById("puntaje").value,
        user: localStorage.getItem("usuario")
    }

    comentarios.push(comentario);
    showComment();
}

// function mostrarComentarios(lista) {

//     let AgregarAlHTML = "";
//     for (let i = 0; i < lista.length; i++) {
//         let comentario = lista[i];
//         let stringHTMLestrellas = puntajeComentarios(comentario.score);
//         AgregarAlHTML +=
//             `
//       <div class= "card">
//            <div class="card-body">
//                 <h5 class="card-title">Usuario: ` + comentario.user + `</h5>
//                 <p class="card-text">`+ comentario.description + `</p>
//                 <div>`+ stringHTMLestrellas +`</div>
//            </div>
//            <div class="card-footer">
//                 <small class="text-muted">`+ comentario.dateTime + `</small>
//            </div>
//      </div>
//       `
//         document.getElementById("container-comentarios").innerHTML = AgregarAlHTML;
//     }
// }



//no entiendo el parámetro que se le da
function estrellas(stars){

    let number = parseInt(stars);
    let retorno="";
    for(let i =1; i<=number;i++){
        retorno +=`<span class="fa fa-star checked"></span>`

    }
    for(let j=number+1;j<=5;j++){
        retorno +=`<span class="fa fa-star"></span>`
    }    
    return retorno;

}

// function puntajeComentarios(cantidad) {
//     let retorno = "";

//     if (cantidad === 5) {
//         retorno += `
//                 <span class="fa fa-star checked"></span>
//                 <span class="fa fa-star checked"></span>
//                 <span class="fa fa-star checked"></span>
//                 <span class="fa fa-star checked"></span>
//                 <span class="fa fa-star checked"></span>
//                 `
//     } else if (cantidad === 4) {
//         retorno += `
//                 <span class="fa fa-star checked"></span>
//                 <span class="fa fa-star checked"></span>
//                 <span class="fa fa-star checked"></span>
//                 <span class="fa fa-star checked"></span>
//                 <span class="fa fa-star"></span>
//                 `
//     } else if (cantidad === 3) {
//         retorno += `
//                 <span class="fa fa-star checked"></span>
//                 <span class="fa fa-star checked"></span>
//                 <span class="fa fa-star checked"></span>
//                 <span class="fa fa-star"></span>
//                 <span class="fa fa-star"></span>
//                 `
//     }
//     return retorno;

// }
function showComment() {
    let html = ""
    for (let i = comentarios.length - 1; i >= 0; i--) {
        let comentario = comentarios[i];
        html += ` 
        <div class= "card">
         <div class="card-body">
                    <h5 class="card-title"> Usuario:  ${comentario.user} - ${estrellas(comentario.score)} </h5>
                    <p class="card-text">${comentario.description}</p>
                    <p class="card-text">${comentario.completeDate}</p>
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
            //guarda los comentarios
           saveComment(comentarios);
           // muestra los comentarios
           showComment(comentarios);
            //pone las estrellas
            estrellas(number);
        }

    });
});



