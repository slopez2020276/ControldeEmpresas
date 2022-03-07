const express = require('express');
const cors = require('cors');
var app = express();

// IMPORTACIONES RUTAS

const empresa = require('./SRC/routes/empresa.routes');
const empleado = require('./SRC/routes/empleados.routes');

// MIDDLEWARES -> INTERMEDIARIOS
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// CABECERAS
app.use(cors());

// CARGA DE RUTAS localhost:3000/api/obtenerProductos
app.use('/api', empresa, empleado);


module.exports = app;