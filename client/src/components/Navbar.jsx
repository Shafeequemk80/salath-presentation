import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-20 bg-primary-50/80 backdrop-blur border-b border-primary-100">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-primary-600 text-white grid place-items-center font-bold">SP</div>
          <span className="font-bold text-2xl text-primary-900">Salat App</span>
        </Link>
        <nav className="flex items-center gap-4">
          <NavLink to="/" className={({isActive})=>isActive? 'text-primary-900 font-semibold':'text-primary-700'}>Home</NavLink>
          {user ? (
            <>
              <NavLink to="/dashboard" className={({isActive})=>isActive? 'text-primary-900 font-semibold':'text-primary-700'}>Dashboard</NavLink>
              <button className="btn !px-3 !py-1.5" onClick={()=>{logout(); navigate('/login');}}>Logout</button>
            </>
          ) : (
            <>
              <NavLink to="/login" className="btn !px-3 !py-1.5">Login</NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
