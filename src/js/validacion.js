 document.getElementById('registroForm').addEventListener('submit', function (e) {
  e.preventDefault();

  const form = this;
  const inputs = form.querySelectorAll('input[required], select[required]');
  const email = form.querySelector('input[type="email"]');
  const password = form.querySelector('input[type="password"]');
  const confirmPassword = form.querySelectorAll('input[type="password"]')[1];
  const mensajeExito = document.getElementById('mensajeExito');

  let valido = true;

  // Limpiar mensajes anteriores
  form.querySelectorAll('.error-msg').forEach(el => el.remove());

  inputs.forEach(input => {
    input.style.borderColor = '#aaa';
    if (!input.value.trim()) {
      mostrarError(input, 'Este campo es obligatorio');
      valido = false;
    }
  });

  // Validación de longitud de contraseña
  if (password.value.length < 6) {
    mostrarError(password, 'La contraseña debe tener al menos 6 caracteres');
    valido = false;
  }

  // Validación de coincidencia de contraseñas
  if (password.value !== confirmPassword.value) {
    mostrarError(confirmPassword, 'Las contraseñas no coinciden');
    valido = false;
  }

  if (valido) {
    mensajeExito.classList.remove('oculto');
    form.reset();

    setTimeout(() => {
      mensajeExito.classList.add('oculto');
    }, 3000);
  }
});

// Función para mostrar mensaje de error
function mostrarError(input, mensaje) {
  const error = document.createElement('div');
  error.textContent = mensaje;
  error.classList.add('error-msg');
  input.style.borderColor = 'red';
  input.insertAdjacentElement('afterend', error);
}
