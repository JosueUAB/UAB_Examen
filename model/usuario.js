const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');
const usuarioSchema = new Schema({
    // nombre: { type: String, require: true}
    nombreusuario: {
        type: String, 
        required : true,
        unique : true
    },
    correo : {
        type: String, 
        required : true,
        unique : true
    },
    contrasenia : {
        type: String, 
        required : true
    }
    
});

// hashear contrasenia
usuarioSchema.pre('save', async function (next){
    if (this.isModified('contrasenia')){
        this.contrasenia =  await bcrypt.hash(this.contrasenia, 10);
        console.log(this.contrasenia);
    }
    next();
});
//comparar contrasenias
usuarioSchema.methods.compararContrasenia = async function  ( contraseniaComparar ){
    return await bcrypt.compare(contraseniaComparar, this.contrasenia);
};

module.exports =model('Usuario',usuarioSchema);