const { Router } = require('express')
const router = Router()
const { check } = require('express-validator')
const { validateFields } = require('../middlewares/validate-fields')
const { newUser } = require('../controllers/auth')

router.post('/register',
    [
        check('name', 'El nombre es obligatorio').notEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe contener 6 caracteres').isLength({ min: 6 }),
        validateFields
    ],
    newUser)

module.exports = router;
