const API_URL = 'https://apibox.vercel.app/RGxQnAzzuo94pJR1ZhfIIXKkfwqt1nlf/api/vehicles'

// ---------- Catálogos del negocio ----------
export const CARGO_TYPES = [
  { value: 'Camión plataforma de 30 tn', icon: '🚛' },
  { value: 'Camión bombona', icon: '🛢️' },
  { value: 'Camión hidráulico', icon: '🏗️' },
  { value: 'Camión de 10 tn con madera', icon: '🪵' },
]

export const LOADING_POINTS = ['Línea 1 CVM', 'Línea 3 CVG', 'Línea 1 CH']

export const STATUSES = ['Esperando', 'En carga', 'Finalizado']

export const getCargo = (type) => CARGO_TYPES.find((c) => c.value === type)

// ---------- Helpers ----------
// Si el servidor responde mal, lanza un error con el detalle que devolvió APIBox
const handleResponse = async (response) => {
  if (!response.ok) {
    let detail = ''
    try {
      detail = await response.text()
    } catch {
      detail = ''
    }
    throw new Error(`Error ${response.status}: ${detail || response.statusText}`)
  }
  return response.json()
}

// APIBox administra el id: nunca debe ir dentro del body
const withoutId = (payload) => {
  const { id: _id, ...rest } = payload
  return rest
}

const jsonOptions = (method, payload) => ({
  method,
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(withoutId(payload)),
})

// ---------- CRUD ----------
export const fetchVehicles = async () => {
  const response = await fetch(API_URL)
  return handleResponse(response)
}

// APIBox asigna el id automáticamente al crear
export const createVehicle = async (payload) => {
  const response = await fetch(API_URL, jsonOptions('POST', payload))
  return handleResponse(response)
}

// El id va solo en la URL
export const updateVehicle = async (payload, id) => {
  const response = await fetch(`${API_URL}/${id}`, jsonOptions('PUT', payload))
  return handleResponse(response)
}

export const removeVehicle = async (id) => {
  const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
  return handleResponse(response)
}