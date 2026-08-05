// la siguiente linea es consola
console.log('Hola Javascript')

/*cometario en bloque
de lineas */

//TIPOS DE DATOS

//1Number
//Ejemplo: 123, 34.89, -67
console.log(20)
console.log(typeof 20)
console.log(123)
console.log(typeof 123)
console.log(34.89)
console.log(typeof 34.89)
console.log(-67)
console.log(typeof -67)
console.log(Number.MAX_SAFE_INTEGER)
console.log(Number.MIN_SAFE_INTEGER)

//2string
console.log("Jhoel")
console.log(typeof "Jhoel")
console.log('Ingalla')
console.log(typeof 'Ingalla')

//3boolean
console.log(true)
console.log(false)

//4undefined
let x //declarando una variable
console.log(x)

//5null, intencionalmente esta vacio

let nombre = null
console.log(nombre)

//Ejercicio: verificar que tipo de datos devuelven las siguientes lineas
console.log(typeof 10)
console.log(typeof "hola")
console.log(typeof true)
console.log(typeof undefined)
console.log(typeof null) //esto es un error(bug) de JS

//VARIABLE
//const (valores que no cambian durante la ejecución)

const pi = 3.141599

console.log(pi)

// pi = 4.98888 //error: Uncaught TypeError: Assignment to constant variable.

//let (pueden cambiar los valores durante la ejecución del programa)

let edad = 20

console.log(edad)

//operadores matemáticos

console.log(1 + 3)
console.log(6 - 5)
console.log(2 * 8)
console.log(2 / 8)
console.log(10 / 2)
console.log(7 % 2) //operador del residuo
console.log(3 ** 2)
console.log(Math.pow(3,2)) //exponente 2) //exponente

// Ejercicio: Dadas dos variables, a con valor 10 y b con valor 3. Realiza una operación que permita obtener el residuo de la división entre a y b. Luego muestra el resultado en consola.

const a = 10
const b = 3
const residuo = a % b

console.log(residuo)

//COMPARACIONES

// Igualdad debil

console.log(1 == "1") //solo compara sus valores, no su tipo de dato

//Igualdad estricta (RECOMENDACIÓN: Usar siempre)

console.log(1 === "1") //false compara el valor y el tipo de dato

//operadores lógicos (AND, OR, NEGACION)

console.log(true && false) //false
console.log(true || false) // true
console.log(!true) //false

// 1. Definir las variables para hallar el área de un triángulo. Base = 10, Altura = 5. Imprimir el resultado en la consola.

let Base = 10
let Altura = 5

console.log((Base*Altura)/2) //25

//concatenación

let nombre2 = "Fernando"
let edad2 = 23

console.log("Hola "+ nombre2)
console.log("Hola " + nombre2 + ", tienes " + edad2 + " años")
//Mejor forma de concatenar (template string) - backtick (altgr + }) comilla inverrtida en tuteclado es si sale solo ` `
console.log(`Hola ${nombre2}, tienes ${edad2} años`) //con interpolacion

//Condicionales

let numero = 4

if (numero % 2 === 0) {
    console.log('Es par')
}

let nota = 12

if (nota >= 13) {
    console.log('Aprobado')
} else {
    console.log('Desaprobado')
}

let heroe = 'Spiderman'

if (heroe === 'Batman') {
    console.log('Hola soy Bruce Wayne')
} else if (heroe === 'Spiderman') {
    console.log('Hola soy Peter Parker')
} else if (heroe === 'Ironman') {
    console.log('Hola soy Tony Stark')
} else {
    console.log('No soy un heroe')
}

//INVESTIGAR ESTRUCTURA SWITCH

//estructuras repetititvas
//FOR

// console.log(0)
// console.log(1)
// console.log(2)
// console.log(3)
// console.log(4)
// console.log(5)
// console.log(6)
// console.log(7)
// console.log(8)
// console.log(9)

for (let i = 0; i < 10; i++) {
    console.log(i)
}

// while

let j = 0

while (j < 10) {
    console.log('while', j)

    j++
}

// do while, buscar diferencia TAREA con while

// EJERCICIOS

// 2. Dado un número, mostrar "par y mayor a 10", "par y menor o igual a 10", "Impar"

let n = 3

if (n % 2 === 0 && n > 10) {
    console.log('El número es par y mayor a 10 ')
} else if (n % 2 === 0 && n <= 10) {
    console.log('El número es par y menor a 10 ')
} else if (n % 2 !==0) {
    console.log('El número es impar')
}

// 3. Dado un número entero, escribe un programa que:
// - Muestre "fizzbuzz" si el número es divisible entre 3 y 5.
// - Muestre "fizz" si el número es divisible solo entre 3.
// - Muestre "buzz" si el número es divisible solo entre 5.
// - En cualquier otro caso, debe mostrar el mismo número.

let r = 15

if (r % 5 === 0 && r % 3 === 0) {
    console.log('fizzbuzz')
} else if (r % 3 === 0) {
    console.log('fizz')
} else if (r % 5 === 0) {
    console.log('buzz')
} else {
    console.log(r)
}

//FUNCION
//Funcion basica

function saludar () {
    console.log('Hola funciones!')
}

saludar()
saludar()
saludar()

//funciones con parametros

function saludoConNombre(nombre) {
    console.log('Hola ' + nombre)
}

saludoConNombre('Fernando')
saludoConNombre()

// Funciones que retornan valores
function sumar(a, b) {
    const suma = a + b

    return suma // Devolver solo el resultado de lo que se opere
}
console.log(sumar(2,3))


//Ejercicio

function esPar(numero) {
    return numero % 2 === 0
}

console.log(esPar(4)) //true
console.log(esPar(7)) // false

// Ejercicios



// 1. Crear una función que reciba un número y devuelva el doble de ese número por consola

function duplicar(t) {
    const doble = t * 2
    return doble
}

console.log(duplicar(2))


// 2. Crear una función que reciba dos números y devuelva el mayor por consola

function MayorDeDosNumeros (a,b) {
    if (a > b) {
        console.log(a, 'es mayor')
    } else if (b > a) {
        console.log(b, 'es mayor')
    } else {
        console.log('Los números son iguales')
    }
}

MayorDeDosNumeros(3,5)

// 3. Reutilizar el ejercicio de fizzBuzz usando funciones de tal forma que puedan llamarlo de la siguiente manera. Ej. fizzBuzz(15) -> fizzbuzz

//PENDIENTE



//CADENA DE TEXTO

//Propiedad .length

console.log("Hola".length)

//acceder a cada caracter, empeiza con 0

let miNombre = 'Jhoel'
console.log(miNombre[0]) //J
console.log(miNombre[1]) //h
console.log(miNombre[2]) // o

//metodos importantes de las cadenas de texto

console.log(miNombre.toLowerCase())
console.log(miNombre.toUpperCase())
console.log(miNombre.includes('ho'))
