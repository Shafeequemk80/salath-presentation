import { useState } from "react";
import { api } from "../api.js";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    whatsapp: "",
    place: "",
    mahallu: "",
    panchayath: "",
    district: "",
    state: "",
    country: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleNumberChange = (field) => (e) => {
    const value = e.target.value;
    // allow only digits and max 10
    if (/^\d{0,10}$/.test(value)) {
      setForm({ ...form, [field]: value });
    }
  };

 // const removeSpaces = (value) => value.replace(/\s+/g, "");

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await api("/auth/signup", { method: "POST", body: form });
      login(data.token, data.user);
      navigate("/dashboard");
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-md mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-primary-900 mb-4">
        Create your account
      </h1>
      <form onSubmit={submit} className="card space-y-4">
        {error && <div className="text-red-600">{error}</div>}

        {/* Name */}
        <div>
          <label className="block text-sm text-primary-800 mb-1">
            Name (പേര്)
          </label>
          <input
            className="input"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            placeholder="Enter your name"
            required
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block text-sm text-primary-800 mb-1">
            Phone no (ഫോൺ നമ്പർ)
          </label>
          <input
            className="input"
            type="tel"
            value={form.phone}
            onChange={handleNumberChange("phone")}
            minLength={10}
            maxLength={10}
            required
            placeholder="Enter phone number"
          />
        </div>
        {/* Whatsapp Number */}
        <div>
          <label className="block text-sm text-primary-800 mb-1">
            Whatsapp no (വാട്സ്ആപ് നമ്പർ)
          </label>
          <input
            className="input"
            type="tel"
            value={form.whatsapp}
            onChange={handleNumberChange("whatsapp")}
            minLength={10}
            maxLength={10}
            required
            placeholder="Enter Whatsapp number"
          />
        </div>

        {/* Place */}
        <div>
          <label className="block text-sm text-primary-800 mb-1">
            Place (സ്ഥലം)
          </label>
          <input
            className="input"
            value={form.place}
            onChange={(e) => setForm({ ...form, place: e.target.value })}
            required
          />
        </div>

        {/* Mahallu */}
        <div>
          <label className="block text-sm text-primary-800 mb-1">
            Mahallu (മഹല്ല്)
          </label>
          <input
            className="input"
            value={form.mahallu}
            onChange={(e) => setForm({ ...form, mahallu: e.target.value })}
            required
          />
        </div>

        {/* Panchayath */}
        <div>
          <label className="block text-sm text-primary-800 mb-1">
            Panchayath (പഞ്ചായത്ത്‌)
          </label>
          <input
            className="input"
            value={form.panchayath}
            onChange={(e) => setForm({ ...form, panchayath: e.target.value })}
            required
          />
        </div>

        {/* District */}
        <div>
          <label className="block text-sm text-primary-800 mb-1">
            District (ജില്ല)
          </label>
          <input
            className="input"
            value={form.district}
            onChange={(e) => setForm({ ...form, district: e.target.value })}
            required
          />
        </div>

        {/* State */}
        <div>
          <label className="block text-sm text-primary-800 mb-1">
            State (സംസ്ഥാനം)
          </label>
          <input
            className="input"
            value={form.state}
            onChange={(e) => setForm({ ...form, state: e.target.value })}
            required
          />
        </div>

        {/* Country */}
        <div>
          <label className="block text-sm text-primary-800 mb-1">
            Country (രാജ്യം)
          </label>
          <input
            className="input"
            value={form.country}
            onChange={(e) => setForm({ ...form, country: e.target.value })}
            required
          />
        </div>

        <button className="btn w-full" disabled={loading}>
          {loading ? "Creating..." : "Sign up"}
        </button>
        <p className="text-sm text-center">
          Already have an account?{" "}
          <Link className="link" to="/login">
            Login
          </Link>
        </p>
      </form>
    </main>
  );
}
