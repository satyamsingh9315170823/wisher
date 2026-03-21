import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { logoutUser, getToken, getName } from "../utils/auth";

export default function Landing() {
  const nav = useNavigate();
  const [token, setToken] = useState(null);
  const [menu, setMenu] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    setToken(getToken());
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
    setToken(null);
    nav("/");
  };

  const userLetter = () => {
    const name = getName();
    if (!name) return "U";
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-100 selection:bg-white selection:text-black font-sans">
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-black/60 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 md:px-12 py-4">
          <div 
            className="flex items-center gap-2 cursor-pointer group" 
            onClick={() => nav("/")}
          >
            <div className="w-8 h-8 bg-gradient-to-tr from-white to-zinc-500 rounded-lg rotate-12 group-hover:rotate-0 transition-transform duration-300" />
            <span className="text-xl font-bold tracking-tight">Wisher</span>
          </div>

          <div className="flex items-center gap-4 md:gap-8">
            {token && (
              <button
                onClick={() => nav("/dashboard")}
                className="hidden md:block text-sm font-medium text-zinc-400 hover:text-white transition-colors"
              >
                Dashboard
              </button>
            )}

            {!token ? (
              <button
                onClick={() => nav("/login")}
                className="px-5 py-2.5 bg-white text-black text-sm font-semibold rounded-full hover:bg-zinc-200 transition-all active:scale-95"
              >
                Sign In
              </button>
            ) : (
              <div ref={menuRef} className="relative">
                <button
                  onClick={() => setMenu(!menu)}
                  className="w-10 h-10 rounded-full bg-gradient-to-b from-zinc-700 to-zinc-900 border border-white/10 flex items-center justify-center font-bold hover:border-white/30 transition-all shadow-inner"
                >
                  {userLetter()}
                </button>

                {menu && (
                  <div className="absolute right-0 mt-4 w-52 bg-zinc-900 border border-white/10 rounded-2xl shadow-2xl p-2 animate-in fade-in zoom-in duration-200">
                    <button
                      onClick={() => nav("/dashboard")}
                      className="w-full text-left px-4 py-3 text-sm rounded-xl hover:bg-white/5 transition-colors"
                    >
                      Dashboard
                    </button>
                    <div className="h-[1px] bg-white/5 my-1" />
                    <button
                      onClick={logout}
                      className="w-full text-left px-4 py-3 text-sm rounded-xl hover:bg-red-500/10 text-red-400 transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <main className="relative pt-40 pb-20 px-6 overflow-hidden">
        {/* Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-white/5 blur-[120px] rounded-full -z-10" />
        
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-zinc-400 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-zinc-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-zinc-500"></span>
            </span>
            Now supporting HD Media
          </div>
          
          <h1 className="text-5xl md:text-8xl font-bold tracking-tight leading-[1.1] mb-8">
            Make them feel <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500">
              Extraordinary.
            </span>
          </h1>

          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12">
            The simplest way to create and share personalized digital birthday 
            experiences. No code, just love.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {token ? (
              <button
                onClick={() => nav("/create")}
                className="w-full sm:w-auto px-10 py-4 bg-white text-black rounded-full font-bold hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all active:scale-95"
              >
                Create a Wish
              </button>
            ) : (
              <button
                onClick={() => nav("/register")}
                className="w-full sm:w-auto px-10 py-4 bg-white text-black rounded-full font-bold hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all active:scale-95"
              >
                Start Building
              </button>
            )}
            <button
              onClick={() => nav("/dashboard")}
              className="w-full sm:w-auto px-10 py-4 bg-transparent border border-white/10 rounded-full font-semibold hover:bg-white/5 transition-all"
            >
              View Gallery
            </button>
          </div>
        </div>
      </main>

      {/* FEATURES SECTION */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-32">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { title: "Personalized", desc: "Custom messages, themes, and layouts tailored to them.", icon: "✨" },
            { title: "Instant Sharing", desc: "One-click links that look stunning on any mobile device.", icon: "🔗" },
            { title: "Media Rich", desc: "Upload memories directly to your pages in high quality.", icon: "📸" }
          ].map((feature, i) => (
            <div 
              key={i}
              className="group p-8 rounded-3xl bg-zinc-900/40 border border-white/5 hover:border-white/20 transition-all duration-300"
            >
              <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300 block origin-left">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-zinc-500 leading-relaxed text-sm md:text-base">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-12 text-center">
        <p className="text-zinc-600 text-sm">
          &copy; {new Date().getFullYear()} Wisher. Created for better celebrations.
        </p>
      </footer>
    </div>
  );
}