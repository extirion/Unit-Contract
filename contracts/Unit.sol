// SPDX-License-Identifier: MIT
pragma solidity >=0.4.25;

contract Unit {

    //variables

    string public name;
    string public symbol;
    uint8 public decimals;

    //Maximo de unitcoin disponibles
    uint public max_unitcoin;
    
    //Registro contable que lleva control del balance del token dentro del contrato
    mapping (address => uint256) public balance_unitcoins;

    //Registro de las ultimas pruebas realizadas por los usuarios
    mapping (address => uint) public registro_pruebas;

    //Eventos
    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner,address indexed _spender, uint _value);
    
    //Constructor del contrato
    constructor(string memory _name, string memory _symbol, uint8 _decimals, uint256 _totalUnitCoins) public {
        name = _name;
        symbol = _symbol;
        decimals = _decimals;
        max_unitcoin = _totalUnitCoins;
        balance_unitcoins[msg.sender] = max_unitcoin;
        emit Transfer(address(0), msg.sender, _totalUnitCoins);
    }
    
    //Metodos
    //FUncion que retorna el balace de tokens que lleva un usuario en concreto al recibir como parametro su direccion publica
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