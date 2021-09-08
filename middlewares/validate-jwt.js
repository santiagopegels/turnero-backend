const jwt = require('jsonwebtoken')

const User = require('../models/user')

const validateJWT = async (req, res, next) => {

    const token = req.header('x-token')

    if (!token) {
        return res.status(401).json({
            message: 'El token no existe'
        })
    }

    try {

        const { uid } = jwt.verify(token, process.env.API_KEY)

        req.user = await User.findById(uid)

        if (!req.user) {
            return res.status(400).json({
                 message: 'No existe el usuario'
             })
         }
 
         if(!req.user.status){
           return res.status(400).json({
                 message: 'Usuario eliminado'
             })
         }

         req.uid = uid;

        next()

    } catch (error) {
        console.log(error);

        res.status(401).json({
            message: 'Token no válido'
        })
    }


}

module.exports = {
    validateJWT
}