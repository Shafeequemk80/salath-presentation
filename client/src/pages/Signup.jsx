import { useState } from 'react';
import { api } from '../api.js';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate, Link } from 'react-router-dom';

export default function Signup() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', phone: '', address: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleNumberChange = () => (e) => {

    const value = e.target.value;
    // allow only digits and max 10
    if (/^\d{0,10}$/.test(value)) {
      setForm({ ...form, phone: value });
    
  }
  }

  // utils.js or inside same component
const removeSpaces = (value) => {
  return value.replace(/\s+/g, ""); // remove all spaces
};

  const submit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const data = await api('/auth/signup', { method: 'POST', body: form });
      login(data.token, data.user);
      navigate('/dashboard');
    } catch (e) { setError(e.message); } finally { setLoading(false); }
  };

  return (
    <main className="max-w-md mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-primary-900 mb-4">Create your account</h1>
      <form onSubmit={submit} className="card space-y-4">
        {error && <div className="text-red-600">{error}</div>}
 <div>
  <label className="block text-sm text-primary-800 mb-1">Username</label>
  <input
    className="input"
    value={form.name}
    onChange={e =>
      setForm({
        ...form,
        name: removeSpaces(e.target.value) // call function
      })
    }
    placeholder="Enter username E.g. Muhmmmed123" 
    required
  />
</div>

        <div>
          <label className="block text-sm text-primary-800 mb-1">Phone</label>
<input 
  className="input" 
  type="tel"
  value={form.phone}
  onChange={handleNumberChange()}
  minLength={10}
  maxLength={10}
  required
  placeholder="Enter 10-digit phone number"
/>        </div>
        <div>
          <label className="block text-sm text-primary-800 mb-1">Address</label>
          <input className="input" value={form.address} onChange={e=>setForm({...form, address:e.target.value})} />
        </div>
        <button className="btn w-full" disabled={loading}>{loading ? 'Creating...' : 'Sign up'}</button>
        <p className="text-sm text-center">Already have an account? <Link className="link" to="/login">Login</Link></p>
      </form>
    </main>
  );
}
