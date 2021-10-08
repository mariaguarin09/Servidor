const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
    // Leer el token del header
    const token = req.header('x-auth-token');

    // Revisar si no hay token
    if(!token) {
        return res.status(401).json({msg: 'No hay Token, permiso no válido'})
    }

    // validar el token

    try { //token que ha sido verificado
        const cifrado = jwt.verify(token, process.env.SECRETA); //metodo verify, verifica el token
        req.usuario = cifrado.usuario;
        next();
    } catch (error) { //error token no es valido
        res.status(401).json({msg: 'Token no válido'});
    }
}