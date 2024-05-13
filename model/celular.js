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
    ram: {
        type: String,
        required: true
    },
    bateria: {
        type: Number,
        required: true
    },
    imei: {
        type: String,
        required: true,
        unique:true
    },
    precio: {
        type: Number,
        required: true
    },
    descuento: {
        type: String,
        required: false
    },
    vendido: {
        type: Boolean,
        default: false 
    }
});
// model('colecciones de la db'),esuema que hcimos
module.exports =model('Celulares',CelularSchema);