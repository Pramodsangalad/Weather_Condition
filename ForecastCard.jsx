import React from 'react';

export default function ForecastCard({ item, units }) {
  const icon = item.icon
    ? `https://openweathermap.org/img/wn/${item.icon}.png`
    : null;
  const unit = units === 'imperial' ? '°F' : '°C';
  const date = new Date(item.date);
  const day = date.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
  return (
    <div className="card" style={{ textAlign: 'center' }}>
      <div className="muted">{day}</div>
      {icon && <img className="icon" src={icon} alt={item.description || 'weather'} style={{ width: 48, height: 48 }} />}
      <div style={{ fontWeight: 600, marginBottom: 4, textTransform: 'capitalize' }}>{item.description}</div>
      <div className="row" style={{ justifyContent: 'center' }}>
        <div className="chip">Min: {Math.round(item.min)}{unit}</div>
        <div className="chip">Max: {Math.round(item.max)}{unit}</div>
      </div>
    </div>
  );
}

