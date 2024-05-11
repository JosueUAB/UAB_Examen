const {schema,model}=require('mongoose');

const CelularSchema=schema({
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
    imei: {
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