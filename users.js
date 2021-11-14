class Users {
    constructor() {
        this.users = {}
    }
    get(id) {
        return id in this.users ? this.users[id] : null 
    }
    add(id, name) {
        if (!this.get(id)) {
            this.users[id] = {}
            this.users[id]["name"] = name || "User"
        }
    }
    remove(id) {
        if (this.get(id)) {
            delete this.users[id]
        }
    }
    all() {
        return this.users
    }
}

module.exports = Users