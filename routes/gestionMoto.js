const express = require("express")
const router = express.Router()
const path = require("path")
const _controller = require("../controller/gestionMoto")

router.get("/gestionMoto", (req, res) =>{
    res.sendFile(path.join(__dirname, "../documents/gestionMoto.html"))
})

router.get("/nav-tab.js", (req, res) => {
  res.sendFile(path.join(__dirname, "../documents/js/nav-tab.js"))
})

router.get("/gestionMoto.js", (req, res) => {
    res.sendFile(path.join(__dirname, "../documents/js/gestionMoto.js"))
})

router.get("/styles.css", (req, res) =>{
  res.sendFile(path.join(__dirname, "../documents/css/styles.css"))
})

router.get("/gestionMoto/:placa", async (req, res) => {
    let placa = req.params.placa
    if(placa == "all") {
        await _controller.obtenerMotos()
        .then(res_bd => {
            res.status(200).send({ok: true, message: "Se cargó correctamente los motos", motos: res_bd.rows})
        })
        .catch(error => {
            console.log(error)
            res.status(500).send({ok: false, message: "Hubo un error al cargar los motos"})
        })
    } else {
        await _controller.obtenerMoto(placa)
        .then(res_bd => {
            res.status(200).send({ok: true, message: "Se cargó correctamente el moto", moto: res_bd.rows[0]})
        })
        .catch(error => {
            console.log(error)
            res.status(500).send({ok: false, message: "Hubo un error al buscar el moto"})
        })
    }
})

router.post("/gestionMoto/crear", _controller.crearMoto)
router.put("/gestionMoto", _controller.actualizarMoto)
router.delete("/gestionMoto/:placa", _controller.eliminarMoto)

module.exports = router