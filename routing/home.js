const { Router } = require("express")
const path = require("path")
var router = Router()
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../", "./client/welcome.html")) // send client "HOME" screen
})

router.get("/chat", (req, res) => {
    if (!req.query.name) {
        res.status(401).redirect("/")
        return
    }
    res.sendFile(path.join(__dirname, "../", "./client/home.html")) // send client "HOME" screen
})
module.exports = router