const express = require("express")
const app = express()
const { home, socket } = require("./routing")
const http = require("http").Server(app)
const io = require("socket.io")(http)
global._ = require("./utils") // globalize all utils
let Users = require("./users")
global.Users = new Users()
let Rooms = require("./rooms")
global.Rooms = new Rooms()
require('dotenv').config() // loads .env file

app.use(home)
io.on("connection", socket)
http.listen(process.env.PORT, () => {
    _.log(`Listening on port: ${process.env.PORT}`)
})