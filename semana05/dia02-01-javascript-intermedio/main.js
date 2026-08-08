console.log('hola mundo')

//DATOS PRIMITIVOS (Number, String, Boolean, null, undefined, BigInt, Symbol)

// DATOS NO PRIMITIVOS (Arrays (Arreglos), Objects (Objetos), Function, )

//arrays, puede contener elementos de cualquier tipo

//DECLARACIÓN

const arregloVacio = []
const listaDeNumeros = [25, 36, 89, -99, 15.60]
const listaDeValores = [1, 2, 3, 'Jhoel', 'Ingalla', 'Código', true, null, undefined]

console.log(arregloVacio)
console.log(listaDeNumeros)
console.log(listaDeValores)

//Lectura de los elementos de un arreglo

console.log(listaDeValores[0]) //1
console.log(listaDeValores[3]) //Jhoel
console.log(listaDeValores[3] + ' ' + listaDeValores[4])
console.log(listaDeValores[5])
console.log(listaDeValores[99])
console.log(listaDeValores[8])

//Escritura en un arreglo

listaDeValores[3] = 'Victor'
listaDeValores[7] = 1689

console.log(listaDeValores)

Object.freeze(listaDeValores)
listaDeValores[8] = 'Hola a todos'
console.log(listaDeValores)
