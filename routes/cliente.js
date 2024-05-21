const {Router} =require('express');
const router=Router();
const { crearCliente,
        getClientes,
        getClienteDetalle,
        putClienteUpdate,
        deleteCliente } = require('../controllers/cliente');
const { validarCampos } = require('../middlewares/validaciones');
const { check } = require('express-validator');

//*endpoint  1  creacion de un celular
router.post('/cliente',[
    check('CI','el CI es obligatorio').not().isEmpty(),
    check('Nombre','el nombre es obligatorio').not().isEmpty(),
    check('Apellido','el apellido es obligatorio').not().isEmpty(),
    check('telefono','el numero de telefono es obligatorio').not().isEmpty(),
    validarCampos,
   ],crearCliente);
//*endpoint  2  obtener inventario de celulares
router.get('/cliente',getClientes);

//*endpoint  3  obtener detalles

router.get('/cliente/:id',getClienteDetalle);
//*endpoint  4  actualidar datos del celular

router.put('/cliente/:id',putClienteUpdate);
//*endpoint  5  eliminar celular

router.delete('/cliente/:id',deleteCliente);
module.exports=router;