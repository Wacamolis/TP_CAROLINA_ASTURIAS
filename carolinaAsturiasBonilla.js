// INTRODUCCION A JAVASCRIPT
// COMISION 202504
// ---------------------------------------------
// 
// Proyecto Final - Sistema de Gestión de Biblioteca
// Por Carolina Asturias Bonilla
// 
// ---------------------------------------------

const prompt = require("prompt-sync")({ sigint: true }); // se llama al prompt al inicio. 

// ---------------------------------------------
// PUNTO 1: ESTRUCTURA DE DATOS 
// ---------------------------------------------

// a) Array de libros
// El array de libros esta formado por los libros, cada libro es un objeto con propiedades especificas

let libros = [
  {
    id: 1001,
    titulo: "El señor de los anillos",
    autor: "J.R.R. Tolkien",
    anio: 1954,
    genero: "fantasía",
    disponible: true
  },
  {
    id: 1002,
    titulo: "Harry Potter y la piedra filosofal",
    autor: "J.K. Rowling",
    anio: 1997,
    genero: "fantasía",
    disponible: true
  },
  {
    id: 1003,
    titulo: "Crimen y castigo",
    autor: "Fiódor Dostoievski",
    anio: 1866,
    genero: "psicológico",
    disponible: true
  },
  {
    id: 1004,
    titulo: "G3",
    autor: "Francisco Javier Torres Simón",
    anio: 2017,
    genero: "ciencia ficción",
    disponible: true
  },
  {
    id: 1005,
    titulo: "Los Fantasmas del Nuevo Mundo",
    autor: "David Aramburo",
    anio: 2014,
    genero: "ciencia ficción",
    disponible: true
  },
  {
    id: 1006,
    titulo: "Bajo la Misma Estrella",
    autor: "John Green",
    anio: 2012,
    genero: "romance",
    disponible: true
  },
  {
    id: 1007,
    titulo: "Como Agua para Chocolate",
    autor: "Laura Esquivel",
    anio: 1989,
    genero: "romance",
    disponible: true
  },
  {
    id: 1008,
    titulo: "El resplandor",
    autor: "Stephen King",
    anio: 1977,
    genero: "terror",
    disponible: true
  },
  {
    id: 1009,
    titulo: "El coleccionista de huesos",
    autor: "Jeffery Deaver",
    anio: 1997,
    genero: "terror",
    disponible: true
  },
  {
    id: 1010,
    titulo: "La Isla del Tesoro",
    autor: "Robert Louis Stevenson",
    anio: 1883,
    genero: "aventura",
    disponible: true
  }
];

// b) Array de usuarios
// El array de usuarios esta formado por los usuarios, cada usuario es un objeto con propiedades especificas

let usuarios = [
  {
    id: 2001,
    nombre: "Julia M.",
    email: "julia@correo.com",
    librosPrestados: []
  },
  {
    id: 2002,
    nombre: "Lucia P.",
    email: "lucia@correo.com",
    librosPrestados: []
  },
  {
    id: 2003,
    nombre: "Marielos G.",
    email: "marielos@correo.com",
    librosPrestados: []
  },
  {
    id: 2004,
    nombre: "Karen L.",
    email: "karen@correo.com",
    librosPrestados: []
  },
  {
    id: 2005,
    nombre: "Robin C.",
    email: "robin@correo.com",
    librosPrestados: []
  }
];

// ---------------------------------------------
// FUNCIONES EXTRA 
// ---------------------------------------------

// Función mostrarLibroLinea() PUNTO 8
// Muestra la información de un libro en una sola línea, con un formato más ordenado y visual.
// Recibe un objeto 'libro' con sus propiedades, transforma el titulo a mayusculas con .toUpperCase  PUNTO 8
// Visualmente se ve asi: 1. 📘 [ID: 1001] "EL SEÑOR DE LOS ANILLOS" - J.R.R. Tolkien - (1954) - fantasía - ✅ Disponible

function mostrarLibroLinea(libro, index = null) { 
  const numero = index !== null ? `${index + 1}. ` : ""; 
  console.log(
    `${numero}📘 [ID: ${libro.id}] "${libro.titulo.toUpperCase()}" - ${libro.autor} - (${libro.anio}) - ${libro.genero} - ${libro.disponible ? "✅ Disponible" : "❌ Prestado"}`
  );
}

// Función mostrarLibros()
// Muestra el listado completo de libros de la biblioteca
// - Recorre el array 'libros' con .forEach(). Por cada libro, llama a la función mostrarLibroLinea()

function mostrarLibros() { 
  console.log("\n ✨📚 Listado de libros ✨\n");
  libros.forEach((libro, index) => {
    mostrarLibroLinea(libro, index);
  });
}

// Función quitarAcentos() PUNTO 8
// Normaliza el texto eliminando cualquier acento
// Usa normalize("NFD") para separar los caracteres con acentos de sus tildes.
// Luego usa .replace() para quitar signos.

function quitarAcentos(texto) {  // funcion para quitar acentos
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// ---------------------------------------------
// PUNTO 2: FUNCIONES DE GESTIÓN DE LIBROS
// ---------------------------------------------

// a) Agregar libro nuevo al sistema
function agregarLibro() { 
  console.log("\n ✨ Agrega un libro nuevo a la biblioteca ✨ \n"); 

  // Se piden los datos del nuevo libro
  let id = parseInt(prompt("📚 Ingresa el ID del libro (4 digitos): "));
  let titulo = prompt("📘 Ingresa el título del libro: ");
  let autor = prompt("✍️ Ingresa el autor: ");
  let anio = parseInt(prompt("📅 Ingresa el año de publicación: "));
  let genero = prompt("🎭 Ingresa el género: ");

  // Se arma el objeto libro con sus propiedades
  let nuevoLibro = {
    id,
    titulo,
    autor,
    anio,
    genero,
    disponible: true
  };

  // Se guarda en el array de libros
  libros.push(nuevoLibro);

  // Se muestra confirmación en consola
  console.log("\n✅ Libro agregado con éxito:");
  mostrarLibroLinea(nuevoLibro);
}

// b) Buscar libro por título, autor o genero
function buscarLibro() { 
  console.log("\n 🔍 Buscador de libros 🔍\n");

  // El usuario elige que criterio buscar
  const criterio = prompt("🔎 Buscar por (titulo / autor / género): ").toLowerCase();
  const valor = prompt(`💬 Ingresa el ${criterio} a buscar: `);

  // Se filtran los libros segun el criterio (Se usa funcion quitarAcentos)
  const resultados = libros.filter((libro) => {
    const datoLibro = quitarAcentos(libro[criterio].toLowerCase());
    const valorBuscado = quitarAcentos(valor.toLowerCase());
    return datoLibro === valorBuscado;
  });

  // Mostrar resultados (se usa la funcion mostrarLibroLinea)
  if (resultados.length > 0) {
    console.log("\n🔍 Resultados encontrados:\n");
    resultados.forEach((libro, index) => mostrarLibroLinea(libro, index));
  } else {
    console.log("❌ No se encontraron libros con ese criterio.");
  }
}

// c) Ordenar libros por título o año (con bubble sort)
function ordenarLibros() {
  console.log("\n✨ Ordenar libros ✨\n"); // \n se usa para dejar une espacio entre lineas

  const criterio = prompt("🔃 Ordenar por (titulo o anio): ").toLowerCase();

  if (criterio !== "titulo" && criterio !== "anio") {
    console.log("❌ Criterio inválido.");
    return;
  }

  // Algoritmo de bubble sort 
  for (let i = 0; i < libros.length - 1; i++) {
    for (let j = 0; j < libros.length - i - 1; j++) {
      if (libros[j][criterio] > libros[j + 1][criterio]) {
        // se intercambian los elementos si no están en orden
        let temp = libros[j];
        libros[j] = libros[j + 1];
        libros[j + 1] = temp;
      }
    }
  }

  // Mostrar los libros ordenados
  console.log(`\n📖 Libros ordenados por ${criterio}:\n`);
  libros.forEach((libro, index) => mostrarLibroLinea(libro, index));
}

// d) Eliminar un libro por su ID
function borrarLibro() {
  console.log("❌ Eliminar un libro * ESTA ACCIÓN NO SE PUEDE DESHACER *\n");

  const id = parseInt(prompt("🗑️ Ingresa el ID del libro que deseas eliminar: "));
  const index = libros.findIndex((libro) => libro.id === id);

  if (index !== -1) {
    const eliminado = libros.splice(index, 1); // se elimina del array
    console.log("🗑️ Libro eliminado:");
    mostrarLibroLinea(eliminado[0]);
  } else {
    console.log("❌ No se encontró un libro con ese ID.");
  }
}

// ---------------------------------------------
// SUBMENÚ: Gestión de Libros
// ---------------------------------------------

function menuLibros() {
  let opcion;

  do {
    // Menú interactivo que se repite hasta que el usuario quiera salir
    opcion = prompt(
      "\nGESTIÓN DE LIBROS\n" +
      "📚 📚 📚 📚 📚 📚 📚 📚 📚 📚 📚\n\n" +
      "Selecciona una opción para continuar:\n\n" +
      "   1 ⮕ Agregar libro 📚 \n" +
      "   2 ⮕ Buscar libro 🔍 \n" +
      "   3 ⮕ Ordenar libros ✨\n" +
      "   4 ⮕ Borrar libro 🗑️ \n" +
      "   5 ⮕ Mostrar todos los libros 📖 \n" +
      "   0 ⮕ Regresar al menú principal ↩️ \n\n"
    );

    // Se ejecuta la función correspondiente
    switch (opcion) {
      case "1":
        agregarLibro();
        break;
      case "2":
        buscarLibro();
        break;
      case "3":
        ordenarLibros();
        break;
      case "4":
        borrarLibro();
        break;
      case "5":
        mostrarLibros();
        break;
      case "0":
        console.log("↩️ Regresando al menú principal..\n\n"); // Regresa al men'u principal 
        break;
      default:
        console.log("❌ Opción no válida.");
    }
  } while (opcion !== "0"); // al seleccionar "0", se corta el ciclo y sale del submenú
}

//function menuLibros() 


// ---------------------------------------------
// PUNTO 3: GESTIÓN DE USUARIOS
// ---------------------------------------------

// a) Registrar usuario

function registrarUsuario() {
  console.log("\n🆕 Registro de nuevo usuario\n");

  // Pedimos los datos básicos al usuario
  const nombre = prompt("👤 Ingresa el nombre: ");
  const email = prompt("📧 Ingresa el email: ");

  // Creamos el ID automáticamente (suma 1 al último ID a partir del 2001)
  const id = usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 2001;

  // Creamos el objeto usuario
  const nuevoUsuario = {
    id,
    nombre: nombre.trim(),
    email: email.toLowerCase(),
    librosPrestados: [] // el usuario arranca sin libros prestados
  };

  // Agregamos al array de usuarios
  usuarios.push(nuevoUsuario);

  console.log("✅ Usuario registrado con éxito:");
  console.log(nuevoUsuario);
}

// b) Mostrar todos los usuarios registrados
function mostrarTodosLosUsuarios() {
  console.log("\n👥 Lista de usuarios:\n");

  // Recorremos el array y mostramos cada uno con su ID y email
  usuarios.forEach((usuario, index) => {
    console.log(`👤 [ID: ${usuario.id}] ${usuario.nombre} - ${usuario.email}`);
  });
}

// c) Buscar usuario por email
function buscarUsuario() {
  console.log("\n🔍 Buscar usuario por email\n");

  const email = prompt("📧 Ingresa el email del usuario: ").toLowerCase();

  // Buscamos el usuario en el array usando .find()
  const usuarioEncontrado = usuarios.find((usuario) => usuario.email === email);

  if (usuarioEncontrado) {
    console.log("✅ Usuario encontrado:");
    console.log(usuarioEncontrado);
  } else {
    console.log("❌ No se encontró ningún usuario con ese email.");
  }
}

// d) Borrar usuario por email
function borrarUsuario() {
  console.log("\n🗑️ Eliminar usuario\n");

  const email = prompt("📧 Ingresa el email del usuario a eliminar: ").toLowerCase();

  // Buscamos el índice del usuario en el array
  const index = usuarios.findIndex((usuario) => usuario.email === email);

  if (index !== -1) {
    // se elimina si se encuentra
    const eliminado = usuarios.splice(index, 1);
    console.log("🗑️ Usuario eliminado con éxito:");
    console.log(eliminado[0]);
  } else {
    console.log("❌ No se encontró un usuario con ese email.");
  }
}

// ---------------------------------------------
// SUBMENÚ: Gestión de Usuarios
// ---------------------------------------------
function menuUsuarios() {
  let opcion;

  do {
    // Mostramos el menú de opciones para usuarios
    opcion = prompt(
      "\nGESTIÓN DE USUARIOS\n" +
      "👥 👥 👥 👥 👥 👥 👥 👥 👥 👥 👥\n\n" +
      "Selecciona una opción:\n\n" +
      "   1 ⮕ Registrar usuario 👤 \n" +
      "   2 ⮕ Buscar usuario por email 🔍 \n" +
      "   3 ⮕ Borrar usuario 🗑️\n" +
      "   4 ⮕ Mostrar todos los usuarios 📋\n" +
      "   0 ⮕ Regresar al menú principal ↩️ \n\n"
    );

    // Segun lo que elija el usuario, se ejecuta la función correspondiente
    switch (opcion) {
      case "1":
        registrarUsuario();
        break;
      case "2":
        buscarUsuario();
        break;
      case "3":
        borrarUsuario();
        break;
      case "4":
        mostrarTodosLosUsuarios();
        break;
      case "0":
        console.log("↩️ Regresando al menú principal...\n");
        break;
      default:
        console.log("❌ Opción no válida.");
    }
  } while (opcion !== "0");
}

// menuUsuarios();


// ---------------------------------------------
// PUNTO 4: GESTIÓN DE PRÉSTAMOS
// ---------------------------------------------

// a) Prestar libro a un usuario
function prestarLibro() {
  console.log("\n📖 Préstamo de libro\n");

  // Pedimos los IDs del usuario y del libro
  const idUsuario = parseInt(prompt("🆔 Ingresa el ID del usuario: "));
  const idLibro = parseInt(prompt("📚 Ingresa el ID del libro: "));

  // Buscamos el usuario y el libro 
  const usuario = usuarios.find((u) => u.id === idUsuario);
  const libro = libros.find((l) => l.id === idLibro);

  // Validamos si el usuario existe
  if (!usuario) {
    console.log("❌ Usuario no encontrado.");
    return;
  }

  // Validamos si el libro existe
  if (!libro) {
    console.log("❌ Libro no encontrado.");
    return;
  }

  // Verificamos si el libro ya está prestado
  if (!libro.disponible) {
    console.log("❌ El libro ya está prestado.");
    return;
  }

  // Registramos el préstamo
  libro.disponible = false;
  usuario.librosPrestados.push(libro.id); // Guardamos el ID del libro en la lista de préstamos del usuario

  // Confirmación en consola
  console.log(`✅ El libro "${libro.titulo.toUpperCase()}" fue prestado a ${usuario.nombre}.`);
}

// b) Devolver un libro prestado
function devolverLibro() {
  console.log("\n📥 Devolución de libro\n");

  // se pide el ID del usuario y del libro
  const idUsuario = parseInt(prompt("🆔 Ingresa el ID del usuario: "));
  const idLibro = parseInt(prompt("📚 Ingresa el ID del libro: "));

  // se busca al usuario y al libro
  const usuario = usuarios.find((u) => u.id === idUsuario);
  const libro = libros.find((l) => l.id === idLibro);

  // se valida que el usuario exista
  if (!usuario) {
    console.log("❌ Usuario no encontrado.");
    return;
  }

  // se valida que el libro exista
  if (!libro) {
    console.log("❌ Libro no encontrado.");
    return;
  }

  // se verifica si el usuario tenía ese libro prestado
  const index = usuario.librosPrestados.indexOf(libro.id);

  if (index === -1) {
    console.log("❌ Este usuario no tiene prestado ese libro.");
    return;
  }

  // Registro de devolución
  libro.disponible = true;
  usuario.librosPrestados.splice(index, 1); // Quitamos el libro de su lista

  console.log(`✅ El libro "${libro.titulo}" fue devuelto por ${usuario.nombre}.`);
}

// ---------------------------------------------
// PUNTO 5: GESTIÓN DE PRÉSTAMOS - REPORTE
// ---------------------------------------------

function generarReporteLibros() {
  console.log("\n📊 Reporte de Libros 📚\n");

  // Total de libros registrados
  const totalLibros = libros.length;

  // Total de libros que ya fueron prestados
  const prestados = libros.filter((libro) => !libro.disponible).length;

  // Cantidad de libros por género 
  const librosPorGenero = libros.reduce((conteo, libro) => {
    const genero = libro.genero.toLowerCase(); // se pasa a minusculas
    conteo[genero] = (conteo[genero] || 0) + 1; // si ya existe el género, suma 1. Si no, lo crea con valor 1.
    return conteo;
  }, {});

  // Libro más antiguo 
  const libroMasAntiguo = libros.reduce((antiguo, actual) =>
    actual.anio < antiguo.anio ? actual : antiguo
  );

  // Libro más nuevo 
  const libroMasNuevo = libros.reduce((nuevo, actual) =>
    actual.anio > nuevo.anio ? actual : nuevo
  );

  // Mostramos todo el resumen 
  console.log(`📚 Total de libros: ${totalLibros}`);
  console.log(`❌ Libros prestados: ${prestados}`);
  console.log(`📖 Libros por género:`);

  for (const genero in librosPorGenero) {
    console.log(`   - ${genero}: ${librosPorGenero[genero]}`);
  }

  console.log(`📜 Libro más antiguo: "${libroMasAntiguo.titulo}" (${libroMasAntiguo.anio})`);
  console.log(`🆕 Libro más nuevo: "${libroMasNuevo.titulo}" (${libroMasNuevo.anio})`);
}

// ---------------------------------------------
// SUBMENÚ: Gestión de Préstamos
// ---------------------------------------------

function menuPrestamos() {
  let opcion;

  do {
    // Menú con opciones relacionadas a préstamos y reportes
    opcion = prompt(
      "\nGESTIÓN DE PRÉSTAMOS\n" +
      "📥 📖 📥 📖 📥 📖 📥 📖 📥 📖\n\n" +
      "Selecciona una opción:\n\n" +
      "   1 ⮕ Prestar libro 📚 \n" +
      "   2 ⮕ Devolver libro 📥 \n" +
      "   3 ⮕ Generar reporte 📊\n\n" +
      "   0 ⮕ Regresar al menu principal ↩️ \n\n"
    );

    switch (opcion) {
      case "1":
        prestarLibro();
        break;
      case "2":
        devolverLibro();
        break;
      case "3":
        generarReporteLibros();
        break;
      case "0":
        console.log("↩️ Regresando al menú principal...\n");
        break;
      default:
        console.log("❌ Opción no válida.");
    }
  } while (opcion !== "0"); 
}

// menuPrestamos()

// ---------------------------------------------
// PUNTO 6: BUSCADOR AVANZADO DE LIBROS
// ---------------------------------------------

function buscadorAvanzado() {
  console.log("\n🔎 Búsqueda avanzada de libros 🔍\n");

  // Pedimos al usuario que elija el tipo de búsqueda
  const criterio = prompt("Buscar por (titulo / autor / genero / anio): ").toLowerCase();

  let resultados = []; // 

  // Si el usuario elige buscar por texto (título, autor o género)
  if (criterio === "titulo" || criterio === "autor" || criterio === "genero") {
    const valor = prompt(`Ingresa el ${criterio} a buscar: `).toLowerCase();

    // Usamos .filter() para buscar libros que contengan lo que el usuario escribió
    // También usamos quitarAcentos para evitar errores por tildes
    resultados = libros.filter((libro) =>
      quitarAcentos(libro[criterio].toLowerCase()).includes(quitarAcentos(valor))
    );

  // Si el usuario quiere buscar por rango de años
  } else if (criterio === "anio") {
    const desde = parseInt(prompt("Anio desde: "));
    const hasta = parseInt(prompt("Anio hasta: "));

    // Filtramos los libros que estén dentro del rango de años ingresado
    resultados = libros.filter((libro) => libro.anio >= desde && libro.anio <= hasta);

  } else {
    console.log("❌ Criterio no válido.");
    return;
  }

  if (resultados.length > 0) {
    console.log("\n📚 Resultados encontrados:\n");
    resultados.forEach((libro, index) => {
      mostrarLibroLinea(libro, index); 
    });
  } else {
    console.log("❌ No se encontraron libros con ese criterio.");
  }
}

// buscadorAvanzado()

// ---------------------------------------------
// PUNTO 7: ESTADÍSTICAS
// ---------------------------------------------

function calcularEstadisticas() {
  console.log("\n📊 Cálculos Estadísticos de los Libros\n");

  if (libros.length === 0) {
    console.log("❌ No hay libros en la biblioteca para calcular estadísticas.");
    return;
  }

  // Promedio de años de publicación
  const sumaAnios = libros.reduce((acc, libro) => acc + libro.anio, 0);
  const promedio = sumaAnios / libros.length;

  // Año de publicación más frecuente
  const frecuencia = {};
  libros.forEach((libro) => {
    frecuencia[libro.anio] = (frecuencia[libro.anio] || 0) + 1;
  });

  // el año que más veces aparece
  const añoMasFrecuente = Object.keys(frecuencia).reduce((a, b) =>
    frecuencia[a] > frecuencia[b] ? a : b
  );

  // Diferencia entre el libro más antiguo y el más nuevo
  const anios = libros.map((libro) => libro.anio);
  const anioMin = Math.min(...anios);
  const anioMax = Math.max(...anios);
  const diferencia = anioMax - anioMin;

  console.log(`📚 Promedio de años de publicación: ${promedio.toFixed(2)}`);
  console.log(`📆 Año de publicación más frecuente: ${añoMasFrecuente}`);
  console.log(`📏 Diferencia entre el libro más antiguo y el más nuevo: ${diferencia} años`);
}

// ---------------------------------------------
// PUNTO 9: INTERFAZ DE USUARIO POR CONSOLA
// ---------------------------------------------

// muestra el menu principal en la terminal para que el usuario pueda interactuar con el programa. 
// usamos un do... while para que el menú se muestre al menos una vez y se siga mostrando hasta que el usuario decida salir 
// usamos switch para ejecutar la función correspondiente según la opción seleccionada por el usuario

function menuPrincipal() {
  let opcion;
  do {
    opcion = prompt(
      "\nBIENVENIDO AL SISTEMA DE GESTIÓN DE BIBLIOTECA 📚📋\n\n" +
      "Selecciona una opción:\n\n" +
      "   1 ⮕ Gestión de Libros 📘 \n" +
      "   2 ⮕ Gestión de Usuarios 👥\n" +
      "   3 ⮕ Gestión de Préstamos 📖\n" +
      "   4 ⮕ Búsqueda avanzada 🔍\n" +
      "   5 ⮕ Estadísticas 📊 \n" +      
      "   0 ⮕ Salir del programa ❌ \n\n"
    );

    switch (opcion) {
      case "1":
        menuLibros(); // abre el submenú para gestionar libros
        break;
      case "2":
        menuUsuarios(); // abre el submenú para gestionar usuarios
        break;
      case "3":
        menuPrestamos(); // abre el submenú de préstamos y reportes
        break;
      case "4":
        buscadorAvanzado(); // lanza el buscador avanzado por criterios
        break;
      case "5":
        calcularEstadisticas(); // muestra estadísticas de los libros
        break;     
      case "0":
        console.log("\n👋 Gracias por visitar la biblioteca. ¡Hasta pronto!\n"); // despedida al salir
        break;
      default:
        console.log("❌ Opción no válida."); 
    }
  } while (opcion !== "0"); // el menú sigue apareciendo hasta que el usuario escriba "0", al hacerlo, se finaliza el programa. 
}

menuPrincipal(); // Llamamos a la función para iniciar el programa 

// FIN DEL PROGRAMA
