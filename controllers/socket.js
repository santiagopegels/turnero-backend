const socketController = (socket) => {

    console.log('new connection')
    
    socket.on("create user", (payload) => {
        socket.emit('return', 'Funcionando')
      });


}


module.exports = {
    socketController
}

