const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function sumarDosNumeros() {
    rl.question('Ingrese el primer número: ', (num1) => {
        rl.question('Ingrese el segundo número: ', (num2) => {
            const suma = parseFloat(num1) + parseFloat(num2);
            console.log(`La suma de ${num1} y ${num2} es: ${suma}`);
            rl.close();
        });
    });
}

sumarDosNumeros();