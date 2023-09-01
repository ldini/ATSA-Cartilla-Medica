import React, { useState, useEffect } from 'react';
import Card from '../Card/Card';
import './CarsContainer.css';

const CarsContainer = () => {
  const [filterType, setFilterType] = useState('specialty');
  const [filterValue, setFilterValue] = useState('');
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filteredData = data.filter((medico) => {
      const lowerCaseFilterValue = filterValue.toLowerCase();
      if (filterType === 'city') {
        return medico.institucion_zona.toLowerCase().includes(lowerCaseFilterValue);
      } else if (filterType === 'specialty') {
        return medico.especialidad_nombre.toLowerCase().includes(lowerCaseFilterValue);
      } else if (filterType === 'institution') {
        return medico.institucion_nombre.toLowerCase().includes(lowerCaseFilterValue);
      } else if (filterType === 'provider') {
        return (medico.prestador_apellido + ' ' + medico.prestador_nombre).toLowerCase().includes(lowerCaseFilterValue);
      }
      return false;
    });

    setFilteredData(filteredData);
  }, [filterValue, filterType, data]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://192.168.0.5:3000/prestador/detail');
      const jsonData = await response.json();
      setData(jsonData);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };

  const handleFilterTypeChange = (event) => {
    const newFilterType = event.target.value;
    setFilterType(newFilterType);
    setFilterValue('');
    console.log(filteredData);
    setFilteredData([])
  };

  const handleFilterValueChange = (event) => {
    setFilterValue(event.target.value);
  };


  const getFilterOptions = () => {
    if (filterType === 'city') {
      return [...new Set(data.map((medico) => medico.institucion_zona))];
    } else if (filterType === 'specialty') {
      return [...new Set(data.map((medico) => medico.especialidad_nombre))];
    } else if (filterType === 'institution') {
      return [...new Set(data.map((medico) => medico.institucion_nombre))];
    } else if (filterType === 'provider') {
      return [...new Set(data.map((medico) => medico.prestador_apellido + ' ' + medico.prestador_nombre))];
    }
    return [];
  };

  const getInstitutionsForProvider = (providerName) => {
    return data
      .filter((medico) => (medico.prestador_apellido + ' ' + medico.prestador_nombre) === providerName)
      .map((medico) => medico.institucion_nombre);
  };

  useEffect(() => {
    const updatedFilteredData = data.filter((medico) => {
      const lowerCaseFilterValue = filterValue.toLowerCase();
      if (filterType === 'city') {
        return medico.institucion_zona.toLowerCase().includes(lowerCaseFilterValue);
      } else if (filterType === 'specialty') {
        return medico.especialidad_nombre.toLowerCase().includes(lowerCaseFilterValue);
      } else if (filterType === 'institution') {
        return medico.institucion_nombre.toLowerCase().includes(lowerCaseFilterValue);
      } else if (filterType === 'provider') {
        return (medico.prestador_apellido + ' ' + medico.prestador_nombre).toLowerCase().includes(lowerCaseFilterValue);
      }
      return false;
    });
    setFilteredData([]);
    setFilteredData(updatedFilteredData); // Sobrescribir con los datos filtrados actuales
  }, [filterValue, filterType, data]);

  const shouldShowCards = filterValue !== '';

  return (
    <div>
      <h2>Cartilla Médica</h2>
      {isLoading ? (
        <div className="loading-spinner">Cargando...</div>
      ) : (
        <div className="filter-container select-container">
          <div className="filter">
            <label htmlFor="filterType" className='select-label'>Filtrar por:</label>
            <select id="filterType" className='select' value={filterType} onChange={handleFilterTypeChange}>
              <option value="specialty">Especialidad</option>
              <option value="city">Zona</option>
              <option value="institution">Centro de Salud</option>
              <option value="provider">Especialista</option>
            </select>
            <label htmlFor="filterType" className='select-label'>Opciones:</label>
            <select
              className='select'
              value={filterValue}
              onChange={handleFilterValueChange}
              disabled={!filterType}
            >
              <option value="">Todas las {filterType === 'specialty' ? 'especialidades' : filterType === 'city' ? 'ciudades' : filterType === 'institution' ? 'instituciones' : 'prestadores'}</option>
              {getFilterOptions().map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>
      )}
      {shouldShowCards && (
        <div className="card-container">
          {filteredData.map((medico,index) => (
            <Card
              key={index}
              nombre={medico.prestador_apellido +' '+ medico.prestador_nombre}
              especialidad_nombre={medico.especialidad_nombre}
              horario_dia={medico.dias_trabajo}
              horario={medico.hora_inicio + ' a '+ medico.hora_fin}
              telefono_numero={medico.telefonos}
              institucion_direccion={medico.institucion_direccion}
              institucion_zona={medico.institucion_zona}
              instituciones={getInstitutionsForProvider(medico.prestador_apellido + ' ' + medico.prestador_nombre)}
              centro={medico.institucion_nombre}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CarsContainer;
