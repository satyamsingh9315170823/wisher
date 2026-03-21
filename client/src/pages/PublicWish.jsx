import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import API from "../api/axios";

export default function PublicWish() {
  const { shareId } = useParams();
  const [wish, setWish] = useState(null);
  const [open, setOpen] = useState(false);
  const [slide, setSlide] = useState(0);
  const videoRef = useRef(null);

  useEffect(() => {
    API.get("/wish/" + shareId).then((res) => setWish(res.data));
  }, [shareId]);

  // Slideshow Logic
  useEffect(() => {
    if (!open || !wish) return;
    const imgs = wish.media.filter((m) => m.type === "image");
    if (imgs.length === 0) return;
    const timer = setInterval(() => {
      setSlide((prev) => (prev === imgs.length - 1 ? 0 : prev + 1));
    }, 3500);
    return () => clearInterval(timer);
  }, [open, wish]);

  // Handle Video Playback when opened
  useEffect(() => {
    if (open && videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Autoplay with audio blocked. Requires user gesture.", error);
      });
    }
  }, [open]);

  if (!wish) return null;

  const images = wish.media.filter((m) => m.type === "image");
  const video = wish.media.find((m) => m.type === "video");

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-fuchsia-500 overflow-x-hidden">
      
      {/* 1. CINEMATIC TOP SLIDESHOW */}
      {open && images.length > 0 && (
        <div className="relative h-[50vh] w-full overflow-hidden border-b border-white/5">
          {images.map((img, i) => (
            <img
              key={i}
              src={img.url}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 scale-105 ${
                slide === i ? "opacity-30 blur-[2px]" : "opacity-0"
              }`}
              alt="Memory"
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/60 to-[#050505]" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
             <span className="text-fuchsia-400 tracking-[0.5em] text-xs uppercase mb-4 animate-pulse">Celebration For Special Person</span>
             <h1 className="text-2xl md:text-4xl font-black uppercase tracking-tighter italic bg-gradient-to-r from-white via-fuchsia-100 to-zinc-500 bg-clip-text text-transparent">
               HAPPY BIRTHDAY
             </h1>
          </div>
        </div>
      )}

      {/* 2. THE GIFT (UNOPENED) */}
      {!open && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#050505]">
          <button 
            onClick={() => setOpen(true)}
            className="group relative transition-all duration-500 hover:scale-110 active:scale-95"
          >
            <div className="absolute inset-0 bg-fuchsia-600 blur-[120px] opacity-40 group-hover:opacity-100 transition-opacity" />
            <div className="relative text-[160px] cursor-pointer animate-bounce group-hover:animate-none">🎁</div>
          </button>
          <p className="mt-12 tracking-[0.4em] text-zinc-500 text-xs uppercase font-medium">Click to release the magic</p>
        </div>
      )}

      {open && (
        <main className="relative z-10 max-w-7xl mx-auto px-6 pb-24 -mt-20 space-y-12 animate-fade-in">
          
          {/* 3. MODULAR BENTO GRID */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-[250px] md:auto-rows-[300px]">
            
            {/* MIDDLE MESSAGE BOX - Rich Gradient Colors */}
            <div className="md:col-span-6 md:row-span-2 bg-gradient-to-br from-zinc-900 to-zinc-950 p-10 flex flex-col justify-center rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-fuchsia-600/10 rounded-full blur-3xl group-hover:bg-fuchsia-600/20 transition-all" />
              <h2 className="text-4xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-violet-400 mb-6 leading-tight">
                {wish.recipientName}
              </h2>
              <p className="text-xl md:text-2xl font-light leading-relaxed text-zinc-300">
                "{wish.message}"
              </p>
              <div className="mt-10 flex items-center gap-4">
                <div className="h-[1px] w-8 bg-fuchsia-500" />
                <p className="text-fuchsia-400 uppercase tracking-widest text-xs font-bold">{wish.senderName}</p>
              </div>
            </div>

            {/* SIDE IMAGES - Fully Modular */}
            {images.slice(0, 4).map((img, idx) => {
              const layouts = [
                "md:col-span-3 md:row-span-1", // Box 1
                "md:col-span-3 md:row-span-2", // Tall Box 2
                "md:col-span-3 md:row-span-1", // Box 3
                "md:col-span-6 md:row-span-1", // Wide Box 4
              ];
              return (
                <div key={idx} className={`${layouts[idx]} overflow-hidden rounded-[2.5rem] border border-white/5 shadow-xl`}>
                  <img src={img.url} className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000 ease-out" alt="Memory" />
                </div>
              );
            })}
          </div>

          {/* 4. LOOPING VIDEO (NO CONTROLS) */}
          {video && (
            <div className="pt-10">
              <div className="relative group rounded-[3rem] overflow-hidden border border-white/10 bg-black aspect-video md:aspect-auto md:h-[600px] shadow-fuchsia-500/10 shadow-2xl">
                <video
                  ref={videoRef}
                  src={video.url}
                  loop
                  playsInline
                  autoPlay
                  className="w-full h-full object-cover"
                />
                {/* Subtle Overlay to make it feel premium */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />
              </div>
              <p className="text-center mt-6 text-zinc-600 text-xs tracking-[0.5em] uppercase italic">Memories in Motion</p>
            </div>
          )}

          <footer className="text-center pt-20 border-t border-white/5">
            <div className="text-2xl mb-4">✨ 🕯️ ✨</div>
            <p className="text-[10px] tracking-[0.6em] text-zinc-500 uppercase">Designed for a special soul</p>
          </footer>
        </main>
      )}

      {/* CUSTOM ANIMATIONS & POPPER */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fadeIn 1.5s cubic-bezier(0.2, 1, 0.3, 1) forwards; }
        
        ${open ? `
        body::before {
          content: "✨";
          position: fixed;
          top: 50%;
          left: 50%;
          font-size: 5rem;
          animation: popOut 1.2s ease-out forwards;
          z-index: 100;
        }
        ` : ""}

        @keyframes popOut {
          0% { transform: translate(-50%, -50%) scale(0) rotate(0); opacity: 1; }
          50% { opacity: 1; }
          100% { transform: translate(-50%, -200%) scale(4) rotate(45deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}