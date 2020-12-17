const express = require('express')
const usuario = require('../models/empleado')
const app = express()
const _ = require('underscore')
const empleado = require('../models/empleado')


app.get('/empleado', function(req,res){
    let desde = req.query.desde  ||0
    let hasta = req.query.hasta  ||5

    empleado.find({ activo: true })
    .skip(Number(desde))
    .limit(Number(hasta))
    .populate('usuario','nombre')
    .populate('departamento','nombre')
    .exec((err, empleado)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                msg: 'Hubo un error en la consulta.',
                err
            })
        }

        res.json({
            ok: true,
            msg: 'Lista de empleados:',
            conteo: empleado.length,
            empleado 
        })
    })
})

app.post('/empleado', function(req, res){
    let body = req.body;
    let usr = new empleado({
        id_usuario: body.id_usuario,
        id_departamento: body.id_departamento,
        nombre_del_puesto : body.nombre_del_puesto,
        anios_servicio: body.anios_servicio,
        hora_entrada: body.hora_entrada,
        hora_salida: body.hora_salida

          
    });

    usr.save((err, usrDB)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                msg: 'Un error ocurrió. Revise sus datos.',
                err 
            });
        }

        res.json({
            ok: true,
            msg: 'Empleado insertado.', 
            usrDB
        });
    });
});

app.put('/empleado/:id', function(req, res){
    let id = req.params.id
    let body = _.pick(req.body, ['id_usuario','id_departamento','nombre_del_puesto','anios_servicio','hora_entrada','hora_salida'])

    empleado.findByIdAndUpdate(id,body,
         {new: true, runValidators: true, context: 'query'},
         (err, usrDB)=>{
            if(err){
                return res.status(400).json({
                    ok:false,
                    msg: 'Hubo un error en la consulta.',
                    err
                })
            }

            res.json({
                ok: true,
                msg: 'Empleado actualizado.',
                usuario: usrDB
            })
    })
})

app.delete('/empleado/:id', function(req, res){
    
    let id = req.params.id

    empleado.findByIdAndUpdate(id,{activo: false},
        { new: true , runValidators: true, context: 'query'}, (err ,usrDB) =>{
            if(err){
                return res.status(400).json({
                ok: false,
                msg: 'Algo hiciste mal, verifica tus datos',
                err
                })
            }
            res.json({
                ok: true,
                msg: 'Empleado eliminado.',
                usrDB
                })
        })
 });



    module.exports = app