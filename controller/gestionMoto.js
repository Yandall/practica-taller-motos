const ServicioPG = require("../services/postgres")

let obtenerMotos = async () => {
    let s_pg = new ServicioPG()
    let sql = "select estado, placa, marca, modelo, vencimiento_soat, vencimiento_tecnomecanica from motos"
    return await s_pg.ejecutarSql(sql)
}

let obtenerMoto = async (placa) => {
    let s_pg = new ServicioPG()
    let sql = `select placa, estado, clase, marca, modelo, color, cilindraje, id_propietario, 
    nro_soat, vencimiento_soat, nro_tecnomecanica, vencimiento_tecnomecanica from motos where placa = $1`
    return await s_pg.ejecutarSql(sql, [placa])
}

let crearMoto = async (req, res) => {
    let moto = req.body
    let s_pg = new ServicioPG()
    let sql = `insert into motos (placa, estado, clase, marca, modelo, color, cilindraje, id_propietario, nro_soat,
        vencimiento_soat, nro_tecnomecanica, vencimiento_tecnomecanica) values ($1, $2, $3, $4, $5, $6, $7, $8, $9,
            $10, $11, $12)`
    await s_pg.ejecutarSql(sql, [moto.placa, moto.estado, moto.clase, moto.marca, moto.modelo, moto.color, 
        moto.cilindraje, moto.id_propietario, moto.nro_soat, moto.vencimiento_soat, moto.nro_tecnomecanica, moto.vencimiento_tecnomecanica])
    .then(res_bd => {
        res.status(200).send({ok: true, message: "Se creo correctamente el nuevo registro"})
    })
    .catch(error => {
        console.log(error)
        res.status(500).send({ok: false, message: "Hubo un error al crear el registro"})
    })
}

let actualizarMoto = async (req, res) => {
    let moto = req.body
    let s_pg = new ServicioPG()
    let sql = `update motos set estado = $1, color = $2, cilindraje = $3, id_propietario = $4, 
    nro_soat = $5, vencimiento_soat = $6, nro_tecnomecanica = $7, vencimiento_tecnomecanica = $8 where placa = $9`
    await s_pg.ejecutarSql(sql, [moto.estado, moto.color, moto.cilindraje, moto.id_propietario, 
        moto.nro_soat, moto.vencimiento_soat, moto.nro_tecnomecanica, moto.vencimiento_tecnomecanica, moto.placa])
    .then(res_bd => {
        res.status(200).send({ok: true, message:"Se editó correctamente la moto"})
    })
    .catch(error => {
        console.log(error)
        res.status(500).send({ok: false, message: "Hubo un error al editar la moto"})
    })
}

let eliminarMoto = async (req, res) => {
    let placa = req.params.placa
    let s_pg = new ServicioPG()
    let sql = "delete from motos where placa = $1"
    await s_pg.ejecutarSql(sql, [placa])
    .then(res_bd => {
        res.status(200).send({ok: true, message:"Se eliminó correctamente el moto"})
    })
    .catch(error => {
        console.log(error)
        res.status(500).send({ok: false, message: "Hubo un error al intentar eliminar al moto"})
    })
}

module.exports = {
    obtenerMotos,
    crearMoto,
    obtenerMoto,
    actualizarMoto,
    eliminarMoto
}