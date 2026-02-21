import React from 'react';

export default function Navbar({ units, onUnitsChange }) {
  return (
    <div className="row" style={{ gap: 16 }}>
      <div className="muted">Units</div>
      <div className="toggle">
        <button
          className={units === 'metric' ? 'active' : ''}
          onClick={() => onUnitsChange('metric')}
          aria-label="Celsius"
        >
          °C
        </button>
        <button
          className={units === 'imperial' ? 'active' : ''}
          onClick={() => onUnitsChange('imperial')}
          aria-label="Fahrenheit"
        >
          °F
        </button>
      </div>
    </div>
  );
}

