module.exports = {
    log: (entry) => {
        let logEntry = `[${new Date().toLocaleString()}]: ${entry}`
        console.log(logEntry)
        return logEntry
    },
    random: (len=6) => {
        let chars = "0123456789abdcef"
        var final = ""
        for (let i = 0; i < len; i++) {
            final += chars[Math.round(Math.random()*chars.length)]
        }
        return final
    }
}