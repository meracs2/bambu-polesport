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

type ClassItem = {
  id: string;
  title: string;
  level: string;
  description: string;
  image: string;
  youtubeId: string;
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

  const [activeClass, setActiveClass] = useState<ClassItem | null>(null);
  const [formData, setFormData] = useState({ name: '', phone: '' });

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

  const cardThemeStyles = {
    day: 'bg-white border-slate-200 hover:border-[#3B9C84]/60 hover:shadow-xl',
    sunset: 'bg-white/95 border-amber-200/70 hover:border-[#3B9C84]/60 hover:shadow-xl',
    night: 'bg-[#261f36] border-purple-900/40 text-white hover:border-[#3B9C84]/60 hover:shadow-xl',
  };

  const classesList: ClassItem[] = [
    {
      id: "pole-sport",
      title: "Pole Sport",
      level: "Principiantes / Intermedios / Avanzados",
      description: "Entrenamiento de fuerza, trucos, figuras e inversiones en la barra combinando técnica deportiva y arte.",
      image: "/bambu-pole-2.png",
      youtubeId: "j85dgGee3mI"
    },
    {
      id: "pole-exotic",
      title: "Pole Exotic",
      level: "Adultos (+18) / Recom. Principiantes con base o Intermedios",
      description: "Enfoque en la fluidez, musicalidad, baile con tacones (pleasers) y floorwork para potenciar tu seguridad y expresión.",
      image: "/bambu-pole-3.png",
      youtubeId: "LDQVYEFpmtU"
    },
    {
      id: "flexibilidad",
      title: "Flexibilidad",
      level: "Sin experiencia previa",
      description: "Elongación activa y pasiva, movilidad articular y acondicionamiento físico para prevenir lesiones y ganar rango.",
      image: "/bambu-pole-4.png",
      youtubeId: "v7SN-d4qXx0"
    },
    {
      id: "acrotelas",
      title: "Acrotelas (Niños y Adultos)",
      level: "Todos los niveles",
      description: "Acrobacia en tela suspendida. Fuerza, flexibilidad y figuras aéreas adaptadas por edades.",
      image: "/bambu-pole-2.png",
      youtubeId: "6BnKmWZPU8M"
    },
    {
      id: "lyra",
      title: "Lyra (Aro Aéreo)",
      level: "Todos los niveles",
      description: "Acondicionamiento físico, destreza y secuencias dinámicas sobre aro metálico suspendido.",
      image: "/bambu-pole-3.png",
      youtubeId: "uMvG8i6Nprc"
    },
    {
      id: "acro-piso",
      title: "Acro de Piso",
      level: "Sin experiencia previa",
      description: "Técnica gimnástica y acrobática en suelo: rodamientos, vertical, apoyos y coordinación física.",
      image: "/bambu-pole-4.png",
      youtubeId: "sR1Qr6Aq4oA"
    },
    {
      id: "heels",
      title: "Heels",
      level: "Todos los niveles",
      description: "Danza urbana y sensual sobre tacones. Trabajo de postura, actitud, ritmo y expresión corporal.",
      image: "/bambu-pole-2.png",
      youtubeId: "2vjPBrBU-TM"
    },
    {
      id: "yoga",
      title: "Yoga",
      level: "Todos los niveles",
      description: "Práctica integral para alinear cuerpo y mente mediante respiración, posturas (asanas) y relajación.",
      image: "/bambu-pole-3.png",
      youtubeId: "inpok4MKVLM"
    }
  ];

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeClass) return;
    const phoneNumber = "5493512110079";
    const message = `Hola! Quisiera consultar/reservar para la clase de ${activeClass.title}.%0A- Nombre: ${encodeURIComponent(formData.name)}%0A- Teléfono: ${encodeURIComponent(formData.phone)}`;
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    setActiveClass(null);
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
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="bg-[#3B9C84]/15 text-[#3B9C84] text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-full">
            Nuestras Disciplinas
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#7B5F9E] dark:text-[#B19BD3] mt-3 mb-4">
            Elegí tu clase y mirá la muestra
          </h1>
          <p 
            style={{ color: '#334155' }} 
            className="text-sm sm:text-base font-semibold leading-relaxed"
          >
            Hacé clic en cualquier disciplina para ver el video de la clase en vivo y consultar tus horarios por WhatsApp.
          </p>
        </div>

        {/* Grilla de 8 Clases Interactivas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {classesList.map((item) => (
            <div 
              key={item.id} 
              onClick={() => setActiveClass(item)}
              className={`group rounded-3xl p-6 shadow-md border flex flex-col justify-between transition-all duration-300 transform md:hover:-translate-y-2 cursor-pointer active:scale-95 ${cardThemeStyles[theme]}`}
            >
              <div>
                <div className="relative w-full h-44 mb-4 rounded-2xl overflow-hidden bg-slate-100 flex items-center justify-center">
                  <Image 
                    src={item.image} 
                    alt={item.title} 
                    fill 
                    className="object-contain p-2 transition-transform duration-300 group-hover:scale-105" 
                  />
                  
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 text-white font-semibold text-xs backdrop-blur-[1px]">
                    <span className="w-8 h-8 rounded-full bg-[#3B9C84] flex items-center justify-center shadow-lg text-sm">
                      ▶
                    </span>
                    <span>Ver Demo</span>
                  </div>
                </div>

                {/* Badge de Nivel */}
                <span className="text-[11px] font-extrabold text-[#3B9C84] uppercase tracking-wider block mb-1.5">
                  {item.level}
                </span>

                {/* Título de la Clase */}
                <h3 className="text-lg font-bold text-[#7B5F9E] dark:text-[#B19BD3] mb-2 group-hover:text-[#3B9C84] transition-colors">
                  {item.title}
                </h3>

                {/* Descripción */}
                <p 
                  style={{ color: '#334155' }} 
                  className="text-xs font-semibold leading-relaxed mb-6 line-clamp-3"
                >
                  {item.description}
                </p>
              </div>

              {/* Botón Reservar / Consultar */}
              <div className="w-full bg-[#3B9C84] group-hover:bg-[#2B7A66] text-white py-3 rounded-xl font-bold text-xs transition shadow-sm flex items-center justify-center gap-2">
                <span>Reservar / Consultar</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL CON REPRODUCTOR YOUTUBE */}
      {activeClass && (
        <div 
          onClick={() => setActiveClass(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 animate-in fade-in duration-200"
        >
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="bg-white text-slate-900 rounded-2xl sm:rounded-3xl overflow-hidden w-full max-w-2xl mx-auto shadow-2xl border border-slate-100 relative flex flex-col max-h-[90vh]"
          >
            
            {/* Botón Cerrar */}
            <button 
              onClick={() => setActiveClass(null)}
              className="absolute top-3 right-3 z-20 text-slate-700 hover:text-slate-950 bg-white/90 hover:bg-white w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all cursor-pointer font-bold text-sm"
            >
              ✕
            </button>

            {/* IFRAME YOUTUBE */}
            <div className="relative w-full bg-black aspect-video flex items-center justify-center overflow-hidden">
              <iframe
                src={`https://www.youtube.com/embed/${activeClass.youtubeId}?autoplay=1&muted=1&controls=1&rel=0&enablejsapi=1`}
                title={activeClass.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            </div>

            {/* CONTENIDO Y FORMULARIO DEL MODAL */}
            <div className="p-6 overflow-y-auto bg-white">
              <div className="mb-4">
                <span className="bg-[#3B9C84]/15 text-[#3B9C84] text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                  {activeClass.level}
                </span>
                <h3 className="text-2xl font-bold text-[#7B5F9E] mt-2">{activeClass.title}</h3>
                
                {/* Descripción dentro del Modal */}
                <p 
                  style={{ color: '#334155' }} 
                  className="text-xs sm:text-sm font-semibold mt-1.5 leading-relaxed"
                >
                  {activeClass.description}
                </p>
              </div>

              <form onSubmit={handleWhatsAppSubmit} className="flex flex-col sm:flex-row gap-3 pt-3 border-t border-slate-200">
                <input 
                  type="text" 
                  required
                  placeholder="Tu Nombre"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 font-medium text-xs sm:text-sm focus:outline-none focus:border-[#3B9C84] placeholder:text-slate-400"
                />
                <input 
                  type="tel" 
                  required
                  placeholder="Tu WhatsApp"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 font-medium text-xs sm:text-sm focus:outline-none focus:border-[#3B9C84] placeholder:text-slate-400"
                />
                <button 
                  type="submit"
                  className="bg-[#3B9C84] hover:bg-[#2B7A66] text-white py-2.5 px-5 rounded-xl font-bold text-xs sm:text-sm transition shadow-md whitespace-nowrap cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>💬</span> <span>Consultar Horarios</span>
                </button>
              </form>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}