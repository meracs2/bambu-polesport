'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Definimos los tipos de temas disponibles
type Theme = 'day' | 'sunset' | 'night';

// Definimos la estructura del contexto
interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

// Creamos el contexto con un valor por defecto
const ThemeContext = createContext<ThemeContextType>({
  theme: 'day',
  setTheme: () => {},
});

// Hook personalizado para usar el contexto fácilmente en cualquier componente
export const useTheme = () => useContext(ThemeContext);

// El componente Proveedor que envolverá la app
export function ThemeProvider({ children }: { children: ReactNode }) {
  // Estado local para guardar el tema actual (por defecto 'day')
  const [theme, setTheme] = useState<Theme>('day');

  // Al cargar la página, intentamos recuperar el tema guardado en localStorage
  useEffect(() => {
    const storedTheme = localStorage.getItem('app-theme') as Theme;
    if (storedTheme && ['day', 'sunset', 'night'].includes(storedTheme)) {
      setTheme(storedTheme);
    }
  }, []);

  // Función para cambiar el tema y guardarlo en localStorage
  const handleSetTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem('app-theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme: handleSetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}