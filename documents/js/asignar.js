
async function actualizarListas(){
    let listaMotos = await obtenerMotos()
    let listaMecanicos = await obtenerMecanicos()
    listaMotos = listaMotos.motos
    console.log(listaMotos)
    listaMecanicos = listaMecanicos.mecanicos
    let dataMotos = ""
    let dataMecanicos = ""
    if(listaMotos){
        for(let i = 0; i < listaMotos.length; i++){
            let moto = listaMotos[i]
            dataMotos += `
                <tr>
                <td> ${i+1} </td>
                <td> ${moto.estado}</td>
                <td> ${moto.placa} </td>
                <td> ${moto.marca} ${moto.modelo}</td>
                <td> <input type="radio" name="moto" value="${moto.placa}" </input></td>
                </tr>
            `
        }
    }

    document.getElementById("listaMotos").innerHTML = dataMotos

    if(listaMecanicos){
        for(let i = 0; i < listaMecanicos.length; i++){
            let mecanico = listaMecanicos[i]
            dataMecanicos += `
                <tr>
                <td> ${i+1} </td>
                <td> ${mecanico.nombre} ${mecanico.apellidos} </td>
                <td> ${mecanico.documento} </td>
                <td><input type="radio" name="mecanico" value="${mecanico.documento}" </input> </td>
                </tr>
            `
        }
    }
    document.getElementById("listaMecanicos").innerHTML = dataMecanicos
}

let obtenerMotos = async () => {
    const getMotos = new Request('/asignar/motos', {method: 'GET'})
    return fetch(getMotos)
    .then(res =>{
        return res.json()
    })
    .catch(error =>{
        console.log(error)    
    })
}

let obtenerMecanicos = async () => {
    const getMecanicos = new Request('/asignar/mecanicos', {method: 'GET'})
    return fetch(getMecanicos)
    .then(res =>{
        return res.json()
    })
    .catch(error =>{
        console.log(error)    
    })
}

let asignar = async () => {
    let moto = ""
    let mecanico = ""
    let listaMotos = document.getElementsByName("moto")
    let listaMecanicos = document.getElementsByName("mecanico")
    for (let i = 0; i < listaMotos.length; i++) {
        if(listaMotos[i].checked){
            moto = listaMotos[i].value
            console.log(moto)
        }
    }
    for(let i = 0; i < listaMecanicos.length; i++) {
        if(listaMecanicos[i].checked){
            mecanico = listaMecanicos[i].value
        }
    }

    if(moto == "" || mecanico == "") {
        alert("Por favor seleccione una moto y un mecanico para asignar un mantenimiento")
        return
    }

    let mantenimiento = {placa: moto, documento: mecanico}
    console.log(mantenimiento)

    let postMantenimiento = new Request('/asignar', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(mantenimiento)})
    fetch(postMantenimiento)
    .then(res => {
        return res.json()
        .then(res => {
            alert(res.message)
            actualizarListas()
        })
    })
    .catch(error => {
        console.log(error)
    })
}

actualizarListas()