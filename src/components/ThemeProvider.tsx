import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { getTheme, setTheme as persistTheme, initTheme } from '@/lib/storage';

type Theme = 'dark' | 'light';
interface ThemeCtx { theme: Theme; toggle: () => void; }
const Ctx = createContext<ThemeCtx>({ theme: 'dark', toggle: () => {} });

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark');
  useEffect(() => { initTheme(); setThemeState(getTheme()); }, []);
  const toggle = () => { const next = theme === 'dark' ? 'light' : 'dark'; persistTheme(next); setThemeState(next); };
  return <Ctx.Provider value={{ theme, toggle }}>{children}</Ctx.Provider>;
}
export const useTheme = () => useContext(Ctx);
