const Empleado = require('../models/empleados.modules');

const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');
const Empresas = require('../models/empresas.models');


function agregarEmpleados (req, res){
     var parametos = req.body;
     var empresaLogueada = req.user.sub;

     var modelEmpleados = new Empleado;


     if (parametos.nombre&&parametos.puesto&&parametos.departamento){

        modelEmpleados.nombre = parametos.nombre;
        modelEmpleados.puesto = parametos.puesto;
        modelEmpleados.departamento = parametos.departamento;
        modelEmpleados.idEmpresa = empresaLogueada;

        modelEmpleados.save((err, empleadaGuardado)=>{
            if(err) return res.status(400).send({mesaje:'error en la peticion'});
            if(!empleadaGuardado) return res.status(400).send({mesaje:'error al guardar el empleado'});
            return res.status(200).send({empleado: empleadaGuardado})


        })

     }else{

            return res.status(400).send({mesaje:'Debe ingresar parametros obligatorios'})
     }


}




function editarEmpleado(req, res) {
    var idEmple = req.params.idEmpleado;
    var parametros = req.body;
    
    var empresaEnToken= req.user.sub;
        

    Empleado.findOne({empresaid:idEmple},(err,empleadoEncontrado)=>{
        if(err) return res.status(500).send({ mensaje:'error en la peticion'});
      
        if(empleadoEncontrado.idEmpresa!== empresaEnToken) {
            
            return  res.status(500).send({mensaje:'usted no tiene permisos'});
            
        }else{

            Empleado.findByIdAndUpdate(idEmple, parametros, {new : true},
                (err, empleadoActualizado)=>{
                    if(err) return res.status(500)
                        .send({ mensaje: 'Error en la peticion' });
                    if(!empleadoActualizado) return res.status(500)
                        .send({ mensaje: 'Error al editar el Usuario'});
                    
                        return res.status(200).send({empleado : empleadoActualizado})
                })
                
        }
       
        

    }) 
   



   
}


function eliminarEmpleado(req,res){

    var empleadoId = req.params.idEmpleado;
    var empresaEnToken = req.user.sub;

    Empleado.findOne({idempre : empleadoId},(err,empleadoEncontrado)=>{
        if(err) return res.status(500).send({ mensaje:'error en la peticion'});
        if(empleadoEncontrado.idEmpresa!==empresaEnToken){
            return res.status(500).send({mensaje:'no tiene permisos '});


        }else{
            Empleado.findByIdAndDelete(empleadoId,(err,empleadoEliminado)=>{
                if(err) return res.status(500).send({mensaje:'error en la peticion'});
                if(!empleadoEliminado)return res.status(500).send({ mensaje:'error al elimiar el empleado'});
                 return res.status(200).send({empleado: empleadoEliminado});


            })


        }

    })



}


function buscarxID(req,res){
     var idEmple = req.params.idEmpleado;
     
     Empleado.findOne({empleado:{$elemMatch:{_id: idEmple}} },(err,empleadoEncontrado)=>{
        if(err) return res.status('error en la peticion');
        if(!empleadoEncontrado) return res.status('erro al obtener el empleado');
        return res.status(200).send({empleado:empleadoEncontrado})

     })


}

function buscarxNombre(req,res){

    var empleadoId = req.params.idEmpleado;
    var parametros = req.body;

    Empleado.aggregate([
        {
            $match: { "_id": mongoose.Types.ObjectId(empleadoId) }
        },
        {
            $unwind: "$proveedor"
        },
         
        {
            $group: {
                "_id": "$_id",
                "nombre": { "$first": "$nombre" },
                "proveedor": { $push: "$proveedor" }
            }
        }
    ]).exec((err, proveedoresEncontrados) => {
        return res.status(200).send({ producto: proveedoresEncontrados })
    })
}


function BusquedaXNombre(req, res) {
    var nom = req.body.nombre;
    
    Empleado.findOne({nombre: nom}, (err, empleadosEncontrados) => {
        if(err) {return res.status(500).send({mensaje: 'error en la peticion'})};
        if(!empleadosEncontrados) return res.status(500).send({ mensaje: 'empleados no encontrados'})

        return res.status(200).send({ empleado: empleadosEncontrados })
    })
}

function buscarxDepartamento(req, res){
var departamentoE = req.body.departamento;

Empleado.findOne({departamento: departamentoE},(err,departamentoEncontrados)=>{
    if(err) return res.status(500).send({mesaje:'error en la peticin'});
    if(!departamentoEncontrados) return res.status(500).send({ mensaje:'error al obtener los productos'})
    return res.status(200).send({empleado: departamentoEncontrados})
})

}



module.exports={
    agregarEmpleados,
    editarEmpleado,
    buscarxID,
    BusquedaXNombre,
    buscarxDepartamento,
    eliminarEmpleado,
    

}