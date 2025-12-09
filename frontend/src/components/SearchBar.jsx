// Componente de búsqueda avanzada
import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';

const SearchBar = ({ onSearch, placeholder = 'Buscar...', filters = [] }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState({});

  const handleSearch = () => {
    onSearch(searchTerm, activeFilters);
  };

  const handleFilterChange = (filterKey, value) => {
    const newFilters = { ...activeFilters, [filterKey]: value };
    setActiveFilters(newFilters);
    onSearch(searchTerm, newFilters);
  };

  const clearFilters = () => {
    setActiveFilters({});
    setSearchTerm('');
    onSearch('', {});
  };

  const hasActiveFilters = Object.keys(activeFilters).length > 0 || searchTerm;

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            className="input pl-10 pr-10"
          />
          {searchTerm && (
            <button
              onClick={() => {
                setSearchTerm('');
                onSearch('', activeFilters);
              }}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        
        {filters.length > 0 && (
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`btn ${showFilters ? 'btn-primary' : 'btn-secondary'} flex items-center gap-2`}
          >
            <Filter className="w-4 h-4" />
            Filtros
          </button>
        )}
        
        <button onClick={handleSearch} className="btn btn-primary">
          Buscar
        </button>
        
        {hasActiveFilters && (
          <button onClick={clearFilters} className="btn btn-secondary">
            Limpiar
          </button>
        )}
      </div>

      {showFilters && filters.length > 0 && (
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filters.map((filter) => (
              <div key={filter.key}>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {filter.label}
                </label>
                {filter.type === 'select' ? (
                  <select
                    value={activeFilters[filter.key] || ''}
                    onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                    className="input"
                  >
                    <option value="">Todos</option>
                    {filter.options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : filter.type === 'date' ? (
                  <input
                    type="date"
                    value={activeFilters[filter.key] || ''}
                    onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                    className="input"
                  />
                ) : (
                  <input
                    type={filter.type || 'text'}
                    value={activeFilters[filter.key] || ''}
                    onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                    className="input"
                    placeholder={filter.placeholder}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
