const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let departamentoSchema = new Schema ({
    id_jefe_de_area: {
        type: Schema.Types.ObjectId,
        ref: 'usuario'
    },
    nombre:{
        type: String,
        required: [true, "Campo obligatorio."]
    },
    numero_empleados: {
        type: Number,
        required: [true, "Campo obligatorio."]
    },
    extension_telefonica: {
        type: Number,
        required: [true, "Campo obligatorio."]
    },
    activo:{
        type: Boolean,
        default: true
    }
});

module.exports=mongoose.model('departamento', departamentoSchema);