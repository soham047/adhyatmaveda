import { useState, useMemo } from 'react';
import { SCRIPTURES } from '@/data/content';
import { SafetyBadge } from '@/components/SafetyBadge';
import { Modal } from '@/components/Modal';
import type { Scripture, Tradition } from '@/types';
import { ExternalLink, BookOpen, Search } from 'lucide-react';

const FILTERS: { id: Tradition | 'all'; label: string }[] = [{ id: 'all', label: 'All' },{ id: 'vaishnava', label: 'Vaishnava' },{ id: 'shaiva', label: 'Shaiva' },{ id: 'shakta', label: 'Shakta' }];

interface Props { searchQuery: string; }

export function LibraryPage({ searchQuery }: Props) {
  const [filter, setFilter] = useState<Tradition | 'all'>('all');
  const [selected, setSelected] = useState<Scripture | null>(null);
  const [localSearch, setLocalSearch] = useState('');
  const filtered = useMemo(() => { const q = (searchQuery || localSearch).toLowerCase(); return SCRIPTURES.filter((s) => { const matchFilter = filter === 'all' || s.tradition === filter; const matchSearch = !q || s.title.toLowerCase().includes(q) || s.iast.toLowerCase().includes(q) || s.summary.toLowerCase().includes(q) || s.category.toLowerCase().includes(q); return matchFilter && matchSearch; }); }, [filter, searchQuery, localSearch]);
  return (
    <div className="space-y-6 animate-fadeIn">
      <div><h1 className="section-title text-3xl text-accent mb-2">Scriptural Library</h1><p className="text-muted text-sm">{SCRIPTURES.length} foundational texts with translations, transliterations, and source links.</p></div>
      <div className="relative max-w-md"><Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted" /><input type="text" value={localSearch} onChange={(e) => setLocalSearch(e.target.value)} placeholder="Search within library…" className="input-field pl-10 text-sm" /></div>
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">{FILTERS.map((f) => (<button key={f.id} onClick={() => setFilter(f.id)} className={`chip whitespace-nowrap ${filter === f.id ? 'chip-active' : ''}`}>{f.label}</button>))}</div>
      <p className="text-xs text-muted">{filtered.length} texts</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{filtered.map((s) => (<button key={s.id} onClick={() => setSelected(s)} className="card p-5 text-left hover:border-[var(--accent)] transition-all hover:-translate-y-0.5 flex flex-col"><div className="flex items-start justify-between gap-2 mb-2"><div className="flex items-center gap-2"><div className="h-8 w-8 rounded-lg bg-gold/15 flex items-center justify-center"><BookOpen className="h-4 w-4 text-accent" /></div><span className="chip text-[10px]">{s.category}</span></div><SafetyBadge level={s.safety} compact /></div><h3 className="font-semibold text-sm mb-1">{s.title}</h3><p className="iast text-xs text-accent mb-2">{s.iast}</p><p className="text-xs text-muted leading-relaxed line-clamp-3 flex-1">{s.summary}</p></button>))}</div>
      <Modal open={!!selected} onClose={() => setSelected(null)} title={selected?.title || ''}>{selected && (<div className="space-y-4"><div className="flex items-center gap-3"><span className="chip">{selected.category}</span><SafetyBadge level={selected.safety} /></div><p className="iast text-sm text-accent">{selected.iast}</p><p className="text-sm leading-relaxed">{selected.summary}</p>{selected.verses && selected.verses.length > 0 && (<div><h4 className="text-xs font-semibold text-accent uppercase tracking-wide mb-3">Sample Verses</h4><div className="space-y-3">{selected.verses.map((v, i) => (<div key={i} className="card-2 p-4"><p className="deva text-lg mb-2">{v.sanskrit}</p><p className="iast text-sm text-accent mb-2">{v.iast}</p><p className="text-sm text-muted">{v.english}</p></div>))}</div></div>)}{selected.sourceUrl && (<a href={selected.sourceUrl} target="_blank" rel="noopener noreferrer" className="btn-primary w-full py-2.5 text-sm flex items-center justify-center gap-2"><ExternalLink className="h-4 w-4" /> Open Source Archive</a>)}</div>)}</Modal>
    </div>
  );
}
