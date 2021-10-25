const express = require('express')
const cors = require('cors')
const { dbConnection } = require('../database/config')

class Server {
    constructor() {
        this.app = express()
        this.port = process.env.PORT
        this.usersPath = '/api/users'

        // Conectar a DB
        this.DBConnection()

        // Middlewares
        this.middlewares()

        // Rutas de mi aplicación
        this.routes()
    }

    async DBConnection() {
        await dbConnection()
    }

    middlewares() {
        // CORS
        this.app.use(cors())

        // Parse y lectura del body
        this.app.use(express.json())

        // Directorio Público
        this.app.use(express.static('public'))
    }

    routes() {
        this.app.use(this.usersPath, require('../routes/user'))
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`App listen on port ${this.port}`)
        })
    }
}

module.exports = Server