// =============================================
// CONFIGURACIÓN
// =============================================
// 👉 Reemplaza esta URL por la de TU box en APIBox (ver explicación aparte).
const API_URL = 'https://apibox.vercel.app/RGxQnAzzuo94pJR1ZhfIIXKkfwqt1nlf/api/personajes'

const POR_PAGINA = 6

// =============================================
// REFERENCIAS AL DOM
// =============================================
const form = document.querySelector('#form')
const lista = document.querySelector('#lista')
const contador = document.querySelector('#contador')
const loadingEl = document.querySelector('#loading')
const vacioEl = document.querySelector('#vacio')
const errorEl = document.querySelector('#errorMsg')
const paginacionEl = document.querySelector('#paginacion')

const submitBtn = document.querySelector('#submitBtn')
const cancelBtn = document.querySelector('#cancelBtn')
const formTitulo = document.querySelector('#formTitulo')
const formError = document.querySelector('#formError')

// Estado en memoria
let personajes = []
let paginaActual = 1

// Colores de badges según raza (fallback a gris si no está mapeada)
const COLORES_RAZA = {
  saiyan: 'bg-orange-50 text-orange-700',
  namekian: 'bg-emerald-50 text-emerald-700',
  human: 'bg-sky-50 text-sky-700',
  'human (potential unleashed)': 'bg-sky-50 text-sky-700',
  android: 'bg-purple-50 text-purple-700',
  frieza_race: 'bg-fuchsia-50 text-fuchsia-700',
  jiren_race: 'bg-rose-50 text-rose-700',
  god: 'bg-amber-50 text-amber-700',
  majin: 'bg-pink-50 text-pink-700',
}

const colorRaza = (raza = '') => COLORES_RAZA[raza.toLowerCase()] || 'bg-neutral-100 text-neutral-600'

// =============================================
// HELPERS DE UI
// =============================================
const mostrarLoading = (mostrar) => {
  loadingEl.classList.toggle('hidden', !mostrar)
}

const mostrarError = (mensaje) => {
  if (!mensaje) {
    errorEl.classList.add('hidden')
    errorEl.textContent = ''
    return
  }
  errorEl.textContent = mensaje
  errorEl.classList.remove('hidden')
}

const mostrarErrorForm = (mensaje) => {
  if (!mensaje) {
    formError.classList.add('hidden')
    formError.textContent = ''
    return
  }
  formError.textContent = mensaje
  formError.classList.remove('hidden')
}

const resetFormularioUI = () => {
  form.reset()
  document.querySelector('#personajeId').value = ''
  formTitulo.textContent = 'Nuevo personaje'
  submitBtn.textContent = 'Agregar personaje'
  cancelBtn.classList.add('hidden')
  mostrarErrorForm('')
}

// =============================================
// CARGA DE DATOS (READ)
// =============================================
const cargarPersonajes = async () => {
  mostrarLoading(true)
  mostrarError('')
  vacioEl.classList.add('hidden')
  lista.innerHTML = ''

  try {
    const respuesta = await fetch(API_URL)

    if (!respuesta.ok) {
      throw new Error('No se pudo obtener la lista de personajes')
    }

    const data = await respuesta.json()

    // APIBox puede devolver el arreglo directo o envuelto en { data: [...] }
    personajes = Array.isArray(data) ? data : (data.data || [])

    paginaActual = 1
    renderPersonajes()

  } catch (error) {
    console.error(error)
    mostrarError('Ocurrió un error al cargar los personajes. Intenta de nuevo.')
  } finally {
    mostrarLoading(false)
  }
}

// =============================================
// RENDER
// =============================================
const renderPersonajes = () => {
  lista.innerHTML = ''
  contador.textContent = personajes.length

  if (personajes.length === 0) {
    vacioEl.classList.remove('hidden')
    paginacionEl.classList.add('hidden')
    return
  }
  vacioEl.classList.add('hidden')

  const totalPaginas = Math.ceil(personajes.length / POR_PAGINA)
  if (paginaActual > totalPaginas) paginaActual = totalPaginas

  const inicio = (paginaActual - 1) * POR_PAGINA
  const paginaDePersonajes = personajes.slice(inicio, inicio + POR_PAGINA)

  paginaDePersonajes.forEach(personaje => {
    const li = document.createElement('li')

    li.className = 'bg-white border border-neutral-200 rounded-2xl p-4 flex gap-4 hover:border-[var(--db-orange)] transition-colors'

    li.innerHTML = `
      <div class="card-photo w-16 h-16 rounded-xl overflow-hidden shrink-0 flex items-center justify-center">
        <img
          src="${personaje.image || ''}"
          alt="${personaje.name || 'Personaje'}"
          class="w-full h-full object-cover"
          onerror="this.style.display='none'; this.parentElement.innerHTML='<span class=\\'text-xs text-neutral-400\\'>Sin foto</span>'"
        >
      </div>

      <div class="flex-1 min-w-0">
        <p class="font-display font-700 text-base truncate">${personaje.name || 'Sin nombre'}</p>
        <div class="flex flex-wrap items-center gap-1.5 mt-1.5 mb-3">
          <span class="text-[11px] font-medium px-2 py-0.5 rounded-full ${colorRaza(personaje.race)}">${personaje.race || 'Desconocida'}</span>
          ${personaje.gender ? `<span class="text-[11px] text-neutral-400">${personaje.gender}</span>` : ''}
        </div>
        <div class="flex items-center gap-3">
          <button data-action="editar" data-id="${personaje.id}" class="text-xs font-medium text-[var(--db-blue)] hover:underline">
            Editar
          </button>
          <button data-action="eliminar" data-id="${personaje.id}" class="text-xs font-medium text-neutral-400 hover:text-red-500 transition-colors">
            Eliminar
          </button>
        </div>
      </div>
    `

    lista.appendChild(li)
  })

  renderPaginacion(totalPaginas)
}

const renderPaginacion = (totalPaginas) => {
  paginacionEl.innerHTML = ''

  if (totalPaginas <= 1) {
    paginacionEl.classList.add('hidden')
    return
  }
  paginacionEl.classList.remove('hidden')

  const crearBoton = (texto, pagina, opciones = {}) => {
    const btn = document.createElement('button')
    btn.textContent = texto
    btn.disabled = !!opciones.disabled
    btn.className = opciones.activo
      ? 'w-8 h-8 rounded-full bg-[var(--db-orange)] text-white text-xs font-semibold'
      : 'w-8 h-8 rounded-full text-xs font-medium text-neutral-500 hover:bg-neutral-100 disabled:opacity-30 disabled:hover:bg-transparent'
    btn.addEventListener('click', () => {
      paginaActual = pagina
      renderPersonajes()
    })
    return btn
  }

  paginacionEl.appendChild(crearBoton('‹', paginaActual - 1, { disabled: paginaActual === 1 }))

  for (let i = 1; i <= totalPaginas; i++) {
    paginacionEl.appendChild(crearBoton(i, i, { activo: i === paginaActual }))
  }

  paginacionEl.appendChild(crearBoton('›', paginaActual + 1, { disabled: paginaActual === totalPaginas }))
}

// =============================================
// CREAR / ACTUALIZAR (CREATE + UPDATE)
// =============================================
form.addEventListener('submit', async (event) => {
  event.preventDefault()
  mostrarErrorForm('')

  const id = document.querySelector('#personajeId').value
  const name = document.querySelector('#nombre').value.trim()
  const image = document.querySelector('#imagen').value.trim()
  const race = document.querySelector('#raza').value.trim()
  const gender = document.querySelector('#genero').value

  // Validación mínima de los campos obligatorios
  if (!name || !image || !race) {
    mostrarErrorForm('Nombre, imagen y raza son obligatorios.')
    return
  }

  const personaje = { name, image, race, gender }

  const esEdicion = Boolean(id)
  const url = esEdicion ? `${API_URL}/${id}` : API_URL
  const metodo = esEdicion ? 'PUT' : 'POST'

  const opciones = {
    method: metodo,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(personaje)
  }

  submitBtn.disabled = true
  submitBtn.textContent = esEdicion ? 'Guardando...' : 'Agregando...'

  try {
    const respuesta = await fetch(url, opciones)

    if (!respuesta.ok) {
      throw new Error('Error al guardar el personaje')
    }

    await cargarPersonajes()
    resetFormularioUI()

  } catch (error) {
    console.error(error)
    mostrarErrorForm('No se pudo guardar el personaje. Intenta de nuevo.')
  } finally {
    submitBtn.disabled = false
    submitBtn.textContent = esEdicion ? 'Guardar cambios' : 'Agregar personaje'
  }
})

cancelBtn.addEventListener('click', resetFormularioUI)

// =============================================
// EDITAR / ELIMINAR (delegación de eventos en la lista)
// =============================================
lista.addEventListener('click', async (event) => {
  const boton = event.target.closest('button[data-action]')
  if (!boton) return

  const { action, id } = boton.dataset

  if (action === 'editar') {
    const personaje = personajes.find(p => String(p.id) === String(id))
    if (!personaje) return

    document.querySelector('#personajeId').value = personaje.id
    document.querySelector('#nombre').value = personaje.name || ''
    document.querySelector('#imagen').value = personaje.image || ''
    document.querySelector('#raza').value = personaje.race || ''
    document.querySelector('#genero').value = personaje.gender || ''

    formTitulo.textContent = `Editando a ${personaje.name}`
    submitBtn.textContent = 'Guardar cambios'
    cancelBtn.classList.remove('hidden')

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (action === 'eliminar') {
    const personaje = personajes.find(p => String(p.id) === String(id))
    const confirmado = confirm(`¿Eliminar a ${personaje ? personaje.name : 'este personaje'}?`)
    if (!confirmado) return

    try {
      const respuesta = await fetch(`${API_URL}/${id}`, { method: 'DELETE' })

      if (!respuesta.ok) {
        throw new Error('Error al eliminar el personaje')
      }

      await cargarPersonajes()

    } catch (error) {
      console.error(error)
      mostrarError('No se pudo eliminar el personaje. Intenta de nuevo.')
    }
  }
})

// =============================================
// INICIO
// =============================================
cargarPersonajes()