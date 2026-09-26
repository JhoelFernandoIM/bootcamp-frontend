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
// function App() {
//   return (
  
//   <>
//     <h1>React.js</h1> 
//     <p>Estamos aprendiendo sobre compoenentes</p>
//   </>
//   )
// }

// 04 - Extensiones de VSCODE para usar con React.js
// ES7 + React/Redux/React-Native snippers

//Snippers para crear componentes (rfc, rafce)

//snippert: rfc

// function App() {
//   return (
//     <div>App</div>
//   )
// }

// snippet: rafce 


// const App = () => {
//   return (
//     <div>App</div>
//   )
// }



// 05 - Anidar componentes dentro de otros

// function ComponenteSaludo () {
//   return <h4>Hola a todos!</h4>
// }

// function ComponenteDespedida() {
//   return <h4>Adios a todos!</h4>
// }

// const App = () => {
//   return (
//     <section>
//       <h3>Componentes anidados</h3>


//       <ComponenteSaludo />

//       <ComponenteDespedida  />
//     </section>
//   )
// }


//06 - Importando componentes externos

import ComponenteSaludo from "./components/ComponenteSaludo"

import ComponenteDespedida from "./components/ComponenteDespedida"

//TODO: Crear componete CompoenteDespedida en su propio archivo e importarlo en el componete App

// const App = () => {
//   return (
//     <section>
//       <h3>Componentes externos</h3>

//       <ComponenteSaludo/>

//       <ComponenteDespedida/>
//     </section>
//   )
// }

// export default App

// 07 - Usando expresiones con JSX -> "{}"

import nombreExportado, {frutas, curso} from "./modulo.js"


const App = () => {
  //Lógica del componente
  const suma = 8 + 9
  const nombre = 'Jhoel'

  // Comentario en React.js van dentro del cuerpo de la funci'on
  /* comentario multilinea */


  return (
    <section>
      <h1>Usando expresiones con jsx</h1>

      <p>hola {suma}</p>
      <p>hola {1+2*9**2}</p>
      <p>{nombre}</p>

      <p>Hola {nombre}</p>
      <p>{`Hola ${nombre}`}</p>


      {/*Comentarios en react.js dentro de JSX */}
      

      <p>{frutas}</p>
      <p>{nombreExportado} </p>
      <p>{JSON.stringify(curso)}</p>
      <p>{curso.nota}</p>

    </section>
  )
}

export default App