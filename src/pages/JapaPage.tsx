import { useState, useEffect, useRef } from 'react';
import { MANTRAS } from '@/data/content';
import { getJapaLogs, saveJapaLog } from '@/lib/storage';
import type { JapaLog } from '@/types';
import { Bell, Volume2, VolumeX, RotateCcw, History, Music } from 'lucide-react';

const TARGETS = [11, 21, 108, 1000, 125000];
const AMBIENT = [{ id: 'none', label: 'None' },{ id: 'tanpura', label: 'Tanpura (C#)' },{ id: 'om', label: 'Om Drone' },{ id: 'river', label: 'River Flow' },{ id: 'bell', label: 'Temple Bell' }];

export function JapaPage() {
  const [selectedMantra, setSelectedMantra] = useState(MANTRAS[0]);
  const [target, setTarget] = useState(108);
  const [customTarget, setCustomTarget] = useState('');
  const [count, setCount] = useState(0);
  const [bellOn, setBellOn] = useState(true);
  const [ambient, setAmbient] = useState('none');
  const [logs, setLogs] = useState<Record<string, JapaLog>>({});
  const [showHistory, setShowHistory] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  useEffect(() => { setLogs(getJapaLogs()); }, []);
  const activeTarget = customTarget ? parseInt(customTarget) || target : target;
  const progress = Math.min((count / activeTarget) * 100, 100);
  const isComplete = count >= activeTarget;
  const playBell = () => { try { if (!audioCtxRef.current) audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)(); const ctx = audioCtxRef.current; const osc = ctx.createOscillator(); const gain = ctx.createGain(); osc.connect(gain); gain.connect(ctx.destination); osc.frequency.setValueAtTime(1320, ctx.currentTime); osc.frequency.exponentialRampToValueAtTime(660, ctx.currentTime + 1.2); gain.gain.setValueAtTime(0.25, ctx.currentTime); gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.8); osc.start(); osc.stop(ctx.currentTime + 1.8); } catch {} };
  const playAmbient = () => { if (ambient === 'none') return; try { if (!audioCtxRef.current) audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)(); const ctx = audioCtxRef.current; const freqs: Record<string, number> = { tanpura: 138.59, om: 110, river: 220, bell: 880 }; const osc = ctx.createOscillator(); const gain = ctx.createGain(); osc.connect(gain); gain.connect(ctx.destination); osc.type = ambient === 'river' ? 'sawtooth' : 'sine'; osc.frequency.value = freqs[ambient] || 220; gain.gain.setValueAtTime(0, ctx.currentTime); gain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 0.5); gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 3); osc.start(); osc.stop(ctx.currentTime + 3); } catch {} };
  const tap = () => { if (navigator.vibrate) navigator.vibrate(30); const newCount = count + 1; setCount(newCount); if (newCount === activeTarget && bellOn) { playBell(); if (navigator.vibrate) navigator.vibrate([100, 50, 100]); } };
  const reset = () => { if (count > 0) { const updated = saveJapaLog(selectedMantra.sanskrit, count, activeTarget); setLogs((prev) => ({ ...prev, [selectedMantra.sanskrit]: updated })); } setCount(0); };
  const saveAndReset = () => { if (count > 0) { const updated = saveJapaLog(selectedMantra.sanskrit, count, activeTarget); setLogs((prev) => ({ ...prev, [selectedMantra.sanskrit]: updated })); } setCount(0); };
  const circumference = 2 * Math.PI * 90;
  const dashOffset = circumference - (progress / 100) * circumference;
  return (
    <div className="space-y-6 animate-fadeIn">
      <div><h1 className="section-title text-3xl text-accent mb-2">Digital Japa Counter</h1><p className="text-muted text-sm">Tap to count. Haptic feedback, progress tracking, and lifetime logging.</p></div>
      <div className="card p-4"><label className="text-xs text-muted block mb-2">Select Mantra</label><div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">{MANTRAS.map((m) => (<button key={m.id} onClick={() => { setSelectedMantra(m); setCount(0); }} className={`chip whitespace-nowrap ${selectedMantra.id === m.id ? 'chip-active' : ''}`}>{m.deity}</button>))}</div><div className="mt-3 card-2 p-3"><p className="deva text-lg">{selectedMantra.sanskrit}</p><p className="iast text-sm text-accent">{selectedMantra.iast}</p><p className="text-xs text-muted">{selectedMantra.english}</p></div></div>
      <div className="card p-4"><label className="text-xs text-muted block mb-2">Target Count</label><div className="flex flex-wrap gap-2 items-center">{TARGETS.map((t) => (<button key={t} onClick={() => { setTarget(t); setCustomTarget(''); setCount(0); }} className={`chip ${target === t && !customTarget ? 'chip-active' : ''}`}>{t === 125000 ? 'Savalakh (125k)' : t}</button>))}<input type="number" value={customTarget} onChange={(e) => { setCustomTarget(e.target.value); setCount(0); }} placeholder="Custom" className="input-field w-24 text-sm py-1.5" /></div></div>
      <div className="card p-8 flex flex-col items-center"><div className="relative w-56 h-56 mb-6"><svg className="w-full h-full -rotate-90" viewBox="0 0 200 200"><circle cx="100" cy="100" r="90" fill="none" stroke="var(--border)" strokeWidth="8" /><circle cx="100" cy="100" r="90" fill="none" stroke="var(--accent)" strokeWidth="8" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={dashOffset} className="transition-all duration-300" style={{ filter: 'drop-shadow(0 0 6px var(--accent))' }} /></svg><div className="absolute inset-0 flex flex-col items-center justify-center"><span className="text-5xl font-bold text-accent">{count}</span><span className="text-sm text-muted">/ {activeTarget.toLocaleString()}</span><span className="text-xs text-accent mt-1">{progress.toFixed(1)}%</span></div></div><button onClick={tap} className={`w-32 h-32 rounded-full btn-primary text-lg font-semibold shadow-glow active:scale-95 transition-transform ${isComplete ? 'animate-pulseGlow' : ''}`}>Tap</button><div className="flex items-center gap-3 mt-6"><button onClick={reset} className="btn-ghost px-4 py-2 text-sm flex items-center gap-1.5"><RotateCcw className="h-4 w-4" /> Reset</button><button onClick={() => setBellOn(!bellOn)} className="btn-ghost px-4 py-2 text-sm flex items-center gap-1.5">{bellOn ? <Volume2 className="h-4 w-4 text-gold" /> : <VolumeX className="h-4 w-4" />}Bell</button><button onClick={saveAndReset} className="btn-ghost px-4 py-2 text-sm flex items-center gap-1.5"><History className="h-4 w-4" /> Save</button></div></div>
      <div className="card p-4"><label className="text-xs text-muted block mb-2 flex items-center gap-1.5"><Music className="h-3.5 w-3.5" /> Ambient Sound</label><div className="flex flex-wrap gap-2">{AMBIENT.map((a) => (<button key={a.id} onClick={() => { setAmbient(a.id); if (a.id !== 'none') playAmbient(); }} className={`chip ${ambient === a.id ? 'chip-active' : ''}`}>{a.label}</button>))}</div></div>
      <div className="card p-5"><button onClick={() => setShowHistory(!showHistory)} className="flex items-center justify-between w-full"><h2 className="section-title text-lg text-accent flex items-center gap-2"><History className="h-4 w-4" /> Lifetime Repetitions</h2><span className="text-xs text-muted">{showHistory ? 'Hide' : 'Show'}</span></button>{showHistory && (<div className="mt-4 space-y-2">{Object.values(logs).length === 0 ? (<p className="text-sm text-muted">No repetitions logged yet. Start tapping and save your session.</p>) : (Object.values(logs).map((log) => (<div key={log.mantra} className="card-2 p-3 flex items-center justify-between"><span className="deva text-sm">{log.mantra}</span><span className="text-accent font-semibold text-sm">{log.total.toLocaleString()}</span></div>)))}</div>)}</div>
    </div>
  );
}
