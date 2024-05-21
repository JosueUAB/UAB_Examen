const { Timestamp } = require('mongodb');
const { Schema, model } = require('mongoose');
const VentaSchema=new Schema({
    Fecha: {
        type: Timestamp,
        required: true
    },
    cantidad: {
        type: Number,
        required: true
    },
    Precio: {
        type: String,
        required: true
    },
    descuento: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    cliente: { type: Schema.Types.ObjectId, ref: 'Cliente', required: true },
    celular: { type: Schema.Types.ObjectId, ref: 'Celulares', required: true },
});
// model('colecciones de la db'),esuema que hcimos
module.exports =model('venta',VentaSchema,);