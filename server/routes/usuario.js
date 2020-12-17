const express = require('express')
const usuario = require('../models/usuario')
const app = express()
const _ = require('underscore')


app.get('/usuario', function(req,res){
    let desde = req.query.desde  ||0
    let hasta = req.query.hasta  ||5

    usuario.find({ activo: true })
    .skip(Number(desde))
    .limit(Number(hasta))
    .exec((err, usuarios)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                msg: 'Hubo un error en la consulta.',
                err
            })
        }

        res.json({
            ok: true,
            msg: 'Lista de usuarios:',
            conteo: usuarios.length,
            usuarios 
        })
    })
})

app.post('/usuario', function(req, res){
    let body = req.body;
    let usr = new usuario({
        nombre: body.nombre,
        primer_apellido: body.primer_apellido,
        segundo_apellido: body.segundo_apellido,
        edad: body.edad,
        curp: body.curp,
        telefono: body.telefono,
        mail: body.mail     
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
            msg: 'Usuario Insertado con exito', 
            usrDB
        });
    });
});

app.put('/usuario/:id', function(req, res){
    let id = req.params.id
    let body = _.pick(req.body, ['nombre','primer_apellido','segundo_apellido','edad','curp','telefono','mail'])

    usuario.findByIdAndUpdate(id,body,
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
                msg: 'Usuario actualizado.',
                usuario: usrDB
            })
    })
})

app.delete('/usuario/:id', function(req, res){
    

    let id = req.params.id

usuario.findByIdAndUpdate(id,{activo: false},
    { new: true , runValidators: true, context: 'query'}, (err ,usrDB) =>{
        if(err){
            return res.status(400).json({
            ok: false,
            msg: 'Un error ocurrió. Revise sus datos.',
            err
            })
        }
        res.json({
            ok: true,
            msg: 'Usuario eliminado.',
            usrDB
            })
    })
})




    module.exports = app