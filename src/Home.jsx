
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import TeamSection from "./components/TeamSection";
import logoLcc from "./assets/imagenes svg/logos/logo lcc.png";
import clasesaleman from "./assets/imagenes/clasesaleman.jpg";
import traduccionImg from "./assets/imagenes/traducc.png";
import intercambioImg from "./assets/imagenes/intercambio.jpg";
import "./css/styles.css";
import "./css/modal.css";
import "./css/cotizacion.css";
import "./css/card-info.css";
import "./css/header.css";
import "./css/banner.css";
import "./css/team.css";


const Home = () => {
  useEffect(() => {
    // Menú hamburguesa
    const toggleBtn = document.getElementById("menu-toggle");
    const headerMenu = document.getElementById("header-menu");
    if (toggleBtn && headerMenu) {
      toggleBtn.addEventListener("click", () => {
        headerMenu.classList.toggle("show");
      });
    }

    // Modal inicio sesión
    const openBtn = document.querySelector('.open-modal-btn');
    const modalOverlay = document.getElementById('modalOverlay');
    const closeBtn = document.getElementById('closeBtn');
    if (openBtn && modalOverlay && closeBtn) {
      openBtn.addEventListener('click', () => {
        modalOverlay.style.display = 'flex';
      });
      closeBtn.addEventListener('click', () => {
        modalOverlay.style.display = 'none';
      });
      window.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
          modalOverlay.style.display = 'none';
        }
      });
    }
    // Limpieza de listeners
    return () => {
      if (toggleBtn && headerMenu) {
        toggleBtn.removeEventListener("click", () => {
          headerMenu.classList.toggle("show");
        });
      }
      if (openBtn && modalOverlay && closeBtn) {
        openBtn.removeEventListener('click', () => {});
        closeBtn.removeEventListener('click', () => {});
        window.removeEventListener('click', () => {});
      }
    };
  }, []);

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
                <li className="open_submenu"><Link className="link-header barra" to="/">Inicio</Link></li>
                <li><Link className="link-header" to="/clases">Clases</Link></li>
                <li><Link className="link-header" to="/traducciones">Traducciones</Link></li>
                <li><Link className="link-header" to="/intercambio">Intercambio</Link></li>
                <li><Link className="link-header" to="/cotizacion">Cotización</Link></li>
                <li><button className="open-modal-btn">Iniciar Sesión</button></li>
              </ul>
            </nav>
            <ul className="logo">
              <li className="logo__img">
                <img src={logoLcc} alt="Logo LCC" />
              </li>
            </ul>
          </div>
        </header>
        <main>
          <section className="banner">
            <h1 className="title-pal">SOLUCIONES EFICACES</h1>
                <div className="open-modal-btns">
              <Link to="/cotizacion"><button type="button">COTIZA AHORA</button></Link>
            </div>
            <div className="banner-overlay"></div>
            <div className="modal-overlay" id="modalOverlay" style={{display: 'none'}}>
              <div className="modal">
                <h1 className="modal-title">ANGABE</h1>
                <button className="close-btn" id="closeBtn">&times;</button>
                <form id="loginForm" onSubmit={async (e) => {
                  e.preventDefault();
                  const nombre_usuario = document.getElementById('nombre_usuario').value;
                  const contrasena_usuario = document.getElementById('contrasena_usuario').value;
                  try {
                    const res = await fetch('http://localhost:3001/login', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ nombre_usuario, contrasena_usuario })
                    });
                    const data = await res.json();
                    alert(data.message);
                    if (res.ok && (data.usuario || data.message.includes('exitoso') || data.message.includes('encontrado'))) {
                      document.getElementById('modalOverlay').style.display = 'none';
                    }
                  } catch (err) {
                    alert('Error de conexión con el servidor');
                  }
                }}>
                  <label htmlFor="nombre_usuario">Usuario</label>
                  <input type="text" id="nombre_usuario" name="nombre_usuario" required />
                  <label htmlFor="contrasena_usuario">Contraseña</label>
                  <input type="password" id="contrasena_usuario" name="contrasena_usuario" required />
                  <div className="checkbox">
                    <input type="checkbox" id="olvido" />
                    <label htmlFor="olvido" style={{margin: 0}}>Olvide mi contraseña</label>
                  </div>
                  <button className="login-btn" type="submit">INICIAR SESION</button>
                </form>
                <div className="div-register"><Link className="register" to="/formulario">Registrarse</Link></div>
              </div>
            </div>
          </section>
          {/* Sección tarjetas información */}
          <section className="main-portafolio">
            <h2 className="title-galery">A qué nos dedicamos</h2>
            <section className="list-card">
              <div className="list-boxcard">
                <section className="list-product">
                  <Link to="/clases">
                    <div className="card-animation">
                      <img src={clasesaleman} alt="" />
                      <div className="card-emergent">
                        <p>Contamos con cursos en el idioma Alemán, para que aprendas o te refuerces en este idioma.</p>
                      </div>
                    </div>
                    <div className="card-body">
                      <h3 className="title-img-portafolio">Cursos de Idioma</h3>
                    </div>
                  </Link>
                </section>
                <section className="list-product">
                  <Link to="/traducciones">
                    <div className="card-animation">
                      <img src={traduccionImg} alt="" />
                      <div className="card-emergent">
                        <p>Lcc traducciones tiene asocio con traductores de alemán, inglés, italiano, francés y portugués.</p>
                      </div>
                    </div>
                    <div className="card-body">
                      <h3 className="title-img-portafolio">Traducciones</h3>
                    </div>
                  </Link>
                </section>
                <section className="list-product">
                  <Link to="/intercambio">
                    <div className="card-animation">
                      <img src={intercambioImg} alt="" />
                      <div className="card-emergent">
                        <p>Tenemos asesoría para intercambios universitarios y asesoría de Aupair. En Alemania, Austria, Suiza, Luxemburgo y Liechtenstein.</p>
                      </div>
                    </div>
                    <div className="card-body">
                      <h3 className="title-img-portafolio">Intercambio Cultural</h3>
                    </div>
                  </Link>
                </section>
              </div>
            </section>
          </section>
          {/* Sección equipo */}
          <TeamSection />
          {/* Footer */}
          <footer className="footer">
            <div>
              <a className="link-webstudio-footer" href=""> ANGABE</a>
              <address>
                <ul className="pie-pag-email-tel">
                  <li><a className="piepag-direcion" href="">Bogota, Colombia</a></li>
                  <li><a className="header-email" href="">info@Angabe.com</a></li>
                  <li><a className="header-tel" href="">+52 55 5529 6000 </a></li>
                </ul>
              </address>
            </div>
            <section className="redes-sociales">
              <h2>ENCUENTRENOS EN</h2>
              <ul>
                <li><svg className="icon"><use href="#facebook"></use></svg></li>
                <li><svg className="icon"><use href="#twiter"></use></svg></li>
                <li><svg className="icon"><use href="#instagram"></use></svg></li>
                <li><svg className="icon"><use href="#linkend"></use></svg></li>
              </ul>
            </section>
            <section className="section__suscription">
              <h2>SUSCRÍBASE AL BOLETIN INFORMATIVO</h2>
              <form className="suscription" action="">
                <label className="suscription__label" htmlFor="">
                  <input className="suscription__input" type="email" name="email" placeholder="correo electronico" />
                  <button className="suscription__button" type="submit"><span>Suscríbase</span></button>
                </label>
              </form>
            </section>
          </footer>
        </main>
      </div>
    </>
  );
};

export default Home;
