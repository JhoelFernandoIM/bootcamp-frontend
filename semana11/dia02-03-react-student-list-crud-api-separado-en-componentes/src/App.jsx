import { useEffect, useState } from "react"

import Swal from 'sweetalert2'
import { fetchStudents, createStudent, removeStudent, updateStudent } from "./services/students"
import Form from "./components/Form"

const App = () => {
  const DEFAULT_STUDENTS = [
  ]

  const [students, setStudents] = useState([])


  useEffect(() => {
    console.log('cargando students...')
    fetchStudents()
    .then(data => setStudents(data))
    
  }, []) //Este use effect se ejecuta la primera vez que el componente se crea




  const handleDelete = (id) => {

    //TODO implementar boton eliminar de cada estudiante para eliminar el apibox
    console.log('Eliminando', id)

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        removeStudent(id)
        .then(() => {
          fetchStudents()
            .then(data => setStudents(data))

        })


      }
    });
  }

  // TODO: Implementar el boton editar y el boton save del formulario

  const handleEdit = (student) => {
    console.log('Actualizando', student)
    setForm({
      id: student.id,
      name: student.name,
      city: student.city
    })
  }

  const handleSubmit = (newStudent) => {
    console.log('hola Submit', newStudent)

    createStudent(newStudent)
      .then(() => {
        fetchStudents()
          .then(data => setStudents(data))
      })

  }

  return (
    <main className="w-96 mx-auto border border-slate-400 rounded-lg mt-6 p-4">
      <h1 className="text-2xl text-center text-slate-700 font-bold mb-4">Student CRUD</h1>

      <Form onSubmit={handleSubmit}/>

      <h2 className="text-center text-slate-700 font-bold my-4">Student list</h2>

      <section className="mt-4 flex flex-col gap-2">
        <div className="flex justify-between items-center gap-2 bg-slate-300 px-4 py-2 rounded-lg ">
          <div className="text-left">Name</div>
          <div className="text-left">City</div>
          <div className="flex gap-2">Actions</div>
        </div>

        {students.map((student, index) => {
          return (
            <div className="flex justify-between items-center gap-2 bg-slate-100 px-4 py-2 rounded-lg" key={student.id}>
              <div className="text-left">{student.name}</div>
              <div className="text-left">{student.city}</div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(student)}>✏</button>
                <button onClick={() => handleDelete(student.id)}>❌</button>
              </div>
            </div>
          )
        })}

        <pre>{JSON.stringify(students, null, 2)}</pre>
      </section>
    </main>
  )
}

export default App