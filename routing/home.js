const { Router } = require("express")
const path = require("path")
var router = Router()
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../", "./client/index.html")) // send client "HOME" screen
})
module.exports = router