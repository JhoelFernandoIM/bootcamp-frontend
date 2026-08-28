const inputPeso = document.querySelector('.peso');
const inputAltura = document.querySelector('.altura')
const btnCalcular = document.querySelector('.button_calcular')
const sectionContainer = document.querySelector('section.container')

btnCalcular.addEventListener('click', () => {
    const peso =parseFloat(inputPeso.value);
    const alturaCm = parseFloat(inputAltura.value);

    if (isNaN(peso) || isNaN(alturaCm) || peso <= 0 || alturaCm <= 0) {
        mostrarResultado('Por favor, ingresa números válidos.', '', 'text-red-500');
        return;
    }

    const alturaM = alturaCm / 100;
    const imc = peso / (alturaM * alturaM);

    let condicion = '';
    let colorClase = '';

    if (imc < 18.5) {
        condicion = 'Bajo peso';
        colorClase = 'text-yellow-600';
    } else if (imc >= 18.5 && imc <= 24.9) {
        condicion = 'Normal';
        colorClase = 'text-green-600';
    } else if (imc >= 25 && imc <= 29.9) {
        condicion = 'Sobrepeso';
        colorClase = 'text-orange-500';
    } else {
        condicion = 'Obeso';
        colorClase = 'text-red-600';
    }

    const mensaje = `Tu IMC es <strong>${imc.toFixed(2)}</strong> (${condicion})`;
        mostrarResultado(mensaje, colorClase);

});

function mostrarResultado(mensaje, colorClase) {
    // Verificar si ya existe el contenedor de resultado para no duplicarlo
    let divResultado = document.querySelector('.resultado-imc');
    
    if (!divResultado) {
        divResultado = document.createElement('div');
        divResultado.className = 'resultado-imc mt-4 p-3 rounded-lg text-center font-semibold bg-gray-100 border border-gray-200';
        sectionContainer.appendChild(divResultado);
    }

    divResultado.className = `resultado-imc mt-4 p-3 rounded-lg text-center font-semibold bg-gray-100 border border-gray-200 ${colorClase}`;
    divResultado.innerHTML = mensaje;
}