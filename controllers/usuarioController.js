const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const {validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');

exports.crearUsuario = async(req, res) => {

    //Revisar si hay errores
    const errores = validationResult(req); // El req retoorna si hay algun error y lo genera como un arreglo
    if (!errores.isEmpty()) { //si errores no esta vacio
        return res.status(400).json({ errores: errores.array() });
    }

    //Extraer email y password
    const {email,password} = req.body;

    try {
        let usuario = await Usuario.findOne({email});

        if (usuario) { //si existe el usuario
            return res.status(400).json({msg: 'El usuario ya existe'});
        } 
    //Crear un nuevo usuario    
        usuario = new Usuario(req.body); //accede a los vlres

    //Hashear el password
        const salt = await bcryptjs.genSalt(10); //metodo genSalt
        usuario.password = await bcryptjs.hash(password, salt); // reescribe el psswd ya hasheado y lo guuarda

    //Guardar el usuario
        await usuario.save();

    //Crear y firmar el JWT
        const payload = {
            usuario:{
                id: usuario.id 
            }
        };

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
        res.status(400).send('Hubo un error');
    }
}