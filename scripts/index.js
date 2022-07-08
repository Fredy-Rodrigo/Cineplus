document.addEventListener('DOMContentLoaded', 
function() {

/* ▄▄▄▄▄▄▄▄▄▄1. SECCION FILTRAR▄▄▄▄▄▄▄▄▄▄ */

//trayendo los elementos de la seccion filtrar
let genero = document.getElementById('genero');
let spanGenero = document.getElementById('span-genero');
let ciudad = document.getElementById('ciudad');
let spanCiudad = document.getElementById('span-ciudad');
let local = document.getElementById('local');
let spanLocal = document.getElementById('span-local');

let listaPeliculas = document.getElementById("lista-peliculas");
let boton = document.getElementsByClassName('btn-disabled');

//cuando el select 'genero o ciudad o local' cambie, su span tomara el nombre de la opcion escogida, el boton cambiara de color y los demas select se reiniciaran
genero.addEventListener('change',()=>{
    spanGenero.innerHTML = genero.selectedOptions[0].innerHTML;
    boton[0].id = "button-active";
    spanCiudad.innerHTML = "Peliculas por ciudad";
    spanLocal.innerHTML = "Peliculas por local";
});

ciudad.addEventListener('change',()=>{
    spanCiudad.innerHTML = ciudad.selectedOptions[0].innerHTML;
    boton[0].id = "button-active";
    spanGenero.innerHTML = "Peliculas por genero";
    spanLocal.innerHTML = "Peliculas por local";
});

local.addEventListener('change',()=>{
    spanLocal.innerHTML = local.selectedOptions[0].innerHTML;
    boton[0].id = "button-active";
    spanGenero.innerHTML = "Peliculas por genero";
    spanCiudad.innerHTML = "Peliculas por ciudad";
});

/* ▄▄▄▄▄▄▄▄▄▄2. SECCION PELICULAS FILTRADAS▄▄▄▄▄▄▄▄▄▄ */

//al hacer click en el boton, se filtraran las peliculas segun su tipo de filtro y aparecera la lista en pantalla
boton[0].addEventListener("click", ()=>{
    //accediendo a mi json local mediante fetch
    fetch('../assets/localJson/simulacion-peliculas.json')
    .then((response)=>response.json())
    .then((data)=>{
        if(spanCiudad.innerHTML=="Peliculas por ciudad" && spanLocal.innerHTML=="Peliculas por local") {
            listaPeliculas.innerHTML = "";
            filtrarGenero(data);
        } else if (spanGenero.innerHTML=="Peliculas por genero" && spanLocal.innerHTML=="Peliculas por local") {
            listaPeliculas.innerHTML = "";
            filtrarCiudad(data);
        } else if (spanGenero.innerHTML=="Peliculas por genero" && spanCiudad.innerHTML=="Peliculas por ciudad") {
            listaPeliculas.innerHTML = "";
            filtrarLocal(data);
        }
    })

})

//funciones para filtrar peliculas
function filtrarGenero(data) {
    let listaGeneros = ["Terror","Accion","Aventura","Familiar"];
    
    for(let i=0; i<listaGeneros.length; i++) {
        if(spanGenero.innerHTML == listaGeneros[i]) {
            let peliculasDelGenero = data.filter((ele)=>ele.genero == listaGeneros[i]);
            for (element of peliculasDelGenero) {
                let peliculaHtml = document.createElement('div');
                peliculaHtml.innerHTML = `
                <div class="card" style="background-image:url(${element.poster})">
                    <div class="card-info">
                        <p class="card-title">${element.nombre}</p>
                        <button class="detalles">Ver detalles</button>
                        <a href="./peliculas-comprar.html"><button>Comprar</button></a>
                    </div>
                </div>
                `;
                listaPeliculas.appendChild(peliculaHtml);
            }
            let verMas = document.createElement('div');
            verMas.classList.add('btn-ver-mas');
            verMas.innerHTML = `
                <a href="./peliculas.html"><button id="btn">
                    +
                </button></a>
            `;
            listaPeliculas.appendChild(verMas);
        }
    }
}

function filtrarCiudad(data) {
    let listaCiudades = ["Lima","Arequipa","Trujillo","Piura"];

    for(let i=0; i<listaCiudades.length; i++) {
        if(spanCiudad.innerHTML == listaCiudades[i]) {
            let peliculasDeLaCiudad = data.filter((ele)=>ele.ciudad == listaCiudades[i]);
            for (element of peliculasDeLaCiudad) {
                let peliculaHtml = document.createElement('div');
                peliculaHtml.innerHTML = `
                <div class="card" style="background-image:url(${element.poster})">
                    <div class="card-info">
                        <p class="card-title">${element.nombre}</p>
                        <button class="detalles">Ver detalles</button>
                        <a href="./peliculas-comprar.html"><button>Comprar</button></a>
                    </div>
                </div>
                `;
                listaPeliculas.appendChild(peliculaHtml);
            }
            let verMas = document.createElement('div');
            verMas.classList.add('btn-ver-mas');
            verMas.innerHTML = `
                <a href="./peliculas.html"><button>
                    +
                </button></a>
            `;
            listaPeliculas.appendChild(verMas);
        }
    }
}

function filtrarLocal(data) {
    let listaLocales = ["Cineplus Alcazar","Cineplus Caminos del Inca","Cineplus Arequipa Mall Plaza","Cineplus Arequipa Real Plaza","Cineplus Trujillo Centro","Cineplus Trujillo Real Plaza","Cineplus Piura","Cineplus Piura Real Plaza","Cineplus Canto Grande","Cineplus Centro"];

    for(let i=0; i<listaLocales.length; i++) {
        if(spanLocal.innerHTML == listaLocales[i]) {
            let peliculasDelLocal = data.filter((ele)=>ele.local == listaLocales[i]);
            for (element of peliculasDelLocal) {
                let peliculaHtml = document.createElement('div');
                peliculaHtml.innerHTML = `
                <div class="card" style="background-image:url(${element.poster})">
                    <div class="card-info">
                        <p class="card-title">${element.nombre}</p>
                        <button class="detalles">Ver detalles</button>
                        <a href="./peliculas-comprar.html"><button>Comprar</button></a>
                    </div>
                </div>
                `;
                listaPeliculas.appendChild(peliculaHtml);
            }
            let verMas = document.createElement('div');
            verMas.classList.add('btn-ver-mas');
            verMas.innerHTML = `
                <a href="./peliculas.html"><button>
                    +
                </button></a>
            `;
            listaPeliculas.appendChild(verMas);
        }
    }
}

/* ▄▄▄▄▄▄▄▄▄▄3. SECCION CARTELERA▄▄▄▄▄▄▄▄▄▄ */

//usando fetch para acceder a la api OMDB de peliculas
let btnDetalles = document.getElementsByClassName('detalles');
let filmTitle = document.getElementsByClassName('card-title');

for(let i=0; i<filmTitle.length; i++){
    fetch(`http://www.omdbapi.com/?s=${filmTitle[i].innerHTML}&apikey=3d2b1eec`)
        .then((response)=>response.json())
        .then((data)=>{
            informacionPelicula(data);
        })

    function informacionPelicula(data) {
        fetch(`http://www.omdbapi.com/?i=${data.Search[0].imdbID}&apikey=3d2b1eec`)
            .then((resp)=>resp.json())
            .then((dato)=>{
                modalPeliculas(dato);
            })
    }
        
    function modalPeliculas(dato) {
        //libreria sweet alert, pop up para ver informacion de la galeria de peliculas
        btnDetalles[i].addEventListener('click', ()=>{
            Swal.fire({
                title: `${dato.Title}`,
                html: `<p style="text-align: left">Género: ${dato.Genre}<br><br>Director: ${dato.Director}<br><br>Sinopsis: ${dato.Plot}`,
                imageUrl: `${dato.Poster}</p>`,
                imageWidth: 200,
                imageHeight: 300,
                imageAlt: 'Custom image',
                background:'#1b1b1b',
                color: 'white',
                confirmButtonText: '<a href="./peliculas.html" style="color:white; text-decoration:none">Comprar</a>',
                confirmButtonColor: '#E50914',
                })
        });
    }

}

}, false); 

