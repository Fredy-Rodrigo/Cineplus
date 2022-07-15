document.addEventListener('DOMContentLoaded', 
function() {


//creando la clase cine
class Cine {
    constructor(nombre, ciudad, direccion, imagen) {
        this.nombre = nombre;
        this.ciudad = ciudad;
        this.direccion = direccion;
        this.imagen = imagen;
    }

    generarListaCines() {
        cines.push(this);
    }
}

fetch('../assets/localJson/cines.json')
    .then((response)=>response.json())
    .then((data)=>{
        data.forEach(element => {
            let cine = new Cine(element.nombre, element.ciudad, element.direccion, element.imagen);
            cine.generarListaCines();
        });
        
        generarCinesPorDefecto();
    })

let cines = [];

//generando nodos, cada nodo contiene el nombre del cine, su imagen y su direccion 
let listaCines = document.getElementsByClassName('cines');

//al cargar la pantalla estos nodos aparecen por defecto
function generarCinesPorDefecto() {
    for(let i=0; i<cines.length; i++) {
        let cineHtml = document.createElement('div');
        cineHtml.classList.add('cine');
        cineHtml.innerHTML = `
            <h2>${cines[i].nombre}</h2>
            <a href="./peliculas.html"><img src="${cines[i].imagen}"></a>
            <p>${cines[i].direccion}</p>
        `;
        listaCines[0].appendChild(cineHtml);
    }
}


//funcionalidad de cada elemento del filtro
let filtro = document.getElementsByClassName('ciudad');

for(let i=0; i<filtro.length; i++) {
    filtro[i].addEventListener('click', ()=>{
        let cinesFiltrados = cines.filter((elemento)=>elemento.ciudad == filtro[i].innerHTML);
        generarCinesSegunCiudad(cinesFiltrados);
    });
}

//funcion para filtrar segun ciudad
function generarCinesSegunCiudad(listaCinesFiltrados) {
    listaCines[0].innerHTML = "";
    for(let i=0; i<listaCinesFiltrados.length; i++) {
        let cineHtml = document.createElement('div');
        cineHtml.classList.add('cine');
        cineHtml.innerHTML = `
            <h2>${listaCinesFiltrados[i].nombre}</h2>
            <a href="./peliculas.html"><img src="${listaCinesFiltrados[i].imagen}"></a>
            <p>${listaCinesFiltrados[i].direccion}</p>
        `;
        listaCines[0].appendChild(cineHtml);
    }
}

}, false); 