const express = require("express")
const app = express()
const path = require("path")
app.use(express.json())



app.get("/", (req, res) =>{
    res.sendFile(path.join(__dirname, "documents/index.html"))

app.get("/styles.css", (req, res) =>{
    res.sendFile(path.join(__dirname, "documents/css/styles.css"))
    })
})

const route_autenticacion = require("./routes/autenticacion")
app.use(route_autenticacion)

const route_home = require("./routes/home")
app.use(route_home)

const route_administrar = require("./routes/administrar")
app.use(route_administrar)

const route_gestionMoto = require("./routes/gestionMoto")
app.use(route_gestionMoto)

const route_asignar = require("./routes/asignar")
app.use(route_asignar)

const route_pendientes = require("./routes/pendientes")
app.use(route_pendientes)

const port = 3000
app.listen(port, () =>{
    console.log("Corriendo server")
})