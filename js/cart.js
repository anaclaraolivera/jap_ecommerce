//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.






function obteneryMostrarUsuario() {
    let string = 'Hola, ';
    let usuarioValue = localStorage.getItem('usuario');
    if (usuarioValue == null) {
      usuarioValue = "extraño"
    }
    string += usuarioValue;
    let nombreUsuario = document.getElementById('username');
    nombreUsuario.innerHTML += string;
  }
  
  
  
  
  //Función que se ejecuta una vez que se haya lanzado el evento de
  //que el documento se encuentra cargado, es decir, se encuentran todos los
  //elementos HTML presentes.
  document.addEventListener("DOMContentLoaded", function (e) {
    obteneryMostrarUsuario()
  });
