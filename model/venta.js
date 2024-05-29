const { Timestamp } = require('mongodb');
const { Schema, model } = require('mongoose');
const VentaSchema=new Schema({
    fecha: { 
        type: Date, 
        default: Date.now, 
        required: true 
    },
    cliente: { 
        type: Schema.Types.ObjectId, 
        ref: 'Cliente', 
        required: true },

    celular: { 
        type: Schema.Types.ObjectId,
        ref: 'Celulares',
        required: true 
    },

    total: { 
        type: Number, 
        required: true 
    },
    descuentoAplicado: {
        type: Number,
        required: true
    },
    metododePago: {
        type: String,
        required: true,
        
    },
});
// model('colecciones de la db'),esuema que hcimos
module.exports =model('venta',VentaSchema,);