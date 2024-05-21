const { response } = require('express');
const Cliente = require('../model/cliente');

//#region creacion de un cliente
const crearCliente = async (req, res = response) => {
    const { CI } = req.body;

    try {
        //! Verificar si el cliente ya existe por CI
        const existeCliente = await Cliente.findOne({ CI });
        if (existeCliente) {
            return res.status(400).json({
                ok: false,
                msg: 'El cliente ya existe',
                url: req.url // para ver de dónde procede
            });
        }

        //* Instancia del modelo del cliente
        const cliente = new Cliente(req.body);

        //* Crear cliente en la base de datos
        await cliente.save();
        res.status(201).json({
            ok: true,
            msg: 'Cliente creado',
            _id: cliente.id, // * Se trae el id del cliente
            url: req.url,    //* Muestra de dónde viene el endpoint
            cliente     //* Se trae todo lo que tenga esa tabla
        });

    } catch (error) {
        console.log(error);
        res.status(404).json({
            ok: false,
            msg: '400 Bad Request'
        });
    }
};
//#endregion creacion de un cliente

//#region obtener lista de clientes
const getClientes = async (req, res = response) => {
    const clientes = await Cliente.find();
    res.status(200).json({
        ok: true,
        total: clientes.length,
        clientes
    });
};
//#endregion obtener lista de clientes

//#region obtener detalles de un cliente
const getClienteDetalle = async (req, res = response) => {
    const id = req.params.id;
    try {
        const cliente = await Cliente.findById(id);
        if (!cliente) {
            return res.status(400).json({
                ok: false,
                msg: 'El cliente no existe',
                url: req.url // para ver de dónde procede
            });
        }
        res.status(200).json({
            ok: true,
            cliente
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            ok: false,
            msg: '404 Not Found'
        });
    }
};
//#endregion obtener detalles de un cliente

//#region actualizar un cliente
const putClienteUpdate = async (req, res = response) => {
    const id = req.params.id;

    try {
        const cliente = await Cliente.findById(id);
        //* Verificar si el cliente no existe
        if (!cliente) {
            return res.status(400).json({
                ok: false,
                msg: 'El cliente no existe',
                url: req.url // para ver de dónde procede
            });
        }
        //* Actualizar los datos
        const modificarDatosCliente = {
            ...req.body,
        };
        const clienteActualizado = await Cliente.findByIdAndUpdate(id, modificarDatosCliente, { new: true });
        res.status(200).json({
            ok: true,
            msg: 'Cliente actualizado correctamente',
            cliente: clienteActualizado
        });

    } catch (error) {
        console.log(error);
        res.status(404).json({
            ok: false,
            msg: '404 Not Found'
        });
    }
};
//#endregion actualizar un cliente

//#region eliminar un cliente
const deleteCliente = async (req, res = response) => {
    const id = req.params.id;
    try {
        const existeCliente = await Cliente.findById(id);
        if (!existeCliente) {
            return res.status(400).json({
                ok: false,
                msg: 'El cliente no existe',
                url: req.url // para ver de dónde procede
            });
        }
        //* Eliminar cliente
        await Cliente.findByIdAndDelete(id);
        res.status(200).json({
            ok: true,
            msg: 'Cliente eliminado'
        });
    } catch (error) {
        console.log(error);
        res.status(404).json({
            ok: false,
            msg: '404 Not Found'
        });
    }
};
//#endregion eliminar un cliente

module.exports = {
    crearCliente,
    getClientes,
    getClienteDetalle,
    putClienteUpdate,
    deleteCliente
};
