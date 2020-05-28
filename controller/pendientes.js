const ServicioPG = require("../services/postgres")

let obtenerPendientes  = async (documento) => {
    let s_pg = new ServicioPG()
    let sql = `select motos.placa, motos.estado, motos.clase, motos.marca, motos.modelo, motos.color,
    motos.cilindraje, motos.nro_soat, motos.vencimiento_soat, motos.nro_tecnomecanica, motos.vencimiento_tecnomecanica
    from motos inner join mantenimientos on mantenimientos.placa = motos.placa where mantenimientos.id_mecanico = $1 
    AND mantenimientos.trabajos_realizados is NULL `
    return await s_pg.ejecutarSql(sql, [documento])
}

let obtenerListos = async (documento) => {
    let s_pg = new ServicioPG()
    let sql = `select motos.placa, motos.marca, motos.modelo, mantenimientos.trabajos_realizados,
    mantenimientos.horas_invertidas from motos inner join mantenimientos on mantenimientos.placa = motos.placa
    where mantenimientos.id_mecanico = $1 AND mantenimientos.trabajos_realizados is NOT NULL`
    return await s_pg.ejecutarSql(sql, [documento])
}

let obtenerPendiente = async (placa) => {
    let s_pg = new ServicioPG
    let sql = `select motos.placa, motos.estado, motos.clase, motos.marca, motos.modelo, motos.color,
    motos.cilindraje, motos.nro_soat, motos.nro_tecnomecanica, motos.vencimiento_tecnomecanica
    from motos inner join mantenimientos on mantenimientos.placa = motos.placa where mantenimientos.placa = $1`
    return await s_pg.ejecutarSql(sql, [placa])
}

let actualizarMantenimiento = async (req, res) => {
    let mantenimiento = req.body
    let s_pg = new ServicioPG()
    let sql = `update mantenimientos set fecha = CURRENT_DATE, trabajos_realizados = $1, horas_invertidas = $2 
    where placa = $3`
    await s_pg.ejecutarSql(sql, [mantenimiento.trabajos_realizados, mantenimiento.horas_invertidas, mantenimiento.placa])
    .then( async (res_bd) => {
        let sql = `update motos set estado = $1, nro_tecnomecanica = $2, vencimiento_tecnomecanica = $3
        where placa = $4`
        await s_pg.ejecutarSql(sql, [mantenimiento.estado, mantenimiento.nro_tecnomecanica, 
            mantenimiento.vencimiento_tecnomecanica, mantenimiento.placa])
            .then(res_bd => {
                res.status(200).send({ok:true, message: "Se registró el mantenimiento con éxito"})
            })
    })
    .catch(error =>  {
        console.log(error)
        res.status(500).send({ok: false, message: "Hubo un error al registrar el mantenimiento"})
    })
}

module.exports = {
    obtenerPendientes,
    obtenerListos,
    obtenerPendiente,
    actualizarMantenimiento
}