
//obteniendo datos del storage
let stringObj = localStorage.getItem('objData');
let objetoData = JSON.parse(stringObj);

/* ▄▄▄▄▄▄▄▄▄▄1. SECCION ELEGIR HORARIO▄▄▄▄▄▄▄▄▄▄ */

/* ----------1.1 DESCRICPION---------- */
//imprimiendo informacion sobre la pelicula traida del storage
let descripcionInfo = document.querySelectorAll('.info');
let tipoInfo = [objetoData.Poster,objetoData.Genre,objetoData.Runtime,objetoData.Country,objetoData.Rated, objetoData.Title];

descripcionInfo.forEach((element, i)=>{
    i == 0? 
    element.src = tipoInfo[i]:
    element.innerHTML = tipoInfo[i];
});

/* ----------1.2 LOCALES DIRECCIONES Y HORARIOS---------- */
//generando html sobre cada local, con direcciones y horarios
let locales = ["Cineplus Caminos del Inca", "Cineplus Canto Grande", "Cineplus Guardia Civil","Cineplus Chiclayo Mall Aventura","Cineplus Chiclayo Real Plaza", "Cineplus Arequipa Mall Plaza", "Cineplus Arequipa Paseo Central","Cineplus Cuzco","Cineplus Piura","Cineplus Piura Real Plaza","Cineplus Trujillo Centro","Cineplus Trujillo Real Plaza"];
let direcciones = ["Av Caminos del Inca 241 Int401","Av. Canto Grande MZ.A LT.15","Guardia Civil 1035 Chorrillos","Av. Panamericana 639 -Int 01","Av. Miguel de Cervantes 300","Av. Ejercito 793 Cayma","Av. Arturo Ibañez S/N,","Av. Collasuyo 2964 Lote A","Jr. Huancavelica 537 - Piura","Av.Sanchez Cerro 234-Z.I","Calle Mariscal de Orbegoso 239","Av. César Vallejo 1345"];

let localContainer = document.getElementsByClassName('local-horario-container');
let seccionHorario = document.getElementsByClassName('seccion-elegir-horario');
let seccionVenta = document.getElementsByClassName('seccion-venta-tickets');
let seccionDetalles = document.getElementsByClassName('seccion-detalles-compra');
let horario = document.getElementsByClassName('span');

let arrayDirecciones = [];
let arrayLocales = [];

let localPelicula = "";
let direccionLocal = "";
let horaFuncion = "";
let entradaAdulto = "";
let entradaInfante = "";
let entradaAdultoMayor = "";
let listaCodigosButacas = "";
let totalPrecio = "";

locales.forEach((element, i)=>{
    let local = document.createElement('div');
    local.innerHTML = `
        <div class="local-horario">
            <h4>${element}</h4>
            <p>${direcciones[i]}</p>
            <div class="horario">
                <span class="span">3:30 pm</span>
                <span class="span">5:30 pm</span>
                <span class="span">7:00 pm</span>
                <span class="span">7:45 pm</span>
                <span class="span">9:30 pm</span>
            </div>
        </div>
    `;
    localContainer[0].appendChild(local);

    //al seleccionar el horario, se abre la ventana de venta de tickets y se llena la ventana de detalles de compra de la seccion SECCION DETALLES Y COMPRA

    for(let j=0; j<horario.length; j++) {
        horario[j].addEventListener('click', ()=>{
            seccionHorario[0].style.display="none";
            seccionVenta[0].style.display="flex";
            seccionDetalles[0].style.display="block";

            arrayDirecciones.push(direcciones[i]);
            arrayLocales.push(element);

            detallesCompra(horaFuncion, direccionLocal, localPelicula);

            localPelicula = arrayLocales[0];
            direccionLocal = arrayDirecciones[0];
            horaFuncion = horario[j];
        });
    };

    let tituloPelicula = document.getElementById('titulo-pelicula');
    tituloPelicula.innerHTML = objetoData.Title;

})


/* ▄▄▄▄▄▄▄▄▄▄2. SECCION VENTA DE TICKETS▄▄▄▄▄▄▄▄▄▄ */

/* ----------2.1 VENTANA DE TARIFAS---------- */
//funcionalidad de los  input number
const myInput = document.getElementsByClassName("my-input");
let tickets = document.getElementById('cant-tickets');
let total = document.getElementsByClassName('detalles-total');
let btnContinuar = document.getElementsByClassName('boton-continuar');
let cantTickets = 0;

//cada funcion genera informacion para las ventanas "detalles cantidad" y "detalles total" de la seccion SECCION DETALLES COMPRA
function sumarRestar1(btn){
    let clas = btn.getAttribute("class");
    let min = myInput[0].getAttribute("min");
    let max = myInput[0].getAttribute("max");
    let step = myInput[0].getAttribute("step");
    let val = myInput[0].getAttribute("value");
    let calcStep = (clas == "mas") ? (step*1) : (step * -1);
    let newValue = parseInt(val) + calcStep;

    if(newValue >= min && newValue <= max){
        clas=="mas"? cantTickets++ : cantTickets--;
        myInput[0].setAttribute("value", newValue);
        detallesCantidadTotal1();    
    }
}

function sumarRestar2(btn){
    let clas = btn.getAttribute("class");
    let min = myInput[1].getAttribute("min");
    let max = myInput[1].getAttribute("max");
    let step = myInput[1].getAttribute("step");
    let val = myInput[1].getAttribute("value");
    let calcStep = (clas == "mas") ? (step*1) : (step * -1);
    let newValue = parseInt(val) + calcStep;

    if(newValue >= min && newValue <= max){
        clas=="mas"? cantTickets++ : cantTickets--;
        myInput[1].setAttribute("value", newValue);
        detallesCantidadTotal2();
    }
}

function sumarRestar3(btn){
    let clas = btn.getAttribute("class");
    let min = myInput[2].getAttribute("min");
    let max = myInput[2].getAttribute("max");
    let step = myInput[2].getAttribute("step");
    let val = myInput[2].getAttribute("value");
    let calcStep = (clas == "mas") ? (step*1) : (step * -1);
    let newValue = parseInt(val) + calcStep;

    if(newValue >= min && newValue <= max){
        clas=="mas"? cantTickets++ : cantTickets--;
        myInput[2].setAttribute("value", newValue);
        detallesCantidadTotal3();
    }
}

//continuar para ir a la seccion butacas
let continuar = document.getElementById('continuar');
let ventanaTarifas = document.getElementsByClassName('ventana-tarifas');
let ventanaButacas = document.getElementsByClassName('ventana-butacas');
let ventanaPago = document.getElementsByClassName('ventana-pago');
let iconoTicket = document.getElementById('icono-ticket');
let iconoButaca = document.getElementById('icono-butaca');
let iconoPago = document.getElementById('icono-pago');

continuar.addEventListener('click',()=>{
    ventanaTarifas[0].style.display = "none";
    ventanaButacas[0].style.display = "block";
    iconoTicket.style.backgroundColor = "#4e4e4e";
    iconoButaca.style.backgroundColor = "#E50914";

    continuar.addEventListener('click',()=>{
        ventanaPago[0].style.display = "flex";
        iconoButaca.style.backgroundColor = "#4e4e4e";
        iconoPago.style.backgroundColor = "#E50914";
    });
});

/* ----------2.2 VENTANA BUTACAS---------- */
//titulo de la pelicula para la seccion de las butacas
let tituloPeliculaButacas = document.getElementById('titulo-pelicula-butacas');
tituloPeliculaButacas.innerHTML = objetoData.Title;

//generando las butacas y los codigos de cada butaca
let sala = document.getElementsByClassName('sala');
let selecButaca = document.getElementsByClassName('butaca');
let detallesButacas = document.getElementsByClassName('detalles-butacas');
let arrayCodigos = [];

for(let i=0; i<70; i++) {
    let butaca = document.createElement('div');
    butaca.classList.add('butaca');
    i<7?
        butaca.id = `A-${i+1}`:
    i<14?
        butaca.id = `B-${i-6}`:
    i<21?
        butaca.id = `C-${i-13}`:
    i<28?
        butaca.id = `D-${i-20}`:
    i<35?
        butaca.id = `E-${i-27}`:
    i<42?
        butaca.id = `F-${i-34}`:
    i<49?
        butaca.id = `G-${i-41}`:
    i<56?
        butaca.id = `H-${i-48}`:
    i<63?
        butaca.id = `I-${i-55}`:
        butaca.id = `J-${i-62}`;
        
    butaca.innerHTML = `<img src="./assets/icons/icon-butaca.svg">`;
    sala[0].appendChild(butaca);

    generarDetallesButacas(selecButaca, i, butaca);
}

/* ----------2.3 VENTANA DE PAGO Y CONFIRMACION---------- */
//rellenando la ventana de pago y confirmacion
function confirmarCompra() {
    let confImagen = document.getElementsByClassName('conf-imagen');
    let confTitulo = document.getElementsByClassName('conf-titulo');
    let confLocal = document.getElementsByClassName('conf-local');
    let confDireccion = document.getElementsByClassName('conf-direccion');
    let confHora = document.getElementsByClassName('conf-hora');
    let confPrecio = document.getElementsByClassName('conf-precio');
    let confEntradas = document.getElementsByClassName('conf-entradas');
    let confButacas = document.getElementsByClassName('conf-butacas');

    confImagen[0].src = objetoData.Poster;
    confTitulo[0].innerHTML = objetoData.Title;
    confLocal[0].innerHTML = localPelicula;
    confDireccion[0].innerHTML = direccionLocal;
    confHora[0].innerHTML = horaFuncion.innerHTML;
    confPrecio[0].innerHTML = `S/${totalPrecio}.00`;
    
    confEntradas[0].innerHTML="";
    entradaAdulto && (confEntradas[0].insertAdjacentHTML('beforeend',`${entradaAdulto} ADULTO<br>`));
    entradaInfante && (confEntradas[0].insertAdjacentHTML('beforeend',`${entradaInfante} INFANTIL<br>`));
    entradaAdultoMayor && (confEntradas[0].insertAdjacentHTML('beforeend',`${entradaAdultoMayor} ADULTO MAYOR<br>`));

    confButacas[0].innerHTML = listaCodigosButacas;
}

//evento al boton confirmar con SWEET ALERT para dar por terminada la compra
let btnConfirmar = document.getElementById('boton-confirmar');
btnConfirmar.addEventListener('click', ()=>{
    Swal.fire({
        icon: 'success',
        title: 'Su compra ha sido confirmada',
        background:'#1b1b1b',
        color: 'white',
        showConfirmButton: false,
        timer: 2000
      })
});

/* ▄▄▄▄▄▄▄▄▄▄3. SECCION DETALLES DE LA COMPRA▄▄▄▄▄▄▄▄▄▄ */

/* ---------3.1 VENTANA DETALLES COMPRA---------- */
//rellenando la informacion (poster, local, direccion y horario) de detalles de la compra
function detallesCompra(horaFuncion, direccionLocal, localPelicula) {
    let detallesImagen = document.getElementsByClassName('detalles-imagen');
    let detallesLocal = document.getElementsByClassName('detalles-local');
    let detallesDireccion = document.getElementsByClassName('detalles-direccion');
    let detallesHora = document.getElementsByClassName('detalles-hora');
    
    detallesImagen[0].src = objetoData.Poster;
    detallesLocal[0].innerHTML = localPelicula;
    detallesHora[0].innerHTML = horaFuncion.innerHTML;
    detallesDireccion[0].innerHTML = direccionLocal;
}

/* ---------3.2  VENTANAS DETALLES CANTIDAD Y DETALLES TOTAL----------*/
//funciones para rellenar informacion
function detallesCantidadTotal1() {
    let adulto = document.getElementById('adulto');

    adulto.innerHTML = `${myInput[0].value} ADULTO`;
    tickets.innerHTML = `(${cantTickets} tickets)`;
    total[0].innerHTML = `<p class="total-texto">TOTAL</p><p class="total-dinero">S/${cantTickets*6}.00</p>`;
    btnContinuar[0].style.display = "block";

    entradaAdulto = myInput[0].value;
    totalPrecio = cantTickets*6;

    confirmarCompra();
}

function detallesCantidadTotal2() {
    let infantil = document.getElementById('infantil');

    infantil.innerHTML = `${myInput[1].value} INFANTIL`;
    tickets.innerHTML = `(${cantTickets} tickets)`;
    total[0].innerHTML = `<p class="total-texto">TOTAL</p><p class="total-dinero">S/${cantTickets*6}.00</p>`;
    btnContinuar[0].style.display = "block";

    entradaInfante = myInput[1].value;
    totalPrecio = cantTickets*6;

    confirmarCompra();
}

function detallesCantidadTotal3() {
    let adultoMayor = document.getElementById('adulto-mayor');
    adultoMayor.innerHTML = `${myInput[2].value} ADULTO MAYOR`;
    tickets.innerHTML = `(${cantTickets} tickets)`;
    total[0].innerHTML = `<p class="total-texto">TOTAL</p><p class="total-dinero">S/${cantTickets*6}.00</p>`;
    btnContinuar[0].style.display = "block";

    entradaAdultoMayor = myInput[2].value;
    totalPrecio = cantTickets*6;

    confirmarCompra();
}

/* ----------3.3 VENTANA DETALLES BUTACAS---------- */
//funcion que contiene un evento para mostrar en pantalla el codigo de la butaca, se verifica que el codigo no se repita y que el numero de butacas no sea mayor al numero de tickets
function generarDetallesButacas(selecButaca, i, butaca) {
    selecButaca[i].addEventListener('click',()=>{

        arrayCodigos.length<cantTickets && codigoDelEvento();

        function codigoDelEvento() {
            selecButaca[i].style.backgroundColor="#E50914";
            detallesButacas[0].style.display = "block";

            let verificarCodigo = false;

            arrayCodigos.push(butaca.id);
            arrayCodigos.sort();
            
            for (let j = 0; j < arrayCodigos.length; j++) {
                if (arrayCodigos[j + 1] === arrayCodigos[j]) {
                    verificarCodigo = true;
                }
            }
            
            function crearDivCodigo() {
                let codigoButaca = document.createElement('div');
                codigoButaca.classList.add('codigo-butaca');
                codigoButaca.innerHTML = `${butaca.id}`;
                detallesButacas[0].appendChild(codigoButaca);

                listaCodigosButacas += ` ${codigoButaca.innerHTML} `;
                confirmarCompra();
            }
            
            verificarCodigo==false? crearDivCodigo():arrayCodigos=[...(new Set(arrayCodigos))];
        }
    }
    );
}
