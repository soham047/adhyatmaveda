import type { SafetyBadge, SafetyLevel } from '@/types';

export const SAFETY_BADGES: Record<SafetyLevel, SafetyBadge> = {
  green: { level: 'green', label: 'Safe for Home — No Initiation Required', short: 'Home Safe', guidance: 'This practice is universal and safe for sincere home practitioners. Approach with devotion, cleanliness of body and mind, and a quiet space. No formal Diksha is required.' },
  amber: { level: 'amber', label: 'Basic Hygiene & Rules Apply', short: 'Rules Apply', guidance: 'This practice requires basic disciplines: morning/evening cleanliness, dietary awareness, and adherence to count and timing. Follow the stated niyamas carefully.' },
  red: { level: 'red', label: 'Informational & Research Only — Diksha Required', short: 'Research Only', guidance: 'This text is preserved for academic research and cultural reference. Active practice requires formal Diksha from a qualified Guru. Do not attempt these bija sadhanas, nyasa, or shatkarma rituals without initiation.' },
};

export function safetyClasses(level: SafetyLevel): string {
  switch (level) {
    case 'green': return 'border-emerald-500/40 bg-emerald-500/10 text-emerald-400';
    case 'amber': return 'border-amber-500/40 bg-amber-500/10 text-amber-400';
    case 'red': return 'border-red-500/40 bg-red-500/10 text-red-400';
  }
}

export function safetyDot(level: SafetyLevel): string {
  switch (level) {
    case 'green': return 'bg-emerald-500';
    case 'amber': return 'bg-amber-500';
    case 'red': return 'bg-red-500';
  }
}
