import { useEffect, useState } from 'react';
import Card from '../components/Card.jsx';
import { api } from '../api.js';
import { Link } from 'react-router-dom';
import { Trophy, Medal, LogIn, UserPlus } from "lucide-react";
import Footer from '../components/Footer.jsx';

export default function Landing() {
  const [leaders, setLeaders] = useState([]);
  const [error, setError] = useState('');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // 👈 loading state

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    setLoading(true);
    api('/counts/leaderboard/today?limit=3')
      .then((res) => {
        setLeaders(res);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false)); // 👈 stop loading
  }, []);

  return (
     <>
    <main className="max-w-4xl mx-auto px-4 py-10 text-center">
      
      {/* Title */}
      <h1 className="text-3xl md:text-4xl font-extrabold text-green-900">
        🌿 സ്വലാത്തിലൂടെ ഹബീബിലണയാം 🌿
      </h1>
      <p className="mt-3 text-green-700 text-lg">
        മദ്റസത്തുൽ ഫത്താഹിന്റെ ആഭിമുഖ്യത്തിലുള്ള <br/> 
        സ്വലാത്ത് സമർപ്പണത്തിന്റെ ഔദ്യോഗിക വെബ്സൈറ്റ്
      </p>

      {/* Login/Signup Buttons */}
      <div className="mt-6 flex items-center justify-center gap-4 flex-wrap">
        {!user ? (
          <>
            <Link to="/signup" className="btn flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl">
              <UserPlus className="w-5 h-5"/> പുതിയ അക്കൗണ്ട്
            </Link>
            <Link to="/login" className="btn flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-3 rounded-xl">
              <LogIn className="w-5 h-5"/> അക്കൗണ്ട് തുറക്കൂ
            </Link>
          </>
        ) : (
          <Link to="/dashboard" className="btn bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-xl">
            📌 ഇന്നത്തെ സംഖ്യ രേഖപ്പെടുത്തൂ
          </Link>
        )}
      </div>

      {/* Leaderboard */}
      <Card className="mt-10 p-5 bg-green-50 border border-green-200 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-green-900 flex items-center justify-center gap-2 mb-4">
          🏆 Today Toppers 
        </h2>
        {error && <div className="text-red-600 mb-3">{error}</div>}

        {loading ? (
          // 👇 Spinner Loader
          <div className="flex justify-center items-center py-6">
            <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : leaders.length === 0 ? (
          <div className="py-6 text-green-700 font-semibold">
            🚀 ഇന്നുവരെ ആരും ചേർത്തിട്ടില്ല. ആദ്യം നിങ്ങൾ തുടങ്ങൂ!
          </div>
        ) : (
          <div className="space-y-3">
            {leaders.map((row, idx) => (
              <div key={row.userId + idx} className="flex items-center justify-between bg-white rounded-xl py-3 px-4 shadow-sm">
                <div className="flex items-center gap-3">
                  {idx === 0 && <Trophy className="w-6 h-6 text-yellow-500"/>}
                  {idx === 1 && <Medal className="w-6 h-6 text-gray-400"/>}
                  {idx === 2 && <Medal className="w-6 h-6 text-amber-700"/>}
                  <span className="font-semibold text-green-900">{row.name}</span>
                </div>
                <span className="text-green-800 font-bold">{row.value}</span>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Easy Steps */}
      <section className="mt-12 grid gap-5">
        <Card className="p-4">
          <h3 className="text-lg font-bold text-green-900">🌿 സ്വലാത്തിന്റെ മഹത്വം 🌿</h3>
          <p className="text-green-700 mt-2">
            മുത്തുനബി ﷺ ന്റെ പേരിലുള്ള സ്വലാത്ത് ഏറ്റവും ശ്രേഷ്ഠമായ ആരാധനകളിലൊന്നാണ്. 
            അല്ലാഹു പറയുന്നു: <br />
            <span className="font-semibold">
              "തീർച്ചയായും അല്ലാഹുവും അവന്റെ മലക്കുകളും നബിക്ക് സ്വലാത്ത് ചൊല്ലുന്നു. 
              സത്യവിശ്വാസികളേ, നിങ്ങളും അവിടുത്തേക്ക് സ്വലാത്തും സലാമും ചൊല്ലുക."
            </span>
          </p>
          <p className="text-green-700 mt-2">
            ഒരാൾ ഒരു തവണ സ്വലാത്ത് ചൊല്ലുമ്പോൾ, അല്ലാഹു അവനു പത്ത് അനുഗ്രഹങ്ങൾ നൽകുകയും, 
            പത്ത് പദവികൾ ഉയർത്തുകയും, പത്ത് പാപങ്ങൾ പൊറുക്കുകയും ചെയ്യും.  
          </p>
          <p className="text-green-700 mt-2">
            പ്രവാചകൻ ﷺ പറഞ്ഞു: <br />
            <span className="font-semibold">
              "لا يؤمن أحدكم حتى أكون أحب إليه من والده وولده والناس أجمعين"
            </span> <br />
            (നിങ്ങളിൽ ഒരാളും, തന്റെ പിതാവിനേക്കാൾ, മകനേക്കാൾ, മുഴുവൻ മനുഷ്യരേക്കാളും 
            എന്നെ കൂടുതൽ സ്നേഹിക്കുന്നതുവരെ, അവൻ സത്യവിശ്വാസി അല്ല.)
          </p>
        </Card>
      </section>
    </main>
      <Footer />  
  </>
  );
 
  
}
