import React from 'react';

function toUnit(units) {
  return units === 'imperial' ? '°F' : '°C';
}

function formatTime(ts, tz) {
  if (!ts) return '';
  const d = new Date((ts + (tz || 0)) * 1000);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

export default function CurrentWeather({ data, units }) {
  const icon = data.weather?.icon
    ? `https://openweathermap.org/img/wn/${data.weather.icon}@2x.png`
    : null;
  const unit = toUnit(units);
  return (
    <div className="card">
      <div className="row" style={{ justifyContent: 'space-between' }}>
        <div>
          <div className="muted">Current Weather</div>
          <h2 style={{ margin: '6px 0' }}>{data.name}</h2>
          <div className="row">
            {icon && <img className="icon" src={icon} alt={data.weather?.description || 'weather'} />}
            <div className="temp">
              {Math.round(data.main?.temp)}{unit}
            </div>
          </div>
          <div className="muted" style={{ textTransform: 'capitalize' }}>
            {data.weather?.description}
          </div>
        </div>
      </div>
      <div className="subgrid" style={{ marginTop: 12 }}>
        <div className="chip">Feels like: <strong>{Math.round(data.main?.feels_like)}{unit}</strong></div>
        <div className="chip">Humidity: <strong>{data.main?.humidity}%</strong></div>
        <div className="chip">Wind: <strong>{data.wind?.speed}{units === 'imperial' ? ' mph' : ' m/s'}</strong></div>
        <div className="chip">Pressure: <strong>{data.main?.pressure} hPa</strong></div>
        <div className="chip">Visibility: <strong>{Math.round((data.visibility || 0) / 1000)} km</strong></div>
        <div className="chip">Sunrise: <strong>{formatTime(data.sys?.sunrise, data.timezone)}</strong></div>
        <div className="chip">Sunset: <strong>{formatTime(data.sys?.sunset, data.timezone)}</strong></div>
      </div>
    </div>
  );
}

