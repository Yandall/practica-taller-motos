var usuario = JSON.parse(localStorage.getItem("usuario"))

{
    let rol = usuario.rol
    if(rol === 1){
        document.getElementById("btnAdministrar").style.display = "none"
        document.getElementById("btnAsignar").style.display = "none"
    } else {
        document.getElementById("btnPendientes").style.display = "none"
    }
}

let logout = () => {
    document.location.href ="/"
    localStorage.removeItem("usuario")
}