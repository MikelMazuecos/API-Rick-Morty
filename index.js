function inicia(){
  //llama a la api
  peticionAJAX()
  
  //pedir que aparezcan mas personajes
  document.getElementById("siguiente").addEventListener('click',mas)
  document.getElementById("buscar").addEventListener('click',busca)
}

window.addEventListener('load',inicia)

var pagina = 1 //variable de control de pagina
var nombres, nombre, nombres_busqueda, peticion, patron

function peticionAJAX() {
    //carga la api
    $.getJSON( "https://rickandmortyapi.com/api/character/?page=" + pagina, function(respuesta) {
      nombres = (respuesta)['results']
      maqueta_lista_caracteres(nombres)

  });
}
function maqueta_lista_caracteres(nombres){
  for(caracter of nombres){
    //llama a la funcion que maqueta los elementos en pantalla
    maqueta(caracter)
  }
}


function maqueta(datosCaracteres){
  //muestra los personajes y sus nombres
  div = document.createElement('div')
  nombre = datosCaracteres.name;
  imagen = datosCaracteres.image;
  p = document.createElement('p')
  p.innerHTML = nombre
  i = document.createElement('img')
  //le asigno a cada imagen un evento 
  i.addEventListener('click',detalle)
  i.src = imagen
  i.idCaracter = datosCaracteres.id;
  div.appendChild(i)
  div.appendChild(p)
  document.getElementById('main').appendChild(div)
}


function detalle(e){
  //llamo a la url del personaje en el que hago click usando el id
  $.getJSON( "https://rickandmortyapi.com/api/character/" + e.target.idCaracter, function(respuesta) {
    nombre = respuesta
    //llama a la funcion que maqueta los elementos en pantalla
  maquetaUno(nombre)
  })
}
  

function maquetaUno(datosCaracter){
  //muestra todos los detalles de un personaje

  //tomo los datos de Json
  div = document.createElement('div')
  nombre = datosCaracter.name;
  imagen = datosCaracter.image;
  genero = datosCaracter.gender
  localizacion = datosCaracter.location.name
  origen = datosCaracter.origin.name
  especie = datosCaracter.species
  estado = datosCaracter.status
  //creo con dom los contenedores
  p = document.createElement('p')
  p.innerHTML = "Name: " + nombre
  i = document.createElement('img')
  i.src = imagen
  p1 = document.createElement('p')
  p1.innerHTML = "Gender: " + genero
  p2 = document.createElement('p')
  p2.innerHTML = "Location: " + localizacion
  p3 = document.createElement('p')
  p3.innerHTML = "Origin: " + origen
  p4 = document.createElement('p')
  p4.innerHTML = "Specie: " + especie
  p5 = document.createElement('p')
  p5.innerHTML = "Status: " + estado
  b = document.createElement('button')
  b.innerHTML = "X"
  b.style.position = "fixed"
  b.style.left = "61%"
  b.style.top = "2%"
  b.addEventListener('click',cerrar)
  //meto en los contenedores la informacion
  div.appendChild(i)
  div.appendChild(p)
  div.appendChild(p1)
  div.appendChild(p2)
  div.appendChild(p3)
  div.appendChild(p4)
  div.appendChild(p5)
  div.appendChild(b)
  div.style.position = "fixed"
  div.style.left = "40%"
  div.style.top = "0%"
  document.getElementById('main').appendChild(div)
}

function mas(){
  //muestra la siguiente pagina
  pagina += 1
  peticionAJAX()
}

function cerrar(){
  //cierra la ventana de informacion de un personaje
  document.getElementById('main').removeChild(div)
}

function busca(){
  document.getElementById("main").innerHTML="";
  
  $.getJSON( "https://rickandmortyapi.com/api/character/?name=" + document.getElementById("busqueda").value, function(respuesta) {
    nombres_busqueda = respuesta['results']
    console.log(nombres_busqueda)
    maqueta_lista_caracteres(nombres_busqueda)
  })
}

function coincidencia(input) {
  //devuelve true si encuenta coincidencia en la busqueda con el patron
  return new RegExp(patron,nombre);
}
