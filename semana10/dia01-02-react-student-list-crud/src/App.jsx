const App = () => {
  return (
    <main>
      <h1>Student CRUD</h1>

      <form> 
        <label>
          <span>Name</span>
          <input 
          type="text" 
          name="name"
          placeholder="Ex. Jhoel Ingalla"
          required
          />
        </label>

        <label>
          <span>City</span>
          <input 
          type="text" 
          name="city"
          placeholder="Ex. Juliaca"
          required
          />
        </label>

        <div>
          <input 
          type="submit" 
          value="Save"
          />
          <input 
          type="submit" 
          value="Clear"
          />
        </div>

      </form>

      <h2>Student list</h2>

      <section>
        <div>
          <div>Name</div>
          <div>City</div>
          <div>Actions</div>
        </div>

        <div>
          <div>Student 1</div>
          <div>Juliaca</div>
          <div>
            <button>/</button>
            <button>X</button>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App