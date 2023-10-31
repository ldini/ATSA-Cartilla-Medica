import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from '../Card/Card';
import './CarsContainer.css';

const FetchComponent = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedZone, setSelectedZone] = useState('all');
  const [selectedType, setSelectedType] = useState('');
  const [selectedInstitution, setSelectedInstitution] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [selectedProvider, setSelectedProvider] = useState('');
  const [uniqueTypes, setUniqueTypes] = useState([]);
  const [uniqueInstitutions, setUniqueInstitutions] = useState([]);
  const [uniqueSpecialties, setUniqueSpecialties] = useState([]);
  const [uniqueProviders, setUniqueProviders] = useState([]);


useEffect(() => {
  // fetch('http://107.180.104.190:7012/prestador/detail')
  fetch('http://localhost:3000/prestador/detail')
    .then(response => response.json())
    .then(jsonData => {
      jsonData.sort((a, b) => {
        if (a.institucion_zona < b.institucion_zona) {
          return -1;
        }
        if (a.institucion_zona > b.institucion_zona) {
          return 1;
        }
        return 0;
      });
      setData(jsonData);
      setFilteredData([]);
      const typesInData = [...new Set(jsonData.map(item => item.institucion_tipo))];
      setUniqueTypes(typesInData);
      const institutionsInData = [...new Set(jsonData.map(item => item.institucion_nombre))];
      setUniqueInstitutions(institutionsInData.sort());
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
    setUniqueTypes(typesInSelectedZone.sort());
  }, [selectedZone, data]);
  

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
    setUniqueInstitutions(uniqueInstitutionsByType.sort());
  }, [selectedZone, selectedType, data]);
  

  useEffect(() => {
    let specialtiesInSelectedInstitution = [];
  
    switch (true) {
      case (selectedInstitution === 'all' && selectedType === 'all' && selectedZone === 'all'):
        specialtiesInSelectedInstitution = [...new Set(data.map(item => item.especialidad_nombre))];
        break;
      case (selectedInstitution === 'all' && selectedType === 'all'):
        specialtiesInSelectedInstitution = [...new Set(data.filter(item => item.institucion_zona === selectedZone).map(item => item.especialidad_nombre))];
        break;
      case (selectedInstitution === 'all' && selectedZone === 'all'):
        specialtiesInSelectedInstitution = [...new Set(data.filter(item => item.institucion_tipo === selectedType).map(item => item.especialidad_nombre))];
        break;
      case (selectedType === 'all' && selectedZone === 'all'):
        specialtiesInSelectedInstitution = [...new Set(data.filter(item => item.institucion_nombre === selectedInstitution).map(item => item.especialidad_nombre))];
        break;
      case (selectedInstitution === 'all'):
        specialtiesInSelectedInstitution = [...new Set(data.filter(item => item.institucion_tipo === selectedType && item.institucion_zona === selectedZone).map(item => item.especialidad_nombre))];
        break;
      case (selectedType === 'all'):
        specialtiesInSelectedInstitution = [...new Set(data.filter(item => item.institucion_nombre === selectedInstitution && item.institucion_zona === selectedZone).map(item => item.especialidad_nombre))];
        break;
      case (selectedZone === 'all'):
        specialtiesInSelectedInstitution = [...new Set(data.filter(item => item.institucion_nombre === selectedInstitution && item.institucion_tipo === selectedType).map(item => item.especialidad_nombre))];
        break;
      default:
        specialtiesInSelectedInstitution = [...new Set(data.filter(item => item.institucion_nombre === selectedInstitution && item.institucion_tipo === selectedType && item.institucion_zona === selectedZone).map(item => item.especialidad_nombre))];
        break;
    }
    setUniqueSpecialties(specialtiesInSelectedInstitution.sort());
  }, [selectedInstitution, selectedType, selectedZone, data]);
  

useEffect(() => {
  let providersInSelectedSpecialty = [];
  switch (true) {
    case (selectedInstitution === 'all' && selectedType === 'all' && selectedZone === 'all' && selectedSpecialty === ''):
      providersInSelectedSpecialty = [...new Set(data.map(item => `${item.prestador_nombre} ${item.prestador_apellido}`))];
      break;
    case (selectedInstitution === 'all' && selectedType === 'all' && selectedZone === 'all'):
      providersInSelectedSpecialty = [...new Set(data.filter(item => item.especialidad_nombre === selectedSpecialty).map(item => `${item.prestador_nombre} ${item.prestador_apellido}`))];
      break;
    case (selectedInstitution === 'all' && selectedType === 'all'):
      providersInSelectedSpecialty = [...new Set(data.filter(item => item.especialidad_nombre === selectedSpecialty && item.institucion_zona === selectedZone).map(item => `${item.prestador_nombre} ${item.prestador_apellido}`))];
      break;
    case (selectedInstitution === 'all' && selectedZone === 'all'):
      providersInSelectedSpecialty = [...new Set(data.filter(item => item.especialidad_nombre === selectedSpecialty && item.institucion_tipo === selectedType).map(item => `${item.prestador_nombre} ${item.prestador_apellido}`))];
      break;
    case (selectedType === 'all' && selectedZone === 'all'):
      providersInSelectedSpecialty = [...new Set(data.filter(item => item.especialidad_nombre === selectedSpecialty && item.institucion_nombre === selectedInstitution).map(item => `${item.prestador_nombre} ${item.prestador_apellido}`))];
      break;
    case (selectedInstitution === 'all'):
      providersInSelectedSpecialty = [...new Set(data.filter(item => item.especialidad_nombre === selectedSpecialty && item.institucion_tipo === selectedType && item.institucion_zona === selectedZone).map(item => `${item.prestador_nombre} ${item.prestador_apellido}`))];
      break;
    case (selectedType === 'all'):
      providersInSelectedSpecialty = [...new Set(data.filter(item => item.especialidad_nombre === selectedSpecialty && item.institucion_nombre === selectedInstitution && item.institucion_zona === selectedZone).map(item => `${item.prestador_nombre} ${item.prestador_apellido}`))];
      break;
    case (selectedZone === 'all'):
      providersInSelectedSpecialty = [...new Set(data.filter(item => item.especialidad_nombre === selectedSpecialty && item.institucion_nombre === selectedInstitution && item.institucion_tipo === selectedType).map(item => `${item.prestador_nombre} ${item.prestador_apellido}`))];
      break;
    default:
      providersInSelectedSpecialty = [...new Set(data.filter(item => item.especialidad_nombre === selectedSpecialty && item.institucion_nombre === selectedInstitution && item.institucion_tipo === selectedType && item.institucion_zona === selectedZone).map(item => `${item.prestador_nombre} ${item.prestador_apellido}`))];
      break;
  }
  setUniqueProviders(providersInSelectedSpecialty.sort());
}, [selectedZone,selectedType,selectedSpecialty,selectedInstitution, data]);



  
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
    switch (true) {
      case (selectedZone === 'all' && selectedType === 'all'):
        filtered = institution === 'all' ? [...data] : data.filter(item => item.institucion_nombre === institution);
        break;
      case (selectedZone === 'all'):
        filtered = institution === 'all' ? data.filter(item => item.institucion_tipo === selectedType) : data.filter(item => item.institucion_tipo === selectedType && item.institucion_nombre === institution);
        break;
      case (selectedType === 'all'):
        filtered = institution === 'all' ? data.filter(item => item.institucion_zona === selectedZone) : data.filter(item => item.institucion_zona === selectedZone && item.institucion_nombre === institution);
        break;
      default:
        filtered = institution === 'all' ? data.filter(item => item.institucion_zona === selectedZone && item.institucion_tipo === selectedType) : data.filter(item => item.institucion_zona === selectedZone && item.institucion_tipo === selectedType && item.institucion_nombre === institution);
        break;
    }
    setFilteredData(filtered);
    setSelectedInstitution(institution);
    setSelectedSpecialty('');
    setSelectedProvider('');
  };
  
  

  const handleSpecialtyFilter = (specialty) => {
    let filtered = [];
    switch (true) {
      case (selectedInstitution === 'all' && selectedZone === 'all' && selectedType === 'all'):
        filtered = data.filter(item => item.especialidad_nombre === specialty);
        break;
      case (selectedInstitution === 'all' && selectedZone === 'all'):
        filtered =  data.filter(item => item.institucion_tipo === selectedType && item.especialidad_nombre === specialty);
        break;
      case (selectedInstitution === 'all' && selectedType === 'all'):
        filtered =  data.filter(item => item.institucion_zona === selectedZone && item.especialidad_nombre === specialty);
        break;
      case (selectedZone === 'all' && selectedType === 'all'):
        filtered =  data.filter(item => item.institucion_nombre === selectedInstitution && item.especialidad_nombre === specialty);
        break;
      case (selectedInstitution === 'all'):
        filtered =  data.filter(item => item.institucion_zona === selectedZone && item.institucion_tipo === selectedType && item.especialidad_nombre === specialty);
        break;
      case (selectedZone === 'all'):
        filtered =  data.filter(item => item.institucion_nombre === selectedInstitution && item.institucion_tipo === selectedType && item.especialidad_nombre === specialty);
        break;
      case (selectedType === 'all'):
        filtered =  data.filter(item => item.institucion_nombre === selectedInstitution && item.institucion_zona === selectedZone && item.especialidad_nombre === specialty);
        break;
      default:
        filtered = specialty === 'all' ? data.filter(item => item.institucion_nombre === selectedInstitution && item.institucion_zona === selectedZone && item.institucion_tipo === selectedType) : data.filter(item => item.institucion_nombre === selectedInstitution && item.institucion_zona === selectedZone && item.institucion_tipo === selectedType && item.especialidad_nombre === specialty);
        break;
    }
    setFilteredData(filtered);
    setSelectedSpecialty(specialty);
    setSelectedProvider('');
  };


  const handleProviderFilter = (provider) => {
    let filtered = [];
    switch (true) {
      case (selectedInstitution === 'all' && selectedZone === 'all' && selectedType === 'all' && selectedSpecialty === ''):
        filtered = data.filter(item => `${item.prestador_nombre} ${item.prestador_apellido}` === provider);
        break;
      case (selectedInstitution === 'all' && selectedZone === 'all' && selectedType === 'all'):
        filtered = data.filter(item => item.especialidad_nombre === selectedSpecialty && `${item.prestador_nombre} ${item.prestador_apellido}` === provider);
        break;
      case (selectedInstitution === 'all' && selectedZone === 'all'):
        filtered = data.filter(item => item.especialidad_nombre === selectedSpecialty && item.institucion_tipo === selectedType && `${item.prestador_nombre} ${item.prestador_apellido}` === provider);
        break;
      case (selectedInstitution === 'all' && selectedType === 'all'):
        filtered = data.filter(item => item.especialidad_nombre === selectedSpecialty && item.institucion_zona === selectedZone && `${item.prestador_nombre} ${item.prestador_apellido}` === provider);
        break;
      case (selectedZone === 'all' && selectedType === 'all'):
        filtered = data.filter(item => item.institucion_nombre === selectedInstitution && item.especialidad_nombre === selectedSpecialty && `${item.prestador_nombre} ${item.prestador_apellido}` === provider);
        break;
      case (selectedInstitution === 'all'):
        filtered = data.filter(item => item.institucion_zona === selectedZone && item.institucion_tipo === selectedType && item.especialidad_nombre === selectedSpecialty && `${item.prestador_nombre} ${item.prestador_apellido}` === provider);
        break;
      case (selectedZone === 'all'):
        filtered = data.filter(item => item.institucion_nombre === selectedInstitution && item.institucion_tipo === selectedType && item.especialidad_nombre === selectedSpecialty && `${item.prestador_nombre} ${item.prestador_apellido}` === provider);
        break;
      case (selectedType === 'all'):
        filtered = data.filter(item => item.institucion_nombre === selectedInstitution && item.institucion_zona === selectedZone && item.especialidad_nombre === selectedSpecialty && `${item.prestador_nombre} ${item.prestador_apellido}` === provider);
        break;
      default:
        filtered = data.filter(item => item.institucion_nombre === selectedInstitution && item.institucion_zona === selectedZone && item.institucion_tipo === selectedType && item.especialidad_nombre === selectedSpecialty && `${item.prestador_nombre} ${item.prestador_apellido}` === provider);
        break;
    }
    setSelectedProvider('');
    setFilteredData(filtered);
    setSelectedProvider(provider);
  };
  
  

  const uniqueZones = [...new Set(data.map(item => item.institucion_zona))];

  return (
<div>
  <div>
    <select className="form-select select-style" value={selectedZone} onChange={(e) => handleZoneFilter(e.target.value)}>
      <option value="all">Todas las zonas</option>
      {uniqueZones.map((zone, index) => (
        <option key={index} value={zone}>
          {zone}
        </option>
      ))}
    </select>
  </div>
  <div>
    <select className="form-select select-style" value={selectedType} onChange={(e) => handleTypeFilter(e.target.value)} disabled={!selectedZone}>
      <option value="">Seleccione tipo</option>
      <option value="all">Todos los tipos</option>
      {uniqueTypes.map((type, index) => (
        <option key={index} value={type}>
          {type}
        </option>
      ))}
    </select>
  </div>
  <div>
    <select className="form-select select-style" value={selectedInstitution} onChange={(e) => handleInstitutionFilter(e.target.value)} disabled={!selectedType || !selectedZone}>
      <option value="">Seleccione institucion</option>
      <option value="all">Todas las instituciones</option>
      {selectedType && selectedZone && uniqueInstitutions.map((institution, index) => (
        <option key={index} value={institution}>
          {institution}
        </option>
      ))}
    </select>
  </div>
  <div>
    <select className="form-select select-style" value={selectedSpecialty} onChange={(e) => handleSpecialtyFilter(e.target.value)} disabled={!selectedInstitution}>
      <option value="">Seleccione especialidad</option>
      {selectedInstitution && uniqueSpecialties.map((specialty, index) => (
        <option key={index} value={specialty}>
          {specialty}
        </option>
      ))}
    </select>
  </div>
  <div>
    <select className="form-select select-style" value={selectedProvider} onChange={(e) => handleProviderFilter(e.target.value)} disabled={!selectedSpecialty}>
      <option value="">Seleccione proveedores</option>
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
        telefono_numero={medico.telefonos ? medico.telefonos : ''}
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
