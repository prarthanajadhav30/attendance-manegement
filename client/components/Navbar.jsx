const Navbar = () => {
  // Simulate user context (replace with real auth context)
  const user = JSON.parse(localStorage.getItem("user"));
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };
  return (
    <nav className="w-full bg-white/80 backdrop-blur-lg shadow-lg fixed top-0 left-0 z-10">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <span className="text-2xl font-bold text-gradient bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Attendance System</span>
        <div className="space-x-4">
          {user ? (
            <div className="flex items-center gap-4">
              <span className="font-medium text-purple-700">{user.name} ({user.role})</span>
              <button onClick={handleLogout} className="px-4 py-2 rounded bg-purple-500 text-white font-semibold hover:bg-purple-600 transition">Logout</button>
            </div>
          ) : (
            <a href="/login" className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold shadow hover:scale-105 transition">Login</a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
