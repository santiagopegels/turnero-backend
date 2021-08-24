const Queue = require('../models/queue')

const createQueue = async (req, res) => {
    try {

        queue = new Queue(req.body)
        queue.users.push(req.uid);

        const queueCreated = await queue.save()

        return res.status(201).json({
            status: true,
            queue: queueCreated
        })

    } catch (error) {
        console.log(error)
    }
}

const addTicket = async (req, res) => {
    try {
        const queueId = req.params.id

        const queue = await Queue.findById(queueId)

        if (!queue) {
            return res.status(400).json({
                status: false,
                message: 'No existe la fila.'
            })
        }

        queue.lastNumber++

        queue.tickets.push({ number: queue.lastNumber, screen: '' })

        await queue.save()

        return res.status(200).json({
            status: true,
            queue
        })

    } catch (error) {
        console.log(error)
    }
}

const getNextTicketSocket = async (queueId, screen) => {
    try {
        const queue = await Queue.findById(queueId)
        if (!queue) {
            return {
                status: false,
                message: 'No existe la fila.'
            }
        }

        if (!queue.tickets.length > 0) {
            return {
                status: false,
                message: `No existen tickets disponibles para la fila ${queue.name}.`
            }
        }

        const ticket = queue.tickets.shift()
        ticket.screen = screen

        queue.ticketsAttended.push(ticket)

        // await queue.save()

        return {
            status: true,
            ticket,
            queue
        }

    } catch (error) {
        console.log(error)
    }
}

const getAllUserQueues = async (req, res) => {
    try {

        const userId = req.uid

        const queues = await Queue.find({ users: { $all: [userId] } })

        if (!queues.length > 0) {
            return res.status(400).json({
                status: false,
                message: 'No existen filas disponibles.'
            })
        }

        return res.status(200).json({
            status: true,
            queues
        })
    } catch (error) {
        console.log(error)
    }
}



module.exports = {
    createQueue,
    addTicket,
    getNextTicketSocket,
    getAllUserQueues
}
