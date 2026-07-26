export type SafetyLevel = 'green' | 'amber' | 'red';
export type Tradition = 'vaishnava' | 'shaiva' | 'shakta' | 'folk' | 'vedic';

export interface SafetyBadge { level: SafetyLevel; label: string; short: string; guidance: string; }

export interface Deity {
  id: string; name: string; iast: string; tradition: Tradition; domain: string; iconKey: string;
  summary: string; forms?: string[]; weapons?: string[]; mount?: string; mantras?: string[];
  safety: SafetyLevel;
  iconography?: string; symbols?: string[]; beeja?: string; safeMantra?: string; advancedMantra?: string;
  names108?: string[]; festivals?: string[]; temples?: string[]; scriptures?: string[];
  yantras?: string[]; mudras?: string[]; stories?: string[]; meditationForm?: string;
  color?: string; direction?: string; element?: string; planet?: string;
  offerings?: string[]; flowers?: string[]; leaves?: string[]; incense?: string[]; foods?: string[];
  raga?: string; meditationBenefits?: string; beginnerPractices?: string[];
  dailyWorship?: string; avoid?: string[]; crossRefs?: string[];
}

export interface Scripture {
  id: string; title: string; iast: string; tradition: Tradition; category: string; safety: SafetyLevel;
  summary: string; verses?: { sanskrit: string; iast: string; english: string }[]; sourceUrl?: string;
  historicalBackground?: string; estimatedPeriod?: string; language?: string; difficulty?: string;
  keyTeachings?: string[]; readingGuide?: string; relatedTexts?: string[];
}

export interface FolkNode {
  id: string; name: string; region: string; tradition: Tradition; summary: string;
  puranicRefs: string[]; festivals: string[]; safety: SafetyLevel;
}

export interface Mantra {
  id: string; deity: string; sanskrit: string; iast: string; english: string;
  count: number; safety: SafetyLevel; tradition: Tradition;
  wordMeaning?: { word: string; meaning: string }[]; purpose?: string; source?: string;
  meter?: string; bestTime?: string; beginnerFriendly?: boolean; mudra?: string; offerings?: string[];
}

export interface Mudra { id: string; name: string; iast: string; meaning: string; benefits: string; steps: string[]; }
export interface QuizQuestion { id: string; category: string; question: string; options: string[]; answer: number; explanation: string; }
export interface VerseAssemblyPuzzle { id: string; title: string; lines: string[]; correctOrder: number[]; }
export interface ShaktiPeetha { id: string; name: string; bodyPart: string; deity: string; location: string; region: string; }
export interface MythArticle { id: string; myth: string; truth: string; category: string; sources: string[]; }
export interface PathResult { tradition: string; label: string; affinity: number; description: string; startingMantra: string; readings: string[]; }

export interface Lesson {
  id: string; title: string; category: string; duration: string;
  intro: string; content: { heading: string; body: string }[];
  advanced?: string; references?: string[]; summary: string;
  quiz: { question: string; options: string[]; answer: number; explanation: string };
}

export interface SadhanaQuestion {
  id: string; question: string; type: 'choice' | 'time' | 'text';
  options?: { label: string; value: string }[];
}

export interface SadhanaRoutine {
  morning: { time: string; activities: { name: string; detail: string }[] }[];
  evening: { time: string; activities: { name: string; detail: string }[] }[];
  weekly: { day: string; observance: string }[];
  reminders: string[];
  mantras: string[]; stotrams: string[]; readings: string[];
  puja: string; meditation: string; journal: string; seva: string;
}

export interface PujaGuide {
  id: string; deity: string; title: string; preparation: string[];
  materials: string[]; mentalPrep: string; sankalpa: string;
  steps: { name: string; meaning: string }[];
  commonMistakes: string[]; minimalVersion: string; checklist: string[];
}

export interface JournalEntry {
  id: string; date: string; mantra?: string; mood?: string;
  dreams?: string; meditation?: string; insights?: string;
  questions?: string; gratitude?: string;
}

export interface Mahavidya {
  id: string; name: string; iast: string; number: number;
  origin: string; symbolism: string; philosophy: string;
  iconography: string; color: string; weapons: string[];
  yantra: string; scriptures: string[]; temples: string[];
  festivals: string[]; safePractices: string[];
  researchRefs: string[]; stotras: string[];
  cautions: string; lineage: string; relatedBhairavas?: string[];
  relatedYoginis?: string[]; relatedTantras?: string[];
  misunderstoodConcepts: string[];
}

export interface PanchangInfo {
  tithi: string; paksha: string; nakshatra: string; yoga: string;
  karana: string; sunrise: string; sunset: string; moonPhase: string;
  month: string; ritu: string; samvatsara: string;
}

export type View =
  | 'home' | 'knowledge' | 'upasana' | 'library' | 'tools'
  | 'japa' | 'quiz' | 'pronunciation' | 'mythbuster' | 'arena' | 'pathfinder'
  | 'sankalpa' | 'altar' | 'mudras' | 'peetha-game' | 'verse-game'
  | 'beginner' | 'sadhana-builder' | 'journal' | 'mahavidya' | 'panchang'
  | 'puja-guides' | 'deity-detail';

export interface JapaSession { id: string; mantra: string; target: number; count: number; date: string; complete: boolean; }
export interface JapaLog { mantra: string; total: number; sessions: JapaSession[]; }
