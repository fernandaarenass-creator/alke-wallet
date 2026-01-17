function enviarDinero() {
    const montoE = Number(document.getElementById('montoEnviar').value);
    let saldo = inicializarSaldo();
     console.log(saldo);
    //console.log(contactos[0]);

    if (montoE <= 0 || isNaN(montoE)) {
        mostrarModal("Error", "Monto inválido");
        return;
    }

    if (montoE > saldo) {
        mostrarModal("Error", "Saldo insuficiente");
        return;
    }    
    saldo -= montoE;
    actualizarSaldo(saldo);
    mostrarModal("Éxito", "Dinero enviado");

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
    guardarTransaccion("Envío", montoE);
    document.getElementById("montoEnviar").value = "";
}

// Mostrar formulario
function mostrarFormulario() {
    document.getElementById("formContacto").style.display = "block";
}
// ==============================
// CARGAR CONTACTOS AL INICIAR
// ==============================
document.addEventListener("DOMContentLoaded", () => {
    const contactos = JSON.parse(localStorage.getItem("contactos")) || [];
    contactos.forEach(contacto => agregarContactoALista(contacto));

});

// ==============================
// GUARDAR CONTACTO
// ==============================
function guardarContacto() {
    const nombre = document.getElementById("nombre").value.trim();
    const alias = document.getElementById("alias").value.trim();
    const cuenta = document.getElementById("cuenta").value.trim();    
    const banco = document.getElementById("banco").value.trim();

    if (!nombre || !alias ||!cuenta || !banco) {
        alert("Complete todos los campos");
        return;
    }

    const contacto = { nombre, alias,cuenta,banco };

    let contactos = JSON.parse(localStorage.getItem("contactos")) || [];
    contactos.push(contacto);
    localStorage.setItem("contactos", JSON.stringify(contactos));

    agregarContactoALista(contacto);

    document.getElementById("formContacto").style.display = "none";

    // limpiar inputs
    document.getElementById("nombre").value = "";
    document.getElementById("alias").value = "";
    document.getElementById("cuenta").value = "";
    document.getElementById("banco").value = "";
    
}

// ==============================
// AGREGAR CONTACTO AL UL
// ==============================
function agregarContactoALista(contacto) {
    const list = document.getElementById("contactList");

    const li = document.createElement("li");
    li.className = "list-group-item";

    li.innerHTML = `
        <strong>${contacto.nombre}</strong><br>
        <small>Cuenta: ${contacto.cuenta} | Alias: ${contacto.alias} | Banco: ${contacto.banco}</small>
    `;

    li.addEventListener("click", () => seleccionarContacto(contacto, li));

    list.appendChild(li);
    
}
// ==============================
// PARA USAR (CONTACTOS ACTUALIZADOS)
// ==============================
function obtenerContactos() {
    return JSON.parse(localStorage.getItem("contactos")) || [];}


// ==============================
// SUGERENCIA AL PRESIONAR UNA tecla
// ==============================
const input = document.getElementById("buscarContacto");
const sugerencias = document.getElementById("sugerencias");

input.addEventListener("input", function () {
  const value = this.value.toLowerCase();
  sugerencias.innerHTML = "";

  if (!value) return;

  // volver a obtener contactos ACTUALIZADOS
  const contactos = obtenerContactos();

  const matches = contactos.filter(contacto =>
    contacto.nombre.toLowerCase().includes(value)
  );

  matches.forEach(contacto => {
    const li = document.createElement("li");
    li.className = "list-group-item list-group-item-action";
    li.textContent = `${contacto.nombre} · ${contacto.cuenta}`;

    li.addEventListener("click", () => {
      input.value = contacto.nombre;
      sugerencias.innerHTML = "";
    });

    sugerencias.appendChild(li);
  });
});



