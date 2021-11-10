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

  refescarBalance: async function() {
    console.log(this.account);
    const { getBalance } = this.meta.methods;
    const balance = await getBalance(this.account).call();

    const balanceElement = document.getElementsByClassName("balance")[0];
    balanceElement.innerHTML = balance;
  },

  runTest: async function() {
    const control = require("./controlador/qunit")
    control.prueba(document.getElementById("meta").value);
    console.log(document.getElementsByClassName("passed")[1].innerHTML);

    const pruebas = document.getElementsByClassName("passed")[1].innerHTML;

    const receiver = document.getElementById("receiver").value;

    this.setStatus("Iniciando transacción... (por favor espere)");

    const { getPruebasC } = this.meta.methods;
    await getPruebasC(this.account, pruebas).send({ from: this.account });

    this.setStatus("Se tuvo " + pruebas + "pruebas existosas\nTransaccion completa!");
    this.refreshBalance();
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
    window.ethereum.enable(); // get permission to access accounts
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
});