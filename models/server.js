const express = require('express')
const cors = require('cors')

const {dbConnection} = require('../database/config')
const {socketController} = require('../controllers/socket')

class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.server = require('http').createServer(this.app);
        this.io = require('socket.io')(this.server, {
            cors: {
              origin: "*",
              methods: ["GET", "POST"]
            }
          });

        this.paths = {
            auth: '/api/auth',
            queue: '/api/queue'
        }

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
        this.app.use(express.json())

    }

    routes() {
         this.app.use(this.paths.auth, require('../routes/auth'))
         this.app.use(this.paths.queue, require('../routes/queue'))
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