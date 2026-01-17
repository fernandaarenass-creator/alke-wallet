function realizarDeposito() {
    const monto = Number(document.getElementById('monto').value);

    if (monto <= 0 || isNaN(monto)) {
        mostrarModal("Error", "Ingrese un monto válido");
        return;
    }

    let saldo = inicializarSaldo();
    saldo += monto;
    actualizarSaldo(saldo);

    mostrarModal("Transacción exitosa", "Depósito realizado");

    setTimeout(() => {
        // CERRAR MODAL AUTOMÁTICAMENTE
        const modalElement = document.getElementById('mensajeModal');
        const modalInstance = bootstrap.Modal.getInstance(modalElement);
        if (modalInstance) {
            modalInstance.hide();
        }

        // ACTUALIZAR SALDO EN PANTALLA
        const inputSaldo = document.getElementById("saldo");
        if (inputSaldo) {
            inputSaldo.value = saldo;
        }

    }, 3000);
    guardarTransaccion("Depósito", monto);
    document.getElementById("monto").value = "";
}