document.addEventListener('DOMContentLoaded', function() {

// creando una clase usuario
class Usuario {
    constructor(nombre, apellido, dni, tel, email, motivo, mensaje) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.dni = dni;
        this.tel = tel;
        this.email = email;
        this.motivo = motivo;
        this.mensaje = mensaje;
    }

}

// trayendo cada input del formulario
let formulario = document.getElementById('form');
let nombre = document.getElementById('nombre');
let apellido = document.getElementById('apellido');
let dni = document.getElementById('dni');
let tel = document.getElementById('tel');
let email = document.getElementById('email');
let motivo = document.getElementById('motivo');
let mensaje = document.getElementById('mensaje');


//funcion que crea una instancia de la clase, la convierte a texto plano y la setea a local storage
function setearFormulario() {
    let arrayUsuario = [nombre.value, apellido.value, dni.value, tel.value, email.value, motivo.value, mensaje.value]
    let usuario1 = new Usuario(...arrayUsuario);
    let usuarioJson = JSON.stringify(usuario1);
    localStorage.setItem("usuarioJson", usuarioJson);
}

//funcion que trae la informacion del local storage, la convierte a objeto y las imprime en cada input del formulario
function getFormulario() {
    let ultimoUsuario = localStorage.getItem('usuarioJson');
    let objUsuario = JSON.parse(ultimoUsuario);

    const {nombre: objNombre, apellido: objApellido, dni: objDni, tel: objTel, email:objEmail, motivo: objMotivo, mensaje: objMensaje} = objUsuario;

    nombre.value = objNombre;
    apellido.value = objApellido;
    dni.value = objDni;
    tel.value = objTel;
    email.value = objEmail;
    motivo.value = objMotivo;
    mensaje.value = objMensaje;
}


//funcion que verifica que todos los inputs tengan un valor
function verificarFormularioVacio() {
    for (let i = 0; i<formulario.length; i++) {
        (i!=5)&&
        (formulario[i].placeholder = formulario[i].value||'Input vacio');
    }
    formulario[5].selectedOptions[0].innerHTML = formulario[5].selectedOptions[0].value || 'Seleccionar motivo';
    
    return  (formulario[0].placeholder !== 'Input vacio') &&
            (formulario[1].placeholder !== 'Input vacio') &&
            (formulario[2].placeholder !== 'Input vacio') &&
            (formulario[3].placeholder !== 'Input vacio') &&
            (formulario[4].placeholder !== 'Input vacio') &&
            (formulario[5].selectedOptions[0].innerHTML !== 'Seleccionar motivo') &&
            (formulario[6].placeholder !== 'Input vacio');
}

//evento que se ejecuta cuando se termina de llenar el formulario y se clickea en "enviar"
formulario.addEventListener('submit', (e)=>{
    e.preventDefault();
    let verificar = verificarFormularioVacio();
    verificar? setearFormulario():
    Swal.fire({
        icon: 'warning',
        title: 'Datos incompletos',
        text: 'Por favor complete todos sus datos',
        background:'#1b1b1b',
        color: 'white',
        confirmButtonColor: '#E50914',
        timer: 3000,
      });
});

//evento que se ejecuta cuando se recarga la pagina
window.addEventListener('load', getFormulario);


}, false); 
