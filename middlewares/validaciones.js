//*validaciones para que no dejen ningun campo vacio en nuestro formulario
const {response}=require('express');
const {validationResult}=require('express-validator');

const validarCampos=(req,res=response,next)=>{
    const errores= validationResult(req);
    if(!errores.isEmpty()) {
        return res.status(400).json({
            ok:false,
            errores:errores.mapped()
        })
    }
    //fltaba paraetro de next
    next();
}
module.exports={
    validarCampos
}