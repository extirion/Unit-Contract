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
        await window.ethereum.request({method: 'eth_requestAccounts'});

        web3 = new Web3(window.ethereum);

        let accounts = await web3.eth.getAccounts();

        from = accounts[0];

        const networkId = await web3.eth.net.getId();

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
    const control = require("./controlador/qunit");
    const para = receptor.value;
    const iteracion = iteraciones_prueba.value;
    const pruebas_validas = 1;

    if(Number(iteracion) <= 0) {
      alert('valor no permitido');
      return;
    }
    if(!web3.utils.isAddress(para)) {
      alert('Dirrecion invalida');
      return;
    }

    //Obtiene el numero de pruebas que pasaron
    control.prueba(iteracion);
    console.log(document.getElementsByClassName("passed")[1].innerHTML);
    const pruebas_exitosas = parseInt(document.getElementsByClassName("passed")[1].innerHTML,10);
    status.innerHTML = "Iniciando transacción... (por favor espere)";

    const test = await unitContract.methods.getPruebasC(para,pruebas_exitosas,pruebas_validas).send({
      from,
    });

    console.log("test: " + test);
    
    if(pruebas_exitosas > pruebas_validas){
      status.innerHTML = "Se tuvo " + pruebas_exitosas + " pruebas existosas de "+ iteracion +"\nTransaccion completa!";
      refescarBalance();
    }else{
      status.innerHTML = "Se tuvo " + pruebas_exitosas + " pruebas existosas de "+ iteracion +"\nTransaccion fallida!";
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
    balance_usuario.innerHTML = "Balance: " + balanceUser;
  };

  //listeners
  connectButton.onclick = connect;
  pruebasButton.onclick = runTest;
  consultaBalanceButton.onclick = obtenerBalance;

};