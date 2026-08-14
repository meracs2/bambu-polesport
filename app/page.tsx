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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', plan: 'Clase de prueba gratis' });

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

  // theme setter is handled via ThemeProvider or other UI; no local setter needed here

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

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const phoneNumber = "TU_NUMERO_DE_TELEFONO"; // Reemplazá con el número real de WhatsApp de la dueña del estudio
    const message = `Hola! Me quiero anotar.%0A- Nombre: ${encodeURIComponent(formData.name)}%0A- Teléfono: ${encodeURIComponent(formData.phone)}%0A- Plan/Promo: ${encodeURIComponent(formData.plan)}`;
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    setIsModalOpen(false);
  };

  return (
    <div className={`transition-colors duration-700 ${themeStyles[theme]}`}>
      {/* HERO: Dibujo gigante centrado */}
      <main className="relative min-h-[75vh] flex flex-col justify-center items-center px-6 sm:px-12 lg:px-24 py-8 overflow-hidden">
        
        {/* --- BOTÓN LLAMADOR (TAMAÑO HEADER, SIN EMOJIS) --- */}
        <div className="absolute top-6 left-6 z-20 flex items-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#3B9C84] hover:bg-[#31826d] text-white px-5 sm:px-6 py-3 sm:py-3.5 rounded-2xl font-semibold text-sm sm:text-base transition shadow-lg hover:shadow-xl flex items-center active:scale-95 cursor-pointer border border-white/20"
          >
            ¡Clase de prueba gratis!
          </button>
        </div>

        {/* --- MODAL DINÁMICO --- */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white text-slate-900 rounded-3xl overflow-hidden max-w-2xl w-full shadow-2xl border border-slate-100 relative flex flex-col md:flex-row animate-in fade-in zoom-in duration-200">
              
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 z-10 text-slate-400 hover:text-slate-600 text-xl font-bold cursor-pointer bg-slate-100 w-8 h-8 rounded-full flex items-center justify-center"
              >
                ✕
              </button>

              {/* Lado izquierdo: Ofertas / Destacado con Logo REDONDO Y GRANDE */}
              <div className="bg-[#FAF4EC] p-6 sm:p-8 md:w-1/2 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-200/60">
                <div>
                  <div className="flex flex-col items-start gap-4 mb-4">
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-white shadow-md bg-white flex items-center justify-center">
                      <Image src="/bambu-logo.jpg" alt="Bambu Logo" fill className="object-cover" />
                    </div>
                    <span className="bg-[#3B9C84]/10 text-[#3B9C84] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                      Promoción Especial
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#9079B5] mb-2">¡Anotate Hoy!</h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    Elegí tu clase de prueba gratis o aprovechá los packs con descuento para empezar a entrenar con nosotras.
                  </p>
                </div>
                <div className="mt-6 bg-white p-4 rounded-2xl shadow-sm border border-slate-200/40">
                  <p className="text-xs sm:text-sm font-semibold text-[#3B9C84]">Beneficio exclusivo</p>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1">Matrícula bonificada por anotarte desde la web hoy mismo.</p>
                </div>
              </div>

              {/* Lado derecho: Formulario Blanco con botón de envío actualizado */}
              <div className="bg-white p-6 sm:p-8 md:w-1/2 flex flex-col justify-center">
                <form onSubmit={handleWhatsAppSubmit} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-slate-500">Tu Nombre</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Ej. María Pérez"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:border-[#3B9C84]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-slate-500">Teléfono / WhatsApp</label>
                    <input 
                      type="tel" 
                      required
                      placeholder="Ej. 3511234567"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:border-[#3B9C84]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-slate-500">Seleccioná tu Promo / Plan</label>
                    <select 
                      value={formData.plan}
                      onChange={(e) => setFormData({...formData, plan: e.target.value})}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:border-[#3B9C84]"
                    >
                      <option value="Clase de prueba gratis">Clase de prueba (¡Gratis!)</option>
                      <option value="Pack Mensual x2 por semana">Pack Mensual x2 por semana (Oferta)</option>
                      <option value="Pack Mensual Libre">Pack Mensual Libre (Pase completo)</option>
                    </select>
                  </div>

                  {/* Botón con texto simplificado "Confirmar y enviar" */}
                  <button 
                    type="submit"
                    className="mt-3 bg-[#3B9C84] hover:bg-[#31826d] text-white py-3.5 px-4 rounded-xl font-semibold transition shadow-md text-sm sm:text-base flex items-center justify-center gap-2.5 cursor-pointer"
                  >
                    <span>💬</span> <span>Confirmar y enviar</span>
                  </button>
                </form>
              </div>

            </div>
          </div>
        )}

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