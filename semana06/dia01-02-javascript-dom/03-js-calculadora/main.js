console.log('Hola Js')

let numeroActual = '0'
let operador = ''
let operando = ''

//Consultar un elemento a la vez
// const inputDisplay = document.getElementById('inputDisplay')
const inputDisplay  = document.querySelector('#inputDisplay')

// console.log({inputDisplay})
//consultar múltiples elementos a la vez
const buttons = document.querySelectorAll('.button')
// console.log(buttons)

//EVENTOS

buttons.forEach(function(button) {
    button.addEventListener('click', function(event) {
        // console.log('hice click', event.target)

        const buttonText = event.target.textContent

        if ('*-+'.includes(buttonText)) {
            //02. Accionamos al operador
            operador = buttonText
            operando =Number(numeroActual)
            numeroActual = '0'

        } else if (buttonText === '=') {
            // 03. aquí realizamos las operaciones en base al número actual del operando
            if (operador === '+') {
                numeroActual = Number(operando) + Number(numeroActual)
            }
            if (operador === '-') {
                numeroActual = Number(operando) - Number(numeroActual)
            }
            if (operador === '*') {
                numeroActual = Number(operando) * Number(numeroActual)
            }

        } else if (buttonText === 'C') {
            // 04. Limpiamos operando, operador y el input

            numeroActual = '0'
            operador = ''
            operando = ''

        }
        else {
            // 01. se presiono algún número
            numeroActual = Number(numeroActual + buttonText)
        }

        inputDisplay.value = numeroActual
    })
})