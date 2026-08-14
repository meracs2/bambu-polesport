// app/contact/page.tsx
'use client';

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

export default function Contact() {
  const [theme, setTheme] = useState<'day' | 'sunset' | 'night'>(() => {
    try {
      if (typeof window === 'undefined') return 'day';
      const stored = localStorage.getItem('app-theme') as 'day' | 'sunset' | 'night' | null;
      return stored && ['day', 'sunset', 'night'].includes(stored) ? stored : 'day';
    } catch {
      return 'day';
    }
  });

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const leaves = useMemo<Leaf[]>(() => {
    const rand = (i: number, seed = 1) => ((i * 9301 + 49297 * seed) % 233280) / 233280;
    return Array.from({ length: 18 }).map((_, i) => {
      const colors = ['#748F80', '#8EA89B', '#5f776a', '#9ab0a4', '#b2c4bc'];
      const r1 = rand(i, 1);
      const r2 = rand(i, 2);
      const r3 = rand(i, 3);
      const r4 = rand(i, 4);
      return {
        id: i,
        left: `${(i * 5.8) % 95}%`,
        width: `${Math.floor(r1 * 10) + 20}px`,
        height: `${Math.floor(r2 * 6) + 8}px`,
        bg: colors[i % colors.length],
        duration: `${(r3 * 6 + 10).toFixed(2)}s`,
        delay: `${(r4 * 6).toFixed(2)}s`,
        radius: i % 2 === 0 ? '80% 0% 80% 0%' : '0% 80% 0% 80%',
        rotation: `${Math.floor((i * 45) % 360)}deg`,
      } as Leaf;
    });
  }, []);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // WhatsApp Oficial Bambú Pole Studio
    const studioPhone = "5493512110079";

    const textMessage = `Hola Bambú Pole Studio! Soy ${encodeURIComponent(formData.name)}.%0A- Correo: ${encodeURIComponent(formData.email)}%0A- Teléfono: ${encodeURIComponent(formData.phone)}%0A- Mensaje: ${encodeURIComponent(formData.message)}`;

    window.open(`https://wa.me/${studioPhone}?text=${textMessage}`, '_blank');
  };

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
    <div className={`relative min-h-[calc(100vh-140px)] flex flex-col justify-center overflow-hidden py-12 px-4 sm:px-8 lg:px-16 transition-colors duration-700 ${themeStyles[theme]}`}>
      
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

      {/* ANIMACIÓN DE HOJAS */}
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

      {/* CONTENEDOR PRINCIPAL DOS COLUMNAS */}
      <div className="relative max-w-6xl mx-auto w-full z-10 my-auto">
        
        <div className="text-center mb-8">
          <h2 className={`text-3xl sm:text-4xl font-bold mb-2 font-sans ${titleColor}`}>
            Contáctenos
          </h2>
          <p className={`font-medium text-sm sm:text-base ${subtitleColor}`}>
            Dejanos tu mensaje y te responderemos a la brevedad.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* COLUMNA IZQUIERDA: FORMULARIO DE CONTACTO */}
          <form 
            onSubmit={handleSubmit}
            className={`border p-6 sm:p-8 rounded-3xl space-y-4 shadow-sm transition-all duration-700 flex flex-col justify-between ${formBoxStyles[theme]}`}
          >
            <div>
              <label className={`block text-xs sm:text-sm font-semibold mb-1 ${theme === 'night' ? 'text-slate-200' : 'text-slate-700'}`}>
                Nombre completo
              </label>
              <input 
                type="text" 
                required
                placeholder="Tu nombre" 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className={`w-full border rounded-xl p-3 text-sm outline-none focus:border-[#9079B5] transition ${inputStyles[theme]}`} 
              />
            </div>

            <div>
              <label className={`block text-xs sm:text-sm font-semibold mb-1 ${theme === 'night' ? 'text-slate-200' : 'text-slate-700'}`}>
                Correo electrónico
              </label>
              <input 
                type="email" 
                required
                placeholder="tucorreo@email.com" 
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className={`w-full border rounded-xl p-3 text-sm outline-none focus:border-[#9079B5] transition ${inputStyles[theme]}`} 
              />
            </div>

            <div>
              <label className={`block text-xs sm:text-sm font-semibold mb-1 ${theme === 'night' ? 'text-slate-200' : 'text-slate-700'}`}>
                Teléfono / WhatsApp
              </label>
              <input 
                type="tel" 
                required
                placeholder="Ej. 3511234567" 
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className={`w-full border rounded-xl p-3 text-sm outline-none focus:border-[#9079B5] transition ${inputStyles[theme]}`} 
              />
            </div>

            <div>
              <label className={`block text-xs sm:text-sm font-semibold mb-1 ${theme === 'night' ? 'text-slate-200' : 'text-slate-700'}`}>
                Mensaje
              </label>
              <textarea 
                required
                placeholder="¿En qué te podemos ayudar?" 
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className={`w-full border rounded-xl p-3 h-28 text-sm outline-none focus:border-[#9079B5] transition resize-none ${inputStyles[theme]}`}
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="w-full bg-[#9079B5] hover:bg-[#7b639c] py-3.5 rounded-xl font-bold text-white transition shadow-md shadow-[#9079B5]/20 cursor-pointer text-sm sm:text-base flex items-center justify-center gap-2"
            >
              <span>💬</span> <span>Enviar mensaje a WhatsApp</span>
            </button>
          </form>

          {/* COLUMNA DERECHA: UBICACIÓN, HORARIOS Y GOOGLE MAPS */}
          <div className={`border p-6 sm:p-8 rounded-3xl shadow-sm transition-all duration-700 flex flex-col justify-between gap-6 ${formBoxStyles[theme]}`}>
            
            {/* DIRECCIÓN Y HORARIOS */}
            <div className="space-y-4 text-left">
              <div>
                <h3 className={`text-base sm:text-lg font-bold flex items-center gap-2 ${titleColor}`}>
                  📍 Ubicación de la Academia
                </h3>
                <p className={`text-xs sm:text-sm mt-1 ${subtitleColor}`}>
                  Ovidio Lagos 10, X5004ACB Córdoba, Argentina
                </p>
                <p className={`text-xs mt-0.5 ${subtitleColor}`}>
                  📞 0351 15-211-0079
                </p>
              </div>

              <div>
                <h3 className={`text-base sm:text-lg font-bold flex items-center gap-2 ${titleColor}`}>
                  ⏰ Horarios de Atención
                </h3>
                <ul className={`text-xs sm:text-sm mt-1 space-y-1 ${subtitleColor}`}>
                  <li><strong className={theme === 'night' ? 'text-white' : 'text-slate-700'}>Lunes a Viernes:</strong> 09:00 a 13:00 hs — 16:00 a 21:00 hs</li>
                  <li><strong className={theme === 'night' ? 'text-white' : 'text-slate-700'}>Sábados:</strong> 10:30 a 13:00 hs — 17:00 a 19:30 hs</li>
                  <li><strong className={theme === 'night' ? 'text-white' : 'text-slate-700'}>Domingos:</strong> Cerrado</li>
                </ul>
              </div>
            </div>

            {/* MAPA GOOGLE MAPS EN OVIDIO LAGOS 10 */}
            <div className="w-full h-56 sm:h-64 rounded-2xl overflow-hidden shadow-inner border border-slate-200/40">
              <iframe
                title="Ubicación Bambu Pole Studio"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3405.011831417578!2d-64.18879!3d-31.416667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9432a281691a5477%3A0xb36a3f3fb58c14a2!2sOvidio%20Lagos%2010%2C%20X5004ACB%20C%C3%B3rdoba!5e0!3m2!1ses!2sar!4v1700000000000!5m2!1ses!2sar"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}