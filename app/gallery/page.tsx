'use client';

import { useState, useEffect } from 'react';

export default function GalleryPage() {
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
      const randomColor = colors[i % colors.length];

      return {
        id: i,
        left: `${(i * 5.8) % 95}%`,
        width: `${Math.floor(Math.random() * 10) + 20}px`,
        height: `${Math.floor(Math.random() * 4) + 8}px`,
        bg: randomColor,
        duration: `${Math.random() * 6 + 10}s`,
        delay: `${Math.random() * 8}s`,
        radius: i % 2 === 0 ? '80% 0% 80% 0%' : '0% 80% 0% 80%',
        rotation: `${Math.random() * 360}deg`,
      };
    });
    setLeaves(generatedLeaves);
  }, []);

  const themeStyles = {
    day: 'bg-white text-slate-900',
    sunset: 'bg-[#FAF4EC] text-slate-900',
    night: 'bg-[#1E1829] text-white',
  };

  const cardStyles = {
    day: 'bg-slate-50 border-slate-200 text-slate-400',
    sunset: 'bg-[#F4EADB] border-[#E8DCB8] text-slate-500',
    night: 'bg-[#2D243F] border-[#3D3055] text-slate-400',
  };

  const titleColor = theme === 'night' ? 'text-purple-300' : 'text-[#9079B5]';

  return (
    <main className={`relative min-h-[calc(100vh-140px)] px-8 py-12 overflow-hidden transition-colors duration-700 ${themeStyles[theme]}`}>
      
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

      <div className="relative max-w-6xl mx-auto space-y-12 z-10">
        
        <section className="space-y-6">
          <h2 className={`text-2xl font-bold font-sans tracking-wide ${titleColor}`}>
            Nuestras Fotos
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((num) => (
              <div 
                key={num} 
                className={`h-64 rounded-3xl border flex items-center justify-center font-medium shadow-sm transition-all duration-700 ${cardStyles[theme]}`}
              >
                Foto {num}
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <h2 className={`text-2xl font-bold font-sans tracking-wide ${titleColor}`}>
            Nuestros Videos
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((num) => (
              <div 
                key={num} 
                className={`h-64 rounded-3xl border flex items-center justify-center font-medium shadow-sm transition-all duration-700 ${cardStyles[theme]}`}
              >
                Video {num}
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}