import type { JapaLog, JournalEntry, SadhanaRoutine } from '@/types';

const THEME_KEY = 'av-theme';
const JAPA_KEY = 'av-japa-logs';
const SANKALPA_KEY = 'av-sankalpa';
const JOURNAL_KEY = 'av-journal';
const SADHANA_KEY = 'av-sadhana';
const LESSON_KEY = 'av-lessons';
const STREAK_KEY = 'av-streak';
const RESEARCH_KEY = 'av-research-mode';
const HISTORY_KEY = 'av-history';
const FAV_DEITY_KEY = 'av-fav-deities';
const FAV_MANTRA_KEY = 'av-fav-mantras';

export function getTheme(): 'dark' | 'light' { if (typeof window === 'undefined') return 'dark'; return (localStorage.getItem(THEME_KEY) as 'dark' | 'light') || 'dark'; }
export function setTheme(theme: 'dark' | 'light') { localStorage.setItem(THEME_KEY, theme); if (theme === 'light') { document.documentElement.classList.add('light'); document.documentElement.classList.remove('dark'); } else { document.documentElement.classList.add('dark'); document.documentElement.classList.remove('light'); } const meta = document.querySelector('meta[name="theme-color"]'); if (meta) meta.setAttribute('content', theme === 'light' ? '#FDFBF7' : '#0A0B0E'); }
export function initTheme() { setTheme(getTheme()); }

export function getJapaLogs(): Record<string, JapaLog> { try { return JSON.parse(localStorage.getItem(JAPA_KEY) || '{}'); } catch { return {}; } }
export function saveJapaLog(mantra: string, added: number, target: number) { const logs = getJapaLogs(); if (!logs[mantra]) logs[mantra] = { mantra, total: 0, sessions: [] }; logs[mantra].total += added; logs[mantra].sessions.push({ id: Date.now().toString(), mantra, target, count: added, date: new Date().toISOString(), complete: added >= target }); localStorage.setItem(JAPA_KEY, JSON.stringify(logs)); return logs[mantra]; }

export function getSankalpa() { try { return JSON.parse(localStorage.getItem(SANKALPA_KEY) || 'null'); } catch { return null; } }
export function saveSankalpa(data: { name: string; gotra: string; location: string; tithi: string }) { localStorage.setItem(SANKALPA_KEY, JSON.stringify(data)); }

export function getJournal(): JournalEntry[] { try { return JSON.parse(localStorage.getItem(JOURNAL_KEY) || '[]'); } catch { return []; } }
export function saveJournalEntry(entry: JournalEntry) { const entries = getJournal(); const existing = entries.findIndex(e => e.id === entry.id); if (existing >= 0) entries[existing] = entry; else entries.unshift(entry); localStorage.setItem(JOURNAL_KEY, JSON.stringify(entries)); return entries; }
export function deleteJournalEntry(id: string) { const entries = getJournal().filter(e => e.id !== id); localStorage.setItem(JOURNAL_KEY, JSON.stringify(entries)); return entries; }

export function getSadhana(): SadhanaRoutine | null { try { return JSON.parse(localStorage.getItem(SADHANA_KEY) || 'null'); } catch { return null; } }
export function saveSadhana(routine: SadhanaRoutine) { localStorage.setItem(SADHANA_KEY, JSON.stringify(routine)); }

export function getCompletedLessons(): string[] { try { return JSON.parse(localStorage.getItem(LESSON_KEY) || '[]'); } catch { return []; } }
export function toggleLessonComplete(id: string) { const completed = getCompletedLessons(); const idx = completed.indexOf(id); if (idx >= 0) completed.splice(idx, 1); else completed.push(id); localStorage.setItem(LESSON_KEY, JSON.stringify(completed)); return completed; }

export function getStreak(): { count: number; lastDate: string } { try { return JSON.parse(localStorage.getItem(STREAK_KEY) || '{"count":0,"lastDate":""}'); } catch { return { count: 0, lastDate: '' }; } }
export function updateStreak(): { count: number; lastDate: string } { const streak = getStreak(); const today = new Date().toDateString(); if (streak.lastDate === today) return streak; const yesterday = new Date(Date.now() - 86400000).toDateString(); if (streak.lastDate === yesterday) streak.count += 1; else streak.count = 1; streak.lastDate = today; localStorage.setItem(STREAK_KEY, JSON.stringify(streak)); return streak; }

export function getResearchMode(): boolean { return localStorage.getItem(RESEARCH_KEY) === 'true'; }
export function setResearchMode(on: boolean) { localStorage.setItem(RESEARCH_KEY, on ? 'true' : 'false'); }

export function getHistory(): string[] { try { return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]'); } catch { return []; } }
export function addToHistory(item: string) { const history = getHistory().filter(h => h !== item); history.unshift(item); localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, 20))); }

export function getFavDeities(): string[] { try { return JSON.parse(localStorage.getItem(FAV_DEITY_KEY) || '[]'); } catch { return []; } }
export function toggleFavDeity(id: string) { const favs = getFavDeities(); const idx = favs.indexOf(id); if (idx >= 0) favs.splice(idx, 1); else favs.push(id); localStorage.setItem(FAV_DEITY_KEY, JSON.stringify(favs)); return favs; }

export function getFavMantras(): string[] { try { return JSON.parse(localStorage.getItem(FAV_MANTRA_KEY) || '[]'); } catch { return []; } }
export function toggleFavMantra(id: string) { const favs = getFavMantras(); const idx = favs.indexOf(id); if (idx >= 0) favs.splice(idx, 1); else favs.push(id); localStorage.setItem(FAV_MANTRA_KEY, JSON.stringify(favs)); return favs; }
