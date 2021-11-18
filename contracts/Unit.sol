// SPDX-License-Identifier: MIT
pragma solidity >=0.4.25;

contract Unit {

    //variables

    string public name;
    string public symbol;
    string public decimals;

    //Maximo de unitcoin disponibles
    uint public max_unitcoin = 10003;
    
    //Registro contable que lleva control del balance del token dentro del contrato
    mapping (address => uint256) public balance_unitcoins;

    //Registro de las ultimas pruebas realizadas por los usuarios
    mapping (address => uint) public registro_pruebas;

    //Eventos
    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner,address indexed _spender, uint _value);
    
    //Constructor del contrato
    constructor() public {
        balance_unitcoins[msg.sender] = max_unitcoin;
    }
    
    //Metodos

    function getBalance(address receiver) public view returns(uint256) {
        return balance_unitcoins[receiver];
    }

    //Funcion con la que se evalua que el numero de pruebas acertadas sean iguales o mayores a la establecida para recompenzar a un usuario en concreto
    function getPruebasC(address receiver, uint exitosos, uint prueba) public returns(bool){
        require(balance_unitcoins[msg.sender] > 20);
        if (exitosos > prueba){
            balance_unitcoins[msg.sender] -= 20;
            balance_unitcoins[receiver] += 20;
            registro_pruebas[receiver] = exitosos;
            emit Transfer(msg.sender, receiver, 20);
            return true;
        }else{
            return false;
        }
    }

}