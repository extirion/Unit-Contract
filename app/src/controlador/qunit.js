function prueba(iteraciones){
    const solver = require("../modelo/solver");

    test( 'Testing solver()', function() {
        ok( solver.solver("3+1") );
        ok( solver.solver("5+4+3") );
        ok( solver.solver("33+2") );
    } );
}

module.exports = {
    "prueba": prueba
}