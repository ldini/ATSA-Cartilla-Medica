import React, { useState, useEffect } from 'react';
import Card from '../Card/Card';
import './CarsContainer.css';

const CarsContainer = () => {

  // Estados para los filtros seleccionados
  const [data,setData] = useState([])
  const [selectedZone, setSelectedZone] = useState('');
  const [selectedInstitution, setSelectedInstitution] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('');
  const [selectedSpeciality, setSelectedSpeciality] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3000/prestador/detail');
      const jsonData = await response.json();
      setData(jsonData);
      console.log(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);

    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Obtener las opciones únicas de zona, institución y prestador
  const zones = [...new Set(data.map((item) => item.institucion_zona))];
  const [availableInstitutionsByZone, setAvailableInstitutionsByZone] = useState([]);
  const [availableProvidersByZone, setAvailableProvidersByZone] = useState([]);
  const [availableSpecialityByZone, SetAvailableSpecialityByZone] = useState([]);

  // Función para aplicar los filtros
  const applyFilters = () => {
    let filtered = data;

    if (selectedZone) {
      if(selectedZone !== 'all')
        filtered = filtered.filter((item) => item.institucion_zona === selectedZone);   
      const institutionsInZone = [...new Set(filtered.map((item) => item.institucion_nombre))];
      setAvailableInstitutionsByZone(institutionsInZone);
    }
    

    if (selectedInstitution) {
      if(selectedInstitution !== 'all')
        filtered = filtered.filter((item) => item.institucion_nombre === selectedInstitution);
      const specialityInZone = [...new Set(filtered.map((item) => item.especialidad_nombre))];
      SetAvailableSpecialityByZone(specialityInZone);
    }

    if (selectedSpeciality) {
      if(selectedSpeciality !== 'all')
        filtered = filtered.filter((item) => item.especialidad_nombre === selectedSpeciality);
      const providersInZone = [...new Set(filtered.map((item) => item.prestador_apellido + ' ' + item.prestador_nombre ))];
      setAvailableProvidersByZone(providersInZone);
    }

    if (selectedProvider) {
      filtered = filtered.filter((item) => item.prestador_apellido + ' ' + item.prestador_nombre === selectedProvider);
    }

    setFilteredData(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [selectedZone, selectedInstitution, selectedProvider,selectedSpeciality]);


  return (
    <div>
      <h2>Cartilla Médica</h2>
      <div className="filter-container select-container">
        <div className="filter">
          <label htmlFor="filterZone" className="select-label">
            Zona:
          </label>
          <select
            id="filterZone"
            className="select"
            value={selectedZone}
            onChange={(e) => {
              setSelectedZone(e.target.value);
              setSelectedInstitution('');
              setSelectedProvider(''); 
              setSelectedSpeciality('');
            }}
            
          >
            <option value="">--- Seleccionar Zona ---</option>
            <option value="all">Todas las zonas</option>
            {zones.map((zone) => (
              <option key={zone} value={zone}>
                {zone}
              </option>
            ))}
          </select>

          <label htmlFor="filterInstitution" className="select-label">
            Centro:
          </label>
          <select
            id="filterInstitution"
            className="select"
            value={selectedInstitution}
            onChange={(e) => setSelectedInstitution(e.target.value)}
          >
            <option value="">--- Seleccione un Centro ---</option>
            <option value="all"> Todos los Centros </option>
            {selectedZone ? (
              availableInstitutionsByZone.map((institution) => (
                <option key={institution} value={institution}>
                  {institution}
                </option>
              ))
            ) : (
              <option value="" disabled>
                Selecciona una Zona primero
              </option>
            )}
          </select>

          <label htmlFor="filterSpeciality" className="select-label">
            Especialidad:
          </label>
          <select
            id="filterSpeciality"
            className="select"
            value={selectedSpeciality}
            onChange={(e) => setSelectedSpeciality(e.target.value)}
          >
            <option value="">--- Seleccione Especialidad ---</option>
            <option value="all">Todos las Especialidades</option>
            {selectedInstitution ? (
              availableSpecialityByZone.map((speciality) => (
                <option key={speciality} value={speciality}>
                  {speciality}
                </option>
              ))
            ) : (
              <option value="" disabled>
                Selecciona un Centro Primero
              </option>
            )}
          </select>

          <label htmlFor="filterProvider" className="select-label">     
            Especialista:
          </label>
          <select
            id="filterProvider"
            className="select"
            value={selectedProvider}
            onChange={(e) => setSelectedProvider(e.target.value)}
          >
            <option value="">Todos los Especialistas</option>
            {selectedInstitution ? (
              availableProvidersByZone.map((provider) => (
                <option key={provider} value={provider}>
                  {provider}
                </option>
              ))
            ) : (
              <option value="" disabled>
                Selecciona un Centro Primero
              </option>
            )}
          </select>

        </div>
      </div>

      <div className="card-container">
      {filteredData.map((medico, index) => (
         (
          <Card
            key={index}
            nombre={medico.prestador_apellido}
            apellido={medico.prestador_nombre}
            especialidad_nombre={medico.especialidad_nombre}
            horarios_trabajo={medico.horarios_trabajo}
            telefono_numero={medico.telefonos}
            institucion_direccion={medico.institucion_direccion}
            institucion_zona={medico.institucion_zona}
            instituciones={medico.prestador_apellido + ' ' + medico.prestador_nombre}
            centro={medico.institucion_nombre ? medico.institucion_nombre : medico.prestador_apellido+ ' ' + medico.prestador_nombre}
          />
        )
      ))}
    </div>
    </div>
  );
};

export default CarsContainer;
