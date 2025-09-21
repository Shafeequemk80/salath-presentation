import { useEffect, useState } from "react";
import Card from "../components/Card.jsx";
import { api } from "../api.js";
import { Link } from "react-router-dom";
import { Trophy, Medal, LogIn, UserPlus, Crown } from "lucide-react";
import Footer from "../components/Footer.jsx";

export default function Landing() {
  const [leaders, setLeaders] = useState([]);
  const [error, setError] = useState("");
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));

    setLoading(true);
    api("/counts/leaderboard/today?limit=3")
      .then((res) => setLeaders(res))
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-green-50 to-green-100 text-center py-16 px-6 rounded-b-3xl shadow-sm">
        <h1 className="text-4xl md:text-5xl font-extrabold text-green-900 leading-tight">
          🌿 സ്വലാത്തിലൂടെ ഹബീബിലണയാം 🌿
        </h1>
        <p className="mt-4 text-green-700 text-lg md:text-xl max-w-2xl mx-auto">
          <h1 className="text-3xl  text-black">Ummul Qura Academy, Padinjarathara </h1>
          സ്വലാത്ത് സമർപ്പണത്തിന്റെ ഔദ്യോഗിക വെബ്സൈറ്റ്
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          {!user ? (
            <>
              <Link
                to="/signup"
                className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-full shadow-md transition"
              >
                <UserPlus className="w-5 h-5" /> പുതിയ അക്കൗണ്ട്
              </Link>
              <Link
                to="/login"
                className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-3 rounded-full shadow-md transition"
              >
                <LogIn className="w-5 h-5" /> അക്കൗണ്ട് തുറക്കൂ
              </Link>
            </>
          ) : (
            <Link
              to="/dashboard"
              className="bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded-full font-semibold shadow-md transition"
            >
              📌 ഇന്നത്തെ സംഖ്യ രേഖപ്പെടുത്തൂ
            </Link>
          )}
        </div>
      </section>

      {/* Leaderboard */}
      <section className="max-w-4xl mx-auto px-6 mt-12">
        <Card className="p-6 bg-white border border-green-200 rounded-3xl shadow-lg">
          <h2 className="text-2xl font-bold text-green-900 flex items-center justify-center gap-2 mb-6">
            <Crown className="w-6 h-6 text-yellow-500" /> ഇന്ന് മുൻപന്തിയിൽ 🏆
          </h2>

          {error && <div className="text-red-600 mb-3">{error}</div>}

          {loading ? (
            <div className="flex justify-center items-center py-6">
              <div className="w-10 h-10 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : leaders.length === 0 ? (
            <div className="py-6 text-green-700 font-medium text-lg">
              🚀 ഇന്നുവരെ ആരും ചേർത്തിട്ടില്ല. ആദ്യം നിങ്ങൾ തുടങ്ങൂ!
            </div>
          ) : (
            <div className="grid gap-4">
              {leaders.map((row, idx) => (
                <div
                  key={row.userId + idx}
                  className={`flex items-center justify-between py-4 px-5 rounded-2xl shadow-sm transition ${
                    idx === 0
                      ? "bg-yellow-50 border border-yellow-200"
                      : "bg-green-50 border border-green-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {idx === 0 && <Trophy className="w-6 h-6 text-yellow-500" />}
                    {idx === 1 && <Medal className="w-6 h-6 text-gray-400" />}
                    {idx === 2 && <Medal className="w-6 h-6 text-amber-700" />}
                    <span className="font-semibold text-green-900 text-lg">
                      {row.name}
                    </span>
                  </div>
                  <span className="text-green-800 font-bold text-xl">
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
          )}
        </Card>
      </section>

      {/* Info Section */}
      <section className="max-w-4xl mx-auto px-6 mt-14 mb-12">
        <Card className="p-6 bg-gradient-to-br from-green-50 via-white to-green-50 border border-green-200 rounded-3xl shadow-md">
          <h3 className="text-xl md:text-2xl font-bold text-green-900 mb-4">
            🌿 സ്വലാത്തിന്റെ മഹത്വം 🌿
          </h3>
          <div className="space-y-4 text-green-800 leading-relaxed">
            <p>
              മുത്തുനബി ﷺ ന്റെ പേരിലുള്ള സ്വലാത്ത് ഏറ്റവും ശ്രേഷ്ഠമായ ആരാധനകളിലൊന്നാണ്. 
              അല്ലാഹു പറയുന്നു: <br />
              <span className="font-semibold">
                "തീർച്ചയായും അല്ലാഹുവും അവന്റെ മലക്കുകളും നബിക്ക് സ്വലാത്ത് ചൊല്ലുന്നു. 
                സത്യവിശ്വാസികളേ, നിങ്ങളും അവിടുത്തേക്ക് സ്വലാത്തും സലാമും ചൊല്ലുക."
              </span>
            </p>
            <p>
              ഒരാൾ ഒരു തവണ സ്വലാത്ത് ചൊല്ലുമ്പോൾ, അല്ലാഹു അവനു പത്ത് അനുഗ്രഹങ്ങൾ നൽകുകയും, 
              പത്ത് പദവികൾ ഉയർത്തുകയും, പത്ത് പാപങ്ങൾ പൊറുക്കുകയും ചെയ്യും.
            </p>
            <p>
              പ്രവാചകൻ ﷺ പറഞ്ഞു: <br />
              <span className="font-semibold">
                "لا يؤمن أحدكم حتى أكون أحب إليه من والده وولده والناس أجمعين"
              </span>
              <br /> (നിങ്ങളിൽ ഒരാളും, തന്റെ പിതാവിനേക്കാൾ, മകനേക്കാൾ, മുഴുവൻ മനുഷ്യരേക്കാളും എന്നെ കൂടുതൽ സ്നേഹിക്കുന്നതുവരെ, അവൻ സത്യവിശ്വാസി അല്ല.)
            </p>
          </div>
        </Card>
      </section>

      <Footer />
    </>
  );
}
  