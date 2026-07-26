import type { ReactNode } from 'react';
import { X } from 'lucide-react';
import { useEffect } from 'react';

interface Props { open: boolean; onClose: () => void; title: string; children: ReactNode; }

export function Modal({ open, onClose, title, children }: Props) {
  useEffect(() => { if (open) { document.body.style.overflow = 'hidden'; return () => { document.body.style.overflow = ''; }; } }, [open]);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div className="relative card max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4"><h3 className="section-title text-xl text-accent">{title}</h3><button onClick={onClose} className="btn-ghost p-2" aria-label="Close"><X className="h-4 w-4" /></button></div>
        {children}
      </div>
    </div>
  );
}
