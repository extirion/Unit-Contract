const Web3 = require('web3');
const unitArtifact = require('../../build/contracts/Unit.json');

window.onload = function(){
  //variables
  let web3;
  let from;
  let unitContract;

  //Elementos iniciales
  const connectButton = document.getElementById('connect');
  const Content = document.getElementById('content');
  const account = document.getElementsByClassName('account')[0];
  const balance = document.getElementsByClassName('balance')[0];

  //Elementos Pruebas
  const receptor = document.getElementById('receiver');
  const iteraciones_prueba = document.getElementById('meta');
  const pruebasButton = document.getElementById('prueba');
  const status = document.getElementById("status");

  //Elementos balance
  const usuario = document.getElementById('user');
  const consultaBalanceButton = document.getElementById('consulta');
  const balance_usuario = document.getElementById('balance_user');

 //funciones

 //Funcion para conectarse a una cuenta y poder utilizar los servicios de metamask y utilizar web3
  const connect = async function() {
    if(window.ethereum){
      try {

        //Hacemos uso de la funcion request de web3 para obtener una coneccion a las cuentas disponible spor la billeteras
        await window.ethereum.request({method: 'eth_requestAccounts'});

        //instanciamos la funcion web3 par ejecutar todas las solicitudes que tengamos que hacer al contrato en la blockchain
        web3 = new Web3(window.ethereum);

        //Obtenemos las cuentas disponibles en la billetera virual
        let accounts = await web3.eth.getAccounts();

        //Obtenemos la primer dirrecion disponible, la cual sera siempre a la que estemos conectado a la red blockchain
        from = accounts[0];

        //Obtenemos el id de red que se utiliza para conectarse al blockchain
        const networkId = await web3.eth.net.getId();

        //Instanciamos el modulo de contrato con el cual poder enviar solicitudes a las funciones del contrato, enlazandolo al abi del contrato y a la red en la que se aloja
        unitContract = new web3.eth.Contract(
          unitArtifact.abi, 
          unitArtifact.networks[networkId].address
        );

        Content.style.display = 'initial';
        connectButton.style.display = 'none';
        account.innerHTML = from;
        refescarBalance();
      } catch (err) {
        console.log(err);
        alert('Has rechazado la conexion');
      }
    }else{
      alert('Necesitas un proveedor de web3')
    }
  };

  //Esta funcion se encarga de ejecutar la funcion de Qunit para realizar las pruebas y de llamar al contrato para validar
  const runTest = async function(){

    //Instanciamos el objeto control que se utiulizara para ejecutar las funciones de QUnit
    const control = require("./controlador/qunit");

    //Definimos las variables a utilizar para validar las preubas
    const para = receptor.value;
    const iteracion = iteraciones_prueba.value;
    const pruebas_validas = Math.round((50*iteracion)/100);
    console.log("meta: " + pruebas_validas)

    //Validamos que lo ingresado en los campos de la interfaz sean validos para la ejecucion de la prueba y la transaccion
    if(Number(iteracion) <= 0) {
      alert('Valor no permitido');
      return;
    }
    if(!web3.utils.isAddress(para)) {
      alert('Dirrecion invalida');
      return;
    }

    //Ejecutamos las pruebas unitarias, y enviamos el numero de pruebas exitosas a la funcion de obtener pruebas para hacer efectiva la transaccion del token
    control.prueba(iteracion);
    console.log(document.getElementsByClassName("passed")[1].innerHTML);
    const pruebas_exitosas = parseInt(document.getElementsByClassName("passed")[1].innerHTML,10);
    status.innerHTML = "Iniciando transacción... (por favor espere)";

    await unitContract.methods.getPruebasC(para,pruebas_exitosas,pruebas_validas).send({
      from,
    });

    //Mostramos el resultado de la transaccion
    if(pruebas_exitosas > pruebas_validas){
      status.innerHTML = "Se tuvo " + pruebas_exitosas + " pruebas existosas de "+ iteracion +"\nTransaccion completa!";
      receptor.value = "";
      iteraciones_prueba.value = "";
      refescarBalance();
    }else{
      status.innerHTML = "Se tuvo " + pruebas_exitosas + " pruebas existosas de "+ iteracion +"\nTransaccion fallida!";
      receptor.value = "";
      iteraciones_prueba.value = "";
      refescarBalance();
    }

  };

  //Esta funcion se encarga de refrescar la cantidad de tokens que tiene la cuenta creada
  const refescarBalance = async function() {
    const balanceUnit = await unitContract.methods.getBalance(from).call();
    balance.innerHTML = balanceUnit;
  }

  //Funcion que devuelve el balance de los tokens de un usuario en especifico
  const obtenerBalance = async function() {
    const user = usuario.value;

    if(!web3.utils.isAddress(user)) {
      alert('Dirrecion invalida');
      return;
    }

    const balanceUser = await unitContract.methods.getBalance(user).call();
    balance_usuario.innerHTML = "Balance de la cuenta "+ user +": " + balanceUser + " UMC";
    usuario.value="";
  };

  //listeners
  connectButton.onclick = connect;
  pruebasButton.onclick = runTest;
  consultaBalanceButton.onclick = obtenerBalance;

};