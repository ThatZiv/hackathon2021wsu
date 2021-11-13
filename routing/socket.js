//const { join, disconnect } = require("../events")
const Users = require("../users")
module.exports = (socket) => {
    socket.on("join", (data) => {
        Users.add(socket.id, data)
    })
    socket.emit("alert", "Welcome.")
    socket.on("disconnect", () => {
        Users.remove(socket.id)
    })
    console.log(socket.id)
}