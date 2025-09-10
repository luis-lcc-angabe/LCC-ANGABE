// Simple API Node.js + Express + MySQL
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// Configuración de conexión MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Cambia por tu usuario si es diferente
  password: '1234567890', // Cambia por tu contraseña si es diferente
  database: 'base-lcc' // Nombre de la base de datos MySQL
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
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

app.post('/usuarios', (req, res) => {
  const {
    nombre_usuario,
    email_usuario,
    contraseña_usuario,
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
    'INSERT INTO registro_usuario (nombre_usuario, email_usuario, contraseña_usuario, apellido, documento, confirmar_contrasena, tipo_documento, dia_nacimiento, mes_nacimiento, ano_nacimiento, sexo, ofertas, acepta_politicas) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [nombre_usuario, email_usuario, contraseña_usuario, apellido, documento, confirmar_contrasena, tipo_documento, dia_nacimiento, mes_nacimiento, ano_nacimiento, sexo, ofertas, acepta_politicas],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.status(201).json({
        id_usuario: result.insertId,
        nombre_usuario,
        email_usuario,
        contraseña_usuario,
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
      });
    }
  );
});
app.put('/usuarios/:id', (req, res) => {
  const { nombre_usuario, email_usuario, contrasena_usuario } = req.body;
  db.query(
    'UPDATE registro_usuario SET nombre_usuario=?, email_usuario=?, contrasena_usuario=? WHERE id_usuario=?',
    [nombre_usuario, email_usuario, contrasena_usuario, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ id_usuario: req.params.id, nombre_usuario, email_usuario });
    }
  );
});

app.delete('/usuarios/:id', (req, res) => {
  db.query('DELETE FROM registro_usuario WHERE id_usuario=?', [req.params.id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'Usuario eliminado correctamente' });
  });
});

// CRUD para tabla "usuarios"

app.listen(3001, () => {
  console.log('Servidor corriendo en http://localhost:3001');
});
