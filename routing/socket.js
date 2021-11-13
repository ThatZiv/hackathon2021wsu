const Rooms = require("../rooms")

//const { join, disconnect } = require("../events")
module.exports = (socket) => {
    const thisId = socket.id
    socket.on("join", (data) => {
        global.Users.add(socket.id, data)
        _.log(`User: [${socket.id}] ${data}, has joined`)
        socket.emit("join", [global.Users, global.Rooms])
    })
    socket.emit("alert", "Welcome.")
    socket.on("createRoom", (data) => {
        const newRoom = global.Rooms.add()
        global.Rooms.update(newRoom, "userAdd", thisId)
        socket.emit("createRoom", newRoom)
        let targetUser = _.nullKey(global.Users.get(thisId), "name")
        socket.on(newRoom, (msg)=> {
            io.emit(newRoom, msg) // send to all clients
        })
        _.log(`Room: [${newRoom}] has been created by ${targetUser || "Unknown"}`)
    })
    socket.on("joinRoom", (roomId)=> {
        global.Rooms.update(roomId, "userAdd", thisId)
    })
    socket.on("getRooms", () => {
        socket.emit("getRooms", global.Rooms.all())
    })

    socket.on("disconnect", () => {
        let all = global.Rooms.all()
        let _user = global.Users.get(thisId)
        let rooms = Object.keys(all)
        for (let i in rooms) { // check all rooms and remove if the user is in any of them when they dc
            let thisRoom = rooms[i]
            global.Rooms.update(thisRoom, "userDel",thisId)
        } 
        _.log(`User: [${thisId}] ${_.nullKey(_user, "name") || "Unknown"}, has left`)
        global.Users.remove(thisId)
    })
}

