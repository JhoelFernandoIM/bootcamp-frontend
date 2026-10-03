const App = () => {
  return (
    <main className="w-96 mx-auto border border-slate-400 rounded-lg mt-6 p-4">
      <h1 className="text-2xl text-center text-slate-700 font-bold mb-4">Student CRUD</h1>

      <form
        className="flex flex-col gap-4 bg-slate-100 p-3 rounded-lg border"
      > 
        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-slate-900">Name</span>
          <input 
          className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg w-full px-4 py-2"
          type="text" 
          name="name"
          placeholder="Ex. Jhoel Ingalla"
          required
          />
        </label>

        <label className="flex flex-col gap-2">
          <span className="text-sm font-medium text-slate-900">City</span>
          <input 
          className="bg-slate-50 border border-slate-300 text-slate-900 text-sm rounded-lg w-full px-4 py-2"
          type="text" 
          name="city"
          placeholder="Ex. Juliaca"
          required
          />
        </label>

        <div className="flex gap-4">
          <input 
          className="bg-blue-700 text-white hover:bg-blue-800 font-medium rounded-lg text-sm w-full px-4 py-2 text-center cursor-pointer"
          type="submit" 
          value="Save"
          />
          <input 
          className="bg-slate-500 text-white hover:bg-slate-600 font-medium rounded-lg text-sm w-full px-4 py-2 text-center cursor-pointer"
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