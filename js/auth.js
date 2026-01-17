function validarLogin(username, password) {
    return username === 'f@g.com' && password === '123';
}

function loginUser(event) {
    event.preventDefault(); //evita recarga del form

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (validarLogin(username, password)) {
        mostrarModal("Bienvenido", "Login exitoso");

        // Esperar a que el usuario vea el modal
        setTimeout(() => {
            window.location.href = 'menu.html';
        }, 2000);
    } else {
        mostrarModal("Error", "Credenciales incorrectas");
    }
}