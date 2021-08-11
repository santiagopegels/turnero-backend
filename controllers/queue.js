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
                message: 'No existe la fila'
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

const getNextTicket = async (req, res) => {
    try {
        const queueId = req.params.id

        const queue = await Queue.findById(queueId)

        if (!queue) {
            return res.status(400).json({
                status: false,
                message: 'No existe la fila.'
            })
        }

        if (!queue.tickets) {
            return res.status(400).json({
                status: false,
                message: 'No existe tickets disponibles.'
            })
        }

        const ticket = queue.tickets.shift()
        
        queue.ticketsAttended.push(ticket)

        await queue.save()

        return res.status(200).json({
            status: true,
            ticket
        })
    } catch (error) {
        console.log(error)
    }
}



module.exports = {
    createQueue,
    addTicket,
    getNextTicket
}
