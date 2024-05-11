const {Router} =require('express');
const router=Router();
const{CrearCelular,getCelular,getCelularDetalle}=require('../controllers/inventario');
const { check } = require('express-validator');
const {validarCampos} = require('../middlewares/validaciones');

//*endpoint  1  creacion de un celular
router.post('/lista',[
                      check('marca','la marca es obligatoria').not().isEmpty(),
                      check('modelo','el modelo es obligatorio').not().isEmpty(),
                      check('color','el color es obligatorio').not().isEmpty(),
                      check('almacenamiento','el almacenamiento es obligatorio').not().isEmpty(),
                      check('ram','la capacidad de ram es obligatoria').not().isEmpty(),
                      check('bateria','la capacidad de la bateria es obligatorio').not().isEmpty(),
                      check('imei','el imei es obligatorio').not().isEmpty(),
                      check('precio','el precio es obligatorio').not().isEmpty(),

                      validarCampos,
                     ],CrearCelular);
//*endpoint  2  obtener inventario de celulares
router.get('/lista',getCelular);

//*endpoint  3  obtener detalles

router.get('/lista/:id',getCelularDetalle);
//*endpoint  4  actualidar datos del celular

router.put('/lista/:id',(req,res)=>{
    res.json({
        ok: true,
        msg:'celular actualizado'
    });
});
//*endpoint  5  eliminar celular

router.delete('/lista/:id',(req,res)=>{
    res.json({
        ok: true,
        msg:'celular eliminado'
    });
});



module.exports=router;