
const express = require('express');

const controladorEmpleados = require('../controllers/empleado.controller');

//middlewares

const md_autenticacion = require('../middlewares/autenticacion');
const md_roles = require('../middlewares/roles');

const api = express.Router();

api.post('/agregarEmpleado',[md_autenticacion.Auth,md_roles.verEmpresa],controladorEmpleados.agregarEmpleados);
api.put('/editarEmpleado/:idEmpleado',[md_autenticacion.Auth,md_roles.verEmpresa],controladorEmpleados.editarEmpleado);
api.delete('/eliminarEmpleado/:idEmpleado',[md_autenticacion.Auth,md_roles.verEmpresa],controladorEmpleados.eliminarEmpleado);
api.get('/obtenerxId/:idEmpleado',[md_autenticacion.Auth,md_roles.verEmpresa],controladorEmpleados.buscarxID);
api.get('/obtenerxNombre/',[md_autenticacion.Auth,md_roles.verEmpresa],controladorEmpleados.BusquedaXNombre);
api.get('/obtenerxDepartamento',[md_autenticacion.Auth,md_roles.verEmpresa],controladorEmpleados.buscarxDepartamento);
module.exports= api;

