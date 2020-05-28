var usuario = JSON.parse(localStorage.getItem("usuario"))
var mantenimientoActivo = ""

let registrarMantenimiento = async () => {
    let trabajos_realizados = document.getElementById("trabajos_realizados").value
    let horas_invertidas = document.getElementById("horas_invertidas").value
    let estado = document.getElementById("estado").value
    let nro_tecnomecanica = document.getElementById("nro_tecnomecanica").value
    let vencimiento_tecnomecanica = document.getElementById("vencimiento_tecnomecanica").value
    if(trabajos_realizados == "" || horas_invertidas == "" || estado == "" || nro_tecnomecanica == "" ||
    vencimiento_tecnomecanica == "") {
        alert("Por favor rellena todos los campos")
        return
    }
    let mantenimiento = {trabajos_realizados, horas_invertidas, estado, nro_tecnomecanica, vencimiento_tecnomecanica, placa: mantenimientoActivo}
    console.log(mantenimiento)
    let putMantenimiento = new Request('/pendientes', {method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(mantenimiento)})
    await fetch(putMantenimiento)
    .then(res => {
        return res.json()
    })
    .then(res => {
        limpiarFormulario()
        actualizarListas()
        alert(res.message)
    })
    .catch(error => {
        console.log(error)
    })
}

let actualizarListas = async () => {
    let listaPendientes = []
    let listaListos = []
    listaPendientes = await obtenerPendientes()
    let data = ""
    if(listaPendientes) {
        for(let i = 0; i < listaPendientes.length; i++){
            let pendiente = listaPendientes[i]
            data += `
                    <tr>
                    <td> ${i+1} </td>
                    <td> ${pendiente.estado}</td>
                    <td> ${pendiente.placa} </td>
                    <td> ${pendiente.marca} ${pendiente.modelo}</td>
                    <td> ${pendiente.vencimiento_soat}</td>
                    <td> ${pendiente.vencimiento_tecnomecanica}</td>
                    <td> <button type="button" onclick="cargarPendiente('${pendiente.placa}')" class="btn btn-warning btn-sm">Seleccionar</button>
                    </td>
                    </tr>
                `
        }
        document.getElementById("listaPendientes").innerHTML = data
    }
    
    data = ""
    listaListos = await obtenerListos()
    if(listaListos){
        for(let i = 0; i < listaListos.length; i++){
            let listo = listaListos[i]
            data += `
                    <tr>
                    <td> ${i+1} </td>
                    <td> ${listo.placa} </td>
                    <td> ${listo.marca} ${listo.modelo}</td>
                    <td> ${listo.trabajos_realizados}</td>
                    <td> ${listo.horas_invertidas}</td>
                    </tr>
                `   
        }
        document.getElementById("listaListos").innerHTML = data
    }
    
}

let obtenerPendientes = async () => {
    let documento = usuario.documento
    let getPendientes = new Request(`/pendientes/pendientes/${documento}`, {method: 'GET'})
    return fetch(getPendientes)
    .then(res => {
        return res.json()        
    })
    .then(res => {
        if(res.ok){
            return res.lista
        } else  {
            alert(res.message)
        }
    })
    .catch(error => {
        console.log(error)
    })
    
}

let obtenerListos = async () => {
    let documento = usuario.documento
    let getListos = new Request(`/pendientes/listos/${documento}`, {method: 'GET'})
    return fetch(getListos)
    .then(res => {
        return res.json() 
        
    })
    .then(res => {
        if(res.ok){
            return res.lista
        }
    })
    .catch(error => {
        console.log(error)
    })
}

let cargarPendiente = async (placa) => {
    let getPendiente = new Request(`/pendientes/${placa}`, {method: 'GET'})
    return fetch(getPendiente)
    .then(res => {
        return res.json()
    })
    .then(res => {
        if(res.ok){
            res = res.mantenimiento
            document.getElementById("placa").value = res.placa
            document.getElementById("estado").value = res.estado
            document.getElementById("clase").value = res.clase
            document.getElementById("marca").value = res.marca
            document.getElementById("modelo").value = res.modelo
            document.getElementById("color").value = res.color
            document.getElementById("cilindraje").value = res.cilindraje
            document.getElementById("nro_soat").value = res.nro_soat
            document.getElementById("nro_tecnomecanica").value = res.nro_tecnomecanica
            document.getElementById("vencimiento_tecnomecanica").value = res.vencimiento_tecnomecanica
            document.getElementById("btnCrear").disabled = false

            mantenimientoActivo = res.placa
        } else {
            alert(res.message)
        }
    })
    .catch(error => {
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
    document.getElementById("nro_soat").value = ""
    document.getElementById("nro_tecnomecanica").value = ""
    document.getElementById("vencimiento_tecnomecanica").value = ""
    document.getElementById("trabajos_realizados").value = ""
    document.getElementById("horas_invertidas").value = ""
    document.getElementById("btnCrear").disabled = true

    mantenimientoActivo = ""
}

limpiarFormulario()
actualizarListas()