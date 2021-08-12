const { Router } = require('express')
const router = Router()
const { check } = require('express-validator')
const { validateFields } = require('../middlewares/validate-fields')
const { 
    createQueue, 
    addTicket, 
    getNextTicket, 
    getAllUserQueues } = require('../controllers/queue')
const { validateJWT } = require('../middlewares/validate-jwt')

router.post('/',
    [
        check('name', 'El nombre es obligatorio').notEmpty(),
        validateFields,
        validateJWT,
    ],
    createQueue)

router.put('/:id/addTicket',
    [
        validateJWT,
    ],
    addTicket)

router.get('/:id/nextTicket',
    [
        check('screen', 'El puesto es requerido').notEmpty(),
        validateFields,
        validateJWT,
    ],
    getNextTicket)

router.get('/getAllUserQueues',
    [
        validateJWT,
    ],
    getAllUserQueues)

module.exports = router;
