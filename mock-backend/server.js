const jsonServer = require('json-server')
const cors = require('cors')
const bodyParser = require('body-parser')

const db = require('./db')
const authRoutes = require('./apis/auth.js')

const server = jsonServer.create()
server.use(cors())
server.use(bodyParser.json())

authRoutes(server, db)
server.use(jsonServer.router(db))

server.listen(3000, () => {
  console.log('JSON Server is running')
})
