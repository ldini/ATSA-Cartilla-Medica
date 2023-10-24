import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from '../Card/Card';
import './CarsContainer.css';

const FetchComponent = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedZone, setSelectedZone] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedInstitution, setSelectedInstitution] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('');
  const [uniqueTypes, setUniqueTypes] = useState([]);
  const [uniqueInstitutions, setUniqueInstitutions] = useState([]);
  const [uniqueSpecialties, setUniqueSpecialties] = useState([]);
  const [uniqueProviders, setUniqueProviders] = useState([]);



useEffect(() => {
  fetch('http://localhost:3000/prestador/detail')
    .then(response => response.json())
    .then(jsonData => {
      setData(jsonData);
      setFilteredData([]);
      const typesInData = [...new Set(jsonData.map(item => item.institucion_tipo))];
      setUniqueTypes(typesInData);
      const institutionsInData = [...new Set(jsonData.map(item => item.institucion_nombre))];
      setUniqueInstitutions(institutionsInData);
    })
    .catch(error => console.error('Error fetching data:', error));
}, []);

  useEffect(() => {
    const typesInSelectedZone = selectedZone === 'all' ? [...new Set(data.map(item => item.institucion_tipo))] : [...new Set(data.filter(item => item.institucion_zona === selectedZone).map(item => item.institucion_tipo))];
    setUniqueTypes(typesInSelectedZone);
  }, [selectedZone, data, uniqueTypes]);

  useEffect(() => {
    let typesInSelectedZone = [];
    if (selectedZone === 'all') {
      typesInSelectedZone = [...new Set(data.map(item => item.institucion_tipo))];
    } else {
      typesInSelectedZone = [...new Set(data.filter(item => item.institucion_zona === selectedZone).map(item => item.institucion_tipo))];
    }
    setUniqueTypes(typesInSelectedZone);
  }, [selectedZone, data]);
  
  useEffect(() => {
    let uniqueInstitutionsByType = [];
    if (selectedZone !== 'all') 
      uniqueInstitutionsByType = selectedType !== '' ? [...new Set(data.filter(item => item.institucion_tipo === selectedType).map(item => item.institucion_nombre))] : [];
    else{
      uniqueInstitutionsByType = selectedType !== '' ? [...new Set(data.map(item => item.institucion_nombre))] : [];
    }
      setUniqueInstitutions(uniqueInstitutionsByType);
  }, [selectedZone,selectedType, data]);

  useEffect(() => {
    let uniqueInstitutionsByType = [];
    if (selectedZone !== 'all') {
      if (selectedType !== 'all') {
        uniqueInstitutionsByType = [...new Set(data.filter(item => item.institucion_zona === selectedZone && item.institucion_tipo === selectedType).map(item => item.institucion_nombre))];
      } else {
        uniqueInstitutionsByType = [...new Set(data.filter(item => item.institucion_zona === selectedZone).map(item => item.institucion_nombre))];
      }
    } else {
      if (selectedType !== 'all') {
        uniqueInstitutionsByType = [...new Set(data.filter(item => item.institucion_tipo === selectedType).map(item => item.institucion_nombre))];
      } else {
        uniqueInstitutionsByType = [...new Set(data.map(item => item.institucion_nombre))];
      }
    }
    setUniqueInstitutions(uniqueInstitutionsByType);
  }, [selectedZone, selectedType, data]);
  

useEffect(() => {
  let specialtiesInSelectedInstitution = [];
  if (selectedInstitution !== '') {
    if (selectedInstitution === 'all') {
      specialtiesInSelectedInstitution = [...new Set(data.map(item => item.especialidad_nombre))];
    } else {
      specialtiesInSelectedInstitution = [...new Set(data.filter(item => item.institucion_nombre === selectedInstitution).map(item => item.especialidad_nombre))];
    }
  }
  setUniqueSpecialties(specialtiesInSelectedInstitution);
}, [selectedInstitution, data]);

useEffect(() => {
  let providersInSelectedSpecialty = [];
  if (selectedSpecialty !== '') {
    if (selectedSpecialty === 'all') {
      providersInSelectedSpecialty = [...new Set(data.map(item => `${item.prestador_nombre} ${item.prestador_apellido}`))];
    } else {
      providersInSelectedSpecialty = [...new Set(data.filter(item => item.especialidad_nombre === selectedSpecialty).map(item => `${item.prestador_nombre} ${item.prestador_apellido}`))];
    }
  }
  setUniqueProviders(providersInSelectedSpecialty);
}, [selectedSpecialty, data]);

  
  const handleZoneFilter = (zone) => {
    let filtered = [];
    if (zone === 'all') {
      filtered = [...data];
    }
    setFilteredData(filtered);
    setSelectedZone(zone);
    setSelectedType('');
    setSelectedInstitution('');
    setSelectedSpecialty('');
    setSelectedProvider('');
  };

  const handleTypeFilter = (type) => {
    let filtered = [];
    if (selectedZone !== 'all') {
      if (type === 'all') {
        filtered = data.filter(item => item.institucion_zona === selectedZone);
      } else {
        filtered = data.filter(item => item.institucion_zona === selectedZone && item.institucion_tipo === type);
      }
    } else {
      filtered = type === 'all' ? [...data] : data.filter(item => item.institucion_tipo === type);
    }
    setFilteredData(filtered);
    setSelectedType(type);
    setSelectedInstitution('');
    setSelectedSpecialty('');
    setSelectedProvider('');
  };
  
  const handleInstitutionFilter = (institution) => {
    let filtered = [];

    if (selectedZone === 'all' && selectedType === 'all') {
      filtered = institution === 'all' ? [...data] : data.filter(item => item.institucion_nombre === institution);
    } else if (selectedZone === 'all') {
      filtered = institution === 'all' ? data.filter(item => item.institucion_tipo === selectedType) : data.filter(item => item.institucion_tipo === selectedType && item.institucion_nombre === institution);
    } else if (selectedType === 'all') {
      filtered = institution === 'all' ? data.filter(item => item.institucion_zona === selectedZone) : data.filter(item => item.institucion_zona === selectedZone && item.institucion_nombre === institution);
    } else {
      filtered = institution === 'all' ? data.filter(item => item.institucion_zona === selectedZone && item.institucion_tipo === selectedType) : data.filter(item => item.institucion_zona === selectedZone && item.institucion_tipo === selectedType && item.institucion_nombre === institution);
    }
    setFilteredData(filtered);
    setSelectedInstitution(institution);
    setSelectedSpecialty('');
    setSelectedProvider('');
  };
  

  const handleSpecialtyFilter = (specialty) => {
    let filtered = [];
  
    if (selectedInstitution === 'all') {
      filtered = specialty === 'all' ? [...data] : data.filter(item => item.especialidad_nombre === specialty);
    } else {
      filtered = specialty === 'all' ? data.filter(item => item.institucion_nombre === selectedInstitution) : data.filter(item => item.institucion_nombre === selectedInstitution && item.especialidad_nombre === specialty);
    }
    setFilteredData(filtered);
    setSelectedSpecialty(specialty);
    setSelectedProvider('');
  };

  const handleProviderFilter = (provider) => {
    const filtered = data.filter(item => `${item.prestador_nombre} ${item.prestador_apellido}` === provider);
    setFilteredData(filtered);
    setSelectedProvider(provider);
  };

  const uniqueZones = [...new Set(data.map(item => item.institucion_zona))];

  return (
<div>
  <div>
    <select className="form-select select-style" value={selectedZone} onChange={(e) => handleZoneFilter(e.target.value)}>
      <option value="">-- Seleccione una zona --</option>
      <option value="all">Todas las Zonas</option>
      {uniqueZones.map((zone, index) => (
        <option key={index} value={zone}>
          {zone}
        </option>
      ))}
    </select>
  </div>
  <div>
    <select className="form-select select-style" value={selectedType} onChange={(e) => handleTypeFilter(e.target.value)} disabled={!selectedZone}>
      <option value="">-- Seleccione tipo --</option>
      <option value="all">Todos los Tipos</option>
      {uniqueTypes.map((type, index) => (
        <option key={index} value={type}>
          {type === 'cabecera' ? 'Medico de Cabecera' : type === 'Clinica' ? 'Opción 2' : 'Centro Medico'}
        </option>
      ))}
    </select>
  </div>
  <div>
    <select className="form-select select-style" value={selectedInstitution} onChange={(e) => handleInstitutionFilter(e.target.value)} disabled={!selectedType || !selectedZone}>
      <option value="">-- Seleccione institucion --</option>
      <option value="all">Todas las Instituciones</option>
      {selectedType && selectedZone && uniqueInstitutions.map((institution, index) => (
        <option key={index} value={institution}>
          {institution}
        </option>
      ))}
    </select>
  </div>
  <div>
    <select className="form-select select-style" value={selectedSpecialty} onChange={(e) => handleSpecialtyFilter(e.target.value)} disabled={!selectedInstitution}>
      <option value="">-- Seleccione especialidad --</option>
      {selectedInstitution && uniqueSpecialties.map((specialty, index) => (
        <option key={index} value={specialty}>
          {specialty}
        </option>
      ))}
    </select>
  </div>
  <div>
    <select className="form-select select-style" value={selectedProvider} onChange={(e) => handleProviderFilter(e.target.value)} disabled={!selectedSpecialty}>
      <option value="">-- Seleccione proveedores --</option>
      {selectedSpecialty && uniqueProviders.map((provider, index) => (
        <option key={index} value={provider}>
          {provider}
        </option>
      ))}
    </select>
  </div>
  <div className="card-container">
     {filteredData.map((medico, index) => (
      <Card
        key={index}
        nombre={medico.prestador_apellido}
        apellido={medico.prestador_nombre}
        especialidad_nombre={medico.especialidad_nombre}
        horarios_trabajo={medico.horarios_trabajo}
        telefono_numero={medico.telefonos}
        institucion_direccion={medico.institucion_direccion}
        institucion_zona={medico.institucion_zona}
        instituciones={`${medico.prestador_apellido} ${medico.prestador_nombre}`}
        centro={medico.institucion_nombre ? medico.institucion_nombre : `${medico.prestador_apellido} ${medico.prestador_nombre}`}
      />
    ))}
  </div>
</div>
  );
};

export default FetchComponent;
