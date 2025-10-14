import { useEffect, useState } from 'react';
import { autosService, clientesService } from '../services';
import { Car, Plus, Search, Edit2, Trash2, Eye } from 'lucide-react';

const Autos = () => {
  const [autos, setAutos] = useState([]);
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [estadoFilter, setEstadoFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingAuto, setEditingAuto] = useState(null);
  const [formData, setFormData] = useState({
    marca: '',
    modelo: '',
    año: new Date().getFullYear(),
    matricula: '',
    precio: '',
    estado: 'disponible',
    clienteId: '',
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [autosData, clientesData] = await Promise.all([
        autosService.getAll(),
        clientesService.getAll(),
      ]);
      setAutos(autosData);
      setClientes(clientesData);
    } catch (error) {
      console.error('Error al cargar datos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const data = await autosService.getAll({ 
        buscar: searchTerm,
        estado: estadoFilter 
      });
      setAutos(data);
    } catch (error) {
      console.error('Error en búsqueda:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingAuto) {
        await autosService.update(editingAuto.id, formData);
      } else {
        await autosService.create(formData);
      }
      setShowModal(false);
      resetForm();
      loadData();
    } catch (error) {
      alert(error.response?.data?.error || 'Error al guardar el auto');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de eliminar este auto?')) {
      try {
        await autosService.delete(id);
        loadData();
      } catch (error) {
        alert(error.response?.data?.error || 'Error al eliminar el auto');
      }
    }
  };

  const handleEdit = (auto) => {
    setEditingAuto(auto);
    setFormData({
      marca: auto.marca,
      modelo: auto.modelo,
      año: auto.año,
      matricula: auto.matricula,
      precio: auto.precio,
      estado: auto.estado,
      clienteId: auto.clienteId || '',
    });
    setShowModal(true);
  };

  const resetForm = () => {
    setEditingAuto(null);
    setFormData({
      marca: '',
      modelo: '',
      año: new Date().getFullYear(),
      matricula: '',
      precio: '',
      estado: 'disponible',
      clienteId: '',
    });
  };

  const getEstadoBadge = (estado) => {
    const badges = {
      disponible: 'badge badge-success',
      vendido: 'badge badge-info',
      reservado: 'badge badge-warning',
    };
    return badges[estado] || 'badge badge-gray';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Autos</h1>
          <p className="text-gray-600 mt-1">Administra el inventario de vehículos</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="btn btn-primary flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Nuevo Auto
        </button>
      </div>

      {/* Filtros y búsqueda */}
      <div className="card">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Buscar por marca, modelo o matrícula..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="input pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={estadoFilter}
              onChange={(e) => setEstadoFilter(e.target.value)}
              className="input"
            >
              <option value="">Todos los estados</option>
              <option value="disponible">Disponible</option>
              <option value="vendido">Vendido</option>
              <option value="reservado">Reservado</option>
            </select>
            <button onClick={handleSearch} className="btn btn-primary">
              Buscar
            </button>
          </div>
        </div>
      </div>

      {/* Tabla de autos */}
      <div className="card overflow-hidden">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          </div>
        ) : autos.length === 0 ? (
          <div className="text-center py-12">
            <Car className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No se encontraron autos</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Vehículo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Matrícula
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Año
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Precio
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Estado
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {autos.map((auto) => (
                  <tr key={auto.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <Car className="h-5 w-5 text-primary-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {auto.marca} {auto.modelo}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">{auto.matricula}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">{auto.año}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      ${auto.precio.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {auto.cliente ? auto.cliente.nombre : '-'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={getEstadoBadge(auto.estado)}>
                        {auto.estado}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEdit(auto)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(auto.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal de formulario */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {editingAuto ? 'Editar Auto' : 'Nuevo Auto'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Marca *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.marca}
                      onChange={(e) => setFormData({ ...formData, marca: e.target.value })}
                      className="input"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Modelo *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.modelo}
                      onChange={(e) => setFormData({ ...formData, modelo: e.target.value })}
                      className="input"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Año *
                    </label>
                    <input
                      type="number"
                      required
                      min="1900"
                      max={new Date().getFullYear() + 1}
                      value={formData.año}
                      onChange={(e) => setFormData({ ...formData, año: e.target.value })}
                      className="input"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Matrícula *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.matricula}
                      onChange={(e) => setFormData({ ...formData, matricula: e.target.value })}
                      className="input"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Precio *
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      step="0.01"
                      value={formData.precio}
                      onChange={(e) => setFormData({ ...formData, precio: e.target.value })}
                      className="input"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Estado *
                    </label>
                    <select
                      value={formData.estado}
                      onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                      className="input"
                    >
                      <option value="disponible">Disponible</option>
                      <option value="vendido">Vendido</option>
                      <option value="reservado">Reservado</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cliente
                    </label>
                    <select
                      value={formData.clienteId}
                      onChange={(e) => setFormData({ ...formData, clienteId: e.target.value })}
                      className="input"
                    >
                      <option value="">Sin cliente asignado</option>
                      {clientes.map((cliente) => (
                        <option key={cliente.id} value={cliente.id}>
                          {cliente.nombre} - {cliente.cedula}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button type="submit" className="btn btn-primary flex-1">
                    {editingAuto ? 'Actualizar' : 'Crear'} Auto
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      resetForm();
                    }}
                    className="btn btn-secondary flex-1"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Autos;
