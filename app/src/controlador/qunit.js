function prueba(iteraciones){
    const solver = require("../modelo/solver");

    for(i = 1; i <= iteraciones;i++){
        QUnit.test( "hello test", function(assert) {
            assert.ok( 1 == 1, "Passed!" );
        });
    }    
/*
    QUnit.module('solver', function(){
        QUnit.test('operacion', function(assert){
            assert.equal(solver('1'),2)
            assert.equal(solver('1'),1)
        });
    });*/

}

module.exports = {
    "prueba": prueba
}