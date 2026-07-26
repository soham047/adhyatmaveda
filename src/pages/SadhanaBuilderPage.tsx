import { useState, useEffect } from 'react';
import { SADHANA_QUESTIONS } from '@/data/newcontent';
import { getSadhana, saveSadhana, addToHistory } from '@/lib/storage';
import { Sparkles, ArrowRight, ArrowLeft, Check, RotateCcw, Download, Copy, Printer } from 'lucide-react';
import type { SadhanaRoutine, View } from '@/types';

interface Props { onNavigate: (v: View) => void; }

export function SadhanaBuilderPage({ onNavigate }: Props) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [routine, setRoutine] = useState<SadhanaRoutine | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => { addToHistory('Build My Sadhana'); }, []);

  const answer = (id: string, value: string) => {
    setAnswers({ ...answers, [id]: value });
    if (step < SADHANA_QUESTIONS.length - 1) setStep(step + 1);
  };

  const generate = () => {
    const time = parseInt(answers.time || '30');
    const deity = answers.deity || 'any';
    const tradition = answers.tradition || 'any';
    const both = answers.session === 'both';
    const wakeTime = parseInt(answers.wake || '5');
    const likesMusic = answers.music === 'yes';
    const likesMeditation = answers.meditation === 'yes' || answers.meditation === 'learn';

    const deityMantra: Record<string, string> = {
      shiva: 'Om Namah Shivaya', vishnu: 'Om Namo Narayanaya', devi: 'Om Dum Durgayei Namah', ganesha: 'Om Gam Ganapataye Namah', any: 'Om Namah Shivaya',
    };
    const deityStotra: Record<string, string> = {
      shiva: 'Shiva Tandava Stotram', vishnu: 'Vishnu Sahasranama', devi: 'Mahishasura Mardini Stotram', ganesha: 'Ganesha Atharvashirsha', any: 'Lingashtakam',
    };
    const deityReading: Record<string, string> = {
      shiva: 'Shiva Purana (summaries)', vishnu: 'Bhagavad Gita (Ch. 9, 12)', devi: 'Devi Mahatmyam', ganesha: 'Ganesha Purana', any: 'Bhagavad Gita',
    };
    const deityPuja: Record<string, string> = {
      shiva: 'Shiva Puja (abhishekam with Panchakshari)', vishnu: 'Vishnu Puja with Tulsi and lamp', devi: 'Durga Puja with red flowers', ganesha: 'Ganapati Puja with modaka', any: 'Simple Daily Puja (Nitya Karma)',
    };

    const morningTime = `${wakeTime + 1}:00 AM`;
    const eveningTime = '6:30 PM';
    const japaCount = time >= 60 ? '108 (one mala)' : '11 or 108';

    const morning: { time: string; activities: { name: string; detail: string }[] }[] = [{
      time: morningTime,
      activities: [
        { name: 'Achamana & Sankalpa', detail: 'Sip water with mantra, set intention for the day.' },
        { name: 'Daily Puja', detail: deityPuja[deity] || deityPuja.any },
        { name: 'Mantra Japa', detail: `Chant "${deityMantra[deity] || deityMantra.any}" ${japaCount} times.` },
        ...(likesMeditation ? [{ name: 'Meditation', detail: '15 minutes of silent meditation (focus on breath or the chosen deity).' }] : []),
        { name: 'Reading (Svadhyaya)', detail: `Read 1-2 pages from ${deityReading[deity] || deityReading.any}.` },
      ],
    }];

    const evening: { time: string; activities: { name: string; detail: string }[] }[] = both || answers.session === 'evening' ? [{
      time: eveningTime,
      activities: [
        { name: 'Sandhya Vandana', detail: 'Evening prayers and lamp offering.' },
        { name: 'Stotra Recitation', detail: `Recite ${deityStotra[deity] || deityStotra.any}.` },
        ...(likesMusic ? [{ name: 'Bhajan / Kirtan', detail: 'Sing or listen to devotional music for 10 minutes.' }] : []),
        { name: 'Journal', detail: 'Write 3 lines: what you practiced, how you felt, one insight.' },
      ],
    }] : [];

    const weekly: { day: string; observance: string }[] = [
      { day: 'Monday', observance: 'Shiva Abhishekam (if Shaiva) or Vishnu Puja (if Vaishnava)' },
      { day: 'Tuesday', observance: 'Hanuman Chalisa recitation (11 times)' },
      { day: 'Wednesday', observance: 'Ganesha Puja or study session' },
      { day: 'Thursday', observance: 'Guru Vandana and reading' },
      { day: 'Friday', observance: 'Devi Puja (Lalita Sahasranama if Shakta)' },
      { day: 'Saturday', observance: 'Hanuman Puja or Shani Deva prayers' },
      { day: 'Sunday', observance: 'Extended meditation and family puja' },
    ];

    const reminders: string[] = [
      'Ekadashi (11th day of each lunar half) — observe fasting or light eating',
      'Pradosha (13th lunar day, evening) — Shiva worship if Shaiva',
      'Purnima (full moon) — special puja and reading',
      'Amavasya (new moon) — tarpana (ancestral offerings) and quiet practice',
      'Navaratri (twice yearly) — intensified Devi worship',
    ];

    const r: SadhanaRoutine = {
      morning, evening, weekly, reminders,
      mantras: [deityMantra[deity] || deityMantra.any],
      stotrams: [deityStotra[deity] || deityStotra.any],
      readings: [deityReading[deity] || deityReading.any],
      puja: deityPuja[deity] || deityPuja.any,
      meditation: likesMeditation ? '15 minutes of silent meditation, focusing on the breath or the form of the chosen deity.' : 'Start with 5 minutes of quiet sitting, gradually increasing.',
      journal: 'Write 3 lines daily: what you practiced, how you felt, one insight or question.',
      seva: 'Perform one act of kindness daily, no matter how small, as an offering to the divine.',
    };

    setRoutine(r);
    saveSadhana(r);
  };

  const copyRoutine = () => {
    if (!routine) return;
    const text = `MY DAILY SADHANA\n\nMorning:\n${routine.morning.map(m => `${m.time}: ${m.activities.map(a => `${a.name} — ${a.detail}`).join('; ')}`).join('\n')}\n\nEvening:\n${routine.evening.map(m => `${m.time}: ${m.activities.map(a => `${a.name} — ${a.detail}`).join('; ')}`).join('\n') || 'As per morning schedule'}\n\nWeekly:\n${routine.weekly.map(w => `${w.day}: ${w.observance}`).join('\n')}\n\nMantras: ${routine.mantras.join(', ')}\nStotrams: ${routine.stotrams.join(', ')}\nReadings: ${routine.readings.join(', ')}\nMeditation: ${routine.meditation}\nJournal: ${routine.journal}\nSeva: ${routine.seva}`;
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (routine) {
    return (
      <div className="space-y-6 animate-fadeIn max-w-3xl mx-auto">
        <div className="text-center">
          <div className="h-16 w-16 rounded-full bg-gold/15 flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-accent" />
          </div>
          <h1 className="section-title text-2xl text-accent mb-2">Your Personal Sadhana</h1>
          <p className="text-muted text-sm">A complete daily routine tailored to your schedule and temperament. No login required — saved locally on your device.</p>
        </div>

        {/* Morning */}
        <section className="card p-6">
          <h2 className="section-title text-lg text-accent mb-4">Morning Routine</h2>
          <div className="space-y-3">
            {routine.morning.map((m, i) => (
              <div key={i}>
                <p className="text-xs text-accent font-mono mb-2">{m.time}</p>
                {m.activities.map((a, j) => (
                  <div key={j} className="card-2 p-3 mb-2">
                    <p className="text-sm font-semibold">{a.name}</p>
                    <p className="text-xs text-muted mt-0.5">{a.detail}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* Evening */}
        {routine.evening.length > 0 && (
          <section className="card p-6">
            <h2 className="section-title text-lg text-accent mb-4">Evening Routine</h2>
            <div className="space-y-3">
              {routine.evening.map((m, i) => (
                <div key={i}>
                  <p className="text-xs text-accent font-mono mb-2">{m.time}</p>
                  {m.activities.map((a, j) => (
                    <div key={j} className="card-2 p-3 mb-2">
                      <p className="text-sm font-semibold">{a.name}</p>
                      <p className="text-xs text-muted mt-0.5">{a.detail}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Weekly */}
        <section className="card p-6">
          <h2 className="section-title text-lg text-accent mb-4">Weekly Observances</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {routine.weekly.map((w, i) => (
              <div key={i} className="card-2 p-3">
                <p className="text-sm font-semibold text-accent">{w.day}</p>
                <p className="text-xs text-muted mt-0.5">{w.observance}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Reminders */}
        <section className="card p-6">
          <h2 className="section-title text-lg text-accent mb-4">Special Day Reminders</h2>
          <ul className="text-sm space-y-2 list-disc list-inside text-muted">
            {routine.reminders.map((r, i) => <li key={i}>{r}</li>)}
          </ul>
        </section>

        {/* Recommendations */}
        <section className="card p-6">
          <h2 className="section-title text-lg text-accent mb-4">Recommendations</h2>
          <div className="grid sm:grid-cols-2 gap-3">
            <div className="card-2 p-3"><p className="text-xs text-muted">Mantra</p><p className="text-sm">{routine.mantras.join(', ')}</p></div>
            <div className="card-2 p-3"><p className="text-xs text-muted">Stotram</p><p className="text-sm">{routine.stotrams.join(', ')}</p></div>
            <div className="card-2 p-3"><p className="text-xs text-muted">Reading</p><p className="text-sm">{routine.readings.join(', ')}</p></div>
            <div className="card-2 p-3"><p className="text-xs text-muted">Puja</p><p className="text-sm">{routine.puja}</p></div>
            <div className="card-2 p-3"><p className="text-xs text-muted">Meditation</p><p className="text-sm">{routine.meditation}</p></div>
            <div className="card-2 p-3"><p className="text-xs text-muted">Journal</p><p className="text-sm">{routine.journal}</p></div>
            <div className="card-2 p-3 sm:col-span-2"><p className="text-xs text-muted">Seva (Selfless Service)</p><p className="text-sm">{routine.seva}</p></div>
          </div>
        </section>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 justify-center">
          <button onClick={copyRoutine} className="btn-primary px-5 py-2.5 text-sm flex items-center gap-2">
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />} {copied ? 'Copied!' : 'Copy'}
          </button>
          <button onClick={() => window.print()} className="btn-ghost px-5 py-2.5 text-sm flex items-center gap-2">
            <Printer className="h-4 w-4" /> Print / PDF
          </button>
          <button onClick={() => { setRoutine(null); setStep(0); setAnswers({}); }} className="btn-ghost px-5 py-2.5 text-sm flex items-center gap-2">
            <RotateCcw className="h-4 w-4" /> Rebuild
          </button>
          <button onClick={() => onNavigate('journal')} className="btn-ghost px-5 py-2.5 text-sm flex items-center gap-2">
            Open Journal <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    );
  }

  const q = SADHANA_QUESTIONS[step];
  const isLast = step === SADHANA_QUESTIONS.length - 1;

  return (
    <div className="space-y-6 animate-fadeIn max-w-2xl mx-auto">
      <div className="text-center">
        <h1 className="section-title text-3xl text-accent mb-2">Build My Sadhana</h1>
        <p className="text-muted text-sm">Answer a few questions and we'll build a complete beginner-friendly daily routine for you.</p>
      </div>

      <div className="flex items-center gap-1.5">
        {SADHANA_QUESTIONS.map((_, i) => (
          <div key={i} className={`h-1.5 flex-1 rounded-full ${i <= step ? 'bg-gold' : 'bg-card2'}`} />
        ))}
      </div>
      <p className="text-xs text-muted text-center">Question {step + 1} of {SADHANA_QUESTIONS.length}</p>

      <div className="card p-6">
        <h2 className="text-lg font-semibold mb-6">{q.question}</h2>
        <div className="space-y-3">
          {q.options?.map((opt, i) => (
            <button
              key={i}
              onClick={() => answer(q.id, opt.value)}
              className="card-2 p-4 w-full text-left hover:border-[var(--accent)] transition-all flex items-center justify-between group"
            >
              <span className="text-sm">{opt.label}</span>
              <ArrowRight className="h-4 w-4 text-muted group-hover:text-accent transition-colors" />
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <button onClick={() => step > 0 && setStep(step - 1)} disabled={step === 0} className="btn-ghost px-4 py-2 text-sm flex items-center gap-2 disabled:opacity-30">
          <ArrowLeft className="h-4 w-4" /> Back
        </button>
        {isLast && Object.keys(answers).length === SADHANA_QUESTIONS.length && (
          <button onClick={generate} className="btn-primary px-5 py-2.5 text-sm flex items-center gap-2">
            <Sparkles className="h-4 w-4" /> Generate My Sadhana
          </button>
        )}
      </div>
    </div>
  );
}
