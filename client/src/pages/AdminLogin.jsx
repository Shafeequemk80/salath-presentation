import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AdminLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const ADMIN_USER = import.meta.env.VITE_ADMIN_USER || 'admin';
  const ADMIN_PASS = import.meta.env.VITE_ADMIN_PASS || 'admin123';

  const submit = (e) => {
    e.preventDefault();
    setError('');
    if (form.username === ADMIN_USER && form.password === ADMIN_PASS) {
      sessionStorage.setItem('isAdmin', '1');
      navigate('/admin/panel');
    } else {
      setError('Invalid admin credentials');
    }
  };

  return (
    <main className="max-w-sm mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-primary-900 mb-4">Admin Login</h1>
      <form onSubmit={submit} className="card space-y-4">
        {error && <div className="text-red-600">{error}</div>}
        <div>
          <label className="block text-sm text-primary-800 mb-1">Username</label>
          <input className="input" value={form.username} onChange={e=>setForm({...form, username:e.target.value})} />
        </div>
        <div>
          <label className="block text-sm text-primary-800 mb-1">Password</label>
          <input type="password" className="input" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} />
        </div>
        <button className="btn w-full">Login</button>
      </form>
    </main>
  );
}
