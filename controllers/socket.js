const { getNextTicketSocket, addTicketSocket } = require('./queueSocket')
const { verifyJWT } = require('../helpers/generateJWT')

const socketController = async (socket) => {

    console.log('new connection', socket.id)

    const user = await verifyJWT(socket.handshake.auth.token)

    if (!user) {
        socket.disconnect()
    }

    socket.on("next-ticket", async ({ queueId, screen }, callback) => {
        if (!queueId || !screen) {
            return callback({
                status: false,
                message: 'Verificar la fila o el puesto.'
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

    socket.on("new-ticket", async ({ queueId }, callback) => {

        if (!queueId) {
            return callback({
                status: false,
                message: 'Verificar la fila o el puesto.'
            })
        }

        const { queue, status } = await addTicketSocket(queueId)

        if (status) {
            socket.broadcast.emit('queues-change', queue)
        }

        if (!status) {
            return callback({
                status,
                message
            })
        } else {
            return callback({
                status,
                queue
            })
        }
    });

}


module.exports = {
    socketController
}

