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
}

// instanciando cada objeto cine y guardandolo en un array
let cines = [
    new Cine("Cineplus Alcazar", "Lima", "Av. Santa Cruz 814-816","../assets/images/local-lima-1.jpg"),
    new Cine("Cineplus Brasil", "Lima", "Av. Brasil 714 - 792 Piso 3","../assets/images/local-lima-2.jpg"),
    new Cine("Cineplus Caminos del Inca", "Lima", "Av Caminos del Inca 241 Int401","../assets/images/local-lima-3.jpg"),
    new Cine("Cineplus Canto Grande", "Lima", "AV CANTO GRANDE MZ.A LT.15","../assets/images/local-lima-4.jpg"),
    new Cine("Cineplus Centro", "Lima", "Jr. De la Unión 819 ","../assets/images/local-lima-5.jpg"),
    new Cine("Cineplus Centro Civico", "Lima", "Av. Inca Garcilazo de la Vega","../assets/images/local-lima-6.jpg"),
    new Cine("Cineplus Comas", "Lima", "Av. Túpac Amaru 3840 2do P","../assets/images/local-lima-7.jpg"),
    new Cine("Cineplus Guardia Civil", "Lima", "Guardia Civil 1035 Chorrillos","../assets/images/local-lima-8.jpg"),
    new Cine("Cineplus La Molina", "Lima", "Av. Raúl Ferrero 1205 3er P","../assets/images/local-lima-9.jpg"),
    new Cine("Cineplus Lurin", "Lima", "S/N San Pedro Parcela B-43","../assets/images/local-lima-10.jpg"),
    new Cine("Cineplus Mall Plaza", "Arequipa", "Av. Ejercito 793 Cayma","../assets/images/local-arequipa-1.jpg"),
    new Cine("Cineplus Paseo Central", "Arequipa", "Av. Arturo Ibañez S/N,","../assets/images/local-arequipa-2.jpg"),
    new Cine("Cineplus Arequipa Plaza", "Arequipa", "Av. Ejercito 1009 Cayma","../assets/images/local-arequipa-3.jpg"),
    new Cine("Cineplus Cajamarca", "Cajamarca", "Av. Vía de Evitamiento Norte","../assets/images/local-cajamarca.jpg"),
    new Cine("Cineplus Mall Aventura", "Chiclayo", "Av. Panamericana 639 -Int 01","../assets/images/local-chiclayo-1.jpg"),
    new Cine("Cineplus Chiclayo Plaza", "Chiclayo", "Av. Miguel de Cervantes 300","../assets/images/local-chiclayo-2.jpg"),
    new Cine("Cineplus Cuzco", "Cuzco", "Av. Collasuyo 2964 Lote A","../assets/images/local-cuzco.jpg"),
    new Cine("Cineplus Piura", "Piura", "Jr. Huancavelica 537 - Piura","../assets/images/local-piura-1.jpg"),
    new Cine("Cineplus Piura Real Plaza", "Piura", "Av.Sanchez Cerro 234-Z.I","../assets/images/local-piura-2.jpg"),
    new Cine("Cineplus Trujillo Centro", "Trujillo", "Calle Mariscal de Orbegoso 239","../assets/images/local-trujillo-1.jpg"),
    new Cine("Cineplus Trujillo Real Plaza", "Trujillo", "Av. César Vallejo 1345","../assets/images/local-trujillo-2.jpg"),
];

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
generarCinesPorDefecto();

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