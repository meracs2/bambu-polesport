// app/layout.tsx
'use client';

import "./globals.css";
import Link from "next/link";
import { ReactNode, useState, useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

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

  const layoutThemeStyles = {
    day: 'bg-white text-slate-900',
    sunset: 'bg-[#FAF4EC] text-slate-900',
    night: 'bg-[#1E1829] text-white',
  };

  const headerThemeStyles = {
    day: 'bg-white/80 border-slate-100',
    sunset: 'bg-[#FAF4EC]/80 border-[#EFE5D8]',
    night: 'bg-[#1E1829]/80 border-[#332946]',
  };

  const linkHoverColor = theme === 'night' ? 'hover:text-purple-300' : 'hover:text-[#9079B5]';
  const navTextColor = theme === 'night' ? 'text-slate-200' : 'text-slate-700';

  const sponsors = [
    "Marca / Sponsor 1",
    "Marca / Sponsor 2",
    "Marca / Sponsor 3",
    "Marca / Sponsor 4",
    "Marca / Sponsor 5",
  ];

  return (
    <html lang="es">
      <body className={`${layoutThemeStyles[theme]} min-h-screen flex flex-col justify-between antialiased transition-colors duration-700`}>
        <div>
          {/* --- HEADER GLOBAL RESPONSIVE --- */}
          <header className={`flex flex-col sm:flex-row justify-between items-center gap-4 px-4 sm:px-8 py-4 backdrop-blur-md border-b shadow-sm sticky top-0 z-40 transition-colors duration-700 ${headerThemeStyles[theme]}`}>
            <Link href="/" className="flex items-center gap-3">
              <Image 
                src="/bambu-logo.jpg" 
                alt="Bambu Pole Studio Logo" 
                width={60} 
                height={60} 
                className="h-12 w-12 sm:h-14 sm:w-14 object-cover rounded-full shadow-sm"
                priority
              />
              <span className="text-lg sm:text-xl font-bold tracking-wide text-[#9079B5] font-sans">
                bambu pole-studio
              </span>
            </Link>

            {/* Navegación corregida a /clases para que coincida con tu carpeta */}
            <nav className={`flex items-center gap-6 text-sm font-medium ${navTextColor}`}>
              <Link href="/" className={`${linkHoverColor} transition`}>Inicio</Link>
              <Link href="/clases" className={`${linkHoverColor} transition`}>Clases</Link>
              <Link href="/gallery" className={`${linkHoverColor} transition`}>Galería</Link>
              <Link href="/contact" className={`${linkHoverColor} transition`}>Contáctenos</Link>
            </nav>
          </header>

          <main>
            {children}
          </main>
        </div>

        <div>
          {/* Barra de sponsors SIN líneas divisorias negras */}
          {isHome && (
            <div className={`w-full py-2 overflow-hidden shadow-xs transition-colors duration-700 ${
              theme === 'night' ? 'bg-[#161220]' : 'bg-[#f3ecf9]'
            }`}>
              <div className="relative w-full overflow-hidden flex">
                <div className="animate-marquee-slow flex items-center gap-12 whitespace-nowrap">
                  {[...sponsors, ...sponsors, ...sponsors, ...sponsors].map((sponsor, index) => (
                    <div key={index} className="flex items-center gap-12 shrink-0">
                      <span className={`${theme === 'night' ? 'text-slate-300' : 'text-slate-700'} font-medium text-[11px] tracking-widest uppercase`}>
                        {sponsor}
                      </span>
                      <span className="text-[#9079B5] font-light text-xs">/</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {isHome ? (
            <footer className="px-4 sm:px-8 py-8 text-center text-xs sm:text-sm font-medium text-white bg-[#9079B5]">
                © {new Date().getFullYear()} AMsolution & Bambu Pole Studio - Todos los derechos reservados
            </footer>
          ) : (
            <footer className="px-4 sm:px-8 py-4 text-center text-xs font-medium text-white/90 bg-[#9079B5]/90 border-t border-purple-300/20">
                © {new Date().getFullYear()} AMsolution & Bambu Pole Studio
            </footer>
          )}
        </div>
      </body>
    </html>
  );
}