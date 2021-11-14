const express = require("express")
const app = express()
const { home } = require("./routing")
const http = require("http").Server(app)
const io = require("socket.io")(http)
_ = require("./utils") // globalize all utils
let Users = require("./users")
Users = new Users()
let Rooms = require("./rooms")
Rooms = new Rooms()
require('dotenv').config() // loads .env file

app.use(home)
io.on("connection", (socket) => {
    const thisId = socket.id
    socket.on("join", (data) => {
        Users.add(thisId, data)
        socket.emit("alert", `Welcome, ${data}!`)
        _.log(`User: [${thisId}] ${data}, has joined`)
        socket.emit("join", [Users, Rooms])
    })
    socket.on("createRoom", (data) => {
        const newRoom = Rooms.add()
        Rooms.update(newRoom, "userAdd", thisId)
        socket.emit("createRoom", newRoom)
        let targetUser = _.nullKey(Users.get(thisId), "name")
        socket.on(newRoom, (msg) => {
            io.emit(newRoom, msg) // send to all clients
        })
        _.log(`Room: [${newRoom}] has been created by ${targetUser || "Unknown"}`)
    })
    socket.on("joinRoom", (roomId) => {
        let targetUser = _.nullKey(Users.get(thisId), "name")
        socket.join(roomId)
        Rooms.update(roomId, "userAdd", thisId)
        io.in(roomId).emit("msg", { user: "Server", msg: `${targetUser} has joined the chat.` })
        _.log(`${targetUser} has joined ${roomId}.`)
        //io.in(roomId).emit()
    })
    socket.on("getRooms", () => {
        socket.emit("getRooms", Rooms.all())
    })
    socket.on("getUsers", () => {
        socket.emit("getUsers", Users.all())
    })
    socket.on('msg', (roomId, msg) => {
        const user = _.nullKey(Users.get(thisId), "name") || "Unknown"
        _.log(`Room: [${roomId}] - ${user} says ${msg}`)
        io.in(roomId).emit(`msg`, { user, msg });
    })
    socket.on("disconnect", () => {
        let all = Rooms.all()
        let _user = Users.get(thisId)
        let rooms = Object.keys(all)
        let targetUser = _.nullKey(_user, "name") || "Unknown"
        io.emit("msg", { user: "Server", msg: `${targetUser} has exited.` })
        for (let i in rooms) { // check all rooms and remove if the user is in any of them when they dc
            let thisRoom = rooms[i]
            Rooms.update(thisRoom, "userDel", thisId)   
        }
        _.log(`User: [${thisId}] ${targetUser}, has left`)
        Users.remove(thisId)
    })
})

http.listen(process.env.PORT, () => {
    _.log(`Listening on port: ${process.env.PORT}`)
})