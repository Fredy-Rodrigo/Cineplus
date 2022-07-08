document.addEventListener('DOMContentLoaded', 
function() {

/* ▄▄▄▄▄▄▄▄▄▄1. PELICULAS CONTAINER▄▄▄▄▄▄▄▄▄▄ */

//abrir cerrar boton de lista de filtros
let filtro = document.querySelectorAll('.filtro');
let filtrarPor = document.querySelectorAll('.filtrar-por');

for(let i=0; i<filtro.length; i++) {
    filtro[i].addEventListener('click',()=>{
        filtrarPor[i].classList.toggle('display-filtro');
    })
}

//accediendo a mi json peliculas
fetch('../assets/localJson/peliculas.json')
    .then((response)=>response.json())
    .then((data)=>{
        generarPeliculasPorDefecto(data);
        generarCinesSegunGenero(data)
        generarCinesSegunCiudad(data)
        generarCinesSegunCine(data)
    })

let containerPeliculas = document.getElementsByClassName('peliculas-container');
let containerDetalles = document.getElementsByClassName('detalles-container');
let listaPeliculas = document.getElementsByClassName('peliculas');

//funcion para generar las peliculas por defecto
function generarPeliculasPorDefecto(data) {
    
    for(let i=0; i<data.length; i++) {
        let peliculaHtml = document.createElement('div');
        peliculaHtml.classList.add('pelicula');
        peliculaHtml.innerHTML = `
            <div>
                <img src="${data[i].poster}">
                <div class="btns-pelicula">
                    <button class="detalles">Ver detalles</button>
                    <button class="comprar">Comprar</button>
                </div>
            </div>
            <h3>${data[i].nombre}</h3>
            <p>${data[i].genero}</p>
        `;
        listaPeliculas[0].appendChild(peliculaHtml);

        mostrarDetalles(data, i);
        clickComprar(data, i);
    }
}

//funcion para filtrar por el genero
function generarCinesSegunGenero(data) {
    let genero = document.getElementsByClassName('genero');

        for(let i=0; i<genero.length; i++) {
            genero[i].addEventListener('click', ()=>{
                let peliculasFiltradas = data.filter((elemento)=>elemento.genero == genero[i].innerHTML);
                listaPeliculas[0].innerHTML = "";

                for(let j=0; j<peliculasFiltradas.length; j++) {
                    let peliculaHtml = document.createElement('div');
                    peliculaHtml.classList.add('pelicula');
                    peliculaHtml.innerHTML = `
                    <div>
                        <img src="${peliculasFiltradas[j].poster}">
                        <div class="btns-pelicula">
                            <button class="detalles">Ver detalles</button>
                            <button class="comprar">Comprar</button>
                        </div>
                    </div>
                    <h3>${peliculasFiltradas[j].nombre}</h3>
                    <p>${peliculasFiltradas[j].genero}</p>
                    `;
                    listaPeliculas[0].appendChild(peliculaHtml);
                    mostrarDetalles(peliculasFiltradas, j);
                    clickComprar(peliculasFiltradas, j);
                }
            });
        }        

    
}

//funcion para filtrar por la ciudad
function generarCinesSegunCiudad(data) {
    let ciudades = document.getElementsByClassName('ciudades');

        for(let i=0; i<ciudades.length; i++) {
            ciudades[i].addEventListener('click', ()=>{

                let peliculasFiltradas = data.filter((elemento)=> { 
                    let arrayCiudad = elemento.ciudad.find((el) => el == ciudades[i].innerHTML);
                    return arrayCiudad == ciudades[i].innerHTML;
                });
                
                listaPeliculas[0].innerHTML = "";
                for(let j=0; j<peliculasFiltradas.length; j++) {
                    let peliculaHtml = document.createElement('div');
                    peliculaHtml.classList.add('pelicula');
                    peliculaHtml.innerHTML = `
                        <div>
                            <img src="${peliculasFiltradas[j].poster}">
                            <div class="btns-pelicula">
                                <button class="detalles">Ver detalles</button>
                                <button class="comprar">Comprar</button>
                            </div>
                        </div>
                        <h3>${peliculasFiltradas[j].nombre}</h3>
                        <p>${peliculasFiltradas[j].genero}</p>
                    `;
                    listaPeliculas[0].appendChild(peliculaHtml);
                    mostrarDetalles(peliculasFiltradas, j);
                    clickComprar(peliculasFiltradas, j);
                }
            });
        }       
}

//funcion para filtrar por el local
function generarCinesSegunCine(data) {
    let cines = document.getElementsByClassName('cines');

        for(let i=0; i<cines.length; i++) {
            cines[i].addEventListener('click', ()=>{

                let peliculasFiltradas = data.filter((elemento)=> { 
                    let arrayCines = elemento.cine.find((el) => el == cines[i].innerHTML);
                    return arrayCines == cines[i].innerHTML;
                });
                
                listaPeliculas[0].innerHTML = "";
                for(let j=0; j<peliculasFiltradas.length; j++) {
                    let peliculaHtml = document.createElement('div');
                    peliculaHtml.classList.add('pelicula');
                    peliculaHtml.innerHTML = `
                        <div>
                            <img src="${peliculasFiltradas[j].poster}">
                            <div class="btns-pelicula">
                                <button class="detalles">Ver detalles</button>
                                <button class="comprar">Comprar</button>
                            </div>
                        </div>
                        <h3>${peliculasFiltradas[j].nombre}</h3>
                        <p>${peliculasFiltradas[j].genero}</p>
                    `;
                    listaPeliculas[0].appendChild(peliculaHtml);
                    mostrarDetalles(peliculasFiltradas, j);
                    clickComprar(peliculasFiltradas, j);
                }
            });
        }       
}

//funcion para que al hacer click en el boton comprar, se abra la pagina de comprar con la informacion de la pelicula
function clickComprar(data, i) {

    let btnComprar = document.getElementsByClassName('comprar');
    btnComprar[i].addEventListener('click',()=>{
        fetch(`http://www.omdbapi.com/?s=${data[i].name}&apikey=3d2b1eec`)
            .then((response)=>response.json())
            .then((dataAPI)=>{
                informacionPelicula(dataAPI);
            })

        function informacionPelicula(dataAPI) {
            fetch(`http://www.omdbapi.com/?i=${dataAPI.Search[0].imdbID}&apikey=3d2b1eec`)
                .then((resp)=>resp.json())
                .then((dato)=>{
                    guardarDatos(dato);
                })
        }

        function guardarDatos(datos) {
            let objData = JSON.stringify(datos);
            localStorage.setItem('objData',objData);
            window.location.href='../peliculas-comprar.html';
        }
    });

}

/* ▄▄▄▄▄▄▄▄▄▄2. DETALLES CONTAINER▄▄▄▄▄▄▄▄▄▄ */

//funcion para que al hacer click en el boton detalles, se abra un div con la informacion de la pelicula
function mostrarDetalles(data, i) {
    let btnDetalles = document.getElementsByClassName('detalles');
    btnDetalles[i].addEventListener('click',()=>{

        fetch(`http://www.omdbapi.com/?s=${data[i].name}&apikey=3d2b1eec`)
            .then((response)=>response.json())
            .then((dataAPI)=>{
                informacionPelicula(dataAPI);
            })

        function informacionPelicula(dataAPI) {
            fetch(`http://www.omdbapi.com/?i=${dataAPI.Search[0].imdbID}&apikey=3d2b1eec`)
                .then((resp)=>resp.json())
                .then((dato)=>{
                    imprimirPelicula(dato);
                })
        }

        function imprimirPelicula(dato) {
            containerPeliculas[0].style.display = "none";
            let seccionDetalles = document.createElement('div');
            seccionDetalles.innerHTML = `
                <div class="detalles-poster">
                    <img src="${dato.Poster}">
                </div>
                <div class="detalles-info">
                    <h3>${dato.Title}</h3>
                    <h4>Sinopsis</h4>
                    <p>${dato.Plot}</p>
                    <h4>Director</h4>
                    <p>${dato.Director}</p>
                    <h4>Género</h4>
                    <p>${dato.Genre}</p>
                    <h4>Duración</h4>
                    <p>${dato.Runtime}</p>
                    <h4>Clasificación</h4>
                    <p>${dato.Rated}</p>
                </div>
                <div class="detalles-button-comprar">
                    <a href="../peliculas-comprar.html"><button class="comprar2">Comprar</button></a>
                </div>
            `;
            containerDetalles[0].appendChild(seccionDetalles);

            guardarInformacion(dato);
        }
    });
}

//funcion para el boton comprar, se abrira la pagina de comprar con toda la informacion de la pelicula
function guardarInformacion(dato) {
    let btnComprar2 = document.getElementsByClassName('comprar2');
    btnComprar2[0].addEventListener('click',()=>{
        let objData = JSON.stringify(dato);
        localStorage.setItem('objData',objData);
        window.location.href='../peliculas-comprar.html';
    });
}

}, false); 