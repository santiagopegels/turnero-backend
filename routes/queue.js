const { Router } = require('express')
const router = Router()
const { check } = require('express-validator')
const { validateFields } = require('../middlewares/validate-fields')
const { createQueue, addTicket } = require('../controllers/queue')
const { validateJWT } = require('../middlewares/validate-jwt')

router.post('/',
    [
        validateJWT,
        check('name', 'El nombre es obligatorio').notEmpty(),
        validateFields,
    ],
    createQueue)

router.put('/:id/addTicket',
    [
        validateJWT,
    ],
    addTicket)

module.exports = router;
