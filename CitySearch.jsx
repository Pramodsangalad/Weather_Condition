import React, { useEffect, useMemo, useRef, useState } from 'react';
import cities from '../data/karnatakaCities.json';

export default function CitySearch({ value, onChange }) {
  const [query, setQuery] = useState(value || '');
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => setQuery(value || ''), [value]);

  useEffect(() => {
    function onDocClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return cities;
    return cities.filter(c => c.toLowerCase().includes(q));
  }, [query]);

  function selectCity(c) {
    onChange(c);
    setOpen(false);
  }

  return (
    <div className="search" ref={ref}>
      <label className="muted" htmlFor="city-input">Select a Karnataka city</label>
      <input
        id="city-input"
        placeholder="Start typing e.g., Bengaluru, Mysuru..."
        value={query}
        onChange={e => { setQuery(e.target.value); setOpen(true); }}
        onFocus={() => setOpen(true)}
      />
      {open && (
        <div className="dropdown">
          {filtered.length === 0 && (
            <div style={{ padding: 12, color: '#64748b' }}>No matches in Karnataka</div>
          )}
          {filtered.map(c => (
            <button key={c} onClick={() => selectCity(c)}>{c}</button>
          ))}
        </div>
      )}
    </div>
  );
}

