//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("boton-login").addEventListener("click", function(){
        console.log ("Boton presionado")
        goToTheRealIndex();
    });

});


function goToTheRealIndex(){
    if(document.getElementById("password").value != "" &&  document.getElementById("email").value != "")  {
        window.location.href = 'afterIndex.html';
    } else {
        alert("Ingresar usuario y contraseña");
    }
}