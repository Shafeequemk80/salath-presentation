import { useEffect, useState } from 'react';
import Card from '../components/Card.jsx';
import { api } from '../api.js';
import { Link } from 'react-router-dom';
import { Trophy, Medal } from "lucide-react";

export default function Landing() {
  const [leaders, setLeaders] = useState([]);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    // check login (stored user in localStorage after login)
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    api('/counts/leaderboard/today?limit=3')
      .then(setLeaders)
      .catch((e) => setError(e.message));
  }, []);

  return (
    <main className="max-w-5xl mx-auto px-4 py-10">
      <section className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-primary-900">
          സ്വലാത്തിലൂടെ ഹബീബിലണയാം
        </h1>
        <p className="mt-3 text-primary-700 max-w-2xl mx-auto">
          മദ്റസത്തുൽ ഫത്താഹിന്റെ ആഭിമുഖ്യത്തിൽ സംഘടിപ്പിക്കുന്ന സ്വലാത്ത് സമർപ്പണത്തിന്റെ ഔദ്യോഗിക വെബ്സൈറ്റ്
        </p>

        <div className="mt-6 flex items-center justify-center gap-3">
          {!user ? (
            <>
              <Link to="/signup" className="btn">Sign Up</Link>
              <Link to="/login" className="btn bg-primary-500 hover:bg-primary-600">Login </Link>
            </>
          ) : (
            <Link to="/dashboard" className="btn bg-green-600 hover:bg-green-700 text-white">
              ഇന്ന് എന്റെ സംഖ്യ നൽകൂ
            </Link>
          )}
        </div>
      </section>

      {/* Leaderboard */}
      <Card className="p-5 bg-gradient-to-br from-green-50 to-green-100 shadow-lg rounded-2xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-extrabold text-green-900 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-500" />
            ഇന്നത്തെ മുൻനിര
          </h2>
          <span className="text-sm text-green-700 italic">ഓരോ പുതുക്കലിലും</span>
        </div>

        {error && <div className="text-red-600 mb-3 font-medium">{error}</div>}

        <div className="divide-y divide-green-200">
          {leaders.length === 0 && (
            <div className="py-6 text-center text-green-700 font-semibold">
              🚀 ആരും ഇന്നുവരെ ചേർത്തിട്ടില്ല. ആദ്യം നിങ്ങൾ തന്നെ മുന്നിലെത്തൂ!
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

      {/* Features */}
      <section className="mt-10 grid md:grid-cols-3 gap-4">
        <Card>
          <h3 className="font-semibold text-primary-900">ദൈനംദിന രേഖപ്പെടുത്തൽ</h3>
          <p className="text-primary-700 mt-2">
            ദിവസവും ഒരു സംഖ്യ മാത്രം നൽകൂ. 
            ഏതാനും തവണ പുതുക്കാം — 
            ഇന്ന് നൽകിയ അവസാന സംഖ്യ മാത്രമാണ് കണക്കാക്കപ്പെടുക.
          </p>
        </Card>
        <Card>
          <h3 className="font-semibold text-primary-900">സ്വകാര്യ ചരിത്രം</h3>
          <p className="text-primary-700 mt-2">
            കഴിഞ്ഞ ദിവസങ്ങൾ എളുപ്പത്തിൽ കാണൂ, 
            നിങ്ങളുടെ പുരോഗതി നിരീക്ഷിക്കൂ.
          </p>
        </Card>
        <Card>
          <h3 className="font-semibold text-primary-900">ലീഡർബോർഡ്</h3>
          <p className="text-primary-700 mt-2">
            സൗഹൃദ മത്സരം, 
            നിങ്ങളെ കൂടുതൽ പ്രചോദിപ്പിക്കുന്നതിന്.
          </p>
        </Card>
      </section>
    </main>
  );
}
