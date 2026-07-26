export type SafetyLevel = 'green' | 'amber' | 'red';
export type Tradition = 'vaishnava' | 'shaiva' | 'shakta' | 'folk' | 'vedic';

export interface SafetyBadge { level: SafetyLevel; label: string; short: string; guidance: string; }
export interface Deity { id: string; name: string; iast: string; tradition: Tradition; domain: string; iconKey: string; summary: string; forms?: string[]; weapons?: string[]; mount?: string; mantras?: string[]; safety: SafetyLevel; }
export interface Scripture { id: string; title: string; iast: string; tradition: Tradition; category: string; safety: SafetyLevel; summary: string; verses?: { sanskrit: string; iast: string; english: string }[]; sourceUrl?: string; }
export interface FolkNode { id: string; name: string; region: string; tradition: Tradition; summary: string; puranicRefs: string[]; festivals: string[]; safety: SafetyLevel; }
export interface Mantra { id: string; deity: string; sanskrit: string; iast: string; english: string; count: number; safety: SafetyLevel; tradition: Tradition; }
export interface Mudra { id: string; name: string; iast: string; meaning: string; benefits: string; steps: string[]; }
export interface QuizQuestion { id: string; category: string; question: string; options: string[]; answer: number; explanation: string; }
export interface VerseAssemblyPuzzle { id: string; title: string; lines: string[]; correctOrder: number[]; }
export interface ShaktiPeetha { id: string; name: string; bodyPart: string; deity: string; location: string; region: string; }
export interface MythArticle { id: string; myth: string; truth: string; category: string; sources: string[]; }
export interface PathResult { tradition: string; label: string; affinity: number; description: string; startingMantra: string; readings: string[]; }

export type View = 'home' | 'knowledge' | 'upasana' | 'library' | 'tools' | 'japa' | 'quiz' | 'pronunciation' | 'mythbuster' | 'arena' | 'pathfinder' | 'sankalpa' | 'altar' | 'mudras' | 'peetha-game' | 'verse-game';

export interface JapaSession { id: string; mantra: string; target: number; count: number; date: string; complete: boolean; }
export interface JapaLog { mantra: string; total: number; sessions: JapaSession[]; }
