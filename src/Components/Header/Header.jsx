import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header>
      <img src='../../../logo.jpg' alt="Logo" />
      <nav>
        <ul>
          <li><a href="/">Inicio</a></li>
          <li><a href="/productos">Productos</a></li>
          <li><a href="/contacto">Contacto</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;