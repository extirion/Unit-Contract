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
    const pruebas_validas = 2;

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

    unitContract.methods.getPruebasC(para,pruebas_exitosas,pruebas_validas).send({
      from,
    });

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




/*

//Importamos librerias a utilizar
import {default as Web3} from "web3";
import unitArtifact from "../../build/contracts/Unit.json";

const App = {
  web3: null,
  account: null,
  meta: null,

  start: async function() {
    const { web3 } = this;

    try {
      // generar la instancia del contrato Unit
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = unitArtifact.networks[networkId];
      this.meta = new web3.eth.Contract(
        unitArtifact.abi,
        deployedNetwork.address,
      );

      // obtener la cuenta de la red
      const accounts = await web3.eth.getAccounts();
      this.account = accounts[0];

      this.refescarBalance();
    } catch (error) {
      console.error("No podemos conectarnos al contrato o a la cadena");
    }
  },

  //Este evento se encarga de refrescar la cantidad de tokens que tiene la cuenta creada 
  refescarBalance: async function() {
    console.log(this.account);
    const { getBalance } = this.meta.methods;
    const balance = await getBalance(this.account).call();

    console.log("balance: " + balance)

    const balanceElement = document.getElementsByClassName("balance")[0];
    balanceElement.innerHTML = balance;
  },

  //Evento que devuelve el balance de los tokens de un usuario en especifico
  obtenerBalance: async function() {
    const user = document.getElementById("user").value;
    const { getBalance } = this.meta.methods;
    const balance = await getBalance(user).call();

    const balanceU = document.getElementById("balance_user");
    balanceU.innerHTML = balance;
    console.log("balance2 " + balance);
  },

  //Este evento se encarga de ejecutar la funcion de Qunit para realizar las pruebas y de llamar al contrato para validar
  runTest: async function() {
    try{
      const control = require("./controlador/qunit");
      const meta_pruebas = document.getElementById("meta").value;

      if(meta_pruebas > 0){
        const receiver = document.getElementById("receiver").value;
        //Obtiene el numero de pruebas que pasaron
        control.prueba(meta_pruebas);
        console.log(document.getElementsByClassName("passed")[1].innerHTML);
        const pruebas = parseInt(document.getElementsByClassName("passed")[1].innerHTML,10);
        this.setStatus("Iniciando transacción... (por favor espere)");

        const { getPruebasC } = this.meta.methods;
        await getPruebasC(receiver, pruebas, 2).send({ from: this.account });

        if(pruebas > 1){
          this.setStatus("Se tuvo " + pruebas + " pruebas existosas de "+ meta_pruebas +"\nTransaccion completa!");
          this.refescarBalance();
        }else{
          this.setStatus("Se tuvo " + pruebas + " pruebas existosas de "+ meta_pruebas +"\nTransaccion fallida!");
          this.refescarBalance();
        }
      }else{
        alert("Numero de pruebas ingresada invalida");
        return;
      }

    }catch (err){
      alert("No se puedo realizar el envio del token");
    }
  },

  setStatus: function(message) {
    const status = document.getElementById("status");
    status.innerHTML = message;
  },
};

window.App = App;

window.addEventListener("load", function() {
  if (window.ethereum) {
    // use MetaMask's provider
    App.web3 = new Web3(window.ethereum);
    window.ethereum.request({method: 'eth_requestAccounts'}); // get permission to access accounts
  } else {
    console.warn(
      "No se detectó web3. Volviendo a http://127.0.0.1:7545. Debe eliminar este respaldo cuando implemente la petición",
    );
    // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
    App.web3 = new Web3(
      new Web3.providers.HttpProvider("http://127.0.0.1:7545"),
    );
  }

  App.start();
});*/