import React, { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar.jsx';
import CitySearch from './components/CitySearch.jsx';
import CurrentWeather from './components/CurrentWeather.jsx';
import Forecast from './components/Forecast.jsx';
import cities from './data/karnatakaCities.json';

const API_BASE = 'http://localhost:5000/api';

function formatDateTime(ts, tz) {
  if (!ts) return '';
  const date = new Date((ts + (tz || 0)) * 1000);
  return date.toLocaleString();
}

export default function App() {
  const [city, setCity] = useState(() => localStorage.getItem('last_city') || 'Bengaluru');
  const [units, setUnits] = useState(() => localStorage.getItem('units') || 'metric');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [current, setCurrent] = useState(null);
  const [forecast, setForecast] = useState([]);

  const bgClass = useMemo(() => {
    const cond = current?.weather?.main?.toLowerCase() || '';
    if (cond.includes('rain')) return 'bg-rain';
    if (cond.includes('thunder')) return 'bg-thunder';
    if (cond.includes('cloud')) return 'bg-clouds';
    if (cond.includes('mist') || cond.includes('fog') || cond.includes('haze')) return 'bg-mist';
    return 'bg-clear';
  }, [current]);

  useEffect(() => {
    document.body.classList.remove('bg-clear', 'bg-clouds', 'bg-rain', 'bg-thunder', 'bg-mist');
    document.body.classList.add(bgClass);
  }, [bgClass]);

  async function load() {
    if (!city || !cities.includes(city)) {
      setError('Please select a city from Karnataka');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const [w, f] = await Promise.all([
        axios.get(`${API_BASE}/weather/${encodeURIComponent(city)}`, { params: { units } }),
        axios.get(`${API_BASE}/forecast/${encodeURIComponent(city)}`, { params: { units } })
      ]);
      setCurrent(w.data.data);
      setForecast(f.data.forecast || []);
      localStorage.setItem('last_city', city);
      localStorage.setItem('units', units);
    } catch (e) {
      setError(e?.response?.data?.message || e.message || 'Failed to load weather');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, [city, units]);

  return (
    <div className="container">
      <div className="navbar">
        <div className="title">Karnataka Weather</div>
        <Navbar units={units} onUnitsChange={setUnits} />
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <CitySearch value={city} onChange={setCity} />
      </div>

      {loading && (
        <div className="card row" style={{ justifyContent: 'center' }}>
          <div className="spinner" />
          <div>Loading weather...</div>
        </div>
      )}

      {error && (
        <div className="card" style={{ border: '1px solid #fecaca', background: '#fee2e2' }}>
          <div style={{ fontWeight: 600 }}>Error</div>
          <div>{error}</div>
        </div>
      )}

      {!loading && !error && current && (
        <div className="grid">
          <CurrentWeather data={current} units={units} formatDateTime={formatDateTime} />
          <Forecast items={forecast} units={units} />
        </div>
      )}
    </div>
  );
}

