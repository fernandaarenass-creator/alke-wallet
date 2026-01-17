document.addEventListener("DOMContentLoaded", () => {
    const saldoInput = document.getElementById("saldo");
    if (!saldoInput) return;

    saldoInput.value = inicializarSaldo();
});

function redireccion(valor) {
    const rutas = {
        '1': 'deposit.html',
        '2': 'sendmoney.html',
        '3': 'transactions.html'
    };

    if (rutas[valor]) {
        window.location.href = rutas[valor];
    } else {
        mostrarModal("Error", "Opción no válida");
    }
}
