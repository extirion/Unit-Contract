//Funcion solver: Se encarga de dar solucion a la operacion ingresada
function solver(operation){
	//variable
	let numero = ""; 
	let numeros = [];
	let operaciones = [];
	//Ciclo para recorrer la operacion ingresada
	for(let i = 0; i <= operation.length-1; i++) {
		//Valida si el caracter es un numero
		if (!isNaN(operation[i])) {
			if (i < operation.length-1) {
				numero += operation[i];
			}else{
				numero += operation[i];
				numeros.push(parseInt(numero,10));
			}
		}else{
			//Valida si el carcter, al no ser un numero, es un simbolo de operacion permitido
			if (simbolo(operation[i]) == true) {
				if(i < operation.length-1){
					operaciones.push(operation[i]);
					numeros.push(parseInt(numero,10));
					numero = "";
				}else{
					operaciones.push(operation[i]);
					numeros.push(parseInt(numero,10));
					numeros.push(0);
				}
			}else{
				//Si no lo es termina el proceso
				break;
			}
		}
	}

	let solucion = 0;
	//Ciclo para resolver la operación ingresada
	for(let i = 0; i <= operaciones.length-1; i++){
		if (operaciones[i] == "+") {
			if (i == 0) {
				solucion = numeros[0] + numeros[1];
			}else{
				solucion += numeros[i+1];
			}
		}else if (operaciones[i] == "-") {
			if (i == 0) {
				solucion = numeros[0] - numeros[1];
			}else{
				solucion -= numeros[i+1];
			}
		}else if (operaciones[i] == "*") {
			if (i == 0) {
				solucion = numeros[0] * numeros[1];
			}else{
				solucion *= numeros[i+1];
			}
		}else if (operaciones[i] == "/") {
			if (i == 0) {
				solucion = numeros[0] / numeros[1];
			}else{
				solucion /= numeros[i+1];
			}
		}
	}
	return solucion
}

//Funcion simbolo: Verifica si el carcter pasado por parametro es un simbolo de de operacion permitido
function simbolo(caracter){
	if (caracter == "+") {
		return true;
	}else if (caracter == "-") {
		return true;
	}else if (caracter == "*") {
		return true;
	}else if (caracter == "/") {
		return true;
	}else{
		return false;
	}
}

module.exports = {
    "solver": solver
}