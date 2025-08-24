import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { api } from '../api.js';

function todayKey() {
  const d = new Date();
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const dd = String(d.getDate()).padStart(2, '0');
  return `${yyyy}-${mm}-${dd}`;
}

export default function Dashboard() {
  const { token, user } = useAuth();
  const [value, setValue] = useState('');
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const load = () => api('/counts/me', { token }).then(setItems).catch(e=>setError(e.message));

  useEffect(() => { load(); }, []);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const num = Number(value);
      if (Number.isNaN(num) || num < 0) throw new Error('Enter a valid non-negative number');
      await api('/counts/me/today', { method: 'POST', token, body: { value: num } });
      setValue('');
      await load();
    } catch (e) { setError(e.message); } finally { setLoading(false); }
  };

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-primary-900">Hello, {user?.name}</h1>
      <p className="text-primary-700 mb-4">Submit today’s count ({todayKey()}).</p>

      <form onSubmit={submit} className="card flex items-center gap-3">
        <input className="input" placeholder="e.g., 100" value={value} onChange={e=>setValue(e.target.value)} />
        <button className="btn shrink-0" disabled={loading}>{loading ? 'Saving...' : 'Save today'}</button>
      </form>

      {error && <div className="text-red-600 mt-3">{error}</div>}

      <section className="mt-8 card">
        <h2 className="text-xl font-bold text-primary-900 mb-3">Your past days</h2>
        <div className="divide-y divide-primary-100">
          {items.length === 0 && <div className="py-6 text-center text-primary-700">No history yet.</div>}
          {items.map((it) => (
            <div key={it._id} className="flex items-center justify-between py-2">
              <span className="text-primary-800">{it.date}</span>
              <span className="font-semibold text-primary-900">{it.value}</span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
