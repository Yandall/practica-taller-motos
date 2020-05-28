const express = require("express")
const router = express.Router()
const path = require("path")
const _controller = require("../controller/administrar")

router.get("/administrar", (req, res) =>{
    res.sendFile(path.join(__dirname, "../documents/administrar.html"))
})

router.get("/nav-tab.js", (req, res) => {
  res.sendFile(path.join(__dirname, "../documents/js/nav-tab.js"))
})

router.get("/administrar.js", (req, res) => {
    res.sendFile(path.join(__dirname, "../documents/js/administrar.js"))
})

router.get("/styles.css", (req, res) =>{
  res.sendFile(path.join(__dirname, "../documents/css/styles.css"))
})

router.get("/administrar/:documento", async (req, res) => {
    let documento = req.params.documento
    if(documento == "all") {
        await _controller.obtenerUsuarios()
        .then(res_bd => {
            res.status(200).send({ok: true, message: "Se cargó correctamente los usuarios", usuarios: res_bd.rows})
        })
        .catch(error => {
            console.log(error)
            res.status(500).send({ok: false, message: "Hubo un error al cargar los usuarios"})
        })
    } else {
        await _controller.obtenerUsuario(documento)
        .then(res_bd => {
            res.status(200).send({ok: true, message: "Se cargó correctamente el usuario", usuario: res_bd.rows[0]})
        })
        .catch(error => {
            console.log(error)
            res.status(500).send({ok: false, message: "Hubo un error al buscar el usuario"})
        })
    }
})

router.put("/administrar", _controller.actualizarUsuario)
router.delete("/administrar/:documento", _controller.eliminarUsuario)

module.exports = router