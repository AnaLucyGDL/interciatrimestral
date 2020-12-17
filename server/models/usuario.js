const mongoose = require ('mongoose');
const Schema = mongoose.Schema

let usuarioSchema = new Schema ({
    nombre: {
        type: String,
        required: [true, "Campo obligatorio."]
    },
    primer_apellido: {
        type: String,
        required: [true, "Campo obligatorio."]
    },
    segundo_apellido: {
        type: String,
        required: false
    },
    edad: {
        type: Number,
        required: [true, "Campo obligatorio."]    
    },
    curp: {
        type: String,
        unique: true,
        required: [true, "Campo obligatorio."]
    },
    telefono: {
        type: Number,
        required: [true, "Campo obligatorio."]
    },
    mail: {
        type: String,
        unique: true,
        required: [true, "Campo obligatorio."]
    },
    activo: {
        type: Boolean,
        default: true
    }
});

module.exports=mongoose.model('usuario',usuarioSchema);