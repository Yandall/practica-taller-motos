var usuario = JSON.parse(localStorage.getItem("usuario"))

{
    let text = document.getElementById("bienvenida").innerText
    text = text.replace("$1", usuario.nombre)
    document.getElementById("bienvenida").innerText = text

}