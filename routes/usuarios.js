// Rutas para crear usuarios
const express = require('express'); //importar express porque tiene routing
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { check } = require('express-validator');

// Crea un usuario
// api/usuarios
router.post('/',
    //llamar validaciones
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email' ,'Agrega un email válido').isEmail(),
        check('password', 'El password debe ser mínimo de 6 caracteres').isLength({min: 6})
    ],
    usuarioController.crearUsuario
);

module.exports = router;