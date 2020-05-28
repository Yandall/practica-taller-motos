const ServicioPG = require("../services/postgres")

let obtenerUsuarios = async () => {
    let s_pg = new ServicioPG()
    let sql = "select nombre, apellidos, documento, rol from usuarios"
    return await s_pg.ejecutarSql(sql)
}

let obtenerUsuario = async (documento) => {
    let s_pg = new ServicioPG()
    let sql = "select tipo_documento, documento, nombre, apellidos, celular, correo, rol, clave from usuarios where documento = $1"
    return await s_pg.ejecutarSql(sql, [documento])
}

let actualizarUsuario = async (req, res) => {
    let usuario = req.body
    let s_pg = new ServicioPG()
    let sql = "update usuarios set nombre = $1, apellidos = $2, celular = $3, correo = $4, rol = $5 where documento = $6"
    await s_pg.ejecutarSql(sql, [usuario.nombre, usuario.apellidos, usuario.celular, usuario.correo, usuario.rol, usuario.documento])
    .then(res_bd => {
        res.status(200).send({ok: true, message:"Se editó correctamente el usuario"})
    })
    .catch(error => {
        console.log(error)
        res.status(500).send({ok: false, message: "Hubo un error al editar el usuario"})
    })
}

let eliminarUsuario = async (req, res) => {
    let documento = req.params.documento
    let s_pg = new ServicioPG()
    let sql = "delete from usuarios where documento = $1"
    await s_pg.ejecutarSql(sql, [documento])
    .then(res_bd => {
        res.status(200).send({ok: true, message:"Se eliminó correctamente el usuario"})
    })
    .catch(error => {
        console.log(error)
        res.status(500).send({ok: false, message: "Hubo un error al intentar eliminar al usuario"})
    })
}

module.exports = {
    obtenerUsuarios,
    obtenerUsuario,
    actualizarUsuario,
    eliminarUsuario
}