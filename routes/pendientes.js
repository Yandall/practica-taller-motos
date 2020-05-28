const express = require("express")
const router = express.Router()
const path = require("path")
const _controller = require("../controller/pendientes")

router.get("/pendientes", (req, res) =>{
    res.sendFile(path.join(__dirname, "../documents/pendientes.html"))
})

router.get("/pendientes.js", (req, res) => {
  res.sendFile(path.join(__dirname, "../documents/js/pendientes.js"))
})

router.get("/styles.css", (req, res) =>{
  res.sendFile(path.join(__dirname, "../documents/css/styles.css"))
})

router.get("/pendientes/:tipo/:documento", async (req, res) => {
  let tipo = req.params.tipo
  let documento = req.params.documento
  if(tipo == "pendientes") {
    await _controller.obtenerPendientes(documento)
    .then(res_bd => {
      if(res_bd.rows.length > 0) {
        res.status(200).send({ok: true, message: "Se obtuvieron exitosamente los mantenimientos pendientes", lista: res_bd.rows})
      } else {
        res.status(500).send({ok: false, message: "No se obtuvieron mantenimientos pendientes"})
      }
    })
  } else if(tipo == "listos") {
    await _controller.obtenerListos(documento)
    .then(res_bd => {
      if(res_bd.rows.length > 0) {
        res.status(200).send({ok: true, message: "Se obtuvieron exitosamente los mantenimientos listos", lista: res_bd.rows})
      } else {
        res.status(500).send({ok: false, message: "No se obtuvieron mantenimientos listos"})
      }  
    })
  }
})

router.get("/pendientes/:placa", async (req, res) => {
  let placa = req.params.placa
  await _controller.obtenerPendiente(placa)
  .then(res_bd => {
    res.status(200).send({ok: true, message:"Se obtuvo exitosamente el mantenimiento", mantenimiento: res_bd.rows[0]})
  })
  .catch(error => {
    console.log(eror)
    res.status(500).send({ok: false, message:"Hubo un error al obtener el mantenimiento"})
  })
})

router.put("/pendientes", _controller.actualizarMantenimiento)
module.exports = router