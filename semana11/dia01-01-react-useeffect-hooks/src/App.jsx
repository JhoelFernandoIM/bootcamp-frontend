//useEffect: Sirve para decirle a react que después de mostrar o actualizar un  componente, quiero hacer algo.

import { useEffect, useState } from "react"

export default function App() {
  const [count, setCount] = useState(0)

  console.log('Hola a todos')

  useEffect(() => {
    //se ejecuta en cada render
    // console.log('El componente apareció')
    console.log('El contador cambió:', count)
  })

  useEffect(() => {
    //sOLO se ejecuta al aparecer el componente por primera vez
    console.log('Imprime esto solamente cuando el componente aparezca por primera VEZ')
  }, [])

  useEffect(() => {
    console.log('cuando cambia count')
  }, [count])

  return (
    <div className="text-2xl">
      
      <h1>Count: {count}</h1>

      <button onClick={() => setCount(count + 1)}>+1</button>
      
    </div>
  )
}

