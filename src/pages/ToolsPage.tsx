import type { View } from '@/types';
import { Bell, Compass, Brain, Mic, ShieldAlert, Gamepad2, ArrowRight, BookOpen, Sparkles, Moon, Library, Shield } from 'lucide-react';

interface Props { onNavigate: (v: View) => void; }

const TOOLS: { v: View; icon: typeof Bell; title: string; desc: string }[] = [
  { v: 'beginner', icon: BookOpen, title: "Beginner's Path", desc: 'Guided lessons from Day 1 — like Duolingo for Sanatana Dharma.' },
  { v: 'sadhana-builder', icon: Sparkles, title: 'Build My Sadhana', desc: 'Answer questions and get a complete daily routine tailored to you.' },
  { v: 'pathfinder', icon: Compass, title: 'Path Discovery', desc: '40-question assessment with animated radar chart across 7 traditions.' },
  { v: 'japa', icon: Bell, title: 'Digital Japa Counter', desc: 'Haptic feedback, progress wheel, lifetime logger, ambient sounds.' },
  { v: 'arena', icon: Gamepad2, title: 'Quiz Arena & Games', desc: 'Trivia, Shakti Peetha matching, and verse assembly puzzles.' },
  { v: 'pronunciation', icon: Mic, title: 'Pronunciation Tutor', desc: 'Sanskrit akshara guide with audio for key sounds and mantras.' },
  { v: 'mythbuster', icon: ShieldAlert, title: 'Myth-Buster Matrix', desc: 'Sourced articles clearing common misconceptions.' },
  { v: 'mahavidya', icon: Moon, title: 'Mahavidya Portal', desc: 'Complete portal for all 10 Mahavidyas with academic references.' },
  { v: 'journal', icon: BookOpen, title: 'Sadhana Journal', desc: 'Track your daily practice, mood, insights, and gratitude.' },
  { v: 'puja-guides', icon: Shield, title: 'Puja Guides', desc: 'Step-by-step home worship guides with printable checklists.' },
];

export function ToolsPage({ onNavigate }: Props) {
  return (
    <div className="space-y-6 animate-fadeIn">
      <div><h1 className="section-title text-3xl text-accent mb-2">Tools & Practices</h1><p className="text-muted text-sm">Interactive utilities for daily practice, learning, and spiritual growth.</p></div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {TOOLS.map((t) => { const Icon = t.icon; return (
          <button key={t.v} onClick={() => onNavigate(t.v)} className="card p-5 text-left hover:border-[var(--accent)] transition-all hover:-translate-y-0.5 group">
            <div className="h-11 w-11 rounded-xl bg-card2 flex items-center justify-center mb-3 group-hover:shadow-glow transition-shadow"><Icon className="h-5 w-5 text-accent" /></div>
            <h3 className="font-semibold mb-1">{t.title}</h3>
            <p className="text-xs text-muted leading-relaxed mb-3">{t.desc}</p>
            <span className="text-xs text-accent flex items-center gap-1">Open <ArrowRight className="h-3 w-3" /></span>
          </button>
        ); })}
      </div>
    </div>
  );
}
