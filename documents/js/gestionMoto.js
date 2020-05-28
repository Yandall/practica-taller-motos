var motoActiva = ""


let actualizarLista = async () => {
    let lista = await obtenerMotos()
    lista = lista.motos
    let data = ""
    if(lista){
        for(let i = 0; i < lista.length; i++){
            let moto = lista[i]
            data += `
                <tr>
                <td> ${i+1} </td>
                <td> ${moto.estado}</td>
                <td> ${moto.placa} </td>
                <td> ${moto.marca} ${moto.modelo}</td>
                <td> ${moto.vencimiento_soat}</td>
                <td> ${moto.vencimiento_tecnomecanica}</td>
                <td> <button type="button" onclick="cargarMoto('${moto.placa}')" class="btn btn-warning btn-sm">Editar</button>
                <button type="button" onclick="eliminarMoto('${moto.placa}')" class="btn btn-danger btn-sm">Eliminar</button>
                </td>
                </tr>
            `
        }
    }
    document.getElementById("listaMotos").innerHTML = data
}

let obtenerValores = () => {
    let placa = document.getElementById("placa").value
    let estado = document.getElementById("estado").value
    let clase = document.getElementById("clase").value
    let marca = document.getElementById("marca").value
    let modelo = document.getElementById("modelo").value
    let color = document.getElementById("color").value
    let cilindraje = document.getElementById("cilindraje").value
    let id_propietario = document.getElementById("id_propietario").value
    let nro_soat = document.getElementById("nro_soat").value
    let vencimiento_soat = document.getElementById("vencimiento_soat").value
    let nro_tecnomecanica = document.getElementById("nro_tecnomecanica").value
    let vencimiento_tecnomecanica = document.getElementById("vencimiento_tecnomecanica").value
    return {placa, estado, clase, marca, modelo, color, cilindraje, id_propietario, nro_soat, 
        vencimiento_soat, nro_tecnomecanica, vencimiento_tecnomecanica}
}

let registrarMoto = () => {
    let moto = obtenerValores()
    let postMoto = new Request('/gestionMoto/crear', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(moto)})
    fetch(postMoto)
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

let cargarMoto = (placa) => {
    console.log(placa)
    let getMoto = new Request(`/gestionMoto/${placa}`, {method: 'GET'})
    fetch(getMoto)
    .then(res =>{
        return res.json()
    }).then(res =>{
        res = res.moto
        document.getElementById("placa").value = res.placa
        document.getElementById("estado").value = res.estado
        document.getElementById("clase").value = res.clase
        document.getElementById("marca").value = res.marca
        document.getElementById("modelo").value = res.modelo
        document.getElementById("color").value = res.color
        document.getElementById("cilindraje").value = res.cilindraje
        document.getElementById("id_propietario").value = res.id_propietario
        document.getElementById("nro_soat").value = res.nro_soat
        document.getElementById("vencimiento_soat").value = res.vencimiento_soat
        document.getElementById("nro_tecnomecanica").value = res.nro_tecnomecanica
        document.getElementById("vencimiento_tecnomecanica").value = res.vencimiento_tecnomecanica
        document.getElementById("placa").disabled = true
        document.getElementById("clase").disabled = true
        document.getElementById("marca").disabled = true
        document.getElementById("modelo").disabled = true

        document.getElementById("btnEditar").style.display = "inline"
        document.getElementById("btnCrear").style.display = "none"
        motoActivo = placa
    })
}

let editarMoto = () => {
    let moto= obtenerValores()
    moto.placa = motoActivo
    let putMoto = new Request('/gestionMoto', {method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(moto)})
    fetch(putMoto)
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

let eliminarMoto = (placa) => {
    let deleteMoto = new Request(`/gestionMoto/${placa}`, {method: 'DELETE'})
    fetch(deleteMoto)
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

let obtenerMotos = async () => {
    const getMotos = new Request('/gestionMoto/all', {method: 'GET'})
    return fetch(getMotos)
    .then(res =>{
        return res.json()
    })
    .catch(error =>{
        console.log(error)    
    })
}

let limpiarFormulario = () => {
    document.getElementById("placa").value = ""
    document.getElementById("estado").value = ""
    document.getElementById("clase").value = ""
    document.getElementById("marca").value = ""
    document.getElementById("modelo").value = ""
    document.getElementById("color").value = ""
    document.getElementById("cilindraje").value = ""
    document.getElementById("id_propietario").value = ""
    document.getElementById("nro_soat").value = ""
    document.getElementById("vencimiento_soat").value = ""
    document.getElementById("nro_tecnomecanica").value = ""
    document.getElementById("vencimiento_tecnomecanica").value = ""
    document.getElementById("placa").disabled = false
    document.getElementById("clase").disabled = false
    document.getElementById("marca").disabled = false
    document.getElementById("modelo").disabled = false

    document.getElementById("btnEditar").style.display = "none"
    document.getElementById("btnCrear").style.display = "inline"    
}

actualizarLista()
limpiarFormulario()