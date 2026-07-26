import { DAILY_VERSES, MANTRAS } from '@/data/content';
import { Sun, Moon, Calendar, Sparkles, ArrowRight, Bell, BookOpen as BookOpenIcon, Shield as ShieldIcon, Library as LibraryIcon, Wrench as WrenchIcon } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { View } from '@/types';

function getTithi() { const now = new Date(); const day = now.toLocaleDateString('en-US', { weekday: 'long' }); const date = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric' }); const paksha = now.getDate() <= 15 ? 'Shukla Paksha' : 'Krishna Paksha'; return { day, date, paksha }; }

interface Props { onNavigate: (v: View) => void; }

export function HomePage({ onNavigate }: Props) {
  const verse = useMemo(() => { const idx = new Date().getDate() % DAILY_VERSES.length; return DAILY_VERSES[idx]; }, []);
  const tithi = useMemo(() => getTithi(), []);
  const [bellActive, setBellActive] = useState(false);
  const playBell = () => { setBellActive(true); try { const ctx = new (window.AudioContext || (window as any).webkitAudioContext)(); const osc = ctx.createOscillator(); const gain = ctx.createGain(); osc.connect(gain); gain.connect(ctx.destination); osc.frequency.setValueAtTime(880, ctx.currentTime); osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 1.5); gain.gain.setValueAtTime(0.3, ctx.currentTime); gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2); osc.start(); osc.stop(ctx.currentTime + 2); } catch {} setTimeout(() => setBellActive(false), 2000); };
  return (
    <div className="space-y-6 animate-fadeIn">
      <section className="relative overflow-hidden card p-6 sm:p-10">
        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-gold/10 blur-3xl" /><div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-crimson/10 blur-3xl" />
        <div className="relative">
          <div className="inline-flex items-center gap-2 chip mb-4"><Sparkles className="h-3.5 w-3.5 text-gold" /><span>The One-Stop Sadhana Junction</span></div>
          <h1 className="section-title text-3xl sm:text-5xl text-accent leading-tight mb-3">Sanatana Dharma, Tantra & Folk Traditions — in one place</h1>
          <p className="text-muted max-w-2xl leading-relaxed mb-6">A research-backed companion for both the beginner aspirant and the academic explorer. Safe home practices, a 90-text scriptural library, interactive tools, and a respectful archive of regional folk traditions.</p>
          <div className="flex flex-wrap gap-3"><button onClick={() => onNavigate('pathfinder')} className="btn-primary px-5 py-2.5 text-sm flex items-center gap-2">Find Your Path <ArrowRight className="h-4 w-4" /></button><button onClick={() => onNavigate('japa')} className="btn-ghost px-5 py-2.5 text-sm flex items-center gap-2"><Bell className="h-4 w-4" /> Quick Japa</button><button onClick={() => onNavigate('library')} className="btn-ghost px-5 py-2.5 text-sm">Open Library</button></div>
        </div>
      </section>
      <div className="grid md:grid-cols-3 gap-4">
        <section className="card p-6 md:col-span-2"><div className="flex items-center gap-2 mb-4"><Moon className="h-4 w-4 text-gold" /><h2 className="text-sm font-semibold text-accent uppercase tracking-wide">Verse of the Day</h2></div><p className="deva text-2xl text-[var(--text)] leading-relaxed mb-3">{verse.sanskrit}</p><p className="iast text-lg text-accent mb-2">{verse.iast}</p><p className="text-muted leading-relaxed mb-3">{verse.english}</p><p className="text-xs text-muted italic">— {verse.source}</p></section>
        <section className="card p-6"><div className="flex items-center gap-2 mb-4"><Calendar className="h-4 w-4 text-gold" /><h2 className="text-sm font-semibold text-accent uppercase tracking-wide">Today</h2></div><div className="space-y-3"><div><p className="text-xs text-muted">Day</p><p className="text-lg font-medium">{tithi.day}</p></div><div><p className="text-xs text-muted">Date</p><p className="text-lg font-medium">{tithi.date}</p></div><div><p className="text-xs text-muted">Paksha (approx.)</p><p className="text-lg font-medium">{tithi.paksha}</p></div><button onClick={playBell} className="btn-ghost w-full mt-2 py-2 text-sm flex items-center justify-center gap-2"><Bell className={`h-4 w-4 ${bellActive ? 'text-gold animate-pulseGlow' : ''}`} />Ring Temple Bell</button></div></section>
      </div>
      <section><h2 className="section-title text-xl text-accent mb-4">Quick Access</h2><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">{[{ v: 'knowledge' as View, icon: BookOpenIcon, title: 'Knowledge Hub', desc: 'Vaishnava, Shaiva, Shakta & Folk traditions' },{ v: 'upasana' as View, icon: ShieldIcon, title: 'Upasana Vault', desc: 'Safe home practices & guidance' },{ v: 'library' as View, icon: LibraryIcon, title: '90-Text Library', desc: 'Scriptures with translations' },{ v: 'tools' as View, icon: WrenchIcon, title: 'Tools & Games', desc: 'Japa, quizzes, pronunciation' }].map((card) => { const Icon = card.icon; return (<button key={card.v} onClick={() => onNavigate(card.v)} className="card p-5 text-left hover:border-[var(--accent)] transition-all hover:-translate-y-0.5 group"><div className="h-10 w-10 rounded-xl bg-card2 flex items-center justify-center mb-3 group-hover:shadow-glow transition-shadow"><Icon className="h-5 w-5 text-accent" /></div><h3 className="font-semibold mb-1">{card.title}</h3><p className="text-xs text-muted leading-relaxed">{card.desc}</p></button>); })}</div></section>
      <section><h2 className="section-title text-xl text-accent mb-4">Begin with a Safe Mantra</h2><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">{MANTRAS.filter((m) => m.safety === 'green').slice(0, 4).map((m) => (<button key={m.id} onClick={() => onNavigate('japa')} className="card p-4 text-left hover:border-[var(--accent)] transition-all"><p className="deva text-lg mb-1">{m.sanskrit}</p><p className="iast text-sm text-accent mb-1">{m.iast}</p><p className="text-xs text-muted">{m.english}</p></button>))}</div></section>
    </div>
  );
}
