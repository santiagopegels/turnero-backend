const jwt = require('jsonwebtoken')
const User = require('../models/user')

const generateJWT = (uid = '', name = '') => {

    return new Promise((resolve, reject) => {

        const payload = { uid, name }

        jwt.sign(payload, process.env.API_KEY, {
            expiresIn: '4h'
        }, (error, token) => {
            if (error) {
                console.log(error)
                reject('Error al generar token')
            } else {
                resolve(token)
            }
        })
    })

}

const verifyJWT = async (token = '') => {
    try {

        if (token.length < 10) {
            return null;
        }

        const { uid } = jwt.verify(token, process.env.API_KEY)
        const user = await User.findById(uid)

        if (user) {
            if (user.status) {
                return user
            } else {
                return null
            }
        } else {
            return null
        }

    } catch (error) {

    }
}

module.exports = {
    generateJWT,
    verifyJWT
}