'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [leaves, setLeaves] = useState<any[]>([]);
  const [theme, setTheme] = useState<'day' | 'sunset' | 'night'>('day');

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

  const handleThemeChange = (newTheme: 'day' | 'sunset' | 'night') => {
    setTheme(newTheme);
    localStorage.setItem('app-theme', newTheme);
    window.dispatchEvent(new Event('theme-change'));
  };

  const videos = [
    {
      id: 1,
      title: "Video 1 - Presentación",
      src: "", 
      description: "Acá podés agregar un texto contando quiénes son, su filosofía y nuestra historia.",
    },
    {
      id: 2,
      title: "Video 2 - Clases",
      src: "", 
      description: "Información detallada sobre nuestras clases, niveles disponibles y qué necesitas traer.",
    },
    {
      id: 3,
      title: "Video 3 - Coreografías",
      src: "", 
      description: "Una muestra de nuestras coreografías, entrenamientos y presentaciones especiales.",
    },
  ];

  const nextVideo = () => {
    setCurrentVideoIndex((prev) => (prev === videos.length - 1 ? 0 : prev + 1));
  };

  const prevVideo = () => {
    setCurrentVideoIndex((prev) => (prev === 0 ? videos.length - 1 : prev - 1));
  };

  useEffect(() => {
    const generatedLeaves = Array.from({ length: 14 }).map((_, i) => {
      const colors = ['#748F80', '#8EA89B', '#5f776a', '#9ab0a4', '#b2c4bc'];
      return {
        id: i,
        left: `${(i * 7) % 95}%`,
        width: `${Math.floor(Math.random() * 8) + 16}px`,
        height: `${Math.floor(Math.random() * 3) + 6}px`,
        bg: colors[i % colors.length],
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

  const pandaFilterStyle = {
    day: 'drop-shadow(0 0 15px rgba(59, 156, 132, 0.45)) drop-shadow(0 0 5px rgba(0, 0, 0, 0.2))',
    sunset: 'drop-shadow(0 0 15px rgba(144, 121, 181, 0.45)) drop-shadow(0 0 5px rgba(90, 80, 70, 0.2))',
    night: 'drop-shadow(0 0 20px rgba(255, 255, 255, 0.4))',
  };

  return (
    <main className={`relative min-h-[calc(100vh-130px)] flex flex-col items-center justify-center px-4 sm:px-6 py-8 overflow-hidden transition-colors duration-700 ${themeStyles[theme]}`}>
      
      {/* --- BOTONES DE TEMA (Adaptados para no superponerse en celular) --- */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 sm:gap-2">
        <button
          onClick={() => handleThemeChange('day')}
          className={`p-2 rounded-xl text-sm transition-all cursor-pointer flex items-center justify-center ${
            theme === 'day' ? 'bg-slate-200 shadow-md scale-105' : 'opacity-40 hover:opacity-100'
          }`}
          title="Modo Día"
        >
          ☀️
        </button>
        <button
          onClick={() => handleThemeChange('sunset')}
          className={`p-2 rounded-xl text-sm transition-all cursor-pointer flex items-center justify-center ${
            theme === 'sunset' ? 'bg-[#EFE5D8] shadow-md scale-105' : 'opacity-40 hover:opacity-100'
          }`}
          title="Modo Atardecer"
        >
          🌇
        </button>
        <button
          onClick={() => handleThemeChange('night')}
          className={`p-2 rounded-xl text-sm transition-all cursor-pointer flex items-center justify-center ${
            theme === 'night' ? 'bg-white/20 shadow-md scale-105 text-white' : 'opacity-40 hover:opacity-100'
          }`}
          title="Modo Noche"
        >
          🌙
        </button>
      </div>

      <style jsx global>{`
        @keyframes fallAndRotate {
          0% { transform: translateY(-5vh) rotate(0deg); opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.8; }
          100% { transform: translateY(105vh) rotate(540deg); opacity: 0; }
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

      {/* Imagen Principal Adaptable */}
      <div className="relative w-full max-w-[320px] sm:max-w-md md:max-w-lg h-[320px] sm:h-[400px] flex items-center justify-center mb-4 sm:mb-6 z-10 mt-6 sm:mt-0">
        <Image
          src="/bambu-pole-2.png"
          alt="Bambu Pole Studio Hero"
          fill
          sizes="(max-width: 768px) 300px, 500px"
          className="object-contain transition-all duration-700"
          style={{ filter: pandaFilterStyle[theme] }}
          priority
        />
      </div>

      <div className="text-center relative z-10 flex flex-col items-center gap-2">
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-[#3B9C84] hover:bg-[#31826d] text-white px-8 sm:px-12 py-3.5 sm:py-4 rounded-2xl font-semibold transition shadow-xl text-lg sm:text-xl inline-block active:scale-95 cursor-pointer shadow-[#3B9C84]/20"
        >
          Hola bienvenidos
        </button>
        <p className="text-xs sm:text-sm font-medium text-[#9079B5] animate-bounce">
          👆 ¡Apretá aquí!
        </p>
      </div>

      {/* Modal Responsivo */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-3 sm:p-4 transition-opacity duration-300"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="bg-white text-slate-900 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[92vh] overflow-y-auto relative p-5 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition cursor-pointer z-10"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="space-y-4 sm:space-y-6">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#9079B5] font-sans text-center">
                Conocé más sobre nosotras
              </h2>
              
              <div className="relative w-full">
                <div className="aspect-video w-full bg-slate-900 rounded-2xl overflow-hidden shadow-lg relative flex items-center justify-center">
                  {videos[currentVideoIndex].src ? (
                    <iframe 
                      src={videos[currentVideoIndex].src} 
                      title={videos[currentVideoIndex].title}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <p className="text-slate-400 text-xs sm:text-sm font-medium text-center px-4">
                      Espacio para video (Cargá tu URL en el código)
                    </p>
                  )}
                </div>

                <p className="text-center font-medium text-slate-700 mt-2.5 text-base sm:text-lg">
                  {videos[currentVideoIndex].title}
                </p>

                <button 
                  onClick={prevVideo}
                  className="absolute left-2 top-[42%] -translate-y-1/2 bg-white/80 hover:bg-white text-slate-800 p-1.5 sm:p-2 rounded-full shadow-md transition cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <button 
                  onClick={nextVideo}
                  className="absolute right-2 top-[42%] -translate-y-1/2 bg-white/80 hover:bg-white text-slate-800 p-1.5 sm:p-2 rounded-full shadow-md transition cursor-pointer"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              <div className="flex justify-center gap-2">
                {videos.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentVideoIndex(index)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      currentVideoIndex === index ? 'w-6 sm:w-8 bg-[#9079B5]' : 'w-2 bg-slate-300'
                    }`}
                  />
                ))}
              </div>

              <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-100">
                <h4 className='font-semibold text-slate-800 mb-1 text-sm sm:text-base'>
                  {currentVideoIndex === 0 ? "Nuestra Historia" : "Información"}
                </h4>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                   {videos[currentVideoIndex].description}
                </p>
              </div>

            </div>
          </div>
        </div>
      )}
    </main>
  );
}