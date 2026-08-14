// app/clases/page.tsx
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

export default function ClasesPage() {
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
      const stored = localStorage.getItem('app-theme') as 'day' | 'sunset' | 'night' | null;
      return stored && ['day', 'sunset', 'night'].includes(stored) ? stored : 'day';
    } catch {
      return 'day';
    }
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClassType, setSelectedClassType] = useState('Clase de prueba gratis');
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

  // leaves generated via useMemo (deterministic pseudorandom) to avoid setState in effects

  const themeStyles = {
    day: 'bg-white text-slate-900',
    sunset: 'bg-[#FAF4EC] text-slate-900',
    night: 'bg-[#1E1829] text-white',
  };

  const cardThemeStyles = {
    day: 'bg-white/90 border-slate-100',
    sunset: 'bg-white/80 border-amber-100/60',
    night: 'bg-[#261f36]/90 border-purple-900/30 text-white',
  };

  const classesList = [
    {
      title: "Pole Sport",
      level: "Principiantes / Intermedios / Avanzados",
      description: "Entrenamiento de fuerza, acrobacias en la barra, inversiones y transiciones técnicas combinando arte y deporte.",
      image: "/bambu-pole-2.png"
    },
    {
      title: "Pole Exotic & Coreo",
      level: "Todos los niveles",
      description: "Enfoque en la fluidez, expresión corporal, coreografías y baile con plataformas, potenciando la seguridad y sensualidad.",
      image: "/bambu-pole-3.png"
    },
    {
      title: "Flexibilidad & Acrobacia",
      level: "Sin experiencia previa requerida",
      description: "Clases orientadas a ganar rango de movimiento, elongación activa/pasiva y acondicionamiento físico general para cuidar tu cuerpo.",
      image: "/bambu-pole-4.png"
    }
  ];

  const handleOpenModal = (className: string) => {
    setSelectedClassType(className);
    setFormData(prev => ({ ...prev, plan: className }));
    setIsModalOpen(true);
  };

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const phoneNumber = "TU_NUMERO_DE_TELEFONO"; // Reemplazá con el número real de WhatsApp de la dueña
    const message = `Hola! Me quiero anotar a ${formData.plan}.%0A- Nombre: ${encodeURIComponent(formData.name)}%0A- Teléfono: ${encodeURIComponent(formData.phone)}`;
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    setIsModalOpen(false);
  };

  return (
    <div className={`transition-colors duration-700 ${themeStyles[theme]} min-h-[85vh] relative overflow-hidden py-12 px-6 sm:px-12 lg:px-24`}>
      
      {/* Fondo de hojas animadas */}
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

      {/* Contenido principal */}
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="bg-[#3B9C84]/10 text-[#3B9C84] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
            Nuestras Disciplinas
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#9079B5] mt-3 mb-4">
            Elegí tu clase y empezá a entrenar
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Contamos con opciones adaptadas a todos los niveles, desde cero hasta avanzado. Unete a nuestro espacio y potencia tu fuerza y confianza.
          </p>
        </div>

        {/* Grilla de Clases */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {classesList.map((item, index) => (
            <div 
              key={index} 
              className={`rounded-3xl p-6 shadow-sm border flex flex-col justify-between transition-all duration-300 hover:shadow-md ${cardThemeStyles[theme]}`}
            >
              <div>
                <div className="relative w-full h-48 mb-6 rounded-2xl overflow-hidden bg-slate-100 flex items-center justify-center">
                  <Image 
                    src={item.image} 
                    alt={item.title} 
                    fill 
                    className="object-contain p-2" 
                  />
                </div>
                <span className="text-xs font-semibold text-[#3B9C84] uppercase tracking-wider">
                  {item.level}
                </span>
                <h3 className="text-xl font-bold text-[#9079B5] mt-1 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              <button
                onClick={() => handleOpenModal(item.title)}
                className="w-full bg-[#3B9C84] hover:bg-[#31826d] text-white py-3 rounded-xl font-semibold text-sm transition shadow-sm cursor-pointer"
              >
                Reservar / Consultar
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL DE INSCRIPCIÓN */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white text-slate-900 rounded-xl sm:rounded-3xl overflow-hidden w-full max-w-105 mx-4 sm:mx-auto max-h-[90vh] shadow-2xl border border-slate-100 relative flex flex-col md:flex-row animate-in fade-in zoom-in duration-200">
            
            <button 
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 z-10 text-slate-400 hover:text-slate-600 text-xl font-bold cursor-pointer bg-slate-100 w-8 h-8 rounded-full flex items-center justify-center"
            >
              ✕
            </button>

            {/* Izquierda: Logo Redondo y Promoción */}
            <div className="bg-[#FAF4EC] p-4 sm:p-8 md:w-1/2 flex flex-col justify-between border-b md:border-b-0 md:border-r border-slate-200/60">
              <div>
                <div className="flex flex-col items-start gap-4 mb-4">
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden border-2 border-white shadow-md bg-white flex items-center justify-center">
                    <Image src="/bambu-logo.jpg" alt="Bambu Logo" fill className="object-cover" />
                  </div>
                  <span className="bg-[#3B9C84]/10 text-[#3B9C84] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    Reserva de Clase
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-[#9079B5] mb-2">¡Anotate Hoy!</h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Estás a un paso de sumarte a <span className="font-semibold text-slate-800">{selectedClassType}</span>. Completá tus datos para coordinar con la dueña por WhatsApp.
                </p>
              </div>
              <div className="mt-6 bg-white p-4 rounded-2xl shadow-sm border border-slate-200/40">
                <p className="text-xs sm:text-sm font-semibold text-[#3B9C84]">Beneficio exclusivo</p>
                <p className="text-xs sm:text-sm text-slate-500 mt-1">Matrícula bonificada por anotarte desde la web hoy mismo.</p>
              </div>
            </div>

            {/* Derecha: Formulario */}
            <div className="bg-white p-4 sm:p-8 md:w-1/2 flex flex-col justify-center overflow-y-auto" style={{ maxHeight: '78vh' }}>
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
                  <label className="block text-xs font-semibold uppercase tracking-wider mb-1 text-slate-500">Clase Seleccionada</label>
                  <select 
                    value={formData.plan}
                    onChange={(e) => setFormData({...formData, plan: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm focus:outline-none focus:border-[#3B9C84]"
                  >
                    <option value="Clase de prueba gratis">Clase de prueba (¡Gratis!)</option>
                    <option value="Pole Sport">Pole Sport</option>
                    <option value="Pole Exotic & Coreo">Pole Exotic & Coreo</option>
                    <option value="Flexibilidad & Acrobacia">Flexibilidad & Acrobacia</option>
                  </select>
                </div>

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

    </div>
  );
}