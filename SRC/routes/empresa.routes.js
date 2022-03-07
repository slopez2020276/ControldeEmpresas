const express = require('express');
const empresaControlador = require('../controllers/empresas.controller');
//middlewares

const md_autenticacion = require('../middlewares/autenticacion');
const md_roles = require('../middlewares/roles');


const api = express.Router();

api.post('/registrarEmpresa',[md_autenticacion.Auth, md_roles.verAdmin], empresaControlador.RegistrarEmpresa);
api.post ('/login', empresaControlador.Login);
api.put('/editarEmpresa/:IdEmpresa',[md_autenticacion.Auth, md_roles.verAdmin],empresaControlador.EditarEmpresa);
api.delete('/eliminarEmpresa/:IdEmpresa',[md_autenticacion.Auth, md_roles.verAdmin], empresaControlador.eliminarEmpresa);
module.exports = api;