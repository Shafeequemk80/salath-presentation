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
  const [loading, setLoading] = useState(false);

  useEffect(() => { if (!isAdmin) navigate('/admin'); }, []);

  useEffect(() => {
    api('/admin/users').then(setUsers).catch(e => setError(e.message));
  }, []);

  const openUser = async (u) => {
    if (selected?._id === u._id) {
      // collapse if clicked again
      setSelected(null);
      setCounts([]);
      setTotal([]);
      return;
    }
    setSelected(u);
    setCounts([]);
    setTotal([]);
    setError('');
    setLoading(true);
    try {
      const items = await api(`/admin/users/${u._id}/counts`);
      setCounts(items.items);
      setTotal(items.totalCount);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold text-primary-900">Admin Panel</h1>
        <Link className="link" to="/">Back to site</Link>
      </div>

      {error && <div className="text-red-600 mb-3">{error}</div>}

      <Card>
        <h2 className="text-xl font-bold text-primary-900 mb-3">All Users</h2>
        <div className="divide-y divide-primary-100">
          {users.map(u => (
            <div key={u._id}>
              <button
                onClick={() => openUser(u)}
                className="w-full text-left py-2 flex items-center justify-between hover:bg-primary-50 rounded-md px-2"
              >
                <div>
                  <div className="font-medium text-primary-900">{u.name}</div>
                  <div className="text-sm text-primary-700">
                    {u.phone}{u.address ? ` • ${u.address}` : ''}
                  </div>
                </div>
                <span className="text-xs text-primary-700">
                  {selected?._id === u._id ? "Hide" : "View"}
                </span>
              </button>

              {/* Details appear just below this user */}
              {selected?._id === u._id && (
                <div className="bg-primary-50 p-3 rounded-md mt-2 mb-2">
                  <h3 className="font-semibold text-primary-900 mb-2">
                    {u.name}'s counts
                  </h3>
                  <div className="divide-y divide-primary-200">
                    {loading && (
                      <div className="py-4 text-primary-700 animate-pulse">Loading...</div>
                    )}
                    {!loading && counts.length === 0 && (
                      <div className="py-4 text-primary-700">No entries yet.</div>
                    )}
                    {!loading && counts.map(c => (
                      <div key={c._id} className="py-2 flex items-center justify-between">
                        <span className="text-primary-800">{c.date}</span>
                        <span className="font-semibold text-primary-900">{c.value}</span>
                      </div>
                    ))}
                    {!loading && (
                      <div className="py-2 flex items-center justify-between">
                        <span className="text-primary-800 text-lg">Total</span>
                        <span className="font-semibold text-primary-900">{total}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </main>
  );
}
