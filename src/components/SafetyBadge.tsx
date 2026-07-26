import type { SafetyLevel } from '@/types';
import { SAFETY_BADGES, safetyClasses, safetyDot } from '@/lib/safety';
import { ShieldCheck, AlertTriangle, Lock } from 'lucide-react';

const ICONS: Record<SafetyLevel, typeof ShieldCheck> = { green: ShieldCheck, amber: AlertTriangle, red: Lock };

export function SafetyBadge({ level, compact = false }: { level: SafetyLevel; compact?: boolean }) {
  const badge = SAFETY_BADGES[level]; const Icon = ICONS[level];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${safetyClasses(level)}`} title={badge.label}>
      <span className={`h-2 w-2 rounded-full ${safetyDot(level)}`} />
      <Icon className="h-3 w-3" />
      {compact ? badge.short : badge.label}
    </span>
  );
}

export function SafetyCard({ level }: { level: SafetyLevel }) {
  const badge = SAFETY_BADGES[level]; const Icon = ICONS[level];
  return (
    <div className={`rounded-xl border p-4 ${safetyClasses(level)}`}>
      <div className="flex items-center gap-2 mb-2"><Icon className="h-5 w-5" /><h4 className="font-semibold text-sm">{badge.label}</h4></div>
      <p className="text-sm opacity-90 leading-relaxed">{badge.guidance}</p>
    </div>
  );
}
