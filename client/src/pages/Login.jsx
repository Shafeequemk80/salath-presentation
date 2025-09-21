import { useState } from 'react';
import { api } from '../api.js';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({  phone: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await api('/auth/login', { method: 'POST', body: form });
      login(data.token, data.user);
      navigate('/dashboard');
    } catch (e) { setError(e.message); } finally { setLoading(false); }
  };

  return (
    <main className="max-w-md mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-primary-900 mb-4">Welcome back</h1>
      <form onSubmit={submit} className="card space-y-4">
        {error && <div className="text-red-600">{error}</div>}
       
        <div>
          <label className="block text-sm text-primary-800 mb-1">Phone</label>
          <input className="input" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} required />
        </div>
        <button className="btn w-full" disabled={loading}>{loading ? 'Signing in...' : 'Login'}</button>
        <p className="text-sm text-center">No account? <Link className="link" to="/signup">Sign up</Link></p>
      </form>
    </main>
  );
}
