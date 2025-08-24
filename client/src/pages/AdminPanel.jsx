import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api.js';
import Card from '../components/Card.jsx';

export default function AdminPanel() {
  const navigate = useNavigate();
  const isAdmin = sessionStorage.getItem('isAdmin') === '1';
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState(null);
  const [counts, setCounts] = useState([]);
  const [total, setTotal] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => { if (!isAdmin) navigate('/admin'); }, []);

  useEffect(() => {
    api('/admin/users').then(setUsers).catch(e=>setError(e.message));
  }, []);

  const openUser = async (u) => {
    setSelected(u);
    setError('');
    try {
      const items = await api(`/admin/users/${u._id}/counts`);
      console.log(items);
      
      setCounts(items.items);
      setTotal(items.totalCount);
    } catch (e) { setError(e.message); }
  };

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold text-primary-900">Admin Panel</h1>
        <Link className="link" to="/">Back to site</Link>
      </div>

      {error && <div className="text-red-600 mb-3">{error}</div>}

      <div className="grid md:grid-cols-2 gap-4">
        <Card>
          <h2 className="text-xl font-bold text-primary-900 mb-3">All Users</h2>
          <div className="divide-y divide-primary-100">
            {users.map(u => (
              <button key={u._id} onClick={()=>openUser(u)} className="w-full text-left py-2 flex items-center justify-between hover:bg-primary-50 rounded-md px-2">
                <div>
                  <div className="font-medium text-primary-900">{u.name}</div>
                  <div className="text-sm text-primary-700">{u.phone}{u.address ? ` • ${u.address}` : ''}</div>
                </div>
                <span className="text-xs text-primary-700">View</span>
              </button>
            ))}
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-bold text-primary-900 mb-3">{selected ? `${selected.name}'s counts` : 'Select a user'}</h2>
          {selected && (
            <div className="divide-y divide-primary-100">
              {counts.length === 0 && <div className="py-6 text-primary-700">No entries yet.</div>}
              {counts.map(c => (
                <div key={c._id} className="py-2 flex items-center justify-between">
                  <span className="text-primary-800">{c.date}</span>
                  <span className="font-semibold text-primary-900">{c.value}</span>
                </div>
              ))}
                 <div className="py-2 flex items-center justify-between">
                  <span className="text-primary-800 text-2xl">Total</span>
                  <span className="font-semibold text-primary-900">{total}</span>
                </div>
            </div>
          )}
        </Card>
      </div>
    </main>
  );
}
