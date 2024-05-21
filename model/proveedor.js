const { Schema, model } = require('mongoose');
const ProveedorSchema=new Schema({
    Nombre: {
        type: String,
        required: true
    },
    Telefono: {
        type: String,
        required: true
    },
    Direccion: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
});
// model('colecciones de la db'),esuema que hcimos
module.exports =model('proveedor',ProveedorSchema,'proveedores');