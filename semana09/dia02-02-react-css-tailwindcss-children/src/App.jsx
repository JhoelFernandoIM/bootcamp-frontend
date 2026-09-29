import './Card.css'

const Card = () =>{
  return (
    <section className= "card" 
    style={{ backgroundColor: 'yellow', padding: '8px'}}
    >
      <h1 className='title'>Hola React</h1>

      <p className='description'>
        Estoy aprendiendo estilos con React.js
      </p>

      <button className='button'>
        Ok
      </button>
    </section>
  )
}

const App = () => {
  return (
    <Card/>
  )
}

export default App