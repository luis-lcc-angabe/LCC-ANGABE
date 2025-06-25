            //modal cotizacion
function openModal() {
  document.getElementById('modalFormulario').style.display = 'flex';
}

function closeModal() {
  document.getElementById('modalFormulario').style.display = 'none';
}

function enviarFormulario() {
  const aceptado = document.getElementById('terminos').checked;
  if (!aceptado) {
    alert('Debe aceptar los Términos y condiciones.');
    return;
  }
  alert('Formulario enviado correctamente.');
  closeModal();
}

// Cierra el modal al hacer clic fuera del contenido
window.onclick = function(event) {
  const modal = document.getElementById('modalFormulario');
  if (event.target === modal) {
    closeModal();
  }
}