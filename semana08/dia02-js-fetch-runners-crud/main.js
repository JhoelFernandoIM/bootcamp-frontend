// console.log('Hola js')

const API_URL = 'https://apibox.vercel.app/RGxQnAzzuo94pJR1ZhfIIXKkfwqt1nlf/api/corredores'

const form = document.querySelector('#form')

const cargaCorredores = async () => {
    document.querySelector('#loading').classList.toggle('hidden')

    const respuesta = await fetch(API_URL)


    const data = await respuesta.json()

    renderCorredores(data)
}

const renderCorredores = (corredores = []) => {
    //TODO: Mostrar los corredores usando la plantilla del li en el index.html
    const lista =document.querySelector('#lista')

    lista.innerHTML = ''

    //TODO: Actualizar el número de inscritos con el id contador
    const contador = document.querySelector('#contador')
    contador.textContent = corredores.length

    corredores.forEach(corredor => {
        const li = document.createElement('li')
        
        li.className = 'flex items-center gap-4 bg-white border border-neutral-200 rounded-xl px-4 py-3 hover:border-neutral-300 transition-colors'

        li.innerHTML = `
            <div class="shrink-0 w-14 h-14 rounded-lg border border-neutral-200 flex items-center justify-center bg-neutral-50">
              <span class="font-mono text-base font-medium">101</span>
            </div>

            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium truncate">${corredor.nombre}</p>
              <div class="flex items-center gap-2 mt-1">
                <span class="text-[11px] font-mono px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700">5K</span>
                <span class="text-xs text-neutral-400">${corredor.edad}</span>
              </div>
            </div>

            <div class="flex items-center gap-3 shrink-0">
              <button data-action="editar" data-id="${corredor.id}" class="text-xs text-neutral-400 hover:text-neutral-900 transition-colors">
                Editar
              </button>
              <button data-action="eliminar" data-id="${corredor.id}" class="text-xs text-neutral-400 hover:text-red-500 transition-colors">
                Eliminar
              </button>
            </div>
        `

        lista.appendChild(li)
    })
}

form.addEventListener ('submit', async (event) =>{
    event.preventDefault()

    //01 extraer los datos del formulario
    const corredorForm = document.forms['form']

    const nombre = corredorForm.nombre.value
    const edad = corredorForm.edad.value
    const categoria = corredorForm.categoria.value
    const dorsal = corredorForm.dorsal.value

    console.log(nombre, edad, categoria, dorsal)

    // 2 - crear al corredor en el servidor

    const nuevoCorredor = {
        nombre,
        edad,
        categoria,
        dorsal
    }

    const opciones = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevoCorredor)

    }

    try {
        const response = await fetch(API_URL, opciones)

        if (!response.ok) {
            throw new Error('uvimos problemas para guardar al corredor')
        }

        console.log('El corredor se guardó correctamente.')

        cargaCorredores()
        corredorForm.reset()

    } catch(error) {
        console.log(error)
    }

})

lista.addEventListener('click', async (event) => {
    if (event.target.tagName === 'BUTTON') {
        const { action, id} = event.target.dataset

        if (action === 'eliminar') {
            const opciones = {
                method: 'DELETE'
            }

            const  response = await fetch(`${API_URL}/${id}`, opciones)

            cargaCorredores()
        }
    }
})

cargaCorredores()