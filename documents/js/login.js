async function login() {
    let documento = document.getElementById("documento").value
    let clave = document.getElementById("clave").value
    let usuario = {
        documento,
        clave
    }

    let request = new Request('/login', {method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(usuario)})
    await fetch(request)
    .then(res =>{
        return res.json()
    })
    .then(res => {
        if(res.ok){
            alert(res.message)
            localStorage.setItem("usuario", JSON.stringify(res.usuario))
            document.location.href = "/home"
        } else {
            alert(res.message)
        }
    })
    .catch(error => {
        console.log(error)
    })
}