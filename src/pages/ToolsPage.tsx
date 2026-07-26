import type { View } from '@/types';
import { Bell, Compass, Brain, Mic, ShieldAlert, Gamepad2, ArrowRight } from 'lucide-react';

interface Props { onNavigate: (v: View) => void; }

const TOOLS: { v: View; icon: typeof Bell; title: string; desc: string }[] = [
  { v: 'japa', icon: Bell, title: 'Digital Japa Counter', desc: 'Haptic feedback, progress wheel, lifetime logger, ambient sounds.' },
  { v: 'pathfinder', icon: Compass, title: 'Ishta & Path Finder Quiz', desc: '7-stage evaluation of your spiritual temperament.' },
  { v: 'arena', icon: Gamepad2, title: 'Quiz Arena & Games', desc: 'Trivia, Shakti Peetha matching, and verse assembly puzzles.' },
  { v: 'pronunciation', icon: Mic, title: 'Pronunciation Tutor', desc: 'Sanskrit akshara guide with audio for key sounds and mantras.' },
  { v: 'mythbuster', icon: ShieldAlert, title: 'Myth-Buster Matrix', desc: 'Sourced articles clearing common misconceptions.' },
];

export function ToolsPage({ onNavigate }: Props) {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div><h1 className="section-title text-3xl text-accent mb-2">Tools & Games</h1><p className="text-muted text-sm">Interactive utilities for daily practice and learning.</p></div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{TOOLS.map((t) => { const Icon = t.icon; return (<button key={t.v} onClick={() => onNavigate(t.v)} className="card p-5 text-left hover:border-[var(--accent)] transition-all hover:-translate-y-0.5 group"><div className="h-11 w-11 rounded-xl bg-card2 flex items-center justify-center mb-3 group-hover:shadow-glow transition-shadow"><Icon className="h-5 w-5 text-accent" /></div><h3 className="font-semibold mb-1">{t.title}</h3><p className="text-xs text-muted leading-relaxed mb-3">{t.desc}</p><span className="text-xs text-accent flex items-center gap-1">Open <ArrowRight className="h-3 w-3" /></span></button>); })}</div>
    </div>
  );
}
