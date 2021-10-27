//Importamos librerias a utilizar
import {default as Web3} from 'web3';
import {default as contract} from 'truffle-contract';

import unitArtifact from "../../build/contracts/Unit.json";

var Unit = contract(unitArtifact);

window.runTest = function(){
  try{
    $("#status").html("Si entro")
  }catch(err){
    console.log(err)
  }
}