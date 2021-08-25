const {
    getNextTicketSocket } = require('./queueSocket')

const socketController = (socket) => {

    console.log('new connection')

    socket.on("next-ticket", async ({ queueId, screen }, callback) => {

        if (!queueId || !screen) {
            return callback({
                status: false,
                msg: 'Verificar la fila o el puesto.'
            })
        }

        const { status, message, ticket, queue } = await getNextTicketSocket(queueId, screen)

        if (queue) {
            socket.emit('queues-change', queue)
        }

        if (!status) {
            return callback({
                status,
                message
            })
        } else {
            return callback({
                status,
                ticket
            })
        }



    });

}


module.exports = {
    socketController
}

