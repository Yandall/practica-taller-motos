const express = require("express")
const router = express.Router()
const path = require("path")

router.get("/home", (req, res) =>{
    res.sendFile(path.join(__dirname, "../documents/home.html"))
})

router.get("/nav-tab.js", (req, res) => {
  res.sendFile(path.join(__dirname, "../documents/js/nav-tab.js"))
})
router.get("/home.js", (req, res) => {
  res.sendFile(path.join(__dirname, "../documents/js/home.js"))
})

router.get("/styles.css", (req, res) =>{
  res.sendFile(path.join(__dirname, "../documents/css/styles.css"))
})

module.exports = router