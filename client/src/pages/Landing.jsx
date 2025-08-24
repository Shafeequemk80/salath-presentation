import { useEffect, useState } from 'react';
import Card from '../components/Card.jsx';
import LeaderboardRow from '../components/LeaderboardRow.jsx';
import { api } from '../api.js';
import { Link } from 'react-router-dom';
import { Trophy, Medal } from "lucide-react";
export default function Landing() {
  const [leaders, setLeaders] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    api('/counts/leaderboard/today?limit=3')
      .then(setLeaders)
      .catch((e) => setError(e.message));
  }, []);

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <section className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary-900">സ്വലാത്തിലൂടെ ഹബീബിലണയാം </h1>
        <p className="mt-3 text-primary-700 max-w-2xl mx-auto">Log your daily numbers and see where you stand today. Simple, fast, and motivating.</p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <Link to="/signup" className="btn">Get Started</Link>
          <Link to="/login" className="btn bg-primary-500 hover:bg-primary-600">I have an account</Link>
        </div>
      </section>



<Card className="p-5 bg-gradient-to-br from-green-50 to-green-100 shadow-lg rounded-2xl">
  <div className="flex items-center justify-between mb-4">
    <h2 className="text-2xl font-extrabold text-green-900 flex items-center gap-2">
      <Trophy className="w-6 h-6 text-yellow-500" />
      Today’s Top
    </h2>
    <span className="text-sm text-green-700 italic">Refreshed daily</span>
  </div>

  {error && <div className="text-red-600 mb-3 font-medium">{error}</div>}

  <div className="divide-y divide-green-200">
    {leaders.length === 0 && (
      <div className="py-6 text-center text-green-700 font-semibold">
        🚀 No entries yet. Be the first and claim the trophy!
      </div>
    )}

    {leaders.map((row, idx) => (
      <div
        key={row.userId + idx}
        className="flex items-center justify-between py-3 px-2 hover:bg-green-200/40 rounded-lg transition"
      >
        <div className="flex items-center gap-3">
          {idx === 0 && <Trophy className="w-6 h-6 text-yellow-500" />}
          {idx === 1 && <Medal className="w-6 h-6 text-gray-400" />}
          {idx === 2 && <Medal className="w-6 h-6 text-amber-700" />}
          {idx > 2 && (
            <span className="w-6 h-6 flex items-center justify-center rounded-full bg-green-300 text-xs font-bold text-white">
              {idx + 1}
            </span>
          )}
          <span className="font-semibold text-green-900">{row.name}</span>
        </div>
        <span className="text-green-800 font-bold">{row.value}</span>
      </div>
    ))}
  </div>
</Card>


      <section className="mt-10 grid md:grid-cols-3 gap-4">
        <Card>
          <h3 className="font-semibold text-primary-900">Daily Logging</h3>
          <p className="text-primary-700 mt-2">Enter one number per day. Update any time—only the latest value for today counts.</p>
        </Card>
        <Card>
          <h3 className="font-semibold text-primary-900">Personal History</h3>
          <p className="text-primary-700 mt-2">See your past days at a glance and track your progress.</p>
        </Card>
        <Card>
          <h3 className="font-semibold text-primary-900">Leaderboard</h3>
          <p className="text-primary-700 mt-2">Friendly competition to push you to do more today.</p>
        </Card>
      </section>
    </main>
  );
}
