import React, { useState } from 'react';
import Card from '../Card/Card';
import './CarsContainer.css';
import data from '../../data/cartilla.json';

const CarsContainer = () => {
  const [cityFilter, setCityFilter] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('');

  const handleCityFilterChange = (event) => {
    setCityFilter(event.target.value);
    setSpecialtyFilter('');
  };

  const handleSpecialtyFilterChange = (event) => {
    setSpecialtyFilter(event.target.value);
  };

  // Obtener la lista de ciudades únicas
  const cities = [...new Set(data.map((medico) => medico.localidad))];

  // Obtener la lista de especialidades únicas según la ciudad seleccionada
  const specialties = [...new Set(data.filter((medico) => medico.localidad === cityFilter).map((medico) => medico.especialidad))];

  const filteredData = data.filter((medico) => {
    const lowerCaseCity = cityFilter.toLowerCase();
    const lowerCaseSpecialty = specialtyFilter.toLowerCase();
    return (
      (lowerCaseCity === '' || medico.localidad.toLowerCase().includes(lowerCaseCity)) &&
      (lowerCaseSpecialty === '' || medico.especialidad.toLowerCase().includes(lowerCaseSpecialty))
    );
  });

  const shouldShowCards = cityFilter !== '' && specialtyFilter !== '';

  return (
    <div>
      <h2>Cartilla Médica</h2>
      <div className="filter-container select-container">
        <div className="filter">
          <label htmlFor="cityFilter" className='select-label'>Ciudad:</label>
          <select id="cityFilter" className='select' value={cityFilter} onChange={handleCityFilterChange}>
            <option value="">Todas las ciudades</option>
            {cities.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
        <div className="filter">
          <label htmlFor="specialtyFilter" className='select-label'>Especialidad:</label>
          <select id="specialtyFilter" className='select' value={specialtyFilter} onChange={handleSpecialtyFilterChange} disabled={!cityFilter}>
            <option value="">Todas las especialidades</option>
            {specialties.map((specialty) => (
              <option key={specialty} value={specialty}>{specialty}</option>
            ))}
          </select>
        </div>
      </div>
      {shouldShowCards && (
        <div className="card-container">
          {filteredData.map((medico) => (
            <Card
              key={medico.nombre}
              nombre={medico.nombre}
              especialidad={medico.especialidad}
              dia={medico.dias}
              horario={medico.horario}
              telefono={medico.telefono}
              direccion={medico.direccion}
              localidad={medico.localidad}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CarsContainer;
