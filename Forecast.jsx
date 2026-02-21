import React from 'react';
import ForecastCard from './ForecastCard.jsx';

export default function Forecast({ items, units }) {
  if (!items || items.length === 0) return null;
  return (
    <div>
      <div className="card" style={{ marginBottom: 12 }}>
        <div className="muted">5-Day Forecast</div>
      </div>
      <div className="grid">
        {items.map((it) => (
          <ForecastCard key={it.date} item={it} units={units} />
        ))}
      </div>
    </div>
  );
}

