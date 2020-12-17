const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let empleadoSchema = new Schema ({
    id_usuario: {
        type: Schema.Types.ObjectId,
        ref: 'usuario'
    },
    id_departamento: {
        type: Schema.Types.ObjectId,
        ref: 'departamento'
    },
    nombre_del_puesto:{
        type: String,
        required: [true, "Campo obligatorio."]
    },
    anios_servicio:{
        type: Number,
        required: [true,"Campo obligatorio."]
    },
    hora_entrada: {
        type: Number,
        required: [true,"Campo obligatorio."]
    },
    hora_salida:{
        type: Number,
        required: [true, "Campo obligatorio."]
    },
    activo: {
        type: Boolean,
        default: true
    }

});

module.exports=mongoose.model('empleado', empleadoSchema );