// TODO: OBTENER LA REFERENCIA PARA LOS ELEMENTOS CON LAS CLASES .task__input task_clear y task__list

const taskInput = document.querySelector('.task__input')
const taskClear = document.querySelector('.task__clear')
const taskList = document.querySelector('.task__list')

let tasks = [
    {
        title: 'Estudiar Javascript',
        completed: true,

    },
    {
        title: 'Salir al receso a las 9:00pm',
        completed: true
    },
    {
        title: 'Realizar el reto de fin de semana',
        completed: false
    }
]

taskInput.addEventListener('keydown', (event) => {
    // console.log('agregando tarea...', event.key, event.keyCode)
    if (event.key === 'Enter') {
        const newTask = {
            title: event.target.value,
            completed: false
        }

        console.log(newTask)

        tasks.push(newTask)

        renderTasks(tasks)

        taskInput.value = ''
    }

})

function renderTasks(tasks = []) {
    let lista = ''

    tasks.forEach((task, index) => {
        lista = lista + `
            <li class="flex justify-center items-center gap-4 py-1">
            <input
                type="checkbox"
                ${task.completed ? 'checked' : ''}
            >
            <div class="w-full">
                ${task.title}
            </div>
            <button
                class="task__clear border border-red-700 font-medium text-sm px-2 py-1 text-red-500 rounded-lg hover:text-white hover:bg-red-700 duration-300 cursor-pointer"
                onclick = "removeTask(${index})"
            >
                Borrar
            </button>
            </li>
            
            `
    });

    taskList.innerHTML = lista
}

function removeTask(selectedIndex) {
    console.log(selectedIndex)

    //TODO: Remover el indice selccionado del arreglo tasks y posteriormente actualizar la lista de tareas con la funcion renderTak

    const modifiedTasks = tasks.filter((task, index) => index !== selectedIndex)
    
    tasks = modifiedTasks

    renderTasks(tasks)
}

renderTasks(tasks)