const {
    getNextTicketSocket } = require('./queueSocket')

const socketController = (socket) => {

    console.log('new connection', socket.id)

    socket.on("next-ticket", async ({ queueId, screen }, callback) => {

        if (!queueId || !screen) {
            return callback({
                status: false,
                msg: 'Verificar la fila o el puesto.'
            })
        }

        const { status, message, ticket, queue } = await getNextTicketSocket(queueId, screen)
        
        if (queue) {
            socket.broadcast.emit('queues-change', queue, ticket)
        }

        if (!status) {
            return callback({
                status,
                message
            })
        } else {
            return callback({
                status,
                ticket,
                queue
            })
        }
    });

}


module.exports = {
    socketController
}

