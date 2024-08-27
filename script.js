const textArea= document.querySelector(".text-area");
const mensaje = document.querySelector(".mensaje");
const limpiar = document.querySelector(".btn-limpiar");

/* La letra "e" es convertida para "enter"
La letra "i" es convertida para "imes"
La letra "a" es convertida para "ai"
La letra "o" es convertida para "ober"
La letra "u" es convertida para "ufat" */

// Actualiza el estado del botón limpiar
function actualizarEstadoBotonLimpiar() {
    if (textArea.value.trim() !== "" || mensaje.value.trim() !== "") {
        limpiar.style.display = "block";
    } else {
        limpiar.style.display = "none";
    }
}

// Limpia las cajas de texto
function btnLimpiar() {
    textArea.value = "";
    mensaje.value = "";
    mensaje.style.backgroundImage = "url('img/Muñeco.png')";
    actualizarEstadoBotonLimpiar();
}

// Actualizar estado del botón limpiar en tiempo real
textArea.addEventListener("input", actualizarEstadoBotonLimpiar);
mensaje.addEventListener("input", actualizarEstadoBotonLimpiar);

function btnEncriptar(){
    const texto = textArea.value.trim();
    if (texto === "") {
        mostrarAlertaError("Por favor, ingrese un texto para encriptar.");
        return;
    }
    if (!validarTexto(texto)) {
        mostrarAlertaError("El texto solo debe contener letras minúsculas, sin acentos ni caracteres especiales.");
        return;
    }
    const textoEncriptado = encriptar(textArea.value)
    mensaje.value = textoEncriptado
    textArea.value="";
    mensaje.style.backgroundImage="none";
    actualizarEstadoBotonLimpiar();

}   

function btnDesencriptar(){
    const texto = textArea.value.trim();
    if (texto === "") {
        mostrarAlertaError("Por favor, ingrese un texto para desencriptar.");
        return;
    }
    if (!validarTexto(texto)) {
        mostrarAlertaError("El texto solo debe contener letras minúsculas, sin acentos ni caracteres especiales.");
        return;
    }
    const textoDesencriptado = desencriptar(textArea.value)
    mensaje.value = textoDesencriptado
    textArea.value="";
    mensaje.style.backgroundImage="none";
    actualizarEstadoBotonLimpiar();

}   

function encriptar(StringEncriptada){

    let matrizCodigo= [["e","enter"],["i","imes"],["a","ai"],["o","ober"],["u","ufat"]];
    StringEncriptada=StringEncriptada.toLowerCase()

    for(let i = 0; i < matrizCodigo.length; i++){
        if(StringEncriptada.includes(matrizCodigo[i][0])){
            StringEncriptada=StringEncriptada.replaceAll(matrizCodigo[i][0], matrizCodigo[i][1])
        }

    }
    return StringEncriptada;    
}

function desencriptar(StringDesencriptada){

    let matrizCodigo= [["e","enter"],["i","imes"],["a","ai"],["o","ober"],["u","ufat"]];
    StringDesencriptada=StringDesencriptada.toLowerCase()

    for(let i = 0; i < matrizCodigo.length; i++){
        if(StringDesencriptada.includes(matrizCodigo[i][1])){
            StringDesencriptada=StringDesencriptada.replaceAll(matrizCodigo[i][1], matrizCodigo[i][0])
        }

    }
    return StringDesencriptada;    
}

function mostrarTutorial() {
    const tutorialText = document.getElementById('tutorial-text');
    
    // Verifica si el texto ya está visible
    if (tutorialText.style.display === 'none' || tutorialText.style.display === '') {
        tutorialText.style.display = 'block';
        tutorialText.innerHTML = `
            <p>¡Bienvenido al Encriptador de Texto!</p>
            <p>1. Ingresa el texto que deseas encriptar sin carecteres especiales y acentos en el área de texto.</p>
            <p>2. Haz clic en el botón "Encriptar" para convertir el texto.</p>
            <p>3. Si deseas desencriptar un texto, ingrésalo y haz clic en "Desencriptar".</p>
            <p>4. Utiliza el botón "Copiar" para copiar el texto encriptado o desencriptado.</p>
        `;
    } else {
        tutorialText.style.display = 'none'; // Oculta el texto si ya está visible
    }
}

function mostrarAlertaError(mensaje) {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: mensaje,
        footer: '<a href="#">¿Por qué ocurrió este problema?</a>'
    });
}

function mostrarNotificacion(mensaje) {
    Swal.fire({
        icon: 'success',
        title: '¡Hecho!',
        text: mensaje,
        timer: 2000,
        showConfirmButton: false
    });
}



function validarTexto(texto) {
    const regex = /^[a-z\s]+$/; // Solo permite letras minúsculas y espacios
    return regex.test(texto);
}


function copiarTexto() {
    mensaje.select();
    document.execCommand("copy");
    mostrarNotificacion("Texto copiado al portapapeles.");
    //alert("Texto copiado al portapapeles");
}
