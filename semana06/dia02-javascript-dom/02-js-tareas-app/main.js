const taskInput = document.getElementById('task-input')
const taskAdd = document.querySelector('.task__add')
const taskList = document.querySelector('.task__list')

//EVENTOS
//ELEMENTO.addEventListener (NOMBRE_EVENTO, CALLBACK)
taskAdd.addEventListener('click', function(event) {
    //se ejecutará cuando hagamos click en el boton 'Añadir tarea'
    console.log('Click!!!', taskInput.value)

    //TODO: Añadir el elemento li al elemento con la clase task__list
    const li = document.createElement('li')

    taskList.appendChild(li)

    //TODO 01 Añadir checkbox al li
    const checkbox = document.createElement('input')
    checkbox.setAttribute('type', 'checkbox')
    li.appendChild(checkbox)
  
    
    //TODO 02: Añadir elemento span al elemento li con el texto de la caja taskInput
    const span = document.createElement('span')
    span.textContent = taskInput.value
    li.appendChild(span)

    //TODO 03 Añadir elemento button al elemento li
    const buttonAd = document.createElement('button')
    buttonAd.textContent = 'Borrar'
    li.appendChild(buttonAd)

    taskInput.value = ''

    // TODO: 04 permitir al boton borrar remover una tarea de la lista

    // buttonAd.addEventListener('click', function(event) {
    //     event.stopPropagation()
    //     li.remove();

    

    //MANEJO DEL DOM: Forma de crear elementos dinámicamente con el DOM de Javascript

    // const button = document.createElement('button')
    // console.log({button})
    // button.textContent = 'Hola soy un botón'
    // document.body.appendChild(button)


})

taskList.addEventListener('click', function(event) {

    const target = event.target // elemento presionado

    if (target.tagName === 'BUTTON') {
        console.log('Eliminado tarea')
        target.parentElement.remove()
    }

    if (target.tagName === 'INPUT' && target.type === 'checkbox') {
        target.classList.toggle('checked')
    }
})