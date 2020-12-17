const express = require('express')
const departamento = require('../models/departamento')
const app = express()
const _ = require('underscore')


app.get('/departamento', function(req,res){
    let desde = req.query.desde  ||0
    let hasta = req.query.hasta  ||5

    departamento.find({ activo: true })
    .skip(Number(desde))
    .limit(Number(hasta))
    .populate('usuario', 'nombre')
    .exec((err, departamento)=>{
        if(err){
            return res.status(400).json({
                ok:false,
                msg: 'Hubo un error en la consulta.',
                err
            })
        }

        res.json({
            ok: true,
            msg: 'Lista de departamentos:',
            conteo: departamento.length,
            departamento 
        })
    })
})

app.post('/departamento', function(req, res){
    let body = req.body;
    let usr = new departamento({
        id_jefe_de_area: body.id_jefe_de_area,
        nombre: body.nombre,
        numero_empleados: body.numero_empleados,
        extension_telefonica: body.extension_telefonica
            
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
            msg: 'Departamento insertado.', 
            usrDB
        });
    });
});

app.put('/departamento/:id', function(req, res){
    let id = req.params.id
    let body = _.pick(req.body, ['nombre','numero_empleados','extension_telefonica'])

    departamento.findByIdAndUpdate(id,body,
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
                msg: 'Departamento actualizado.',
                usuario: usrDB
            })
    })
})

app.delete('/departamento/:id', function(req, res){
    

    let id = req.params.id

departamento.findByIdAndUpdate(id,{activo: false},
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
            msg: 'Departamento eliminado.',
            usrDB
            })
    })
})




    module.exports = app