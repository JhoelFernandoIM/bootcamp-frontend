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

      <h2 className="text-center text-slate-700 font-bold my-4">Student list</h2>

      <section className="mt-4 flex flex-col gap-2">
        <div className="flex justify-between items-center gap-2 bg-slate-300 px-4 py-2 rounded-lg">
          <div className="text-left">Name</div>
          <div className="text-left">City</div>
          <div className="flex gap-2">Actions</div>
        </div>

        <div className="flex justify-between items-center gap-2 bg-slate-100 px-4 py-2 rounded-lg">
          <div className="text-left">Student 1</div>
          <div className="text-left">Juliaca</div>
          <div className="flex gap-2">
            <button>/</button>
            <button>X</button>
          </div>
        </div>

        
      </section>
    </main>
  )
}

export default App