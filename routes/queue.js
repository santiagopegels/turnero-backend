const { Router } = require('express')
const router = Router()
const { check } = require('express-validator')
const { validateFields } = require('../middlewares/validate-fields')
const { createQueue } = require('../controllers/queue')
const {validateJWT} = require('../middlewares/validate-jwt')

router.post('/queue',
    [
        check('name', 'El nombre es obligatorio').notEmpty(),
        validateFields,
        validateJWT
    ],
    createQueue)

module.exports = router;
