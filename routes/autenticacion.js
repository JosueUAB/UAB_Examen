const { Router } = require('express');
const { registro, iniciarsesion, cerrarSesion } = require('../controllers/autenticacion');
const { validarCampos } = require('../middlewares/validaciones');
const { check } = require('express-validator');

const router = Router();

// Registrarse
router.post('/registro', [
    check('nombreusuario', 'El nombre de usuario es obligatorio').not().isEmpty(),
    check('correo', 'El correo es obligatorio').not().isEmpty(),
    check('contrasenia', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], registro);

// Iniciar sesión
router.post('/login', iniciarsesion);

// Cerrar sesión
router.post('/logout', cerrarSesion);
module.exports = router;
