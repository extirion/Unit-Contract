function prueba(iteraciones){
    const solver = require("../modelo/solver");

    test( 'Testing solver()', function() {
        ok( solver.solver("3+1") );
        ok( solver.solver("3+1") );
        /*
        for(i = 0;i<iteraciones;i++){
            operacion = Math.random()*3
            console.log("operacion: " + operacion)
            if(operacion == 1){
                ok( solver.solver("3+1") );
            }else if(operacion == 2){
                ok( solver.solver(5));
            }else if(operacion == 3){
                ok( solver.solver("33+2") );
            }else{
                ok( solver.solver("4l3"));
            }
        }*/
    } );
}

module.exports = {
    "prueba": prueba
}