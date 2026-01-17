document.addEventListener("DOMContentLoaded", () => {
    cargarTransacciones();
});

function cargarTransacciones() {
    const lista = document.getElementById("listaTransacciones");
    const transacciones = JSON.parse(localStorage.getItem("transactions")) || [];
    
    lista.innerHTML = "";

    if (transacciones.length === 0) {
        lista.innerHTML = `
            <li class="list-group-item text-center text-muted">
                No hay transacciones registradas
            </li>
        `;
        return;
    }

    transacciones.forEach(tx => {
        const item = document.createElement("li");
        item.className = "list-group-item d-flex justify-content-between align-items-center";

        item.innerHTML = `
            <div>
                <strong>${tx.tipo}</strong><br>
                <small class="text-muted">${tx.fecha}</small>
            </div>
            <span class="${tx.tipo === 'Depósito'|| tx.tipo === 'Envío'  ? 'text-success' : 'text-danger'} fw-bold">
                $${tx.monto}
            </span>
        `;

        lista.appendChild(item);
    });
}