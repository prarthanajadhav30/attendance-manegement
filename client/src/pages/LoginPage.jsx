import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const roles = ["Student", "Teacher", "Admin"];

const LoginPage = () => {
  const [activeTab, setActiveTab] = useState("Student");
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role: activeTab.toLowerCase() }),
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.error || "Login failed");
        setLoading(false);
        return;
      }
         localStorage.setItem('token', data.data.token);
        localStorage.setItem("isLoggedIn", "true");
      const role = data.data.user.role;
      if (role === "student") navigate("/student");
      else if (role === "teacher") navigate("/teacher");
      else if (role === "admin") navigate("/admin");
    } catch (err) {
        console.error("Login error:", err);
      setError("Network error");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-50 to-blue-100">
      <div className="w-full max-w-md bg-white/80 rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-purple-700 mb-6 text-center">Login</h1>
        <div className="flex justify-center mb-6">
          {roles.map((role) => (
            <button
              key={role}
              className={`px-4 py-2 mx-1 rounded-t-lg font-semibold transition-all focus:outline-none ${
                activeTab === role
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow"
                  : "bg-gray-100 text-gray-700 hover:bg-purple-100"
              }`}
              onClick={() => setActiveTab(role)}
            >
              {role}
            </button>
          ))}
        </div>
        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder={`${activeTab} Email`}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="px-6 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold shadow hover:scale-105 transition" disabled={loading}>
            {loading ? "Logging in..." : `Login as ${activeTab}`}
          </button>
        </form>
        {error && <p className="mt-2 text-center text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
