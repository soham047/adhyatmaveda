import { useState, useRef } from 'react';
import { Volume2, Mic } from 'lucide-react';

interface Akshara { deva: string; iast: string; type: string; example: string; freq: number; }
const AKSHARAS: Akshara[] = [
  { deva: 'क', iast: 'ka', type: 'Velar stop', example: 'As in "karma"', freq: 220 },
  { deva: 'ख', iast: 'kha', type: 'Aspirated velar', example: 'As in "kha" with a puff of air', freq: 230 },
  { deva: 'ग', iast: 'ga', type: 'Voiced velar', example: 'As in "guru"', freq: 240 },
  { deva: 'ट', iast: 'ṭa', type: 'Retroflex', example: 'Tongue curled back to roof of mouth', freq: 250 },
  { deva: 'त', iast: 'ta', type: 'Dental', example: 'Tongue behind upper teeth', freq: 260 },
  { deva: 'ड', iast: 'ḍa', type: 'Retroflex voiced', example: 'Curl tongue back, voiced', freq: 270 },
  { deva: 'द', iast: 'da', type: 'Dental voiced', example: 'Tongue at teeth, voiced', freq: 280 },
  { deva: 'ण', iast: 'ṇa', type: 'Retroflex nasal', example: 'As in "Na" with tongue curled', freq: 290 },
  { deva: 'न', iast: 'na', type: 'Dental nasal', example: 'As in "nama"', freq: 300 },
  { deva: 'श', iast: 'śa', type: 'Palatal sibilant', example: 'As in "Shiva" (śiva)', freq: 310 },
  { deva: 'ष', iast: 'ṣa', type: 'Retroflex sibilant', example: 'As in "Krishna" (kṛṣṇa)', freq: 320 },
  { deva: 'स', iast: 'sa', type: 'Dental sibilant', example: 'As in "sattva"', freq: 330 },
];

interface MantraGuide { name: string; sanskrit: string; iast: string; rhythm: string; }
const MANTRA_GUIDES: MantraGuide[] = [
  { name: 'Maha Mrityunjaya', sanskrit: 'ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्', iast: 'Om tryambakaṃ yajāmahe sugandhiṃ puṣṭivardhanam', rhythm: 'Om — tryam — ba — kam — ya — jaa — ma — he — su — gand — him — push — ti — var — dha — nam' },
  { name: 'Gayatri', sanskrit: 'ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं', iast: 'Om bhūrbhuvaḥ svaḥ tatsaviturvarṇyaṃ', rhythm: 'Om — bhur — bhu — vah — svah — tat — sa — vi — tur — va — re — nyam' },
  { name: 'Panchakshari', sanskrit: 'ॐ नमः शिवाय', iast: 'Om namaḥ śivāya', rhythm: 'Om — na — mah — shi — vaa — ya' },
];

export function PronunciationPage() {
  const [playing, setPlaying] = useState<string | null>(null);
  const ctxRef = useRef<AudioContext | null>(null);
  const playTone = (freq: number, id: string) => { try { if (!ctxRef.current) ctxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)(); const ctx = ctxRef.current; const osc = ctx.createOscillator(); const gain = ctx.createGain(); osc.connect(gain); gain.connect(ctx.destination); osc.frequency.value = freq; gain.gain.setValueAtTime(0.15, ctx.currentTime); gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8); osc.start(); osc.stop(ctx.currentTime + 0.8); setPlaying(id); setTimeout(() => setPlaying(null), 800); } catch {} };
  return (
    <div className="space-y-6 animate-fadeIn">
      <div><h1 className="section-title text-3xl text-accent mb-2">Pronunciation & Sanskrit Akshara Tutor</h1><p className="text-muted text-sm">Tap each letter to hear its pitch. Learn the difference between retroflex, dental, and aspirated sounds.</p></div>
      <section className="card p-5"><h2 className="section-title text-lg text-accent mb-4">Key Sanskrit Letters</h2><div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">{AKSHARAS.map((a) => (<button key={a.deva} onClick={() => playTone(a.freq, a.deva)} className={`card-2 p-4 text-center hover:border-[var(--accent)] transition-all ${playing === a.deva ? 'border-[var(--accent)] shadow-glow' : ''}`}><p className="deva text-3xl mb-1">{a.deva}</p><p className="iast text-sm text-accent">{a.iast}</p><p className="text-[10px] text-muted mt-1">{a.type}</p><p className="text-[10px] text-muted">{a.example}</p><Volume2 className={`h-3.5 w-3.5 mx-auto mt-2 ${playing === a.deva ? 'text-gold' : 'text-muted'}`} /></button>))}</div></section>
      <section className="card p-5"><h2 className="section-title text-lg text-accent mb-3">Retroflex vs. Dental</h2><p className="text-sm text-muted leading-relaxed mb-3">Sanskrit distinguishes between <span className="text-accent">retroflex</span> sounds (tongue curled back to the roof of the mouth) and <span className="text-accent">dental</span> sounds (tongue behind the upper teeth). This distinction is crucial for correct mantra pronunciation.</p><div className="grid sm:grid-cols-2 gap-3"><div className="card-2 p-4"><h3 className="font-semibold text-sm mb-2">Retroflex (ṭ, ṭh, ḍ, ḍh, ṇ, ṣ)</h3><p className="text-xs text-muted">Curl the tongue back so the tip touches the roof of the mouth, behind the alveolar ridge. Example: "ṣ" in "kṛṣṇa" (Krishna).</p></div><div className="card-2 p-4"><h3 className="font-semibold text-sm mb-2">Dental (t, th, d, dh, n, s)</h3><p className="text-xs text-muted">Place the tongue tip against the back of the upper teeth. Example: "n" in "namaḥ" (namah).</p></div></div></section>
      <section className="card p-5"><h2 className="section-title text-lg text-accent mb-4">Mantra Rhythm Guides</h2><div className="space-y-4">{MANTRA_GUIDES.map((m) => (<div key={m.name} className="card-2 p-4"><div className="flex items-center gap-2 mb-2"><Mic className="h-4 w-4 text-accent" /><h3 className="font-semibold text-sm">{m.name}</h3></div><p className="deva text-lg mb-1">{m.sanskrit}</p><p className="iast text-sm text-accent mb-2">{m.iast}</p><div className="bg-[var(--bg)] rounded-lg p-2 border border-soft"><p className="text-xs text-muted mb-1">Syllable breakdown:</p><p className="text-sm">{m.rhythm}</p></div></div>))}</div></section>
    </div>
  );
}
