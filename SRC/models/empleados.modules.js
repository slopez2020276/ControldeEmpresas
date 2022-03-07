const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmpleadosShechema = new Schema({

    nombre: String,
    puesto: String,
    departamento: String,
    idEmpresa: { type: Schema.Types.ObjectId, ref: 'Empresas'},
 


});
module.exports = mongoose.model('empleados',EmpleadosShechema);
