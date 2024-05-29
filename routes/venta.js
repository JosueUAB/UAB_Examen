const express = require('express');
const { crearVenta, 
        getVentas, 
        editarVenta,
        getVentaDetalle,
        eliminarVenta, 
        crearVentaImeiCI,
        getTopClientesDescuentos,
        getClientesFrecuentes
    } = require('../controllers/venta');

const router = express.Router();

router.post('/ventas', crearVenta);
router.get('/ventas', getVentas);
router.put('/ventasd/:id', editarVenta);
router.get('/ventas/:id', getVentaDetalle);
router.delete('/ventas/:id', eliminarVenta);

// Crear una venta por imei y ci
router.post('/ventasx', crearVentaImeiCI);
router.get('/ventasx/', getTopClientesDescuentos);
router.get('/clientesfrecuentes/',getClientesFrecuentes );

module.exports = router;
