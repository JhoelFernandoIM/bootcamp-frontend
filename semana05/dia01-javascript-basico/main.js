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

