import { Home, BookOpen, Shield, Library, Wrench } from 'lucide-react';
import type { View } from '@/types';

interface NavItem { id: View; label: string; icon: typeof Home; }
const NAV: NavItem[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'knowledge', label: 'Knowledge', icon: BookOpen },
  { id: 'upasana', label: 'Upasana', icon: Shield },
  { id: 'library', label: 'Library', icon: Library },
  { id: 'tools', label: 'Tools', icon: Wrench },
];

export function Sidebar({ view, onNavigate }: { view: View; onNavigate: (v: View) => void }) {
  return (
    <nav className="hidden lg:flex flex-col gap-1 w-60 shrink-0 sticky top-[65px] h-[calc(100vh-65px)] p-4 border-r border-soft overflow-y-auto no-scrollbar">
      {NAV.map((item) => { const Icon = item.icon; const active = view === item.id; return (
        <button key={item.id} onClick={() => onNavigate(item.id)} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${active ? 'bg-card2 text-accent border border-soft' : 'text-muted hover:text-[var(--text)] hover:bg-card2/50'}`}><Icon className={`h-4.5 w-4.5 ${active ? 'text-accent' : ''}`} />{item.label}</button>
      ); })}
      <div className="mt-auto p-3 rounded-xl bg-card2 border border-soft"><p className="text-[11px] text-muted leading-relaxed"><span className="text-accent font-semibold">AdhyatmaVeda</span> is a study and devotional aid. Always consult a qualified Guru for practices marked <span className="text-red-400">red</span>.</p></div>
    </nav>
  );
}

export function BottomNav({ view, onNavigate }: { view: View; onNavigate: (v: View) => void }) {
  return (
    <nav className="lg:hidden fixed bottom-0 inset-x-0 z-40 backdrop-blur-xl bg-[var(--bg)]/90 border-t border-soft safe-bottom">
      <div className="flex items-stretch justify-around px-1 py-1">
        {NAV.map((item) => { const Icon = item.icon; const active = view === item.id; return (
          <button key={item.id} onClick={() => onNavigate(item.id)} className={`flex flex-col items-center gap-0.5 px-2 py-1.5 rounded-lg flex-1 transition-colors ${active ? 'text-accent' : 'text-muted'}`}><Icon className={`h-5 w-5 ${active ? 'scale-110' : ''} transition-transform`} /><span className="text-[10px] font-medium">{item.label}</span></button>
        ); })}
      </div>
    </nav>
  );
}
