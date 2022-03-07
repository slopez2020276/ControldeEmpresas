const mongoose = require('mongoose');
const app = require('./app');
const { RegistrarAdminDe } = require('./SRC/controllers/empresas.controller')
mongoose.Promise = global.Promise;                                                                  //function (){}
mongoose.connect('mongodb://localhost:27017/ControlEmpresa', { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log("conectado a la base de datos.");

    app.listen(3000, function () {
        console.log("corriendo  en el puerto 3000")
    })

}).catch(error => console.log(error));

RegistrarAdminDe();