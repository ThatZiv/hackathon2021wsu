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
            this.rooms[id] = {}
            return id
        } else {
            this.add()
        }
    }
    update(id, key, val) {
        if (this.get(id)) {
            this.rooms[id][key] = val
            return this.rooms[id]
        }
    }
    remove(id) {
        if (this.get(id)) {
            delete this.rooms[id]
        }
    }
}
module.exports = Rooms