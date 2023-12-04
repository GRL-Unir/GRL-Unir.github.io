
// JavaScript - Ejercicio 1: Detectar si una cadena es un palíndromo
function comprobarPalindromo() {
    const entrada = document.getElementById('entradaPalindromo').value;
    if (entrada.trim() === '') {
        mostrarResultado('resultadoPalindromo', 'Por favor, introduce un texto.');
        return;
    }
    const esPalindromo = entrada.toLowerCase().replace(/[\W_]/g, '') === entrada.toLowerCase().replace(/[\W_]/g, '').split('').reverse().join('');
    mostrarResultado('resultadoPalindromo', esPalindromo ? "Es un palíndromo." : "No es un palíndromo.");
}

// JavaScript - Ejercicio 2: Programa para determinar el mayor de dos números
function encontrarMayorNumero() {
    const num1 = document.getElementById('numero1').value;
    const num2 = document.getElementById('numero2').value;
    if (num1.trim() === '' || num2.trim() === '') {
        mostrarResultado('resultadoMayorNumero', 'Por favor, introduce ambos números.');
        return;
    }
    const mayor = parseInt(num1) > parseInt(num2) ? num1 : num2;
    mostrarResultado('resultadoMayorNumero', "El mayor es: " + mayor);
}

// JavaScript - Ejercicio 3: Mostrar vocales en una frase
function mostrarVocalesEnFrase() {
    const frase = document.getElementById('entradaVocales').value;
    if (frase.trim() === '') {
        mostrarResultado('resultadoVocales', 'Por favor, introduce una frase.');
        return;
    }
    const vocalesEncontradas = frase.match(/[aeiou]/gi) || [];
    mostrarResultado('resultadoVocales', "Vocales encontradas: " + vocalesEncontradas.join(', '));
}

// JavaScript - Ejercicio 4: Contar vocales en una frase
function contarVocales() {
    const frase = document.getElementById('entradaContarVocales').value;
    if (frase.trim() === '') {
        mostrarResultado('resultadoConteoVocales', 'Por favor, introduce una frase.');
        return;
    }
    const conteo = frase.match(/[aeiou]/gi) || [];
    const conteoVocales = conteo.reduce((acumulado, vocal) => {
        acumulado[vocal.toLowerCase()] = (acumulado[vocal.toLowerCase()] || 0) + 1;
        return acumulado;
    }, {});
    mostrarResultado('resultadoConteoVocales', "Conteo de vocales: " + JSON.stringify(conteoVocales));
}

// Función auxiliar para mostrar resultados en el DOM
function mostrarResultado(id, mensaje) {
    const elemento = document.getElementById(id);
    if (elemento) {
        elemento.textContent = mensaje;
    } else {
        console.error(`Elemento con ID ${id} no encontrado.`);
    }
}

// Funciones para la carga inicial y manejo de AJAX con fetch
function cargarURLPorDefecto() {
    document.getElementById('recurso').value = "https://www.unir.net";
}
// AJAX - Ejercicio 2: Cargar contenido con AJAX
async function cargarContenidoAJAX() {
    const url = document.getElementById('recurso').value;
    if (url.trim() === '') {
        mostrarResultado('contenidos', 'Por favor, introduce una URL.');
        return;
    }
// AJAX - Ejercicios 3, 4, 5: Mostrar estados, cabeceras y código de estado

    const estados = document.getElementById('estados');
    estados.textContent = 'Cargando...';
    
    try {
        const respuesta = await fetch(url);
        const cabeceras = {};
        
        // Iterar a través de las cabeceras y agregarlas a un objeto simple
        for (let [key, value] of respuesta.headers) {
            cabeceras[key] = value;
        }
        
        if (respuesta.ok) {
            document.getElementById('contenidos').textContent = await respuesta.text();
            // Mostrar las cabeceras como una cadena JSON formateada
            document.getElementById('cabeceras').textContent = JSON.stringify(cabeceras, null, 2);
            document.getElementById('codigo').textContent = respuesta.status + ' ' + respuesta.statusText;
        } else {
            throw new Error('Error al cargar el contenido: ' + respuesta.statusText);
        }
    } catch (error) {
        mostrarResultado('contenidos', error.message);
    } finally {
        estados.textContent = 'Completado';
    }
}

// Asegurarse de que los elementos del DOM necesarios estén presentes
window.onload = function() {
    cargarURLPorDefecto();
    // Agregar elementos para mostrar resultados si no existen
    agregarElementoResultado('entradaPalindromo', 'resultadoPalindromo');
    agregarElementoResultado('numero1', 'resultadoMayorNumero');
    agregarElementoResultado('entradaVocales', 'resultadoVocales');
    agregarElementoResultado('entradaContarVocales', 'resultadoConteoVocales');
};

// Función auxiliar para agregar elementos de resultado al DOM
function agregarElementoResultado(referenciaId, resultadoId) {
    const referencia = document.getElementById(referenciaId);
    if (referencia) {
        const resultado = document.createElement('div');
        resultado.id = resultadoId;
        referencia.parentNode.insertBefore(resultado, referencia.nextSibling);
    } else {
        console.error(`Elemento con ID ${referenciaId} no encontrado para agregar resultado.`);
    }
}
