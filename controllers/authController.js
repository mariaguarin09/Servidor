const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

//Metodo
exports.autenticarUsuario = async (req, res) => {
     //Revisar si hay errores
     const errores = validationResult(req); // El req retoorna si hay algun error y lo genera como un arreglo
     if ( !errores.isEmpty() ) { //si errores no esta vacio
         return res.status(400).json({ errores: errores.array() });
     }

     //Extraer el email y el password
     const {email, password } = req.body;

     try {
         //Revisar que sea un usuario registrado
         let usuario = await Usuario.findOne({ email });
         if ( !usuario ) {
            return res.status(400).json({msg: 'El usuario no existe'});
         }
         
         //Revisar el password
         const passCorrecto = await bcryptjs.compare(password, usuario.password); //compara el psswd del request y el de la BD
         if (!passCorrecto) {
             return res.status(400).json({msg: 'Password Incorrecto'})
             //bcrypt es el metodo para comparar los psswds
         }

        //Si todo es correcto, creamos y firmamos el JWT
        
        const payload = {
            usuario:{
                id: usuario.id 
            }
        }

        //Firmar el JWT
        jwt.sign(payload, process.env.SECRETA, {
            expiresIn: 3600 // segs equivalente a 1 h
        }, (error, token) => { //revisar si hay error en el token
        if (error) throw error;

        //Mensaje de confirmación
        res.json({token});
        });
        
    

     } catch (error) {
         console.log(error);
     }
}

//Obtiene que usuario está autenticado
exports.usuarioAutenticado = async (req, res) => {
    try {
        const usuario = await Usuario.findById(req.usuario.id).select('-password'); // esto nos va a atraer todo el registro de usuario. //password no lo queremos en mongodb
        res.json({usuario}); //enviando el usuario
    } catch (error) {
        console.log(error); //debuggear
        res.status(500).json({msg: 'Hubo un error'});
    }
}

