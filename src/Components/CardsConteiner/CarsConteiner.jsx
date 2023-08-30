import React, { useState, useEffect } from 'react';
import Card from '../Card/Card';
import './CarsContainer.css';

const CarsContainer = () => {
  const [cityFilter, setCityFilter] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/prestador/detail');
      console.log(response);
      const jsonData = await response.json();
      console.log(jsonData);
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleCityFilterChange = (event) => {
    setCityFilter(event.target.value);
    setSpecialtyFilter('');
  };

  const handleSpecialtyFilterChange = (event) => {
    setSpecialtyFilter(event.target.value);
  };

  // Obtener la lista de ciudades únicas
  const cities = [...new Set(data.map((medico) => medico.institucion_zona))];

  // Obtener la lista de especialidades únicas según la ciudad seleccionada
  const specialties = [...new Set(data.filter((medico) => medico.institucion_zona === cityFilter).map((medico) => medico.especialidad_nombre))];

  const filteredData = data.filter((medico) => {
    const lowerCaseCity = cityFilter.toLowerCase();
    const lowerCaseSpecialty = specialtyFilter.toLowerCase();
    return (
      (lowerCaseCity === '' || medico.institucion_zona.toLowerCase().includes(lowerCaseCity)) &&
      (lowerCaseSpecialty === '' || medico.especialidad_nombre.toLowerCase().includes(lowerCaseSpecialty))
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
              key={medico.prestador_apellido +' '+ medico.prestador_nombre}
              nombre={medico.prestador_apellido +' '+ medico.prestador_nombre}
              especialidad_nombre={medico.especialidad_nombre}
              horario_dia={medico.horario_dia}
              horario={medico.horario_hora_inicio + ' a '+ medico.horario_hora_fin}
              telefono_numero={medico.telefono_numero}
              institucion_direccion={medico.institucion_direccion}
              institucion_zona={medico.institucion_zona}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CarsContainer;
