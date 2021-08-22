//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("boton-login").addEventListener("click", function(){
        goToTheRealIndex();
    });
});

// Esta función redirecciona al inicio real de la página web siempre y cuando
// se haya ingresado información de usuario y contraseña
function goToTheRealIndex(){
    if(document.getElementById("password").value != "" &&  document.getElementById("email").value != "")  {
       // aquí te redirecciona al inicio real del ecommerce si se cargó la info de usuario y contraseña
        window.location.href = 'afterIndex.html';
    } else {
        alert("Ingresar usuario y contraseña");
    }
}