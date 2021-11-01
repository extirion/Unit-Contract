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
    function getBalance() public view returns(uint) {
        return balances[msg.sender];
    }

    //La idea es que en esta funcion igual se haga el traspso de monto directamente a la dirreccion destino
    function getPruebasC(uint pruebas, uint amount) public view returns(uint r){
        if (balances[msg.sender] > amount){
            if(pruebas > 5){
                //balances[msg.sender] -= amount;
                //balances[receiver] += amount;
                //emit Transfer(msg.sender, receiver, amount);
                return r = pruebas;
            }else{
                return r = 0;
            }
        }else{
            revert();
        }
    }
}