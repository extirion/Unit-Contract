// SPDX-License-Identifier: MIT
pragma solidity >=0.4.25;

contract Unit {
    //variables
    mapping (address => uint) balances;

    event Transfer(address indexed _from, address indexed _to, uint256 _value);

    //Constructor
    constructor() public {
        balances[msg.sender] = 14000;
    }

    //Metodos
    function getBalance(address receiver) public view returns(uint) {
        return balances[receiver];
        //return balances[msg.sender];
    }

    //La idea es que en esta funcion igual se haga el traspso de monto directamente a la dirreccion destino
    function getPruebasC(address payable receiver, uint pruebas) public payable returns(bool result){
        require(pruebas > 4);
        balances[msg.sender] -= 10;
        balances[receiver] += 10;
        receiver.transfer(10);
        return true;
    }


}