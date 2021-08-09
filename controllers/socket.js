const socketController = (socket) => {

    console.log('new connection')
    
    socket.on('chat', (msg) => {
        console.log('message: ' + msg);
      });


}



module.exports = {
    socketController
}

