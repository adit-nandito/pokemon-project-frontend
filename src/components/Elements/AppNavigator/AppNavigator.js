import React from 'react';
import './style.css';

const AppNavigator = () => {
  return (
    <div className="menu-bar">
      <ul className="menu-list">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/mypokemon">My Pokemon</a>
        </li>
      </ul>
    </div>
  );
};

export default AppNavigator;
