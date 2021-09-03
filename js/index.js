//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("boton-login").addEventListener("click", function(){
        guardarUsuario();
    });
});

// // Esta función redirecciona al inicio real de la página web siempre y cuando
// // se haya ingresado información de usuario y contraseña
// function goToTheRealIndex(){
//     if(document.getElementById("contraseña").value != "" &&  document.getElementById("usuario").value != "")  {
//        // aquí te redirecciona al inicio real del ecommerce si se cargó la info de usuario y contraseña
//        // window.location.href = 'afterIndex.html';
//     }
//     // ¿debería sacarlo porque está el de abajo?
//      else {
//         alert("Ingresar usuario y contraseña");
//     }
// }

function guardarUsuario(){
 
    let usuario = document.getElementById("usuario").value;
    let contraseña = document.getElementById("contraseña").value;
    if(usuario !=="" && contraseña!== ""){
        localStorage.setItem('usuario', usuario);
        window.location.href="afterIndex.html";
    }
    else{
        alert("debe completar los campos");
    }

}




