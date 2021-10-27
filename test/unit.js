var uniTest = artifacts.require("./Unit.sol");

contract('uniTest',function(accounts){
    it("Se recibio un valor de pruebas valido",function(){
        var contrato;
        var pruebas;
        //primero instanciamos la funcion para ejecutar la funcion en nuestro contrato
        return uniTest.deployed().then(function(instance){
            //guardamos en contrato el objeto instanciado al ejecutar el contrato
            contrato = instance;
            return contrato.getPruebasC.call(6);
        }).then(function(total){
            //guardamos en la preubas el resultado retornado por la funcion getPruebas y lo convertimos en numero
            pruebas = total.toNumber();
            //valida que el valor de prueba sea igual quel del segfundo parametro dado
            assert.equal(pruebas+1, 1);
        });
    });

    it("se recibio un valor de prueabs invalido", function(){
        var contrato;
        var pruebas;

        return uniTest.deployed().then(function(instance){
            contrato = instance;
            return contrato.getPruebasC.call(1);
        }).then(function(total){
            console.debug("No deberia llegar aqui porque deberia lanzar excepcion")
            pruebas = total.toNumber();
            //valida que el valor de prueba sea igual quel del segfundo parametro dado
            assert.equal(pruebas+1, 1);
        });
    });
});