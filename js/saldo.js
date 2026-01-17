function inicializarSaldo() {
    let saldo = Number(localStorage.getItem('saldo'));

    if (isNaN(saldo)) {
        saldo = 0;
        localStorage.setItem('saldo', saldo);
    }
    return saldo;
}

function actualizarSaldo(nuevoSaldo) {
    localStorage.setItem('saldo', nuevoSaldo);
}
function guardarTransaccion(tipo, monto) {
    const transacciones = JSON.parse(localStorage.getItem("transactions")) || [];

    const nueva = {
        tipo: tipo,
        monto: monto,
        fecha: new Date().toLocaleString()
    };

    transacciones.unshift(nueva);
    localStorage.setItem("transactions", JSON.stringify(transacciones));
    
}