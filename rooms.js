class Rooms {
    constructor() {
        this.rooms = {}
    }
    get(id) {
        return id in this.rooms ? this.rooms[id] : null
    }
    add() {
        let id = _.random(6)
        if (!this.get(id)) {
            this.rooms[id] = { users: [] }
            return id
        } else {
            this.add()
        }
    }
    update(id, key, val) {
        if (this.get(id)) {
            if (key == "userAdd") {
                if (!this.rooms[id].users.includes(val)) {
                    this.rooms[id].users.push(val)
                    return this.rooms[id]
                }
            } else if (key == "userDel") {
                this.rooms[id].users = this.rooms[id].users.filter(item => item !== val)
                return this.rooms[id]
            } else {
                this.rooms[id][key] = val
                return this.rooms[id]
            }
        }
    }
    remove(id) {
        if (this.get(id)) {
            delete this.rooms[id]
        }
    }
    all() {
        return this.rooms
    }
}
module.exports = Rooms