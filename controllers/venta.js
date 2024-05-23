const { response } = require('express');
const Venta = require('../model/venta');
const Cliente = require('../model/cliente');
const Celular = require('../model/celular');

//#region Crear una venta
const crearVenta = async (req, res = response) => {
    const { clienteId, celularId } = req.body;

    try {
        const cliente = await Cliente.findById(clienteId);
        if (!cliente) {
            return res.status(400).json({
                ok: false,
                msg: 'Cliente no encontrado'
            });
        }

        const celular = await Celular.findById(celularId);
        if (!celular) {
            return res.status(400).json({
                ok: false,
                msg: 'Celular no encontrado'
            });
        }

        if (celular.vendido) {
            return res.status(400).json({
                ok: false,
                msg: 'El celular ya está vendido'
            });
        }

        // Calcular el descuento aplicado
        const descuento = celular.descuento ? parseFloat(celular.descuento.replace('%', '')) : 0;
        const descuentoAplicado = celular.precio * (descuento / 100);
        const total = celular.precio - descuentoAplicado;

        const nuevaVenta = new Venta({
            cliente: clienteId,
            celular: celularId,
            total,
            descuentoAplicado
        });

        await nuevaVenta.save();

        // Marcar el celular como vendido
        celular.vendido = true;
        await celular.save();

        const ventaConDetalle = await Venta.findById(nuevaVenta._id)
            .populate('cliente', 'CI Nombre Apellido')
            .populate('celular', 'imei precio descuento');

        res.status(201).json({
            ok: true,
            msg: 'Venta creada',
            venta: ventaConDetalle
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al crear la venta'
        });
    }
};


//#endregion Crear una venta

//#region Obtener lista de ventas
const getVentas = async (req, res = response) => {
    try {
        const ventas = await Venta.find()
            .populate('cliente', 'CI Nombre Apellido')
            .populate('celular', 'imei precio descuento');

        // Agregar descuentoAplicado y total a cada venta
        const ventasConDetalles = ventas.map(venta => {
            const descuentoAplicado = venta.celular.precio * (parseFloat(venta.celular.descuento) / 100);
            const total = venta.celular.precio - descuentoAplicado;
            return {
                _id: venta._id,
                cliente: venta.cliente,
                celular: venta.celular,
                total: total,
                descuentoAplicado: descuentoAplicado,
                fecha: venta.fecha
            };
        });

        res.status(200).json({
            ok: true,
            total: ventasConDetalles.length,
            ventas: ventasConDetalles
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            ok: false,
            msg: '404 not found'
        });
    }
};
//#endregion Obtener lista de ventas

//#region Obtener detalles de una venta
const getVentaDetalle = async (req, res = response) => {
    const id = req.params.id;
    try {
        const venta = await Venta.findById(id)
            .populate('cliente', 'CI Nombre Apellido')
            .populate('celular', 'imei precio descuento');

        if (!venta) {
            return res.status(400).json({
                ok: false,
                msg: 'La venta no existe',
                url: req.url
            });
        }

        const descuentoAplicado = venta.celular.precio * (parseFloat(venta.celular.descuento) / 100);
        const total = venta.celular.precio - descuentoAplicado;

        const ventaConDetalles = {
            _id: venta._id,
            cliente: venta.cliente,
            celular: venta.celular,
            total: total,
            descuentoAplicado: descuentoAplicado,
            fecha: venta.fecha
        };

        res.status(200).json({
            ok: true,
            venta: ventaConDetalles
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            ok: false,
            msg: '404 not found'
        });
    }
};
//#endregion Obtener detalles de una venta

const eliminarVenta = async (req, res = response) => {
    const ventaId = req.params.id;

    try {
        const venta = await Venta.findById(ventaId);

        if (!venta) {
            return res.status(404).json({
                ok: false,
                msg: 'Venta no encontrada'
            });
        }

        // Encontrar el celular relacionado a la venta
        const celular = await Celular.findById(venta.celular);

        if (!celular) {
            return res.status(404).json({
                ok: false,
                msg: 'Celular relacionado a la venta no encontrado'
            });
        }

        // Actualizar el estado del celular a no vendido
        celular.vendido = false;
        await celular.save();

        // Eliminar la venta
        await Venta.findByIdAndDelete(ventaId);

        res.status(200).json({
            ok: true,
            msg: 'Venta eliminada'
        });

    } catch (error) {
        console.log(error);
        res.status(404).json({
            ok: false,
            msg: '404 not found'
        });
    }
};


// Crear Venta por CI y IMEI
const crearVentaImeiCI = async (req, res = response) => {
    const { CI, IMEI } = req.body;

    try {
        // Buscar cliente por CI
        const cliente = await Cliente.findOne({ CI });
        if (!cliente) {
            return res.status(400).json({
                ok: false,
                msg: 'Cliente no encontrado'
            });
        }

        // Buscar celular por IMEI
        const celular = await Celular.findOne({ imei: IMEI });
        if (!celular) {
            return res.status(400).json({
                ok: false,
                msg: 'Celular no encontrado'
            });
        }

        // Verificar si el celular ya está vendido
        if (celular.vendido) {
            return res.status(400).json({
                ok: false,
                msg: 'El celular ya está vendido'
            });
        }

        // Calcular descuento y total
        const descuentoAplicado = celular.precio * (parseFloat(celular.descuento) / 100);
        const total = celular.precio - descuentoAplicado;

        // Crear venta
        const venta = new Venta({
            cliente: cliente._id,
            celular: celular._id,
            total: total,
            descuentoAplicado: descuentoAplicado,
            fecha: new Date()
        });

        await venta.save();

        // Marcar el celular como vendido
        celular.vendido = true;
        await celular.save();

        res.status(201).json({
            ok: true,
            msg: 'Venta creada',
            venta: {
                _id: venta._id,
                cliente: {
                    _id: cliente._id,
                    CI: cliente.CI,
                    Nombre: cliente.Nombre,
                    Apellido: cliente.Apellido
                },
                celular: {
                    _id: celular._id,
                    imei: celular.imei,
                    precio: celular.precio,
                    descuento: celular.descuento
                },
                total: total,
                descuentoAplicado: descuentoAplicado,
                fecha: venta.fecha
            }
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            ok: false,
            msg: '404 not found'
        });
    }
};

const getTopClientesDescuentos = async (req, res = response) => {
    try {
        // Encontrar ventas ordenadas por descuentoAplicado de manera descendente, limitando a 3 resultados
        const ventas = await Venta.find()
            .populate('cliente', 'Nombre Apellido')
            .populate('celular', 'descuento')
            .sort({ descuentoAplicado: -1 })
            .limit(3);

        // Construir la respuesta
        const topClientes = ventas.map(venta => ({
            Nombre: venta.cliente.Nombre,
            Apellido: venta.cliente.Apellido,
            Descuento: venta.celular.descuento,
            DescuentoAplicado: venta.descuentoAplicado,
            Fecha: venta.fecha.toISOString().split('T')[0] // Obtener solo la fecha sin la hora
        }));

        res.status(200).json({
            ok: true,
            topClientes
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            ok: false,
            msg: '404 not found'
        });
    }
};

const getClientesFrecuentes = async (req, res = response) => {
    try {
        const clientesFrecuentes = await Venta.find()
            .populate('cliente', 'CI Nombre Apellido')
            .select('cliente total ');

        const clientesMap = new Map();
        clientesFrecuentes.forEach((venta) => {
            const clienteId = venta.cliente._id;
            const totalCompras = clientesMap.has(clienteId) ? clientesMap.get(clienteId).totalCompras + 1 : 1;
            const gastoTotal = clientesMap.has(clienteId) ? clientesMap.get(clienteId).gastoTotal + venta.total : venta.total;
            clientesMap.set(clienteId, {
                _id: clienteId,
                totalCompras,
                gastoTotal,
                clienteInfo: venta.cliente
            });
        });

        const clientesFrecuentesArray = Array.from(clientesMap.values());

        res.status(200).json({
            ok: true,
            total: clientesFrecuentesArray.length,
            clientesFrecuentes: clientesFrecuentesArray
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            ok: false,
            msg: '404 not found'
        });
    }
};



module.exports = {
    crearVenta,
    getVentas,
    getVentaDetalle,
    eliminarVenta,
    crearVentaImeiCI,
    getTopClientesDescuentos,
    getClientesFrecuentes
};
