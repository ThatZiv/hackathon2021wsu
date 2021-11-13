const express = require("express")
const app = express()
const http = require("http").Server(app)
const io = require("socket.io")(http)
require('dotenv').config() // 

app.listen(process.env.PORT, () => {
    console.log(`Listening on port: ${process.env.PORT}`)
})