import { useState } from 'react';
import { MYTH_ARTICLES } from '@/data/content';
import { ShieldAlert, ChevronDown, BookOpen } from 'lucide-react';

export function MythBusterPage() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <div className="space-y-6 animate-fadeIn">
      <div><h1 className="section-title text-3xl text-accent mb-2">Myth-Buster & Research Matrix</h1><p className="text-muted text-sm">Sourced articles dismantling common misconceptions about Tantra, Diksha, Kundalini, and more.</p></div>
      <div className="space-y-3">{MYTH_ARTICLES.map((a) => { const isOpen = open === a.id; return (<div key={a.id} className="card overflow-hidden"><button onClick={() => setOpen(isOpen ? null : a.id)} className="w-full p-5 text-left flex items-start gap-3 hover:bg-card2/50 transition-colors"><div className="h-10 w-10 rounded-xl bg-red-500/15 flex items-center justify-center shrink-0"><ShieldAlert className="h-5 w-5 text-red-400" /></div><div className="flex-1 min-w-0"><span className="chip text-[10px] mb-1.5">{a.category}</span><h3 className="font-semibold text-sm leading-snug">{a.myth}</h3></div><ChevronDown className={`h-4 w-4 text-muted shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} /></button>{isOpen && (<div className="px-5 pb-5 animate-slideUp"><div className="border-l-2 border-emerald-500/40 pl-4 space-y-3"><div><h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wide mb-1">The Truth</h4><p className="text-sm leading-relaxed">{a.truth}</p></div><div><h4 className="text-xs font-semibold text-accent uppercase tracking-wide mb-1 flex items-center gap-1.5"><BookOpen className="h-3 w-3" /> Sources</h4><ul className="text-xs space-y-1 list-disc list-inside text-muted">{a.sources.map((s, i) => <li key={i}>{s}</li>)}</ul></div></div></div>)}</div>); })}</div>
    </div>
  );
}
