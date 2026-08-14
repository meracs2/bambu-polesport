// app/page.tsx
'use client';

import Image from 'next/image';
import { useState, useEffect, useMemo } from 'react';

type Leaf = {
  id: number;
  left: string;
  width: string;
  height: string;
  bg: string;
  duration: string;
  delay: string;
  radius: string;
  rotation: string;
};

export default function Home() {
  const leaves = useMemo<Leaf[]>(() => {
    const rand = (i: number, seed = 1) => ((i * 9301 + 49297 * seed) % 233280) / 233280;
    return Array.from({ length: 14 }).map((_, i) => {
      const colors = ['#748F80', '#8EA89B', '#5f776a', '#9ab0a4', '#b2c4bc'];
      const r1 = rand(i, 1);
      const r2 = rand(i, 2);
      const r3 = rand(i, 3);
      const r4 = rand(i, 4);
      const r5 = rand(i, 5);
      return {
        id: i,
        left: `${(i * 7) % 95}%`,
        width: `${Math.floor(r1 * 8) + 16}px`,
        height: `${Math.floor(r2 * 3) + 6}px`,
        bg: colors[i % colors.length],
        duration: `${(r3 * 6 + 10).toFixed(2)}s`,
        delay: `${(r4 * 8).toFixed(2)}s`,
        radius: i % 2 === 0 ? '80% 0% 80% 0%' : '0% 80% 0% 80%',
        rotation: `${Math.floor(r5 * 360)}deg`,
      } as Leaf;
    });
  }, []);

  const [theme, setTheme] = useState<'day' | 'sunset' | 'night'>(() => {
    try {
      if (typeof window === 'undefined') return 'day';
      const stored = localStorage.getItem('app-theme') as 'day' | 'sunset' | 'night' | null;
      return stored && ['day', 'sunset', 'night'].includes(stored) ? stored : 'day';
    } catch {
      return 'day';
    }
  });

  useEffect(() => {
    const handleThemeChange = () => {
      const currentTheme = localStorage.getItem('app-theme') as 'day' | 'sunset' | 'night';
      if (currentTheme && ['day', 'sunset', 'night'].includes(currentTheme)) {
        setTheme(currentTheme);
      }
    };

    window.addEventListener('theme-change', handleThemeChange);
    return () => window.removeEventListener('theme-change', handleThemeChange);
  }, []);

  const themeStyles = {
    day: 'bg-white text-slate-900',
    sunset: 'bg-[#FAF4EC] text-slate-900',
    night: 'bg-[#1E1829] text-white',
  };

  const pandaFilterStyle = {
    day: 'drop-shadow(0 0 20px rgba(59, 156, 132, 0.45)) drop-shadow(0 0 8px rgba(0, 0, 0, 0.2))',
    sunset: 'drop-shadow(0 0 20px rgba(144, 121, 181, 0.45)) drop-shadow(0 0 8px rgba(90, 80, 70, 0.2))',
    night: 'drop-shadow(0 0 25px rgba(255, 255, 255, 0.4))',
  };

  const teachers = [
    { name: "Profesor/a 1", role: "Especialista en Pole Sport", img: "/bambu-pole-2.png" },
    { name: "Profesor/a 2", role: "Especialista en Exótico y Coreo", img: "/bambu-pole-3.png" },
    { name: "Profesor/a 3", role: "Acrobacia y Flexibilidad", img: "/bambu-pole-4.png" },
  ];

  return (
    <div className={`transition-colors duration-700 ${themeStyles[theme]}`}>
      {/* HERO */}
      <main className="relative min-h-[75vh] flex flex-col justify-center items-center px-6 sm:px-12 lg:px-24 py-8 overflow-hidden">
        
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

        {/* Imagen Gigante Centrada */}
        <div className="relative w-full max-w-95 sm:max-w-xl md:max-w-2xl h-100 sm:h-137.5 flex items-center justify-center z-10">
          <Image
            src="/bambu-pole-4.png"
            alt="Bambu Pole Studio Hero"
            fill
            sizes="(max-width: 768px) 380px, 700px"
            className="object-contain transition-all duration-700"
            style={{ filter: pandaFilterStyle[theme] }}
            priority
          />
        </div>
      </main>

      {/* SECCIÓN: SOBRE NOSOTRAS */}
      <section className="px-6 sm:px-12 lg:px-24 py-16 max-w-5xl text-left relative z-10">
        <h2 className="text-2xl sm:text-4xl font-bold text-[#9079B5] mb-4">Sobre nosotras</h2>
        <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed max-w-3xl">
          Somos un estudio enfocado en el desarrollo físico y mental a través del pole sport. Creamos un espacio seguro, inclusivo y lleno de energía para que entrenes, superes tus límites y disfrutes cada proceso sin importar tu nivel.
        </p>
      </section>

      {/* SECCIÓN: PROFESORES */}
      <section className="px-6 sm:px-12 lg:px-24 pt-12 pb-16 max-w-7xl relative z-10">
        <h3 className="text-xl sm:text-3xl font-bold text-[#9079B5] mb-8">Nuestros Profesores</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {teachers.map((teacher, index) => (
            <div key={index} className="bg-white/80 dark:bg-slate-800/80 p-6 rounded-3xl shadow-sm border border-slate-100 dark:border-purple-900/20 text-left flex flex-col items-start">
              <div className="relative w-20 h-20 mb-4 rounded-full overflow-hidden shadow-md bg-slate-100">
                <Image src={teacher.img} alt={teacher.name} fill className="object-cover" />
              </div>
              <h4 className="font-semibold text-base sm:text-lg">{teacher.name}</h4>
              <p className="text-xs sm:text-sm text-[#9079B5] mt-1">{teacher.role}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}