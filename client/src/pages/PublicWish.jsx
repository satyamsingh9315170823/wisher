import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/axios"; // Adjust path if necessary

export default function PublicWish() {
  const { shareId } = useParams();

  const [wish, setWish] = useState(null);
  const [open, setOpen] = useState(false);
  const [viewer, setViewer] = useState(null);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    // Assuming API is properly configured
    API.get("/wish/" + shareId).then((res) => setWish(res.data));
  }, [shareId]);

  useEffect(() => {
    if (!open || !wish) return;

    const imgs = wish.media.filter((m) => m.type === "image");
    if (imgs.length === 0) return;

    const timer = setInterval(() => {
      setSlide((prev) => (prev === imgs.length - 1 ? 0 : prev + 1));
    }, 3000); // Slightly slower for better readability

    return () => clearInterval(timer);
  }, [open, wish]);

  // --- LOADING STATE ---
  if (!wish) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-white">
        <div className="text-6xl animate-bounce mb-6">🎁</div>
        <h1 className="text-2xl md:text-3xl font-medium animate-pulse text-zinc-300 tracking-wide">
          Preparing your surprise...
        </h1>
      </div>
    );
  }

  const images = wish.media.filter((m) => m.type === "image");
  const video = wish.media.find((m) => m.type === "video");

  return (
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-black overflow-x-hidden relative text-white selection:bg-rose-500 selection:text-white">
      
      {/* MUSIC - Note: .mid files often aren't supported in modern browser <audio> tags. Consider converting to .mp3! */}
      {open && (
        <audio autoPlay loop>
          <source src="https://www2.cs.uic.edu/~i101/SoundFiles/HappyBirthday.mid" />
        </audio>
      )}

      {/* --- BACKGROUND EFFECTS --- */}
      {open && (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          {/* BALLOONS */}
          {[...Array(10)].map((_, i) => (
            <div
              key={`balloon-${i}`}
              className="absolute text-4xl md:text-5xl opacity-80"
              style={{
                left: Math.random() * 100 + "%",
                bottom: -100,
                animation: `float ${6 + Math.random() * 4}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            >
              🎈
            </div>
          ))}

          {/* HEARTS */}
          {[...Array(15)].map((_, i) => (
            <div
              key={`heart-${i}`}
              className="absolute text-rose-500 opacity-60 mix-blend-screen"
              style={{
                left: Math.random() * 100 + "%",
                top: Math.random() * 100 + "%",
                animation: "pulse 3s infinite",
                fontSize: 10 + Math.random() * 20,
              }}
            >
              ❤️
            </div>
          ))}

          {/* CONFETTI */}
          {[...Array(50)].map((_, i) => (
            <div
              key={`confetti-${i}`}
              className="absolute w-2 h-2 md:w-3 md:h-3 rounded-full opacity-70"
              style={{
                backgroundColor: ["#f43f5e", "#3b82f6", "#eab308", "#10b981"][Math.floor(Math.random() * 4)],
                left: Math.random() * 100 + "%",
                top: -20,
                animation: `fall ${3 + Math.random() * 3}s linear infinite`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* --- MAIN CONTENT CONTAINER --- */}
      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24 max-w-6xl">
        
        {/* HERO */}
        <div className="text-center mb-16 animate-fade-in-up">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent drop-shadow-sm">
            Happy Birthday
          </h1>
          <h2 className="text-4xl md:text-6xl text-rose-400 mt-4 font-bold tracking-tight drop-shadow-lg">
            {wish.recipientName}
          </h2>
        </div>

        {/* UNOPENED GIFT STATE */}
        {!open && (
          <div className="flex flex-col items-center justify-center mt-12 md:mt-24">
            <button
              onClick={() => setOpen(true)}
              className="group relative transition-transform duration-300 hover:scale-110 focus:outline-none"
              aria-label="Open surprise"
            >
              {/* Glow effect behind gift */}
              <div className="absolute inset-0 bg-rose-500/20 blur-3xl rounded-full group-hover:bg-rose-500/40 transition duration-500" />
              <div className="text-8xl md:text-9xl animate-bounce relative z-10">
                🎁
              </div>
            </button>
            <p className="mt-8 text-lg md:text-xl text-zinc-400 font-medium tracking-wide">
              Tap to open your surprise
            </p>
          </div>
        )}

        {/* OPENED STATE CONTENT */}
        {open && (
          <div className="space-y-16 md:space-y-24 animate-fade-in">
            
            {/* PERSONAL MESSAGE */}
            <div className="max-w-3xl mx-auto text-center px-4">
              <div className="relative inline-block">
                <span className="absolute -top-6 -left-6 text-6xl text-zinc-800 opacity-50 font-serif">"</span>
                <p className="text-xl md:text-3xl text-zinc-200 leading-relaxed font-light relative z-10">
                  {wish.message}
                </p>
                <span className="absolute -bottom-8 -right-6 text-6xl text-zinc-800 opacity-50 font-serif">"</span>
              </div>
              <p className="mt-12 text-lg md:text-xl text-zinc-400">
                With love from,{" "}
                <span className="font-bold text-rose-400 border-b border-rose-400/30 pb-1">
                  {wish.senderName}
                </span>
              </p>
            </div>

            {/* SLIDESHOW */}
            {images.length > 0 && (
              <div className="max-w-4xl mx-auto">
                <div className="relative group overflow-hidden rounded-3xl shadow-2xl shadow-black/50 border border-zinc-800/50 bg-zinc-900">
                  <img
                    src={images[slide]?.url}
                    alt="Birthday memory"
                    onClick={() => setViewer(images[slide].url)}
                    // CHANGED: Added w-1/2 sm:mx-auto to shrink the image and center it. Removed aspect ratio for cleaner containment.
                    className="w-1/2 sm:mx-auto object-cover cursor-pointer transform transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-medium text-zinc-300 tracking-wider">
                    {slide + 1} / {images.length}
                  </div>
                </div>
              </div>
            )}

            {/* IMAGE GRID */}
            {images.length > 1 && (
              <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {images.map((m, i) => (
                  <div key={i} className="overflow-hidden rounded-2xl border border-zinc-800/50 bg-zinc-900 group shadow-lg">
                    <img
                      src={m.url}
                      alt={`Memory ${i + 1}`}
                      onClick={() => setViewer(m.url)}
                      // CHANGED: Reduced height from h-64 to h-48 for a smaller look.
                      className="w-full h-48 object-cover cursor-pointer transition-transform duration-500 group-hover:scale-110 group-hover:opacity-90"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* VIDEO */}
            {video && (
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 mb-6">
                  <span className="text-2xl">🎬</span>
                  <h2 className="text-2xl font-semibold text-zinc-200">A Special Memory</h2>
                </div>
                <div className="overflow-hidden rounded-3xl shadow-2xl shadow-black/50 border border-zinc-800/50 bg-zinc-900">
                  <video
                    controls
                    src={video.url}
                    className="w-full aspect-video outline-none"
                  />
                </div>
              </div>
            )}

            {/* CLOSING LETTER */}
            <div className="max-w-2xl mx-auto bg-zinc-900/80 backdrop-blur-sm border border-zinc-700/50 rounded-3xl shadow-2xl p-8 md:p-12 text-center transform transition duration-500 hover:-translate-y-2">
              <h2 className="text-2xl md:text-3xl font-bold mb-6 text-rose-400 flex items-center justify-center gap-3">
                💌 <span>Birthday Note</span>
              </h2>
              <p className="text-lg md:text-xl text-zinc-300 leading-relaxed font-light">
                May your day be filled with happiness, laughter and beautiful memories. You are special, and this small surprise is just to make you smile.
              </p>
            </div>

            {/* CANDLE & WISH */}
            <div className="text-center pb-12 pt-8">
              <div className="text-7xl md:text-8xl animate-pulse cursor-default">
                🕯️
              </div>
              <p className="text-xl md:text-2xl text-rose-300/80 mt-6 font-medium tracking-wider">
                Close your eyes and make a wish ✨
              </p>
            </div>

          </div>
        )}
      </div>

      {/* --- FULLSCREEN LIGHTBOX --- */}
      {viewer && (
        <div
          onClick={() => setViewer(null)}
          className="fixed inset-0 bg-black/95 backdrop-blur-xl flex items-center justify-center z-50 p-4 cursor-zoom-out transition-opacity duration-300"
        >
          <img
            src={viewer}
            alt="Fullscreen view"
            className="max-h-[90vh] max-w-full rounded-xl shadow-2xl shadow-black outline-none"
            onClick={(e) => e.stopPropagation()} // Prevent click from closing if tapping the image itself
          />
          <button 
            onClick={() => setViewer(null)}
            className="absolute top-6 right-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors text-2xl"
          >
            ✕
          </button>
        </div>
      )}

      {/* --- CUSTOM ANIMATIONS --- */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.8; }
          100% { transform: translateY(-120vh) rotate(20deg); opacity: 0; }
        }
        @keyframes fall {
          0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(360deg); opacity: 0.2; }
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}