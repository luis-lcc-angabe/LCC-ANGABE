

import React, { useRef } from "react";
import logoLcc from "./assets/imagenes svg/logos/logo lcc.png";
import "./css/formulario.css";
import "./css/styles.css";
import "./css/modal.css";
import "./css/header.css";
import "./css/cotizacion.css";

const Formulario = () => {
  const mensajeExitoRef = useRef(null);
  const mensajeErrorRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    // Recoger los datos del formulario por name
    const data = {
      email_usuario: form.elements['email_usuario'].value,
      contrasena_usuario: form.elements['contrasena_usuario'].value,
      confirmar_contrasena: form.elements['confirmar_contrasena'].value,
      nombre_usuario: form.elements['nombre_usuario'].value,
      apellido: form.elements['apellido'].value,
      documento: parseInt(form.elements['documento'].value, 10),
      tipo_documento: form.elements['tipo_documento'].value,
      dia_nacimiento: parseInt(form.elements['dia_nacimiento'].value, 10),
      mes_nacimiento: parseInt(form.elements['mes_nacimiento'].value, 10),
      ano_nacimiento: parseInt(form.elements['ano_nacimiento'].value, 10),
      sexo: form.elements['sexo'].value === 'masculino' ? 'M' : (form.elements['sexo'].value === 'femenino' ? 'F' : (form.elements['sexo'].value === 'otro' ? 'O' : '')),
      ofertas: form.elements['ofertas'] ? (form.elements['ofertas'].checked ? 1 : 0) : 0,
      acepta_politicas: form.elements['acepta_politicas'] ? (form.elements['acepta_politicas'].checked ? 1 : 0) : 0
    };
    // Enviar datos a la API backend
    try {
  const res = await fetch('http://localhost:3001/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        if (mensajeExitoRef.current) {
          mensajeExitoRef.current.classList.remove('oculto');
        }
        if (mensajeErrorRef.current) {
          mensajeErrorRef.current.classList.add('oculto');
        }
        limpiarCampos(form);
        setTimeout(() => {
          if (mensajeExitoRef.current) {
            mensajeExitoRef.current.classList.add('oculto');
          }
        }, 3000);
      } else {
        if (mensajeErrorRef.current) {
          mensajeErrorRef.current.textContent = 'Error al registrar. Verifica los datos o la conexión.';
          mensajeErrorRef.current.classList.remove('oculto');
        }
      }
    } catch (err) {
      if (mensajeErrorRef.current) {
        mensajeErrorRef.current.textContent = 'Error al registrar. Verifica la conexión con el servidor.';
        mensajeErrorRef.current.classList.remove('oculto');
      }
    }
  };

  // Función para limpiar los campos del formulario
  const limpiarCampos = (form) => {
    Array.from(form.elements).forEach(el => {
      if (el.tagName === 'INPUT' || el.tagName === 'SELECT') {
        if (el.type === 'checkbox' || el.type === 'radio') {
          el.checked = false;
        } else {
          el.value = '';
        }
      }
    });
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
                <li><a className="link-header barra" href="/formulario">Registro</a></li>
              </ul>
            </nav>
            <ul className="logo">
              <li className="logo__img">
                <img src={logoLcc} alt="Logo LCC" />
              </li>
            </ul>
          </div>
        </header>
        {/* Modal de inicio de sesión */}
        <div className="modal-overlay" id="modalOverlay" style={{display: 'none'}}>
          <div className="modal">
            <h1 className="modal-title">ANGABE</h1>
            <button className="close-btn" id="closeBtn">&times;</button>
            <label htmlFor="usuario">Usuario</label>
            <input type="text" id="usuario" />
            <label htmlFor="contrasena">Contraseña</label>
            <input type="password" id="contrasena" />
            <div className="checkbox">
              <input type="checkbox" id="olvido" />
              <label htmlFor="olvido" style={{margin: 0}}>Olvide mi contraseña</label>
            </div>
            <button className="login-btn">INICIAR SESION</button>
            <div className="div-register"><a className="register" href="/formulario">Registrarse</a></div>
          </div>
        </div>
        <div className="form-container">
          <div className="line"></div>
          <p className="welcome">Bienvenido LCC traducciones. Regístrate y sé parte de nuestra familia ANGABE online.</p>
          <form className="register-form" onSubmit={handleSubmit}>
            <label>E-mail *</label>
            <input type="email" name="email_usuario" required />
            <label>Contraseña *</label>
            <input type="password" name="contrasena_usuario" required />
            <label>Confirmar contraseña *</label>
            <input type="password" name="confirmar_contrasena" required />
            <label>Nombre *</label>
            <input type="text" name="nombre_usuario" required />
            <label>Apellidos *</label>
            <input type="text" name="apellido" required />
            <label>Documento *</label>
            <div className="documento">
            <input type="text" name="documento" required />
            <select name="tipo_documento">
              <option value="cc">CC</option>
              <option value="ti">TI</option>
              <option value="ce">CE</option>
            </select>
            </div>
              <label>Fecha nacimiento *</label>
            <div className="fecha">
            <input type="text" name="dia_nacimiento" placeholder="DIA" required />
            <input type="text" name="mes_nacimiento" placeholder="MES" required />
              <select name="ano_nacimiento" required>
                <option value="">SELECCIÓN</option>
                <option value="1999">1999</option>
                <option value="2000">2000</option>
                <option value="2001">2001</option>
                <option value="2002">2002</option>
                <option value="2003">2003</option>
                <option value="2004">2004</option>
                <option value="2005">2005</option>
                <option value="2006">2006</option>
                <option value="2007">2007</option>
                <option value="2008">2008</option>
                <option value="2009">2009</option>
                <option value="2010">2010</option>
              </select>
            </div>
            <label>Sexo *</label>
            <select name="sexo" required>
              <option value="">SELECCIÓN</option>
              <option value="masculino">Masculino</option>
              <option value="femenino">Femenino</option>
              <option value="otro">Otro</option>
            </select>
            <br />
            <div className="checkbox-group">
              <label><input type="checkbox" name="ofertas" /> Deseo recibir ofertas por e-mail</label>
              <br />
              <label><input type="checkbox" name="acepta_politicas" required /> Acepto <a href="#">política y tratamiento de mis datos</a> *</label>
              <br />
              <button type="submit">ENVIAR</button>
            </div>
          </form>
          <div ref={mensajeExitoRef} className="mensaje-exito oculto" id="mensajeExito">¡Registro exitoso!</div>
          <div ref={mensajeErrorRef} className="mensaje-error oculto" id="mensajeError"></div>
        </div>
      </div>
    </>
  );
};

export default Formulario;
