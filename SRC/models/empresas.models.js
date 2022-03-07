const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmpresaSchema = Schema({
    nombre: String,
    email: String,
    password: String,
    rol: String,
 
});

module.exports = mongoose.model('Empresas', EmpresaSchema);