const express = require('express')
const cors = require('cors')

const {dbConnection} = require('../database/config')
const {socketController} = require('../controllers/socket')

class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server);

        this.paths = {}

        //Middlewares
        this.middlewares()

        //Routes
        this.routes()

        //Init Sockets
        this.sockets()

        //Init Database
        dbConnection()
    }

    middlewares() {
        //CORS
        this.app.use(cors())

    }

    routes() {
        // this.app.use(this.paths.auth, require('../routes/auth'))
    }

    sockets() {
        this.io.on('connection', socketController);
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log(`Server Port: ${this.port}`)
        })
    }
}

module.exports = Server