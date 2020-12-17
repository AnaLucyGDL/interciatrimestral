require('./config/config');

const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const app = express()

app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())
app.get('/',function(req,rest){
    rest.send('<h1> Proyecto intercuatrimestral </h1>')
});

app.use(require('./rutes/usuario'))
app.use(require('./rutes/departamento'))
app.use(require('./rutes/empleado'))

mongoose.connect('mongodb://localhost:27017/Tienda',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}, (err,res) => {

  if(err) throw err;
  console.log('Base de datos online');
});

app.listen(process.env.PORT,() => {
    console.log('El servidor esta en linea por el puerto ', process.env.PORT )
})

