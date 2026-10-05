import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, NavLink, Link, useNavigate, useParams } from 'react-router-dom'
import Swal from 'sweetalert2'

import {
  fetchVehicles,
  createVehicle,
  updateVehicle,
  removeVehicle,
  getCargo,
  LOADING_POINTS,
  CARGO_TYPES,
  STATUSES,
} from './services/vehicles'
import Form from './components/Form'

// ======================= Utilidades =======================
const STATUS_STYLES = {
  Esperando: 'bg-amber-100 text-amber-800 ring-amber-200',
  'En carga': 'bg-blue-100 text-blue-800 ring-blue-200',
  Finalizado: 'bg-lime-100 text-lime-800 ring-lime-300',
}

const pad = (n) => String(n).padStart(2, '0')
const dayKey = (value) => {
  const d = new Date(value)
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}
const formatTime = (iso) =>
  iso ? new Date(iso).toLocaleString('es-PE', { dateStyle: 'short', timeStyle: 'short' }) : '-'
const formatDay = (key) =>
  new Date(`${key}T12:00:00`).toLocaleDateString('es-PE', { weekday: 'short', day: '2-digit', month: 'short' })

const StatusBadge = ({ status }) => (
  <span
    className={`inline-block rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${
      STATUS_STYLES[status] ?? 'bg-slate-100 text-slate-700 ring-slate-200'
    }`}
  >
    {status}
  </span>
)

const CargoCell = ({ type }) => (
  <div className="flex items-center gap-2">
    <span className="text-lg">{getCargo(type)?.icon ?? '🚚'}</span>
    <span>{type}</span>
  </div>
)

const ActionButtons = ({ vehicle, onDelete }) => (
  <div className="flex gap-2">
    <Link
      to={`/editar/${vehicle.id}`}
      className="rounded-lg bg-lime-100 px-3 py-1.5 text-xs font-semibold text-lime-800 transition hover:bg-lime-200"
    >
      ✏️ Editar
    </Link>
    <button
      onClick={() => onDelete(vehicle)}
      className="cursor-pointer rounded-lg bg-red-100 px-3 py-1.5 text-xs font-semibold text-red-700 transition hover:bg-red-200"
    >
      🗑️ Eliminar
    </button>
  </div>
)

// ======================= Página: listado (Read) =======================
const VehicleList = ({ vehicles, loading, error, onRetry, onDelete }) => {
  const [search, setSearch] = useState('')
  const [point, setPoint] = useState('Todos')

  const term = search.trim().toLowerCase()
  const filtered = vehicles.filter((v) => {
    const matchesText = [v.id, v.plate, v.driver, v.client, v.destination].some((f) =>
      String(f ?? '')
        .toLowerCase()
        .includes(term),
    )
    return matchesText && (point === 'Todos' || v.loadingPoint === point)
  })

  return (
    <section>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar por placa, conductor, cliente, destino o ID..."
          className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm focus:border-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-200"
        />
        <select
          value={point}
          onChange={(e) => setPoint(e.target.value)}
          className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm focus:border-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-200 sm:w-56"
        >
          <option value="Todos">Todos los puntos</option>
          {LOADING_POINTS.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      {loading && (
        <div className="flex items-center justify-center gap-3 py-10 text-slate-500">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-lime-500 border-t-transparent" />
          Cargando vehículos...
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-center text-red-800">
          <p className="mb-3">{error}</p>
          <button
            onClick={onRetry}
            className="cursor-pointer rounded-lg bg-red-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-red-700"
          >
            Reintentar
          </button>
        </div>
      )}

      {!loading && !error && filtered.length === 0 && (
        <p className="py-10 text-center text-slate-500">
          {vehicles.length === 0 ? 'No hay vehículos registrados todavía.' : 'Sin resultados para tu búsqueda.'}
        </p>
      )}

      {!loading && !error && filtered.length > 0 && (
        <>
          {/* Tabla: pantallas grandes */}
          <div className="hidden overflow-x-auto rounded-2xl border border-lime-200 bg-white shadow-md lg:block">
            <table className="w-full text-left text-sm text-slate-800">
              <thead className="bg-linear-to-r from-blue-800 to-lime-500 text-white">
                <tr>
                  {['ID', 'Placa', 'Conductor', 'Cliente', 'Destino', 'Tipo de carga', 'Punto', 'Estado', 'Acciones'].map(
                    (h) => (
                      <th key={h} className="px-4 py-3 font-semibold whitespace-nowrap">
                        {h}
                      </th>
                    ),
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-lime-100">
                {filtered.map((v) => (
                  <tr key={v.id} className="transition hover:bg-lime-50">
                    <td className="px-4 py-3 font-mono text-xs text-slate-500" title={v.id}>
                      {String(v.id).slice(0, 8)}…
                    </td>
                    <td className="px-4 py-3 font-bold text-blue-900">{v.plate}</td>
                    <td className="px-4 py-3">{v.driver}</td>
                    <td className="px-4 py-3">{v.client}</td>
                    <td className="px-4 py-3">{v.destination}</td>
                    <td className="px-4 py-3">
                      <CargoCell type={v.cargoType} />
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">{v.loadingPoint}</td>
                    <td className="px-4 py-3">
                      <StatusBadge status={v.status} />
                      <div className="mt-1 text-xs text-slate-500">{formatTime(v.entryTime)}</div>
                    </td>
                    <td className="px-4 py-3">
                      <ActionButtons vehicle={v} onDelete={onDelete} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Tarjetas: móvil y tablet */}
          <div className="grid gap-4 sm:grid-cols-2 lg:hidden">
            {filtered.map((v) => (
              <article key={v.id} className="rounded-2xl border border-lime-200 bg-white p-4 shadow-sm">
                <div className="mb-3 flex items-start justify-between gap-2">
                  <h3 className="text-lg font-bold text-blue-900">{v.plate}</h3>
                  <StatusBadge status={v.status} />
                </div>
                <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1.5 text-sm text-slate-700">
                  <dt className="font-semibold text-slate-500">Conductor</dt>
                  <dd>{v.driver}</dd>
                  <dt className="font-semibold text-slate-500">Cliente</dt>
                  <dd>{v.client}</dd>
                  <dt className="font-semibold text-slate-500">Destino</dt>
                  <dd>{v.destination}</dd>
                  <dt className="font-semibold text-slate-500">Carga</dt>
                  <dd>
                    <CargoCell type={v.cargoType} />
                  </dd>
                  <dt className="font-semibold text-slate-500">Punto</dt>
                  <dd>{v.loadingPoint}</dd>
                  <dt className="font-semibold text-slate-500">Ingreso</dt>
                  <dd>{formatTime(v.entryTime)}</dd>
                </dl>
                <p className="mt-3 font-mono text-[11px] break-all text-slate-400">ID: {v.id}</p>
                <div className="mt-3 border-t border-lime-100 pt-3">
                  <ActionButtons vehicle={v} onDelete={onDelete} />
                </div>
              </article>
            ))}
          </div>
        </>
      )}
    </section>
  )
}

// ======================= Página: dashboard =======================
const BarRow = ({ label, value, max, color = 'bg-lime-500' }) => (
  <div>
    <div className="mb-1 flex justify-between text-sm text-slate-700">
      <span>{label}</span>
      <span className="font-semibold text-blue-900">{value}</span>
    </div>
    <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
      <div
        className={`h-full rounded-full transition-all ${color}`}
        style={{ width: `${max ? (value / max) * 100 : 0}%` }}
      />
    </div>
  </div>
)

const Dashboard = ({ vehicles, loading }) => {
  const [day, setDay] = useState(() => dayKey(new Date()))

  if (loading) return <p className="py-10 text-center text-slate-500">Cargando dashboard...</p>

  const ofDay = vehicles.filter((v) => v.entryTime && dayKey(v.entryTime) === day)
  const countBy = (field, values) =>
    values.map((value) => ({ label: value, value: ofDay.filter((v) => v[field] === value).length }))

  const byStatus = countBy('status', STATUSES)
  const byPoint = countBy('loadingPoint', LOADING_POINTS)
  const byCargo = countBy(
    'cargoType',
    CARGO_TYPES.map((c) => c.value),
  )

  // Últimos 7 días
  const last7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (6 - i))
    const key = dayKey(d)
    return { key, total: vehicles.filter((v) => v.entryTime && dayKey(v.entryTime) === key).length }
  })
  const maxWeek = Math.max(...last7.map((d) => d.total), 1)

  return (
    <section className="flex flex-col gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="text-xl font-bold text-blue-900">Dashboard de ingresos</h2>
          <p className="text-sm text-slate-500">Vehículos ingresados por día</p>
        </div>
        <label className="flex flex-col gap-1 text-sm font-semibold text-blue-900">
          Día a consultar
          <input
            type="date"
            value={day}
            onChange={(e) => e.target.value && setDay(e.target.value)}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-normal focus:border-lime-500 focus:outline-none focus:ring-2 focus:ring-lime-200"
          />
        </label>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <div className="rounded-2xl bg-linear-to-br from-blue-800 to-blue-600 p-4 text-white shadow-md">
          <p className="text-xs font-medium text-blue-100">Ingresos del día</p>
          <p className="text-4xl font-bold">{ofDay.length}</p>
        </div>
        {byStatus.map((s) => (
          <div key={s.label} className="rounded-2xl border border-lime-200 bg-white p-4 shadow-sm">
            <p className="text-xs font-medium text-slate-500">{s.label}</p>
            <p className="text-3xl font-bold text-lime-600">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="rounded-2xl border border-lime-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 font-bold text-blue-900">Por punto de carguío</h3>
          <div className="flex flex-col gap-3">
            {byPoint.map((p) => (
              <BarRow key={p.label} {...p} max={Math.max(...byPoint.map((x) => x.value), 1)} />
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-lime-200 bg-white p-5 shadow-sm">
          <h3 className="mb-4 font-bold text-blue-900">Por tipo de camión</h3>
          <div className="flex flex-col gap-3">
            {byCargo.map((c) => (
              <BarRow key={c.label} {...c} color="bg-blue-600" max={Math.max(...byCargo.map((x) => x.value), 1)} />
            ))}
          </div>
        </div>
      </div>

      {/* Últimos 7 días */}
      <div className="rounded-2xl border border-lime-200 bg-white p-5 shadow-sm">
        <h3 className="mb-4 font-bold text-blue-900">Últimos 7 días (clic en una barra para ver ese día)</h3>
        <div className="flex h-44 items-end justify-between gap-2">
          {last7.map((d) => (
            <button
              key={d.key}
              onClick={() => setDay(d.key)}
              className="flex h-full flex-1 cursor-pointer flex-col items-center justify-end gap-1"
              title={`${d.total} ingresos`}
            >
              <span className="text-xs font-semibold text-blue-900">{d.total}</span>
              <div
                className={`w-full rounded-t-lg transition-all ${
                  d.key === day ? 'bg-blue-700' : 'bg-lime-400 hover:bg-lime-500'
                }`}
                style={{ height: `${(d.total / maxWeek) * 100}%`, minHeight: '4px' }}
              />
              <span className="text-[10px] text-slate-500 sm:text-xs">{formatDay(d.key)}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Detalle del día */}
      <div className="rounded-2xl border border-lime-200 bg-white p-5 shadow-sm">
        <h3 className="mb-3 font-bold text-blue-900">Detalle del {formatDay(day)}</h3>
        {ofDay.length === 0 ? (
          <p className="text-sm text-slate-500">No hay ingresos registrados en este día.</p>
        ) : (
          <ul className="divide-y divide-lime-100">
            {[...ofDay]
              .sort((a, b) => new Date(a.entryTime) - new Date(b.entryTime))
              .map((v) => (
                <li key={v.id} className="flex flex-wrap items-center justify-between gap-2 py-2 text-sm">
                  <span className="font-bold text-blue-900">{v.plate}</span>
                  <span className="text-slate-600">{v.client}</span>
                  <span className="text-slate-500">{v.loadingPoint}</span>
                  <span className="text-slate-500">
                    {new Date(v.entryTime).toLocaleTimeString('es-PE', { timeStyle: 'short' })}
                  </span>
                  <StatusBadge status={v.status} />
                </li>
              ))}
          </ul>
        )}
      </div>
    </section>
  )
}

// ======================= Páginas: crear y editar =======================
const CreatePage = ({ onSubmit, saving }) => {
  const navigate = useNavigate()
  return <Form onSubmit={onSubmit} onCancel={() => navigate('/')} saving={saving} />
}

const EditPage = ({ vehicles, loading, onSubmit, saving }) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const vehicle = vehicles.find((v) => String(v.id) === id)

  if (loading) return <p className="py-10 text-center text-slate-500">Cargando vehículo...</p>

  if (!vehicle) {
    return (
      <div className="py-10 text-center">
        <p className="mb-3 text-slate-600">No se encontró el vehículo solicitado.</p>
        <Link to="/" className="font-semibold text-blue-800 hover:underline">
          Volver al listado
        </Link>
      </div>
    )
  }

  return (
    <Form
      key={vehicle.id}
      onSubmit={onSubmit}
      onCancel={() => navigate('/')}
      vehicleToEdit={vehicle}
      saving={saving}
    />
  )
}

// ======================= Layout + lógica principal =======================
const navLinkClass = ({ isActive }) =>
  `rounded-full px-4 py-1.5 text-sm font-semibold whitespace-nowrap transition ${
    isActive ? 'bg-white text-blue-800 shadow' : 'text-white hover:bg-white/20'
  }`

const AppRoutes = () => {
  const navigate = useNavigate()
  const [vehicles, setVehicles] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [reloadKey, setReloadKey] = useState(0)

  // Carga inicial y recargas (cuando cambia reloadKey)
  useEffect(() => {
    let ignore = false

    fetchVehicles()
      .then((data) => {
        if (ignore) return
        setVehicles(Array.isArray(data) ? data : [])
        setError(null)
      })
      .catch((err) => {
        if (!ignore) setError(err.message || 'No se pudo cargar la lista de vehículos')
      })
      .finally(() => {
        if (!ignore) setLoading(false)
      })

    return () => {
      ignore = true
    }
  }, [reloadKey])

  const reload = () => setReloadKey((k) => k + 1)

  const handleRetry = () => {
    setError(null)
    setLoading(true)
    reload()
  }

  // Crea o actualiza según exista id
  const handleSubmit = async (payload, id) => {
    try {
      setSaving(true)
      if (id) await updateVehicle(payload, id)
      else await createVehicle(payload)

      reload()
      navigate('/')

      Swal.fire({
        icon: 'success',
        title: id ? 'Ingreso actualizado' : 'Ingreso registrado',
        timer: 1500,
        showConfirmButton: false,
      })
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Error', text: err.message, confirmButtonColor: '#1e40af' })
    } finally {
      setSaving(false)
    }
  }

  // Confirmación antes de eliminar
  const handleDelete = async (vehicle) => {
    const result = await Swal.fire({
      title: '¿Eliminar ingreso?',
      text: `Se eliminará el vehículo ${vehicle.plate}. Esta acción no se puede revertir.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#1e40af',
      cancelButtonColor: '#dc2626',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    })

    if (!result.isConfirmed) return

    try {
      await removeVehicle(vehicle.id)
      reload()
      Swal.fire({ icon: 'success', title: 'Eliminado', timer: 1200, showConfirmButton: false })
    } catch (err) {
      Swal.fire({ icon: 'error', title: 'Error', text: err.message, confirmButtonColor: '#1e40af' })
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-linear-to-b from-lime-50 to-white">
      <header className="bg-linear-to-r from-blue-900 via-blue-800 to-lime-500">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            {/* Opcional: guarda el logo en public/images/logo.svg. Si no existe, no se muestra */}
            <img
              src="/images/logo.svg"
              alt="Logo Calcesur"
              className="h-12 w-12 rounded-xl bg-white p-1.5"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
              }}
            />
            <div>
              <h1 className="text-xl font-bold text-white sm:text-2xl">Control de ingreso de vehículos</h1>
              <p className="text-xs text-lime-100 sm:text-sm">Calcesur · Zona de carguío</p>
            </div>
          </div>
          <nav className="flex gap-2 overflow-x-auto pb-1 md:pb-0">
            <NavLink to="/" end className={navLinkClass}>
              Vehículos
            </NavLink>
            <NavLink to="/dashboard" className={navLinkClass}>
              Dashboard
            </NavLink>
            <NavLink to="/nuevo" className={navLinkClass}>
              + Nuevo ingreso
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6">
        <Routes>
          <Route
            path="/"
            element={
              <VehicleList
                vehicles={vehicles}
                loading={loading}
                error={error}
                onRetry={handleRetry}
                onDelete={handleDelete}
              />
            }
          />
          <Route path="/dashboard" element={<Dashboard vehicles={vehicles} loading={loading} />} />
          <Route path="/nuevo" element={<CreatePage onSubmit={handleSubmit} saving={saving} />} />
          <Route
            path="/editar/:id"
            element={<EditPage vehicles={vehicles} loading={loading} onSubmit={handleSubmit} saving={saving} />}
          />
          <Route
            path="*"
            element={
              <p className="py-10 text-center text-slate-600">
                Página no encontrada.{' '}
                <Link to="/" className="font-semibold text-blue-800 hover:underline">
                  Ir al inicio
                </Link>
              </p>
            }
          />
        </Routes>
      </main>

      <footer className="border-t border-lime-200 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Calcesur · Control de ingreso de vehículos
      </footer>
    </div>
  )
}

const App = () => (
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
)

export default App