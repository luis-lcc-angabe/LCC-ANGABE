// Carrusel
let currentIndex = 0;
const images = document.querySelectorAll('.carousel img');

function showNextImage() {
  images[currentIndex].classList.remove('active');
  currentIndex = (currentIndex + 1) % images.length;
  images[currentIndex].classList.add('active');
}

setInterval(showNextImage, 3000);

// Modal
const modal = document.getElementById('modal3');
const form = document.getElementById('formContacto');
const mensajeExito = document.getElementById('mensajeExito');

function abrirModal3() {
  modal.style.display = 'flex';
}

function cerrarModal() {
  modal.style.display = 'none';
  form.reset();
  mensajeExito.textContent = '';
}

// Envío del formulario
form.addEventListener('submit', function (e) {
  e.preventDefault();
  const nombre = document.getElementById('nombre').value.trim();
  const correo = document.getElementById('correo').value.trim();
  const mensaje = document.getElementById('mensaje').value.trim();

  if (nombre && correo && mensaje) {
    // Simula envío
    mensajeExito.textContent = "Mensaje enviado correctamente ✅";
    setTimeout(cerrarModal, 2000);
  } else {
    mensajeExito.textContent = "Por favor completa todos los campos.";
    mensajeExito.style.color = "red";
  }
});