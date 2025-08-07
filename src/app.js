require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Permitir CORS solo para localhost:3000 y localhost:3001 (puedes agregar más si lo necesitas)
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://copilot-rust.vercel.app/',
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Permitir solicitudes sin origen (como Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) {
        return callback(null, true);
      } else {
        return callback(new Error('No permitido por CORS'));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => res.send('API Running'));

module.exports = app;
