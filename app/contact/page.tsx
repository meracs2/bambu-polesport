'use client';

import { useState, useEffect } from 'react';

export default function Contact() {
  const [theme, setTheme] = useState<'day' | 'sunset' | 'night'>('day');
  const [leaves, setLeaves] = useState<any[]>([]);

  useEffect(() => {
    const storedTheme = localStorage.getItem('app-theme') as 'day' | 'sunset' | 'night';
    if (storedTheme && ['day', 'sunset', 'night'].includes(storedTheme)) {
      setTheme(storedTheme);
    }

    const handleThemeChange = () => {
      const currentTheme = localStorage.getItem('app-theme') as 'day' | 'sunset' | 'night';
      if (currentTheme && ['day', 'sunset', 'night'].includes(currentTheme)) {
        setTheme(currentTheme);
      }
    };

    window.addEventListener('theme-change', handleThemeChange);
    return () => window.removeEventListener('theme-change', handleThemeChange);
  }, []);

  useEffect(() => {
    const generatedLeaves = Array.from({ length: 18 }).map((_, i) => {
      const colors = ['#748F80', '#8EA89B', '#5f776a', '#9ab0a4', '#b2c4bc'];
      return {
        id: i,
        left: `${(i * 5.8) % 95}%`,
        width: `${(i % 5) * 2 + 20}px`,
        height: `${(i % 3) * 2 + 8}px`,
        bg: colors[i % colors.length],
        duration: `${(i % 5) + 10}s`,
        delay: `${(i % 4) * 1.5}s`,
        radius: i % 2 === 0 ? '80% 0% 80% 0%' : '0% 80% 0% 80%',
        rotation: `${(i * 45) % 360}deg`,
      };
    });
    setLeaves(generatedLeaves);
  }, []);

  const themeStyles = {
    day: 'bg-white text-slate-900',
    sunset: 'bg-[#FAF4EC] text-slate-900',
    night: 'bg-[#1E1829] text-white',
  };

  const formBoxStyles = {
    day: 'bg-slate-50 border-slate-100 text-slate-800',
    sunset: 'bg-[#F4EADB] border-[#E8DCB8] text-slate-800',
    night: 'bg-[#2D243F] border-[#3D3055] text-white',
  };

  const inputStyles = {
    day: 'bg-white border-slate-200 text-slate-800 placeholder:text-slate-400',
    sunset: 'bg-[#FAF4EC] border-[#E8DCB8] text-slate-800 placeholder:text-slate-500',
    night: 'bg-[#1E1829] border-[#3D3055] text-white placeholder:text-slate-400',
  };

  const titleColor = theme === 'night' ? 'text-purple-300' : 'text-[#9079B5]';
  const subtitleColor = theme === 'night' ? 'text-slate-300' : 'text-slate-500';

  return (
    <div className={`relative min-h-[calc(100vh-140px)] flex flex-col justify-center overflow-hidden py-12 px-6 transition-colors duration-700 ${themeStyles[theme]}`}>
      
      <style jsx global>{`
        @keyframes fallAndRotate {
          0% {
            transform: translateY(-5vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            transform: translateY(105vh) rotate(540deg);
            opacity: 0;
          }
        }
      `}</style>

      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {leaves.map((leaf) => (
          <div
            key={leaf.id}
            style={{
              position: 'absolute',
              top: '-40px',
              left: leaf.left,
              width: leaf.width,
              height: leaf.height,
              backgroundColor: leaf.bg,
              borderRadius: leaf.radius,
              animation: `fallAndRotate ${leaf.duration} linear infinite`,
              animationDelay: leaf.delay,
              transform: `rotate(${leaf.rotation})`,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-lg mx-auto w-full z-10 my-auto">
        <h2 className={`text-3xl font-bold mb-2 text-center font-sans ${titleColor}`}>
          Contáctenos
        </h2>
        <p className={`text-center mb-8 font-medium ${subtitleColor}`}>
          Dejanos tu mensaje y te responderemos a la brevedad.
        </p>

        <form className={`border p-8 rounded-3xl space-y-5 shadow-sm transition-all duration-700 ${formBoxStyles[theme]}`}>
          <div>
            <label className={`block text-sm font-semibold mb-1 ${theme === 'night' ? 'text-slate-200' : 'text-slate-700'}`}>Nombre</label>
            <input 
              type="text" 
              placeholder="Tu nombre" 
              className={`w-full border rounded-xl p-3 outline-none focus:border-[#9079B5] transition ${inputStyles[theme]}`} 
            />
          </div>

          <div>
            <label className={`block text-sm font-semibold mb-1 ${theme === 'night' ? 'text-slate-200' : 'text-slate-700'}`}>Correo electrónico</label>
            <input 
              type="email" 
              placeholder="tucorreo@email.com" 
              className={`w-full border rounded-xl p-3 outline-none focus:border-[#9079B5] transition ${inputStyles[theme]}`} 
            />
          </div>

          <div>
            <label className={`block text-sm font-semibold mb-1 ${theme === 'night' ? 'text-slate-200' : 'text-slate-700'}`}>Mensaje</label>
            <textarea 
              placeholder="¿En qué te podemos ayudar?" 
              className={`w-full border rounded-xl p-3 h-32 outline-none focus:border-[#9079B5] transition resize-none ${inputStyles[theme]}`}
            ></textarea>
          </div>

          <button 
            type="submit" 
            className="w-full bg-[#9079B5] hover:bg-[#7b639c] py-3.5 rounded-xl font-bold text-white transition shadow-md shadow-[#9079B5]/20 cursor-pointer"
          >
            Enviar mensaje
          </button>
        </form>
      </div>
    </div>
  );
}