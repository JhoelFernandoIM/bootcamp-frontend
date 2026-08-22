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
    //validaciones para evitar que el usuario agrege tarea vacía
    if(event.target.value === '') {
        return
    }

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

//TODO: agreguen la clase line-through para tachar el título de la tarea si esta está completada

function renderTasks(tasks = []) {
    let lista = ''

    tasks.forEach((task, index) => {
        lista = lista + `
            <li class="flex justify-center items-center gap-4 py-1">
            <input
                type="checkbox"
                ${task.completed ? 'checked' : ''}
                onchange="checkTask(${index})"
            >
            <div class="w-full
                ${task.completed ? 'line-through text-gray-400' : ''}"
            
            >
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

function checkTask(selectedIndex) {
    //Devolver un objeto que tiene title y completed
    const taskSelected = {...tasks[selectedIndex]}

    taskSelected.completed = !taskSelected.completed

    tasks[selectedIndex] = taskSelected

    renderTasks(tasks)
}

//TODO: Implementar el boton 'limpiar tareas completadas' para que se remuevan las tareas que tengan el estado completed en true

taskClear.addEventListener('click', (event) => {
    // const deletedTasks = tasks.filter((task) => task.completed !== true)
    const deletedTasks = tasks.filter((task) => !task.completed)

    console.log(deletedTasks)

    tasks = deletedTasks

    renderTasks(tasks)
})

function clearCompletedTasks (selectedIndex) {

}

renderTasks(tasks)