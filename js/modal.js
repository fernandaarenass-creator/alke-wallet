function mostrarModal(titulo, mensaje) {
    document.getElementById('modalTitulo').innerText = titulo;
    document.getElementById('modalMensaje').innerText = mensaje;

    const modal = new bootstrap.Modal(
        document.getElementById('mensajeModal')
    );

    modal.show();
}