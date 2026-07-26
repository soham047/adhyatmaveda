import { DAILY_VERSES, MANTRAS } from '@/data/content';
import { calculatePanchang, UPCOMING_FESTIVALS, NITYA_SCHEDULE, DAILY_QUOTES } from '@/data/newcontent';
import { getStreak, getFavDeities, getFavMantras, getHistory, updateStreak, addToHistory } from '@/lib/storage';
import { Sun, Moon, Calendar, Sparkles, ArrowRight, Bell, BookOpen, Shield, Library, Wrench, Flame, Clock, Star, History, ChevronRight, Quote } from 'lucide-react';
import { useMemo, useState, useEffect } from 'react';
import type { View } from '@/types';

interface Props { onNavigate: (v: View) => void; }

export function HomePage({ onNavigate }: Props) {
  const verse = useMemo(() => DAILY_VERSES[new Date().getDate() % DAILY_VERSES.length], []);
  const quote = useMemo(() => DAILY_QUOTES[new Date().getDate() % DAILY_QUOTES.length], []);
  const panchang = useMemo(() => calculatePanchang(), []);
  const [bellActive, setBellActive] = useState(false);
  const [streak, setStreak] = useState({ count: 0, lastDate: '' });
  const [favDeities, setFavDeities] = useState<string[]>([]);
  const [favMantras, setFavMantras] = useState<string[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  useEffect(() => { setStreak(updateStreak()); setFavDeities(getFavDeities()); setFavMantras(getFavMantras()); setHistory(getHistory()); addToHistory('Home'); }, []);
  const playBell = () => { setBellActive(true); try { const ctx = new (window.AudioContext || (window as any).webkitAudioContext)(); const osc = ctx.createOscillator(); const gain = ctx.createGain(); osc.connect(gain); gain.connect(ctx.destination); osc.frequency.setValueAtTime(880, ctx.currentTime); osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 1.5); gain.gain.setValueAtTime(0.3, ctx.currentTime); gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2); osc.start(); osc.stop(ctx.currentTime + 2); } catch {} setTimeout(() => setBellActive(false), 2000); };
  const quickLinks: { v: View; icon: typeof Bell; title: string; desc: string }[] = [
    { v: 'beginner', icon: BookOpen, title: "Beginner's Path", desc: 'Guided lessons from Day 1' },
    { v: 'sadhana-builder', icon: Sparkles, title: 'Build My Sadhana', desc: 'AI-guided routine builder' },
    { v: 'pathfinder', icon: ArrowRight, title: 'Path Discovery', desc: '40-question assessment' },
    { v: 'mahavidya', icon: Moon, title: 'Mahavidya Portal', desc: '10 great wisdom goddesses' },
    { v: 'journal', icon: BookOpen, title: 'Sadhana Journal', desc: 'Daily reflection & tracking' },
    { v: 'puja-guides', icon: Shield, title: 'Puja Guides', desc: 'Step-by-step home worship' },
    { v: 'knowledge', icon: Library, title: 'Knowledge Hub', desc: 'Deities, traditions & folk lore' },
    { v: 'library', icon: BookOpen, title: 'Scripture Library', desc: '90+ texts with translations' },
  ];
  return (
    <div className="space-y-6 animate-fadeIn">
      <section className="relative overflow-hidden card p-6 sm:p-10">
        <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-gold/10 blur-3xl" /><div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-crimson/10 blur-3xl" /><div className="relative">
          <div className="inline-flex items-center gap-2 chip mb-4"><Sparkles className="h-3.5 w-3.5 text-gold" /><span>The Complete Digital Companion for Sanatana Dharma</span></div>
          <h1 className="section-title text-3xl sm:text-5xl text-accent leading-tight mb-3">Your spiritual operating system</h1>
          <p className="text-muted max-w-2xl leading-relaxed mb-6">A guided journey for beginners and a research database for scholars. Safe practices, a 90-text library, interactive tools, and a respectful archive of regional folk traditions — all in one place.</p>
          <div className="flex flex-wrap gap-3"><button onClick={() => onNavigate('beginner')} className="btn-primary px-5 py-2.5 text-sm flex items-center gap-2">Start as Beginner <ArrowRight className="h-4 w-4" /></button><button onClick={() => onNavigate('japa')} className="btn-ghost px-5 py-2.5 text-sm flex items-center gap-2"><Bell className="h-4 w-4" /> Quick Japa</button><button onClick={() => onNavigate('sadhana-builder')} className="btn-ghost px-5 py-2.5 text-sm flex items-center gap-2"><Sparkles className="h-4 w-4" /> Build My Sadhana</button></div>
        </div>
      </section>
      <div className="grid md:grid-cols-3 gap-4">
        <section className="card p-6 md:col-span-2"><div className="flex items-center gap-2 mb-4"><Calendar className="h-4 w-4 text-gold" /><h2 className="text-sm font-semibold text-accent uppercase tracking-wide">Today's Panchang</h2></div><div className="grid grid-cols-2 sm:grid-cols-3 gap-3">{[{ label: 'Tithi', value: panchang.tithi },{ label: 'Paksha', value: panchang.paksha },{ label: 'Nakshatra', value: panchang.nakshatra },{ label: 'Yoga', value: panchang.yoga },{ label: 'Karana', value: panchang.karana },{ label: 'Moon Phase', value: panchang.moonPhase },{ label: 'Sunrise', value: panchang.sunrise },{ label: 'Sunset', value: panchang.sunset },{ label: 'Month', value: panchang.month },{ label: 'Ritu', value: panchang.ritu },{ label: 'Samvatsara', value: panchang.samvatsara }].map((item) => (<div key={item.label} className="card-2 p-3"><p className="text-[10px] text-muted uppercase tracking-wide">{item.label}</p><p className="text-sm font-medium mt-0.5">{item.value}</p></div>))}</div></section>
        <section className="card p-6"><div className="flex items-center gap-2 mb-4"><Flame className="h-4 w-4 text-gold" /><h2 className="text-sm font-semibold text-accent uppercase tracking-wide">Your Progress</h2></div><div className="space-y-4"><div className="text-center py-3"><div className="text-4xl font-bold text-accent">{streak.count}</div><p className="text-xs text-muted mt-1">Day Streak</p></div><div className="card-2 p-3"><p className="text-xs text-muted mb-1">Favourite Deities</p><p className="text-sm font-medium">{favDeities.length || 'None yet'}</p></div><div className="card-2 p-3"><p className="text-xs text-muted mb-1">Favourite Mantras</p><p className="text-sm font-medium">{favMantras.length || 'None yet'}</p></div><button onClick={playBell} className="btn-ghost w-full mt-2 py-2 text-sm flex items-center justify-center gap-2"><Bell className={`h-4 w-4 ${bellActive ? 'text-gold animate-pulseGlow' : ''}`} />Ring Temple Bell</button></div></section>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <section className="card p-6"><div className="flex items-center gap-2 mb-4"><Moon className="h-4 w-4 text-gold" /><h2 className="text-sm font-semibold text-accent uppercase tracking-wide">Daily Shloka</h2></div><p className="deva text-2xl text-[var(--text)] leading-relaxed mb-3">{verse.sanskrit}</p><p className="iast text-lg text-accent mb-2">{verse.iast}</p><p className="text-muted leading-relaxed mb-3">{verse.english}</p><p className="text-xs text-muted italic">— {verse.source}</p></section>
        <section className="card p-6"><div className="flex items-center gap-2 mb-4"><Quote className="h-4 w-4 text-gold" /><h2 className="text-sm font-semibold text-accent uppercase tracking-wide">Daily Inspiration</h2></div><p className="text-lg leading-relaxed text-[var(--text)] italic mb-3">{quote}</p><div className="mt-auto"><p className="text-xs text-muted">Today's Recommended Practice:</p><p className="text-sm text-accent mt-1">Morning japa of your chosen mantra (108 repetitions)</p></div></section>
      </div>
      <section><h2 className="section-title text-xl text-accent mb-4">Quick Access</h2><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">{quickLinks.map((card) => { const Icon = card.icon; return (<button key={card.v} onClick={() => onNavigate(card.v)} className="card p-5 text-left hover:border-[var(--accent)] transition-all hover:-translate-y-0.5 group"><div className="h-10 w-10 rounded-xl bg-card2 flex items-center justify-center mb-3 group-hover:shadow-glow transition-shadow"><Icon className="h-5 w-5 text-accent" /></div><h3 className="font-semibold mb-1">{card.title}</h3><p className="text-xs text-muted leading-relaxed">{card.desc}</p></button>); })}</div></section>
      <div className="grid md:grid-cols-2 gap-4">
        <section className="card p-6"><div className="flex items-center gap-2 mb-4"><Clock className="h-4 w-4 text-gold" /><h2 className="text-sm font-semibold text-accent uppercase tracking-wide">Today's Nitya Schedule</h2></div><div className="space-y-2">{NITYA_SCHEDULE.map((item, i) => (<div key={i} className="flex items-center gap-3 card-2 p-3"><span className="text-xs text-accent font-mono w-20 shrink-0">{item.time}</span><span className="text-sm">{item.activity}</span></div>))}</div></section>
        <section className="card p-6"><div className="flex items-center gap-2 mb-4"><Calendar className="h-4 w-4 text-gold" /><h2 className="text-sm font-semibold text-accent uppercase tracking-wide">Upcoming Festivals</h2></div><div className="space-y-3">{UPCOMING_FESTIVALS.map((f, i) => (<div key={i} className="card-2 p-3"><div className="flex items-center justify-between mb-1"><h3 className="font-semibold text-sm">{f.name}</h3><span className="text-xs text-accent">{f.date}</span></div><p className="text-xs text-muted">{f.desc}</p></div>))}</div></section>
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <section className="card p-6"><div className="flex items-center gap-2 mb-4"><History className="h-4 w-4 text-gold" /><h2 className="text-sm font-semibold text-accent uppercase tracking-wide">Recent History</h2></div>{history.length === 0 ? (<p className="text-sm text-muted">No recent activity. Start exploring!</p>) : (<div className="space-y-2">{history.slice(0, 6).map((h, i) => (<div key={i} className="card-2 p-2.5 text-sm flex items-center gap-2"><ChevronRight className="h-3 w-3 text-muted" /> {h}</div>))}</div>)}</section>
        <section className="card p-6"><div className="flex items-center gap-2 mb-4"><Star className="h-4 w-4 text-gold" /><h2 className="text-sm font-semibold text-accent uppercase tracking-wide">Begin with a Safe Mantra</h2></div><div className="space-y-2">{MANTRAS.filter((m) => m.safety === 'green').slice(0, 4).map((m) => (<button key={m.id} onClick={() => onNavigate('japa')} className="card-2 p-3 text-left w-full hover:border-[var(--accent)] transition-all"><p className="deva text-base mb-0.5">{m.sanskrit}</p><p className="iast text-xs text-accent">{m.iast}</p></button>))}</div></section>
      </div>
    </div>
  );
}
