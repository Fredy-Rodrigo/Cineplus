# Cineplus
Este proyecto es el trabajo final del curso de JavaScript del instituto educativo Coderhouse. Se trata de un simulador de un sitio web de una cadena de cine en donde los usuarios pueden buscar películas y comprar entradas de manera virtual, la interfaz y la funcionalidad esta inspirada en los sitios web de Cineplanet y Cinestar.
####DESCRIPCIÓN
El proyecto consta de 4 archivos HTML, cada uno esta vinculado a un script JS propio.
- En el primer archivo **index.html** vinculado a **index.js** se muestra un pequeño simulador de busqueda de películas y una galeria de peliculas en cartelera. El simulador trae datos desde el archivo json **simulacion-peliculas.json**.
- En el archivo **peliculas.html** vinculado a **peliculas.js** se muestra una galeria mas amplia de peliculas, aqui se usan los datos del archivo **peliculas.json**. Hay una opcion de filtro para filtrar las peliculas segun el genero, el local donde se transmite la funcion y la ciudad donde se encuentra. Al seleccionar el boton de comprar se abre la pagina de **peliculas-comprar**.
- En el archivo **peliculas-comprar.html** vinculado a **peliculas-comprar.js** se muestra todo un procedimiento por el que debe pasar el usuario para poder comprar sus entradas, eligiendo el local del cine, el horario, la cantidad de entradas y las butacas. Aquí se hace uso de la API OMDb para una información mas detallada de las peliculas. 
- En el archivo **cines.html** vinculado a **cines.js** se simula una busqueda de locales de cines con un filtro por ciudades, los datos usados aqui se crean por clases y objetos.
- En el archivo **contacto.html** vinculado a **contacto.js** se simula un formulario que requiere datos obligatorios, una vez llenado, al hacer submit, los datos se quedan guardados para que cuando se recargue la página, estos aparezcan por defecto.
#####OBSERVACIÓN
Se usaron datos de diferentes grupos de peliculas para los archivos **peliculas.html** y **peliculas-comprar.html**, por lo que la peliculas entre uno y otro archivo no tienen relación. 

####TECNOLOGÍAS USADAS
 - HTML
 - CSS
 - JS
 - SASS
 - SWEETALERT2 (librería)
 - OMDB (Api)