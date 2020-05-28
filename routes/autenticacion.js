const express = require("express")
const router = express.Router()
const path = require("path")
const _controller = require("../controller/autenticacion")

router.get("/login", (req, res) =>{
    res.sendFile(path.join(__dirname, "../documents/login.html"))
})

router.get("/login.js", (req, res) => {
  res.sendFile(path.join(__dirname, "../documents/js/login.js"))
})

router.get("/styles.css", (req, res) =>{
  res.sendFile(path.join(__dirname, "../documents/css/styles.css"))
})

router.post("/login", _controller.login)
router.post("/registrar", _controller.registrar)

module.exports = router