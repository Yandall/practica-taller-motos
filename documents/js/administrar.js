var usuarioActivo = ""


async function actualizarLista(){
    let lista = await obtenerUsuarios()
    lista = lista.usuarios
    let data = ""
    if(lista){
        for(let i = 0; i < lista.length; i++){
            let usuario = lista[i]
            data += `
                <tr>
                <td> ${i+1} </td>
                <td> ${usuario.nombre} ${usuario.apellidos} </td>
                <td> ${usuario.documento} </td>
                <td> ${usuario.rol} </td>
                <td> <button type="button" onclick="cargarUsuario(${usuario.documento})" class="btn btn-warning btn-sm">Editar</button>
                <button type="button" onclick="eliminarUsuario(${usuario.documento})" class="btn btn-danger btn-sm">Eliminar</button>
                </td>
                </tr>
            `
        }
    }
    document.getElementById("listaUsuarios").innerHTML = data
}

let obtenerValores = () => {
    let tipo_documento = document.getElementById("tipo_documento").value
    let documento = document.getElementById("documento").value
    let nombre = document.getElementById("nombre").value
    let apellidos = document.getElementById("apellidos").value
    let celular = document.getElementById("celular").value
    let correo = document.getElementById("correo").value
    let rol = document.getElementById("rol").value
    let clave = document.getElementById("clave").value
    return {tipo_documento, documento, nombre, apellidos, celular, correo, rol, clave}
}

let crearUsuario = () => {
    let usuario = obtenerValores()
    let postUsuario = new Request('/registrar', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(usuario)})
    fetch(postUsuario)
    .then(res => {
        return res.json()
    }).then(res => {
        actualizarLista()
        alert(res.message)
    })
    .catch(error => {
        console.log(error)
    })
} 

let cargarUsuario = (documento) => {
    let getUsuario = new Request(`/administrar/${documento}`, {method: 'GET'})
    fetch(getUsuario)
    .then(res =>{
        return res.json()
    }).then(res =>{
        res = res.usuario
        document.getElementById("tipo_documento").value = res.tipo_documento
        document.getElementById("documento").value = res.documento
        document.getElementById("nombre").value = res.nombre
        document.getElementById("apellidos").value = res.apellidos
        document.getElementById("celular").value = res.celular
        document.getElementById("correo").value = res.correo
        document.getElementById("rol").value = res.rol
        document.getElementById("clave").value = res.clave
        document.getElementById("clave").disabled = true
        document.getElementById("documento").disabled = true
        document.getElementById("tipo_documento").disabled = true

        document.getElementById("btnEditar").style.display = "inline"
        document.getElementById("btnCrear").style.display = "none"
        usuarioActivo = documento
    })
}

let editarUsuario = () => {
    let usuario= obtenerValores()
    usuario.documento = usuarioActivo
    let putUsuario = new Request('/administrar', {method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(usuario)})
    fetch(putUsuario)
    .then(res =>{
        return res.json()
    }).then(res =>{
        actualizarLista()
        alert(res.message)
    })
    .catch(error =>{
        console.log(error)
    })
    limpiarFormulario()

}

let eliminarUsuario = (documento) => {
    let deleteUsuario = new Request(`/administrar/${documento}`, {method: 'DELETE'})
    fetch(deleteUsuario)
    .then(res =>{
        return res.json()  
    }).then(res => {
        actualizarLista()
        alert(res.message)
        })    
    .catch(error =>{
        console.log(error)
    })
    limpiarFormulario()
}

let obtenerUsuarios = async () => {
    const getUsuarios = new Request('/administrar/all', {method: 'GET'})
    return fetch(getUsuarios)
    .then(res =>{
        return res.json()
    })
    .catch(error =>{
        console.log(error)    
    })
}

let limpiarFormulario = () => {
    document.getElementById("tipo_documento").value = 1
    document.getElementById("documento").value = ""
    document.getElementById("nombre").value = ""
    document.getElementById("apellidos").value = ""
    document.getElementById("celular").value = ""
    document.getElementById("correo").value = ""
    document.getElementById("rol").value = 1
    document.getElementById("clave").value = ""
    document.getElementById("clave").disabled = false
    document.getElementById("documento").disabled = false
    document.getElementById("tipo_documento").disabled = false

    document.getElementById("btnEditar").style.display = "none"
    document.getElementById("btnCrear").style.display = "inline"    
}

actualizarLista()
limpiarFormulario()