function enviarFormulario() {
  // Validación simple (puedes expandirla)
  if (!document.getElementById("terminos").checked) {
    alert("Debes aceptar los términos y condiciones.");
    return;
  }

  // Limpiar los campos del formulario
  document.getElementById('formCotizacion').reset();
  document.getElementById('file1').value = "";
  document.getElementById('file2').value = "";

  // Mostrar mensaje de éxito
  const mensaje = document.getElementById('mensajeExito');
  mensaje.style.display = 'block';

  // Ocultar el mensaje después de 3 segundos
  setTimeout(() => {
    mensaje.style.display = 'none';
  }, 3000);
}