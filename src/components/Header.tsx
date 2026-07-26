import { useTheme } from '@/components/ThemeProvider';
import { Moon, Sun, Search, Download, Microscope } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getResearchMode, setResearchMode as persistResearchMode } from '@/lib/storage';

interface Props { onSearch: (q: string) => void; searchQuery: string; onInstall?: () => void; canInstall: boolean; }

export function Header({ onSearch, searchQuery, onInstall, canInstall }: Props) {
  const { theme, toggle } = useTheme();
  const [deferred, setDeferred] = useState<any>(null);
  const [researchMode, setResearchMode] = useState(false);
  useEffect(() => { setResearchMode(getResearchMode()); const handler = (e: any) => { e.preventDefault(); setDeferred(e); }; window.addEventListener('beforeinstallprompt', handler); return () => window.removeEventListener('beforeinstallprompt', handler); }, []);
  const install = () => { if (deferred) { deferred.prompt(); deferred.userChoice?.finally(() => setDeferred(null)); } else if (onInstall) onInstall(); };
  const toggleResearch = () => { const next = !researchMode; setResearchMode(next); persistResearchMode(next); };
  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-[var(--bg)]/85 border-b border-soft">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-3">
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-gold to-crimson flex items-center justify-center shadow-glow"><span className="deva text-obsidian font-bold text-lg">ॐ</span></div>
          <div className="hidden sm:block"><h1 className="section-title text-lg leading-none text-accent">AdhyatmaVeda</h1><p className="text-[10px] text-muted leading-tight mt-0.5">Digital Companion for Sanatana Dharma</p></div>
        </div>
        <div className="flex-1 max-w-xl mx-auto"><div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" /><input type="text" value={searchQuery} onChange={(e) => onSearch(e.target.value)} placeholder="Search mantras, texts, deities, lessons…" className="input-field pl-10 text-sm" /></div></div>
        <div className="flex items-center gap-2 shrink-0">
          {researchMode && <span className="chip text-[10px] text-accent border-accent hidden sm:flex">Research Mode</span>}
          <button onClick={toggleResearch} className={`btn-ghost p-2.5 ${researchMode ? 'text-accent' : ''}`} title="Toggle Research Mode" aria-label="Toggle research mode"><Microscope className="h-4 w-4" /></button>
          {canInstall && <button onClick={install} className="btn-ghost px-3 py-2 text-xs flex items-center gap-1.5" title="Install app"><Download className="h-4 w-4" /><span className="hidden sm:inline">Install</span></button>}
          <button onClick={toggle} className="btn-ghost p-2.5" title={theme === 'dark' ? 'Switch to Sattvic Day' : 'Switch to Mantra Night'} aria-label="Toggle theme">{theme === 'dark' ? <Sun className="h-4 w-4 text-gold" /> : <Moon className="h-4 w-4 text-maroon" />}</button>
        </div>
      </div>
    </header>
  );
}
