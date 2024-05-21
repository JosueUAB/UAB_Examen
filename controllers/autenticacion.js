const { response } = require('express');
const Usuario = require('../model/usuario');
const bcrypt = require('bcryptjs');  // Usa bcryptjs en lugar de bcrypt
const {agregarATokenBlacklist } = require('../middlewares/revocacion_token');
const jwt = require('jsonwebtoken');

// Registro 
const registro = async (req, res = response) => {
    const _id = req._id;
    const { nombreusuario } = req.body;

    try {
        // Verificación si existe el usuario
        const existeUsuario = await Usuario.findOne({ nombreusuario });
        if (existeUsuario) {
            return res.status(405).json({
                ok: false,
                msg: '405 el usuario ya existe',
                error: req.url
            });
        }

        // Instancia del modelo usuario
        const usuario = new Usuario({
            usuario: _id,
            ...req.body
        });

        // Crear usuario
        await usuario.save();
        res.status(201).json({
            ok: true,
            status: '201 success',
            msg: 'usuario registrado con exito',
            _id: usuario.id,
            url: req.url,
            usuario
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: '400 bad request',
        });
    }
};

// Inicio de sesión
const iniciarsesion = async (req, res = response) => {
    try {
        const { correo, contrasenia } = req.body;
        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(401).json({
                ok: false,
                msg: '401 el usuario no existe verificar correo',
            });
        }

        const validarContrasena = await bcrypt.compare(contrasenia, usuario.contrasenia);  // Usa bcryptjs para comparar contraseñas
        if (!validarContrasena) {
            return res.status(401).json({
                ok: false,
                msg: 'contraseña invalida',
            });
        }

        // Creación de token 
        const token = jwt.sign({
            usuarioId: usuario._id
        }, 'clave_secreta', { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: '400 bad request',
        });
    }
};
const cerrarSesion = (req, res) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (token) {
        agregarATokenBlacklist(token);
        //console.log(`Token revocado: ${token}`);

        res.status(200).json({
            ok: true,
            msg: 'sesion cerrada',
            tokenRevocado: token
        });
    } else {
        // Si no se proporcionó ningún token en la cabecera de autorización
        res.status(400).json({
            ok: false,
            msg: 'sesion no iniciada o token no autenticado'
        });
    }
};

module.exports = {
    registro,
    iniciarsesion,
    cerrarSesion
};
