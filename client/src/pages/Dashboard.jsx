import { useEffect, useState, useRef } from "react";
import API from "../api/axios";
import WishCard from "../components/WishCard";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser, getName } from "../utils/auth";

export default function Dashboard() {
  const [wishes, setWishes] = useState([]);
  const [menu, setMenu] = useState(false);
  const nav = useNavigate();
  const menuRef = useRef();

  const load = async () => {
    try {
      const res = await API.get("/wish/my");
      setWishes(res.data);
    } catch {
      logout();
    }
  };

  useEffect(() => {
    load();
    const close = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenu(false);
      }
    };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  const logout = () => {
    logoutUser();
    nav("/");
  };

  const userLetter = () => {
    const name = getName();
    if (!name) return "U";
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-[#030303] text-zinc-100 selection:bg-amber-500 selection:text-black font-sans">
      {/* BACKGROUND DECORATION */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-600/5 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        {/* HEADER */}
        <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 pb-12 border-b border-white/5">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-500 text-[10px] font-bold uppercase tracking-widest border border-amber-500/20">
                Workspace
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter">
              Your <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500">Wishes</span>
            </h1>
            <p className="text-zinc-500 mt-2 font-medium">
              You have {wishes.length} active birthday {wishes.length === 1 ? 'page' : 'pages'}.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              to="/create"
              className="px-6 py-3 bg-white text-black text-sm font-bold rounded-full hover:bg-amber-400 transition-all active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-amber-500/20"
            >
              + Create New
            </Link>

            {/* USER MENU */}
            <div ref={menuRef} className="relative">
              <button
                onClick={() => setMenu(!menu)}
                className="w-12 h-12 rounded-full border-2 border-white/10 p-0.5 hover:border-amber-500/50 transition-all active:scale-90"
              >
                <div className="w-full h-full rounded-full bg-zinc-900 flex items-center justify-center font-bold text-zinc-100 italic">
                  {userLetter()}
                </div>
              </button>

              {menu && (
                <div className="absolute right-0 mt-4 w-48 bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  <button
                    onClick={() => nav("/")}
                    className="w-full text-left px-4 py-3 text-sm rounded-xl hover:bg-white/5 transition-colors"
                  >
                    Home
                  </button>
                  <div className="h-[1px] bg-white/5 my-1" />
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-3 text-sm rounded-xl hover:bg-red-500/10 text-red-400 transition-colors font-medium"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* CONTENT */}
        <main className="mt-12">
          {wishes.length === 0 ? (
            <div className="relative group overflow-hidden border border-white/5 bg-zinc-900/30 backdrop-blur-sm rounded-[2rem] p-20 text-center">
               <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-zinc-800 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-white/10">
                  <span className="text-2xl italic">🎂</span>
                </div>
                <h2 className="text-2xl font-bold">No wishes found</h2>
                <p className="text-zinc-500 mt-3 max-w-xs mx-auto">
                  Start by creating a beautiful personalized page for someone special.
                </p>
                <Link
                  to="/create"
                  className="inline-block mt-8 px-8 py-3 border border-white/10 rounded-full text-sm font-semibold hover:bg-white hover:text-black transition-all"
                >
                  Create your first wish
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {wishes.map((w) => (
                <div key={w._id} className="transform transition-all duration-300 hover:-translate-y-2">
                  <WishCard wish={w} refresh={load} />
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      <footer className="mt-20 py-10 border-t border-white/5 text-center">
        <p className="text-zinc-600 text-xs font-medium tracking-widest uppercase">
          Wisher &bull; Premium Dashboard
        </p>
      </footer>
    </div>
  );
}