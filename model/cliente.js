const { Schema, model } = require('mongoose');
const ClienteSchema=new Schema({
    CI: {
        type: Number,
        required: true,
        unique:true
    },
    Nombre: {
        type: String,
        required: true
    },
    Apellido: {
        type: String,
        required: true
    },
    Correo: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
        required: true
    },
});
// model('colecciones de la db'),esuema que hcimos
module.exports =model('Cliente',ClienteSchema);