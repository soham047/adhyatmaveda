import type { JapaLog } from '@/types';

const THEME_KEY = 'av-theme';
const JAPA_KEY = 'av-japa-logs';
const SANKALPA_KEY = 'av-sankalpa';

export function getTheme(): 'dark' | 'light' {
  if (typeof window === 'undefined') return 'dark';
  return (localStorage.getItem(THEME_KEY) as 'dark' | 'light') || 'dark';
}

export function setTheme(theme: 'dark' | 'light') {
  localStorage.setItem(THEME_KEY, theme);
  if (theme === 'light') { document.documentElement.classList.add('light'); document.documentElement.classList.remove('dark'); }
  else { document.documentElement.classList.add('dark'); document.documentElement.classList.remove('light'); }
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', theme === 'light' ? '#FDFBF7' : '#0A0B0E');
}

export function initTheme() { setTheme(getTheme()); }

export function getJapaLogs(): Record<string, JapaLog> {
  try { return JSON.parse(localStorage.getItem(JAPA_KEY) || '{}'); } catch { return {}; }
}

export function saveJapaLog(mantra: string, added: number, target: number) {
  const logs = getJapaLogs();
  if (!logs[mantra]) logs[mantra] = { mantra, total: 0, sessions: [] };
  logs[mantra].total += added;
  logs[mantra].sessions.push({ id: Date.now().toString(), mantra, target, count: added, date: new Date().toISOString(), complete: added >= target });
  localStorage.setItem(JAPA_KEY, JSON.stringify(logs));
  return logs[mantra];
}

export function getSankalpa() { try { return JSON.parse(localStorage.getItem(SANKALPA_KEY) || 'null'); } catch { return null; } }
export function saveSankalpa(data: { name: string; gotra: string; location: string; tithi: string }) { localStorage.setItem(SANKALPA_KEY, JSON.stringify(data)); }
