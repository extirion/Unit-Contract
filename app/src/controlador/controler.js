const data = new FormData();

function control(){
    console.log("entro a la funcion");

    data.append('dato', document.getElementById('meta').value);

    fetch(
        'http://localhost:8080/unit-contract/app/src/unit.php',
        {
            method: 'POST',
            body: data
        })
        .then(function(response) {
            if (response.ok) {
                return response.text()
                //console.log(response.json())
            } else {
                throw "Error en la llamada al servidor";
            }
        })
        .then(function(respuestaDelServidor) {
            document.getElementById('test').innerHTML = "Resultado de la prueba es:" + respuestaDelServidor
            console.log(respuestaDelServidor);
        })
        .catch(function(err) {
            console.log(err);
        });
}

module.exports = {
    "control": control
}