// app/page.tsx
'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Home() {
  const [leaves, setLeaves] = useState<any[]>([]);
  const [theme, setTheme] = useState<'day' | 'sunset' | 'night'>('day');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', plan: 'Clase de prueba gratis' });

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
    const phoneNumber = "TU_NUMERO_DE_TELEFONO"; // Reemplazá con el número real de WhatsApp
    const message = `Hola! Me quiero anotar.%0A- Nombre: ${encodeURIComponent(formData.name)}%0A- Teléfono: ${encodeURIComponent(formData.phone)}%0A- Plan/Promo: ${encodeURIComponent(formData.plan)}`;
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    setIsModalOpen(false);
  };

  return (
    <div className={`transition-colors duration-700 ${themeStyles[theme]}`}>
      {/* HERO */}
      <main className="relative min-h-[70vh] sm:min-h-[75vh] flex flex-col justify-center items-center px-6 sm:px-12 lg:px-24 py-12 overflow-hidden">
        
        {/* --- BOTÓN LLAMADOR --- */}
        <div className="absolute top-6 left-6 z-20 flex items-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-[#3B9C84] hover:bg-[#31826d] text-white px-5 sm:px-6 py-3 sm:py-3.5 rounded-2xl font-semibold text-sm sm:text-base transition shadow-lg hover:shadow-xl flex items-center active:scale-95 cursor-pointer border border-white/20"
          >
            ¡Clase de prueba gratis!
          </button>
        </div>

        {/* --- MODAL AJUSTADO (PEQUEÑO Y COMPACTO POR DEFECTO) --- */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
            <div className="bg-white text-slate-900 rounded-3xl p-5 max-w-[90vw] sm:max-w-sm w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-slate-100 relative my-auto animate-in fade-in zoom-in duration-200">
              
              {/* Cruz de cierre */}
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-3 right-3 z-30 text-slate-500 hover:text-slate-800 font-bold cursor-pointer bg-slate-100 hover:bg-slate-200 w-8 h-8 rounded-full flex items-center justify-center shadow-sm transition text-sm"
              >
                ✕
              </button>

              {/* Título compacto */}
              <div className="mb-4 pr-6">
                <span className="bg-[#3B9C84]/10 text-[#3B9C84] text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                  Promoción Especial
                </span>
                <h3 className="text-xl font-bold text-[#9079B5] mt-1">¡Anotate Hoy!</h3>
              </div>

              {/* Formulario */}
              <form onSubmit={handleWhatsAppSubmit} className="flex flex-col gap-3">
                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1 text-slate-500">Tu Nombre</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Ej. María Pérez"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-[#3B9C84]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1 text-slate-500">Teléfono / WhatsApp</label>
                  <input 
                    type="tel" 
                    required
                    placeholder="Ej. 3511234567"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-[#3B9C84]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold uppercase tracking-wider mb-1 text-slate-500">Plan / Promo</label>
                  <select 
                    value={formData.plan}
                    onChange={(e) => setFormData({...formData, plan: e.target.value})}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-xs sm:text-sm focus:outline-none focus:border-[#3B9C84]"
                  >
                    <option value="Clase de prueba gratis">Clase de prueba (¡Gratis!)</option>
                    <option value="Pack Mensual x2 por semana">Pack Mensual x2 por semana (Oferta)</option>
                    <option value="Pack Mensual Libre">Pack Mensual Libre (Pase completo)</option>
                  </select>
                </div>

                <button 
                  type="submit"
                  className="mt-2 bg-[#3B9C84] hover:bg-[#31826d] text-white py-2.5 px-4 rounded-xl font-semibold transition shadow-md text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>💬</span> <span>Confirmar y enviar</span>
                </button>
              </form>

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

        {/* Imagen Gigante Armonizada */}
        <div className="relative w-full max-w-[280px] sm:max-w-xl md:max-w-2xl h-[320px] sm:h-[520px] flex items-center justify-center z-10 mt-6 sm:mt-0">
          <Image
            src="/bambu-pole-4.png"
            alt="Bambu Pole Studio Hero"
            fill
            sizes="(max-width: 768px) 280px, 700px"
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