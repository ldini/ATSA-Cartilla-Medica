import React from 'react';
import './Card.css';

const Card = (props) => {

  let phoneNumbers = [];
  if (props && props.telefono_numero !== null) 
    phoneNumbers = props.telefono_numero.split(' / ');
   
  const direccion = props.institucion_direccion + ', ' + props.institucion_zona;
  const urlGoogleMaps = `https://www.google.com/maps?q=${encodeURIComponent(direccion)}`;
  // const embedMapUrl = `https://www.google.com/maps/embed/v1/place?key=TU_CLAVE_DE_API&q=${encodeURIComponent(direccion)}`; mini mapa

  const handleWhatsAppClick = (number) => () => {
    const formattedPhoneNumber = number.replace(/\D/g, ''); // Eliminar caracteres no numéricos
    const whatsappLink = `https://wa.me/${formattedPhoneNumber}`; 
    window.open(whatsappLink, '_blank');
  };


  return (
    <div className="card">
      
      {props.apellido === 'guardia'
        ? <h2>{props.centro} -<span style={{color:'#49C354'}}> Guardia 24hs</span></h2 > 
        : <h2>{props.centro}</h2>}

      {props.apellido !== 'guardia' && (
        <p className="info">
          <span className="label">Especialista: </span> {props.nombre + ' ' + props.apellido}
        </p>
      )}
      <p className="info">
        <span className="label">Especialidad: </span> {props.especialidad_nombre}
      </p>
      <p className="info">
        <span className="label">Teléfono: </span> 
        {phoneNumbers.map((number, index) => {
          if (number.includes('(wa)')) {
            const numberWithoutWa = number.replace('(wa)', '').trim();
            return (
              <span key={index}>{" "}
                <a href={`tel:${numberWithoutWa}`} className="phone-link">
                  {numberWithoutWa}
                </a>
                <span className="whatsapp-link" onClick={handleWhatsAppClick(numberWithoutWa)}>
                  <i className="fas fa-whatsapp"></i>
                </span>
              </span>
            );
          } else {
            return (
              <span>{" "}
              <a key={index} href={`tel:${number}`} className="phone-link">
                {number}
              </a>
              </span>
            );
          }
        })}
      </p>
      <p className="info">
        <span className="label">Dirección: </span> 
        <a href={urlGoogleMaps} target="_blank" rel="noopener noreferrer">
          {props.institucion_direccion}, {props.institucion_zona}
        </a>
      </p>
      <p className="info">
        <span className="label">Localidad: </span> {props.institucion_zona}
      </p>

      {props.apellido !== 'guardia' && (
      <p className="info">
        <div className="one">
          <span className="label">Horarios: </span>
          <div className="two">
            {props.horarios_trabajo
              ? props.horarios_trabajo.split(' / ').map((horario, index) => (
                  <p className="three" key={index}>{horario}</p>
                ))
              : null}
          </div>
        </div>
      </p>
    )}


      {/* minimapa */}
      {/* <div className="mini-map">
        <iframe
          title="Mini Map"
          width="300"
          height="200"
          frameBorder="0"
          src={embedMapUrl}
          allowFullScreen
        ></iframe>
      </div> */}
    </div>
  );
};

export default Card;
