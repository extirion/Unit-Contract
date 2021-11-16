// SPDX-License-Identifier: MIT
pragma solidity >=0.4.25;

contract Unit {

    //variables

    //Maximo de unitcoin disponibles
    uint public max_unitcoin = 10003;

    //Numero total de unitcoins comprados
    uint public total_unitcoin_bought = 0;
    
    //Registro contable que lleva control del balance del token dentro del contrato
    mapping (address => uint) balance_unitcoins;

    //Registro de las ultimas pruebas realizadas por los usuarios
    mapping (address => uint) registro_pruebas;
    
    //Constructor del contrato
    constructor() public {
        balance_unitcoins[msg.sender] = max_unitcoin;
    }
    
    //Metodos


    function getBalance(address receiver) public view returns(uint) {
        return balance_unitcoins[receiver];
    }

    //Funcion con la que se evalua que el numero de pruebas acertadas sean iguales o mayores a la establecida para recompenzar a un usuario en concreto
    function getPruebasC(address receiver, uint exitosos, uint prueba) public {
        require(balance_unitcoins[msg.sender] > 20);
        if (exitosos > prueba){
            balance_unitcoins[msg.sender] -= 20;
            balance_unitcoins[receiver] += 20;
            registro_pruebas[receiver] = exitosos;
        }
    }

}