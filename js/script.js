document.addEventListener("DOMContentLoaded", () => {
    mostrarModal("Test", "Si ves esto, el modal funciona");
});

// Mostrar el saldo almacenado en el campo de entrada al cargar la página
function inicializarSaldo() {
    let saldo = Number(localStorage.getItem('saldo')); // Convertir a número el saldo almacenado

    if (isNaN(saldo)) {
        saldo = 0;
        localStorage.setItem('saldo', saldo); // Inicializar saldo en 0 si no existe
    }

    return saldo;
}

document.addEventListener("DOMContentLoaded", () => { //    Esperar a que el DOM esté completamente cargado
    const saldoInput = document.getElementById("saldo"); // Obtener el campo de entrada del saldo
    const saldo = inicializarSaldo(); // Llamar a la función para inicializar el saldo
    saldoInput.value = saldo; // Asignar el saldo al campo de entrada
});

//validarLogin se encarga de la lógica de validación y loginUser maneja la interacción con el usuario

// Función para validar las credenciales de inicio de sesión
function validarLogin(username, password) { // Función para validar las credenciales de inicio de sesión
    return username === 'f@g.com' && password === '123';
}

/*    ALternativa codigo mas extenso
    if (username === 'f@g.com' && password === '123') { // Credenciales correctas
        
        return true; // Retornar verdadero si son correctas
    } else { // Credenciales incorrectas
        return false; // Retornar falso si son incorrectas
    }
}*/

// Función para manejar el inicio de sesión del usuario
function loginUser() {
    let username = document.getElementById('username').value;   // Obtener el valor del campo de usuario
    let password = document.getElementById('password').value;   // Obtener el valor del campo de contraseña

    if (validarLogin(username, password)) { // Validar las credenciales
       mostrarModal("Bienvenido","Datos correctos") //
        window.location.href = 'menu.html'; // Redirigir al menú principal
    } else { // Si las credenciales son incorrectas
        alert('Datos incorrectos'); // Mostrar alerta de error
    }
}

//redireccionar a las diferentes paginas
function redireccion(valor) {
    switch (valor) {
        case '1':
            alert('Redirigiendo a Depositar');
            window.location.href = 'deposit.html';
            break;            
        case '2':
            alert('Redirigiendo a Enviar Dinero');
            window.location.href = 'sendmoney.html';
            break;
        case '3':
            alert('Redirigiendo a Historial de Transacciones');
            window.location.href = 'transactions.html';
            break;
        default:
            alert('Opción no válida');
    }
}

//depositar dinero
function realizarDeposito() {    
    let monto = Number(document.getElementById('monto').value);   // Convertir a número el monto ingresado 

     if (isNaN(monto) || monto <= 0) { // Validar monto positivo
        alert('Ingrese un monto válido');
        return;
    }

    let saldoActual = Number(localStorage.getItem('saldo')); // Convertir a número y guardar en variable
    let nuevoSaldo = saldoActual + monto; // Calcular nuevo saldo
    localStorage.setItem('saldo', nuevoSaldo); // Guardar nuevo saldo en localStorage
    alert('Depósito realizado. Nuevo saldo: ' + nuevoSaldo);    //mostrar nuevo saldo
    document.getElementById('saldo').value = '$' + nuevoSaldo; // Actualizar campo de saldo en la página en el input
    window.location.href = 'menu.html'; // Redirigir al menú principal
}


//gestionar contactos
function mostrarFormulario() { 
    document.getElementById('formContacto').style.display = 'block'; // Mostrar el formulario de contacto
}


//guardar contacto
function guardarContacto() {
    // Obtener los valores de los campos del formulario
    let nombre  = document.getElementById('nombre').value;
    let cbu     = document.getElementById('cbu').value;
    let alias   = document.getElementById('alias').value;
    let banco   = document.getElementById('banco').value;
    // Validar que todos los campos estén completos
    if (nombre === '' || cbu === '' || alias === '' || banco === '') {
        alert('Complete todos los campos');
        return;
    }
    // Crear un objeto contacto con los datos ingresados
    let contacto = {
        nombre: nombre,
        cbu: cbu,
        alias: alias,
        banco: banco
    };
    // Guardar el contacto en el almacenamiento local como una cadena JSON
    localStorage.setItem('contacto', JSON.stringify(contacto));

    alert('Contacto guardado');

    document.getElementById('formContacto').style.display = 'none'; // Ocultar el formulario después de guardar
}

//mostrar contacto guardado
let contactoGuardado = localStorage.getItem('contacto'); // Obtener el contacto guardado del almacenamiento local

if (contactoGuardado !== null) { // Verificar si existe un contacto guardado
    let contacto = JSON.parse(contactoGuardado); // Parsear la cadena JSON a un objeto
    document.getElementById('contactoTexto').innerText =  contacto.nombre + ' - ' + contacto.banco // Mostrar el nombre y banco del contacto en el elemento HTML
    
}

function enviarDinero() {

    let monto2 = Number(document.getElementById('montoEnviar').value);
    let saldo = Number(localStorage.getItem('saldo'));

    if (monto2 <= 0 || isNaN(monto2)) {
        alert('Ingrese un monto válido');
        return;
    }

    if (monto2 > saldo) {
        alert('Saldo insuficiente');
        return;
    }

    let nuevoSaldo = saldo - monto2;
    localStorage.setItem('saldo', nuevoSaldo);
    let saldoActual = Number(localStorage.getItem('saldo'));
    document.getElementById('saldo').innerText = '$' + nuevoSaldo;

    alert('Dinero enviado correctamente');

    window.location.href = 'menu.html';
}

function mostrarModal(titulo, mensaje) {
  document.getElementById('modalTitulo').innerText = titulo;
  document.getElementById('modalMensaje').innerText = mensaje;

  const modal = new bootstrap.Modal(
    document.getElementById('miModal')
  );
  modal.show();
}


/*function loginUser() {
    let username = document.getElementById('username').value;   
    let password = document.getElementById('password').value;
    if (username === 'fer@g.com' && password === '123') {
        alert('Datos correctos');
        window.location.href = 'menu.html';
    } else {
        alert('Datos incorrectos');
    }
} */