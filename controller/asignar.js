const ServicioPG = require("../services/postgres")

let obtenerMotos = () => {
    let s_pg = new ServicioPG()
    let sql = `select estado, motos.placa, marca, modelo from motos 
    left join mantenimientos on motos.placa = mantenimientos.placa where mantenimientos.placa is null`
    return s_pg.ejecutarSql(sql)
}

let obtenerMecanicos = () => {
    let s_pg = new ServicioPG()
    let sql = "select nombre, apellidos, documento from usuarios where rol = 1"
    return s_pg.ejecutarSql(sql)
}

let asignar = async (req, res) => {
    let info = req.body
    let mecanico = info.documento
    let moto = info.placa
    let s_pg = new ServicioPG()
    let sql = `insert into mantenimientos (id_mecanico, placa, fecha) values ($1, $2, CURRENT_DATE)`
    await s_pg.ejecutarSql(sql, [mecanico, moto])
    .then(res_bd => {
        res.status(200).send({ok: true, message: "Se asignó correctamente el mantenimiento"})
    })
    .catch(error => {
        console.log(error)
        res.status(500).send({ok: false, message: "Hubo un error al asignar el mantenimiento"})
    })
}

module.exports = {
    obtenerMecanicos,
    obtenerMotos,
    asignar
}