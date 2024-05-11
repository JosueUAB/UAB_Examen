const { Schema, model } = require('mongoose');
const CelularSchema=new Schema({
    marca: {
        type: String,
        required: true
    },
    modelo: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    almacenamiento: {
        type: String,
        required: true
    },
    ime1: {
        type: String,
        required: true,
        unique:true
    },
    ime2: {
        type: String,
        required: true,
        unique:true
    },
    precio: {
        type: Number,
        required: true
    }
});
// model('colecciones de la db'),esuema que hcimos
module.exports =model('Celulares',CelularSchema);