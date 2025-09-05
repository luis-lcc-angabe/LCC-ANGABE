
import React, { useRef } from "react";
import logoLcc from "./assets/imagenes svg/logos/logo lcc.png";
import "./css/formulario.css";
import "./css/styles.css";
import "./css/modal.css";
import "./css/header.css";
import "./css/cotizacion.css";

const Formulario = () => {
  const mensajeExitoRef = useRef(null);

  const mostrarError = (input, mensaje) => {
    const error = document.createElement('div');
    error.textContent = mensaje;
    error.classList.add('error-msg');
    input.style.borderColor = 'red';
    input.insertAdjacentElement('afterend', error);
  };

  const validarRegistro = (e) => {
    e.preventDefault();
    const form = e.target;
    const inputs = form.querySelectorAll('input[required], select[required]');
    const password = form.querySelector('input[type="password"]');
    const confirmPassword = form.querySelectorAll('input[type="password"]')[1];
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
    if (password && password.value.length < 6) {
      mostrarError(password, 'La contraseña debe tener al menos 6 caracteres');
      valido = false;
    }
    if (password && confirmPassword && password.value !== confirmPassword.value) {
      mostrarError(confirmPassword, 'Las contraseñas no coinciden');
      valido = false;
    }
    if (valido) {
      if (mensajeExitoRef.current) {
        mensajeExitoRef.current.classList.remove('oculto');
      }
      form.reset();
      setTimeout(() => {
        if (mensajeExitoRef.current) {
          mensajeExitoRef.current.classList.add('oculto');
        }
      }, 3000);
    }
  };

  return (
    <>
      <div className="box-body">
        <header className="header">
          <div className="container">
            <nav className="header-nav">
              <div>
                <a className="link-webstudio" href="">ANGABE </a>
                <p className="salto">Lcc Traducciones</p>
              </div>
              <button className="menu-toggle" id="menu-toggle">&#9776;</button>
              <ul className="header-menu" id="header-menu">
                <li className="open_submenu"><a className="link-header" href="/">Inicio</a></li>
                <li><a className="link-header barra" href="/formulario">Clases</a></li>
              </ul>
            </nav>
            <ul className="logo">
              <li className="logo__img">
                <img src={logoLcc} alt="Logo LCC" />
              </li>
            </ul>
          </div>
        </header>
        {/* Modal y resto del contenido aquí... */}
        <div className="form-container">
          <div className="line"></div>
          <p className="welcome">Bienvenido LCC traducciones. Regístrate y sé parte de nuestra familia ANGABE online.</p>
          <form id="registroForm" onSubmit={validarRegistro}>
            <input type="text" required placeholder="Nombre" />
            <input type="email" required placeholder="Email" />
            <input type="password" required placeholder="Contraseña" />
            <input type="password" required placeholder="Confirmar contraseña" />
            <button type="submit">Registrarse</button>
            <div ref={mensajeExitoRef} className="oculto" id="mensajeExito">¡Registro exitoso!</div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Formulario;
