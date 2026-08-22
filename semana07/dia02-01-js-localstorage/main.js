// LocalStorage

//Es una forma de guardar datos en el navegador
//LS es para guardar solo cadenas de texto
//Límite: ~5MB

//Solo se guarda en nuesta computadora

//Guardar datos
localStorage.setItem('nombre', 'Jhoel')

//Obtener o recuperar los datos de LS
console.log(localStorage.getItem('nombre'))
console.log(localStorage.getItem('color'))

//Eliminar un dato
localStorage.removeItem('nombre')

//Limpiar todo
// localStorage.clear()

//Guardar objetos o arreglos

//Importante: tenemos que convertirlos a cadena de texto

const user = {name: 'Jhoel', age: 23}

// Guardar un objeto/array

localStorage.setItem('user', user)
localStorage.setItem('user', JSON.stringify(user))

//Obtener o recuperar un objeto/array
const user2 = JSON.parse(localStorage.getItem('user'))

console.log(user2.name, user2.age)