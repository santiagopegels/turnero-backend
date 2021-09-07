const Queue = require('../models/queue')

const addTicketSocket = async (queueId) => {
    try {

        const queue = await Queue.findById(queueId)

        if (!queue) {
            return {
                status: false,
                message: 'No existe la fila.'
            }
        }

        queue.lastNumber++

        queue.tickets.push({ number: queue.lastNumber, screen: '' })

        await queue.save()

        return {
            status: true,
            queue
        }

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

        queue.ticketsAttended.unshift(ticket)
        queue.actualNumber = ticket.number

        if(queue.ticketsAttended.length > 20){
            queue.ticketsAttended.splice(-1,1)
        }

        await queue.save()

        return {
            status: true,
            ticket,
            queue
        }

    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    addTicketSocket,
    getNextTicketSocket,
}
