

// Simple API Node.js + Express + MySQL
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Obtener todos los usuarios de la tabla 'usuario'
app.get('/usuario', (req, res) => {
  db.query('SELECT * FROM usuarios', (err, results) => {
    if (err) {
      res.json([]);
      return;
    }
    res.json(results);
  });
});
// Configuración de conexión MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', 
  password: '1234567890',
  database: 'base-lcc' 
});

db.connect(err => {
  if (err) {
    console.error('Error de conexión:', err);
    return;
  }
  console.log('Conectado a MySQL');
});

// Endpoint de prueba
app.get('/', (req, res) => {
  res.send('API funcionando');
});

// CRUD para tabla "registro_usuario"
app.get('/usuarios', (req, res) => {
  db.query('SELECT * FROM registro_usuario', (err, results) => {
    if (err) {
      res.json([]);
      return;
    }
    res.json(results);
  });
});

app.post('/usuarios', (req, res) => {
  const {
    nombre_usuario,
    email_usuario,
    contrasena_usuario,
    apellido,
    documento,
    confirmar_contrasena,
    tipo_documento,
    dia_nacimiento,
    mes_nacimiento,
    ano_nacimiento,
    sexo,
    ofertas,
    acepta_politicas
  } = req.body;
  db.query(
    'INSERT INTO registro_usuario (nombre_usuario, email_usuario, contrasena_usuario, apellido, documento, confirmar_contrasena, tipo_documento, dia_nacimiento, mes_nacimiento, ano_nacimiento, sexo, ofertas, acepta_politicas) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [nombre_usuario, email_usuario, contrasena_usuario, apellido, documento, confirmar_contrasena, tipo_documento, dia_nacimiento, mes_nacimiento, ano_nacimiento, sexo, ofertas, acepta_politicas],
    (err, result) => {
      if (err) {
        res.json({ error: 'Error al insertar usuario' });
        return;
      }
      res.status(201).json({ id_usuario: result.insertId });
    }
  );
});
app.put('/usuarios/:id', (req, res) => {
  const { nombre_usuario, email_usuario, contrasena_usuario } = req.body;
  db.query(
    'UPDATE registro_usuario SET nombre_usuario=?, email_usuario=?, contrasena_usuario=? WHERE id_usuario=?',
    [nombre_usuario, email_usuario, contrasena_usuario, req.params.id],
    (err) => {
      if (err) {
        res.json({ error: 'Error al actualizar usuario' });
        return;
      }
      res.json({ id_usuario: req.params.id, nombre_usuario, email_usuario });
    }
  );
});

app.delete('/usuarios/:id', (req, res) => {
  db.query('DELETE FROM registro_usuario WHERE id_usuario=?', [req.params.id], (err) => {
    if (err) {
      res.json({ error: 'Error al eliminar usuario' });
      return;
    }
    res.json({ message: 'Usuario eliminado correctamente' });
  });
});

// CRUD para tabla "usuarios"
// CRUD para tabla "usuarios"
// Obtener todos los usuarios
app.get('/usuarios-simple', (req, res) => {
  db.query('SELECT * FROM usuarios', (err, results) => {
    if (err) {
      res.json([]);
      return;
    }
    res.json(results);
  });
});

// Crear usuario
app.post('/usuarios-simple', (req, res) => {
  const { nombre_usuario, contrasena_usuario } = req.body;
  // Normalizar entradas: quitar espacios y pasar a minúsculas
  const nombre_normalizado = (nombre_usuario || '').trim().toLowerCase();
  const contrasena_normalizada = (contrasena_usuario || '').trim();
  // Buscar todos los usuarios registrados
  db.query('SELECT nombre_usuario, contrasena_usuario FROM registro_usuario', (err, results) => {
    if (err) {
      res.json({ error: 'Error al buscar usuario' });
      return;
    }
    // Buscar coincidencia exacta (ignorando mayúsculas/minúsculas y espacios)
    const existe = results.some(row =>
      (row.nombre_usuario || '').trim().toLowerCase() === nombre_normalizado &&
      (row.contrasena_usuario || '').trim() === contrasena_normalizada
    );
    if (!existe) {
      return res.json({ message: 'Usuario o contraseña incorrectos. No se guardó.' });
    }
    // Si existe, guardar en usuarios
    db.query(
      'INSERT INTO usuarios (nombre_usuario, contrasena_usuario) VALUES (?, ?)',
      [nombre_usuario, contrasena_usuario],
      (err2, result2) => {
        if (err2) {
          res.json({ error: 'Error al guardar usuario' });
          return;
        }
        res.status(201).json({ id_usuario: result2.insertId, nombre_usuario });
      }
    );
  });
});

// Modificar usuario
app.put('/usuarios-simple/:id', (req, res) => {
  const { nombre_usuario, contrasena_usuario } = req.body;
  db.query(
    'UPDATE usuarios SET nombre_usuario=?, contrasena_usuario=? WHERE id_usuario=?',
    [nombre_usuario, contrasena_usuario, req.params.id],
    (err) => {
      if (err) {
        res.json({ error: 'Error al actualizar usuario' });
        return;
      }
      res.json({ id_usuario: req.params.id, nombre_usuario });
    }
  );
});

// Eliminar usuario
app.delete('/usuarios-simple/:id', (req, res) => {
  db.query('DELETE FROM usuarios WHERE id_usuario=?', [req.params.id], (err) => {
    if (err) {
      res.json({ error: 'Error al eliminar usuario' });
      return;
    }
    res.json({ message: 'Usuario eliminado correctamente' });
  });
});

// GET /login: devuelve todos los usuarios que coincidan en ambas tablas
app.get('/login', (req, res) => {
  const { nombre_usuario, contrasena_usuario } = req.query;
  const resultsAll = [];
  let where = [];
  let params = [];
  if (nombre_usuario) {
    where.push('nombre_usuario=?');
    params.push(nombre_usuario);
  }
  if (contrasena_usuario) {
    where.push('contrasena_usuario=?');
    params.push(contrasena_usuario);
  }
  const whereClause = where.length > 0 ? 'WHERE ' + where.join(' AND ') : '';
  db.query(`SELECT * FROM registro_usuario ${whereClause}`, params, (err, results1) => {
    if (err) {
      res.json({ error: 'Error al buscar en registro_usuario' });
      return;
    }
    if (results1.length > 0) resultsAll.push(...results1);
    db.query(`SELECT * FROM usuarios ${whereClause}`, params, (err2, results2) => {
      if (err2) {
        res.json({ error: 'Error al buscar en usuarios' });
        return;
      }
      if (results2.length > 0) resultsAll.push(...results2);
      if (resultsAll.length > 0) {
        res.json({ message: 'Usuarios encontrados', usuarios: resultsAll });
      } else {
        res.json({ message: 'No se encontraron usuarios con esos datos', usuarios: [] });
      }
    });
  });
});


// Login de usuario (POST): busca los datos en registro_usuario y usuarios
app.post('/login', (req, res) => {
  const { nombre_usuario, contrasena_usuario } = req.body;
  db.query('SELECT * FROM registro_usuario WHERE nombre_usuario=? AND contrasena_usuario=?', [nombre_usuario, contrasena_usuario], (err, results) => {
    if (err) {
      res.json({ error: 'Error al buscar usuario' });
      return;
    }
    if (results.length > 0) {
      return res.json({ message: 'Usuario encontrado en registro_usuario', usuario: results[0] });
    } else {
      // Si no está en registro_usuario, buscar en usuarios
      db.query('SELECT * FROM usuarios WHERE nombre_usuario=? AND contrasena_usuario=?', [nombre_usuario, contrasena_usuario], (err2, results2) => {
        if (err2) {
          res.json({ error: 'Error al buscar usuario en usuarios' });
          return;
        }
        if (results2.length > 0) {
          return res.json({ message: 'Usuario encontrado en usuarios', usuario: results2[0] });
        } else {
          return res.json({ message: 'Usuario no encontrado. Por favor regístrese antes de iniciar sesión.', registrar: true });
        }
      });
    }
  });
});

app.listen(3001, () => {
  console.log('Servidor corriendo en http://localhost:3001');
});
