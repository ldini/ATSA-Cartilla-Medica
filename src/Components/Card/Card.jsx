import React from 'react';
import './Card.css';

const Card = (props) => {
  return (
    <div className="card">
      <h3>{props.nombre}</h3>
      <p className="info">
        <span className="label">Especialidad:</span> {props.especialidad_nombre}
      </p>
      <p className="info">
        <span className="label">Teléfono:</span> {props.telefono_numero}
      </p>
      <p className="info">
        <span className="label">Día:</span> {props.horario_dia}
      </p>
      <p className="info">
        <span className="label">Horarios:</span> {props.horario}
      </p>
      <p className="info">
        <span className="label">Dirección:</span> {props.institucion_direccion}
      </p>
      <p className="info">
        <span className="label">Localidad:</span> {props.institucion_zona}
      </p>
    </div>
  );
};

export default Card;
