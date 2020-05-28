const ServicioPG = require("../services/postgres")

let login = async(req, res) =>{
    let usuario = req.body
    let s_pg = new ServicioPG()
    let sql = "select tipo_documento, documento, nombre, apellidos, celular, correo, rol, clave from usuarios where documento = $1 and clave = md5($2)"
    await s_pg.ejecutarSql(sql, [usuario.documento, usuario.clave])
    .then(res_bd => {
        if(res_bd.rows.length > 0){
            res.status(200).send({ok: true, message: "Ingreso exitoso", usuario: res_bd.rows[0]})
        } else {
            res.status(500).send({ok: false, message: "Clave y/o usuario incorrecto"})
        }
    })
    .catch(error => {
        console.log(error)
    })

}

let registrar = async(req, res) => {
    let user = req.body
    let s_pg = new ServicioPG()
    let sql = "insert into usuarios (tipo_documento, documento, nombre, apellidos, celular, correo, rol, clave) values ($1, $2, $3, $4, $5, $6, $7, md5($8))"
    await s_pg.ejecutarSql(sql, [user.tipo_documento, user.documento, user.nombre, user.apellidos, user.celular, user.correo, user.rol, user.clave])
    .then(res_bd => {
        res.status(200).send({ok: true, message: "Se creó correctamente el nuevo usuario"})
    })
    .catch(error => {
        console.log(error)
        res.status(500).send({ok: false, message: "Hubo un error al crear el usuario"})
    })
}

module.exports = {
    login,
    registrar
}