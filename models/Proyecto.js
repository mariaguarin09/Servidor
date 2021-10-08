const mongoose = require('mongoose');

const ProyectoSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true, //validar con express validator
        trim: true //para espacios blanco
    },
    creador: {
        type: mongoose.Schema.Types.ObjectId, //para que cada usuario tenga un id
        ref: 'Usuario' //ref es el nombre del archivo Usuario a que pertenece el id
    },
    creado: { //fecha fue creado para ordenar los proyectos
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('Proyecto', ProyectoSchema);