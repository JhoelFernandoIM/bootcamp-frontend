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

//Insertar nuevos elementos en un arreglo al final (push)

const listaDeNombres = ['Daril', 'Jhoel']

console.log(listaDeNombres)

listaDeNombres.push('Victor')
listaDeNombres.push('Carlos')

console.log(listaDeNombres)

//Remover los elementos del final de un arrelgo

listaDeNombres.pop()
listaDeNombres.pop()
console.log(listaDeNombres)

//como insertar un elemento en una posición determinada

listaDeNombres.splice(0, 0, 'CÓDIGO')
listaDeNombres.splice(2, 0, 'TECSUP')

console.log(listaDeNombres)

//Eliminar un elemento en una posición determinada

listaDeNombres.splice(2, 1)
console.log(listaDeNombres)

//Obtener el tamaño de nuestro arreglo

console.log(listaDeNombres.length)
console.log('bienvenido'.length)

//Obtener el último elemento del arreglo

console.log(listaDeNombres[3 - 1])
console.log(listaDeNombres[listaDeNombres.length - 1])
console.log(listaDeNombres.at(-0))
console.log(listaDeNombres.at(-1))
console.log(listaDeNombres.at(-2))

//TODO: Otras funciones - slice (investigar, permite sacar porciones de un arreglo)

//MÉTODOS DE ARREGLOS (INCLUDES, FILTER, MAP, SORT, FOREACH, REDUCE)

// Método INCLUDES, nos indica si el valor que se pasa como parametro se encuentra en el arreglo

const lenguajes = ['javascript', 'php', 'python', 'C', 'c++', 'java', 'python']

console.log(lenguajes.includes('java')) //true
console.log(lenguajes.includes('cobol')) //false

//METODO FILTER, Ubica un elemento dentro de un arreglo usando una condicion y devuelve un nuevo arreglo conlo que encontro

const resultado = lenguajes.filter(function(item) {
    // return item === 'java'
    // return item === 'python'
    // return item.includes('c') || item.includes('C')
    return  item.toLowerCase().includes('c')
})

console.log(resultado)

