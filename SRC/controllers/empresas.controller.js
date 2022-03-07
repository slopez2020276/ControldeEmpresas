const Empresa = require('../models/empresas.models');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');
const e = require('express');


function RegistrarEmpresa(req, res) {
    var parametros = req.body;
    var empresaModel = new Empresa();

    if(parametros.nombre && parametros.email && parametros.password) {
            empresaModel.nombre = parametros.nombre;
            empresaModel.email = parametros.email;
            empresaModel.rol = 'ROL_EMPRESA';
        

            Empresa.find({ email : parametros.email }, (err, empresaEncontrado) => {
                if ( empresaEncontrado.length == 0 ) {

                    bcrypt.hash(parametros.password, null, null, (err, passwordEncriptada) => {
                        empresaModel.password = passwordEncriptada;

                        empresaModel.save((err, empresaGuardada) => {
                            if (err) return res.status(500)
                                .send({ mensaje: 'Error en la peticion' });
                            if(!empresaGuardada) return res.status(500)
                                .send({ mensaje: 'Error al agregar el Usuario'});
                            
                            return res.status(200).send({ empresa: empresaGuardada });
                        });
                    });                    
                } else {
                    return res.status(500)
                        .send({ mensaje: 'Este correo, ya  se encuentra utilizado' });
                }
            })
    }
}


function RegistrarAdminDe(){
    var empresaModel = new Empresa;
    empresaModel.nombre = 'Admin';
    empresaModel.email = 'Admin';
    empresaModel.rol = 'ADMIN';
    empresaModel.password = '123456';
    Empresa.find({email:'Admin'},(err,empresaEncontrada)=>{
        if (empresaEncontrada.length == 0) {
            bcrypt.hash('123456', null, null, (err, passwordEncriptada) => {
                empresaModel.password = passwordEncriptada;
                empresaModel.save((err, empresaGuardada) => {
                    if (err) return console.log('No se realiza la peticion')
                    if (!empresaGuardada) return console.log ('error al registrar')
                    return console.log('Admin default' + ' ' + empresaGuardada);
                });
            });
        } else {
            return console.log('Ya está registrado');
        }
    })
}
    
    

function Login (req, res){
    var parametros = req.body;
    Empresa.findOne({email: parametros.email},(err , empresaEncontrada)=>{
        if(err) return res.status(500).send({mensaje:'Erro en la peticion'});
        if(empresaEncontrada){
            bcrypt.compare(parametros.password, empresaEncontrada.password,(err, verificacionPassword)=>{//TRUE OR FALSE
                // VERIFICO SI EL PASSWORD COINCIDE EN BASE DE DATOS
                if ( verificacionPassword ) {
                    // SI EL PARAMETRO OBTENERTOKEN ES TRUE, CREA EL TOKEN
                    if(parametros.obtenerToken === 'true'){
                        return res.status(200)
                            .send({ token: jwt.crearToken(empresaEncontrada) })
                    } else {
                        empresaEncontrada.password = undefined;
                        return  res.status(200)
                            .send({ empresa: empresaEncontrada })
                    }

                    
                } else {
                    return res.status(500)
                        .send({ mensaje: 'Las contrasena no coincide'});
                }
            })

    } else {
        return res.status(500)
            .send({ mensaje: 'Error, el correo no se encuentra registrado.'})
    }
})
}

  
function EditarEmpresa(req,res){
    var idEmpre= req.params.IdEmpresa;
    var parametros= req.body;


    
  
        
            
            Empresa.findByIdAndUpdate(idEmpre, parametros,{new:true},
                (err, empresaActualizada)=>{
                    if(err) return res.status(500).send({mensaje:'Error en la peticon'});
                    if(!empresaActualizada) return res.status(500).send({mensaje:'error al actializar la empresa'});
        
                    return res.status(200).send({ empresa: empresaActualizada});
                })
        }

   

    

    



function eliminarEmpresa(req, res){
    var idEmpre = req.params.IdEmpresa;
 

    Empresa.findByIdAndDelete(idEmpre, (err,empresaElimina)=>{
        if(err) return res.status(500).send({mensaje:'error en la peticion'});
        if(!empresaElimina) return res.status(500).send({mensaje:'error al eliminar la empresa'});
        return res.status(200).send({ empresa: empresaElimina});

    })


}


module.exports = {

    RegistrarEmpresa,
    Login,
    RegistrarAdminDe,
    EditarEmpresa,
    eliminarEmpresa,
}