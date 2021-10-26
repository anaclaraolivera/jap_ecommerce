//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
let datos = {}
let datosRegistro = [] 
let usuario_nombre = ""
let usuario_apellidos = ""
let usuario_edad = ""
let usuario_correo = ""
let usuario_telefono = ""


function guardarInfoUsuario() {

    usuario_nombre = document.getElementById("primer-nombre-usuario").value.trim() + " " + document.getElementById("segundo-nombre-usuario").value.trim();
    usuario_apellidos = document.getElementById("primer-apellido-usuario").value.trim() + " " + document.getElementById("segundo-apellido-usuario").value.trim();
    usuario_edad = document.getElementById("edad-usuario").value.trim();
    usuario_correo = document.getElementById("correo-usuario").value.trim();
    usuario_telefono = document.getElementById("telefono-usuario").value.trim();

//Está bien que llame ahí a esa función?
    crearJSON();
}

function crearJSON() {
datos = {
    nombre: usuario_nombre,
    apellidos: usuario_apellidos,
    edad: usuario_edad,
    correo: usuario_correo,
    telefono: usuario_telefono
}

localStorage.setItem("miperfil", JSON.stringify(datos));
let datosTexto = localStorage.getItem("miperfil");
datosRegistro = JSON.parse(datosTexto);

crearTarjPerfil();

}

function crearTarjPerfil() {
    let appendHTML = "";
console.log(datosRegistro);
console.log(datosRegistro.nombre)

appendHTML = `<div class="card" style="width: 18rem;">
<img class="card-img-top" src="..." alt="Card image cap">
<div class="card-body">
    <h5 class="card-title">${datosRegistro.nombre} ${datosRegistro.apellidos}</h5>
</div>
<ul class="list-group list-group-flush">
<li class="list-group-item" >Edad:${datosRegistro.edad}</li>
<li class="list-group-item">Correo electrónico:${datosRegistro.correo}</li>
<li class="list-group-item">Teléfono de contacto:${datosRegistro.telefono}</li>
</ul>
</div>
`
    document.getElementById("insertar-perfil").innerHTML = appendHTML;
}



document.addEventListener("DOMContentLoaded", function (e) {

})