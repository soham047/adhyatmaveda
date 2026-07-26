import { useState, useEffect } from 'react';
import { LESSONS } from '@/data/newcontent';
import { getCompletedLessons, toggleLessonComplete, addToHistory } from '@/lib/storage';
import { BookOpen, Clock, ChevronRight, Check, RotateCcw, Lightbulb, GraduationCap, ArrowLeft, ArrowRight } from 'lucide-react';
import type { View } from '@/types';

interface Props { onNavigate: (v: View) => void; }

export function BeginnerPage({ onNavigate }: Props) {
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  const [completed, setCompleted] = useState<string[]>([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  useEffect(() => { setCompleted(getCompletedLessons()); addToHistory("Beginner's Path"); }, []);
  const lesson = LESSONS.find(l => l.id === selectedLesson);
  const handleComplete = (id: string) => { const updated = toggleLessonComplete(id); setCompleted(updated); };

  if (lesson && !showQuiz) {
    const idx = LESSONS.findIndex(l => l.id === lesson.id);
    const next = LESSONS[idx + 1];
    return (
      <div className="space-y-6 animate-fadeIn max-w-3xl mx-auto">
        <button onClick={() => setSelectedLesson(null)} className="btn-ghost px-4 py-2 text-sm flex items-center gap-2"><ArrowLeft className="h-4 w-4" /> All Lessons</button>
        <div className="card p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-3"><span className="chip">{lesson.category}</span><span className="chip"><Clock className="h-3 w-3" /> {lesson.duration}</span></div>
          <h1 className="section-title text-2xl sm:text-3xl text-accent mb-3">{lesson.title}</h1>
          <p className="text-muted leading-relaxed mb-6">{lesson.intro}</p>
          <div className="space-y-5">{lesson.content.map((section, i) => (<div key={i}><h3 className="font-semibold text-sm text-accent mb-1.5">{section.heading}</h3><p className="text-sm leading-relaxed">{section.body}</p></div>))}</div>
          {lesson.advanced && (<div className="mt-6 card-2 p-4 border-l-2 border-accent"><div className="flex items-center gap-1.5 mb-2"><GraduationCap className="h-4 w-4 text-accent" /><h3 className="text-xs font-semibold text-accent uppercase tracking-wide">Advanced Section</h3></div><p className="text-sm leading-relaxed text-muted">{lesson.advanced}</p></div>)}
          {lesson.references && (<div className="mt-4"><h3 className="text-xs font-semibold text-accent uppercase tracking-wide mb-2">References</h3><ul className="text-sm space-y-1 list-disc list-inside text-muted">{lesson.references.map((r, i) => <li key={i}>{r}</li>)}</ul></div>)}
          <div className="mt-6 card-2 p-4"><h3 className="text-xs font-semibold text-accent uppercase tracking-wide mb-2">Summary</h3><p className="text-sm leading-relaxed">{lesson.summary}</p></div>
          <div className="flex flex-wrap gap-3 mt-6"><button onClick={() => setShowQuiz(true)} className="btn-primary px-5 py-2.5 text-sm flex items-center gap-2"><Lightbulb className="h-4 w-4" /> Take Quiz</button>{completed.includes(lesson.id) ? (<span className="chip text-emerald-400 border-emerald-500/40 bg-emerald-500/10"><Check className="h-3 w-3" /> Completed</span>) : (<button onClick={() => handleComplete(lesson.id)} className="btn-ghost px-5 py-2.5 text-sm flex items-center gap-2"><Check className="h-4 w-4" /> Mark Complete</button>)}{next && (<button onClick={() => { setSelectedLesson(next.id); setShowQuiz(false); setQuizAnswer(null); }} className="btn-ghost px-5 py-2.5 text-sm flex items-center gap-2 ml-auto">Next Lesson <ArrowRight className="h-4 w-4" /></button>)}</div>
        </div>
      </div>
    );
  }

  if (lesson && showQuiz) {
    const q = lesson.quiz;
    return (
      <div className="space-y-6 animate-fadeIn max-w-2xl mx-auto">
        <div className="card p-6"><div className="flex items-center gap-2 mb-4"><Lightbulb className="h-5 w-5 text-gold" /><h2 className="section-title text-xl text-accent">Quiz: {lesson.title}</h2></div><p className="text-base font-semibold mb-5">{q.question}</p><div className="space-y-2">{q.options.map((opt, i) => { const isCorrect = i === q.answer; const isSelected = quizAnswer === i; let cls = 'card-2 p-3.5 text-left text-sm hover:border-[var(--accent)] transition-all w-full'; if (quizAnswer !== null) { if (isCorrect) cls = 'card-2 p-3.5 text-left text-sm border-emerald-500/50 bg-emerald-500/10 w-full'; else if (isSelected) cls = 'card-2 p-3.5 text-left text-sm border-red-500/50 bg-red-500/10 w-full'; else cls = 'card-2 p-3.5 text-left text-sm opacity-50 w-full'; } return (<button key={i} onClick={() => quizAnswer === null && setQuizAnswer(i)} className={cls}>{opt}{quizAnswer !== null && isCorrect && <Check className="h-4 w-4 text-emerald-400 inline ml-2" />}</button>); })}</div>{quizAnswer !== null && (<div className="mt-4 card-2 p-3"><p className="text-sm text-muted">{q.explanation}</p></div>)}<div className="flex gap-3 mt-5"><button onClick={() => { setShowQuiz(false); setQuizAnswer(null); }} className="btn-ghost px-4 py-2 text-sm flex items-center gap-2"><ArrowLeft className="h-4 w-4" /> Back to Lesson</button>{quizAnswer !== null && (<button onClick={() => { handleComplete(lesson.id); setShowQuiz(false); setQuizAnswer(null); setSelectedLesson(null); }} className="btn-primary px-5 py-2.5 text-sm">Complete Lesson</button>)}</div></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      <div><h1 className="section-title text-3xl text-accent mb-2">Beginner's Path</h1><p className="text-muted text-sm">A guided journey through the foundations of Sanatana Dharma. Start at the top and work your way down — each lesson builds on the last.</p></div>
      <div className="card p-4"><div className="flex items-center justify-between mb-2"><span className="text-sm font-medium">Your Progress</span><span className="text-sm text-accent">{completed.length} / {LESSONS.length} lessons</span></div><div className="relative h-2.5 rounded-full bg-card2 overflow-hidden"><div className="absolute inset-y-0 left-0 bg-gold rounded-full transition-all" style={{ width: `${(completed.length / LESSONS.length) * 100}%` }} /></div></div>
      <div className="space-y-3">{LESSONS.map((lesson, i) => { const isComplete = completed.includes(lesson.id); const isNext = i > 0 && completed.includes(LESSONS[i - 1].id) && !isComplete; const isFirst = i === 0; const isLocked = i > 0 && !completed.includes(LESSONS[i - 1].id) && !isComplete; return (<button key={lesson.id} onClick={() => { setSelectedLesson(lesson.id); setShowQuiz(false); setQuizAnswer(null); }} className={`card p-5 text-left w-full transition-all ${isLocked ? 'opacity-50' : 'hover:border-[var(--accent)] hover:-translate-y-0.5'} ${isNext || isFirst ? 'border-accent' : ''}`}><div className="flex items-center gap-4"><div className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 ${isComplete ? 'bg-emerald-500/15' : isLocked ? 'bg-card2' : 'bg-gold/15'}`}>{isComplete ? <Check className="h-5 w-5 text-emerald-400" /> : <span className="text-accent font-bold text-sm">{i + 1}</span>}</div><div className="flex-1 min-w-0"><div className="flex items-center gap-2 mb-1"><h3 className="font-semibold text-sm">{lesson.title}</h3>{isNext && <span className="chip text-[10px] text-accent border-accent">Next Up</span>}</div><p className="text-xs text-muted">{lesson.category} · {lesson.duration}</p></div><ChevronRight className="h-4 w-4 text-muted shrink-0" /></div></button>); })}</div>
      <div className="card p-5 border-l-2 border-accent"><p className="text-sm text-muted leading-relaxed">Completed all lessons? The next step is to <button onClick={() => onNavigate('pathfinder')} className="text-accent underline">discover your path</button> and <button onClick={() => onNavigate('sadhana-builder')} className="text-accent underline">build your daily sadhana</button>.</p></div>
    </div>
  );
}
