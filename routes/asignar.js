const express = require("express")
const router = express.Router()
const path = require("path")
const _controller = require("../controller/asignar")

router.get("/asignar", (req, res) =>{
    res.sendFile(path.join(__dirname, "../documents/asignar.html"))
})

router.get("/asignar.js", (req, res) =>{
    res.sendFile(path.join(__dirname, "../documents/js/asignar.js"))
})

router.get("/nav-tab.js", (req, res) => {
  res.sendFile(path.join(__dirname, "../documents/js/nav-tab.js"))
})

router.get("/styles.css", (req, res) =>{
  res.sendFile(path.join(__dirname, "../documents/css/styles.css"))
})

router.get("/asignar/:tipo", async (req, res) => {
    let tipo = req.params.tipo
    if(tipo === "motos"){
        await _controller.obtenerMotos()
        .then(res_bd => {
            res.status(200).send({ok: true, message: "Se obtuvieron exitosamente las motos", motos: res_bd.rows})
        })
        .catch(error => {
            console.log(error)
            res.status(500).send({ok: false, message: "Hubo un error al obtener las motos"})
        })
    } else if (tipo === "mecanicos") {
        await _controller.obtenerMecanicos()
        .then(res_bd => {
            res.status(200).send({ok: true, message:"Se obtuvieron exitosamente los mecánicos", mecanicos: res_bd.rows})
        })
        .catch(error => {
            console.log(error)
            res.status(500).send({ok: false, message:"Hubo un error al obtener los mecánicos"})
        })
    }
})

router.post("/asignar", _controller.asignar)

module.exports = router