import Web3 from "web3";
import unitArtifact from "../../build/contracts/Unit.json";

const App = {
  web3: null,
  account: null,
  meta: null,

  start: async function() {
    const { web3 } = this;

    try {
      // obtener instancia del contrato
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = unitArtifact.networks[networkId];
      this.meta = new web3.eth.Contract(
        unitArtifact.abi,
        deployedNetwork.address,
      );

      // obtener cuentas
      const accounts = await web3.eth.getAccounts();
      this.account = accounts[0];

      this.refescarBalance();
    } catch (error) {
      console.error("No podemos conectarnos al contrato o a la cadena");
    }
  },

  refescarBalance: async function() {
    const { getBalance } = this.meta.methods;
    const balance = await getBalance(this.account).call();

    const balanceElement = document.getElementsByClassName("balance")[0];
    balanceElement.innerHTML = balance;
  },

  runTest: async function() {
    const amount = 500;
    const receiver = document.getElementById("receiver").value;

    this.setStatus("Iniciando transacción... (por favor espere)");

    const { getPruebasC } = this.meta.methods;
    await getPruebasC(8, amount).send({ from: this.account });

    this.setStatus("Transaccion completa!");
    this.refreshBalance();
  },

  setStatus: function(message) {
    const status = document.getElementById("estatus");
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
