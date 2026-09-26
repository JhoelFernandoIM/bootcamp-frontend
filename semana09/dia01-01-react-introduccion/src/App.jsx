//01 - Componente base usando function

// function App () {
//   return <h1>Hola React.js</h1>
// }

// // const App = () => {
// //   return <h1>Hola React.js</h1>
// // }

// export default App

// ¿Qué es un componente?
//* Es una función, devuelve JSX, todo componente en su nombre empieza con mayúscula

//Partes de un componente:
//1. Imports (Si los hay)
//2. Lógica (variables, hooks, functions)
//3. Return -> JSX
//4. Export (Nos sirve para crear un módulo ES)

//Reglas básicas de un componente
// * Un solo elemento padre
// *Es recomendable que la función tenga el mismo nombre el archivo. Ej App.jsx -> App


//02 - Componente usando múltiples  líneas

// function App() {
//   return <div>
//     <h1>React js.</h1> 
//     <p>Estamos aprendiendo sobre compoenentes</p>
//   </div>
// }



//03 - Componente usando Fragments (<>/>)
function App() {
  return (
  
  <>
    <h1>React.js</h1> 
    <p>Estamos aprendiendo sobre compoenentes</p>
  </>
  )
}

export default App