import { useState } from 'react'
import { CARGO_TYPES, LOADING_POINTS, STATUSES, getCargo } from '../services/vehicles'

const EMPTY_FORM = {
  id: '',
  plate: '',
  driver: '',
  client: '',
  destination: '',
  cargoType: CARGO_TYPES[0].value,
  loadingPoint: LOADING_POINTS[0],
  status: STATUSES[0],
}

const inputClass =
  'w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:border-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-200'

const Field = ({ label, className = '', children }) => (
  <label className={`flex flex-col gap-1.5 ${className}`}>
    <span className="text-sm font-semibold text-blue-900">{label}</span>
    {children}
  </label>
)

// Sirve para crear (sin vehicleToEdit) y para editar (con vehicleToEdit).
// App usa `key` para reiniciar el formulario al cambiar de vehículo.
const Form = ({ onSubmit, onCancel, vehicleToEdit, saving }) => {
  const [form, setForm] = useState(vehicleToEdit ? { ...EMPTY_FORM, ...vehicleToEdit } : EMPTY_FORM)

  const isEditing = Boolean(form.id)
  const cargo = getCargo(form.cargoType)

  const handleChange = (event) => {
    const { name, value } = event.target
    setForm({ ...form, [name]: name === 'plate' ? value.toUpperCase() : value })
  }

  const handleSave = async (event) => {
    event.preventDefault()

    const payload = {
      plate: form.plate.trim(),
      driver: form.driver.trim(),
      client: form.client.trim(),
      destination: form.destination.trim(),
      cargoType: form.cargoType,
      loadingPoint: form.loadingPoint,
      status: form.status,
      // Al editar se conserva la hora de ingreso original
      entryTime: vehicleToEdit?.entryTime ?? new Date().toISOString(),
    }

    // Al editar se envía el mismo id para no perder el UUID
    await onSubmit(isEditing ? { ...payload, id: form.id } : payload, form.id || null)
  }

  return (
    <form
      onSubmit={handleSave}
      className="mx-auto max-w-3xl overflow-hidden rounded-2xl border border-lime-200 bg-white shadow-md"
    >
      <div className="flex items-center justify-between gap-4 bg-linear-to-r from-blue-800 to-lime-500 px-5 py-4">
        <div>
          <h2 className="text-lg font-bold text-white sm:text-xl">
            {isEditing ? 'Editar ingreso de vehículo' : 'Registrar ingreso de vehículo'}
          </h2>
          <p className="text-xs text-lime-50 sm:text-sm">Completa los datos de la unidad y su carga</p>
        </div>
        <div className="flex h-14 w-16 shrink-0 items-center justify-center rounded-lg bg-white/90 text-3xl">
          {cargo?.icon ?? '🚚'}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2">
        {isEditing && (
          <Field label="ID (UUID)" className="sm:col-span-2">
            <input
              className={`${inputClass} cursor-not-allowed bg-slate-100 font-mono text-xs text-slate-500`}
              type="text"
              value={form.id}
              readOnly
            />
          </Field>
        )}

        <Field label="Placa">
          <input
            className={inputClass}
            type="text"
            name="plate"
            placeholder="Ej. ABC-123"
            required
            onChange={handleChange}
            value={form.plate}
          />
        </Field>

        <Field label="Conductor">
          <input
            className={inputClass}
            type="text"
            name="driver"
            placeholder="Ej. Carlos Mendoza"
            required
            onChange={handleChange}
            value={form.driver}
          />
        </Field>

        <Field label="Cliente (quien envió el vehículo)">
          <input
            className={inputClass}
            type="text"
            name="client"
            placeholder="Ej. Constructora Los Andes"
            required
            onChange={handleChange}
            value={form.client}
          />
        </Field>

        <Field label="Destino">
          <input
            className={inputClass}
            type="text"
            name="destination"
            placeholder="Ej. Arequipa"
            required
            onChange={handleChange}
            value={form.destination}
          />
        </Field>

        <Field label="Tipo de carga" className="sm:col-span-2">
          <select className={inputClass} name="cargoType" onChange={handleChange} value={form.cargoType}>
            {CARGO_TYPES.map((c) => (
              <option key={c.value} value={c.value}>
                {c.value}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Punto de carguío">
          <select className={inputClass} name="loadingPoint" onChange={handleChange} value={form.loadingPoint}>
            {LOADING_POINTS.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </Field>

        <Field label="Estado">
          <select className={inputClass} name="status" onChange={handleChange} value={form.status}>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <div className="flex flex-col gap-3 border-t border-lime-100 bg-lime-50/60 p-5 sm:flex-row">
        <button
          type="submit"
          disabled={saving}
          className="w-full cursor-pointer rounded-lg bg-blue-800 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-blue-900 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {saving ? 'Guardando...' : isEditing ? 'Actualizar ingreso' : 'Guardar ingreso'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="w-full cursor-pointer rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-center text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
        >
          Cancelar
        </button>
      </div>
    </form>
  )
}

export default Form