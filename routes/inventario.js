const {Router} =require('express');
const router=Router();


//*endpoint  1  creacion de un celular
router.post('/lista',(req,res)=>{
    res.json({
        ok: true,
        msg:'celular agregado'
    });
});
//*endpoint  2  obtener inventario de celulares
router.get('/lista',(req,res)=>{
    res.json({
        ok: true,
        msg:'celulares mostrados'
    });
});
//*endpoint  3  obtener detalles

router.get('/lista/:id',(req,res)=>{
    res.json({
        ok: true,
        msg:'obtener detalles del celular'
    });
});
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