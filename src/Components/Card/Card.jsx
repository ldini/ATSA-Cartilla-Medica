import React from 'react';
import './Card.css';

const Card = (props) => {
  return (
    <div className="card">
      <h3>{props.nombre}</h3>
      <p className="info">
        <span className="label">Especialidad:</span> {props.especialidad}
      </p>
      <p className="info">
        <span className="label">Teléfono:</span> {props.telefono}
      </p>
      <p className="info">
        <span className="label">Día:</span> {props.dia}
      </p>
      <p className="info">
        <span className="label">Horarios:</span> {props.horario}
      </p>
      <p className="info">
        <span className="label">Dirección:</span> {props.direccion}
      </p>
      <p className="info">
        <span className="label">Localidad:</span> {props.localidad}
      </p>
    </div>
  );
};

export default Card;
