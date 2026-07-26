import { useState } from 'react';
import { PATH_RESULTS } from '@/data/content';
import type { PathResult } from '@/types';
import { ArrowRight, RotateCcw, Check } from 'lucide-react';

interface Question { q: string; options: { label: string; scores: Record<string, number> }[]; }
const TRADITIONS = ['vaishnava', 'shaiva', 'shakta', 'smarta', 'ganapatya', 'saura', 'kaumara'];

const QUESTIONS: Question[] = [
  { q: 'Do you naturally feel devotion toward a personal form of God?', options: [{ label: 'Yes, strongly', scores: { vaishnava: 3, shaiva: 0, shakta: 1, smarta: 1, ganapatya: 1, saura: 1, kaumara: 1 } }, { label: 'Sometimes', scores: { vaishnava: 1, shaiva: 1, shakta: 1, smarta: 2, ganapatya: 1, saura: 1, kaumara: 1 } }, { label: 'Not really', scores: { shaiva: 2, shakta: 1, smarta: 1, ganapatya: 0, saura: 0, kaumara: 0, vaishnava: 0 } }] },
  { q: 'Do you enjoy silent meditation?', options: [{ label: 'Yes, it is my primary practice', scores: { shaiva: 3, shakta: 1, smarta: 1, vaishnava: 0, ganapatya: 0, saura: 0, kaumara: 0 } }, { label: 'Sometimes', scores: { shaiva: 1, shakta: 1, smarta: 2, vaishnava: 1, ganapatya: 1, saura: 1, kaumara: 1 } }, { label: 'I prefer active practices', scores: { vaishnava: 2, shakta: 2, ganapatya: 1, saura: 1, kaumara: 1, shaiva: 0, smarta: 0 } }] },
  { q: 'Do you prefer philosophy and intellectual inquiry?', options: [{ label: 'Yes, I love deep reasoning', scores: { shaiva: 3, smarta: 2, shakta: 1, vaishnava: 1, ganapatya: 0, saura: 0, kaumara: 0 } }, { label: 'Somewhat', scores: { smarta: 2, shaiva: 1, shakta: 1, vaishnava: 1, ganapatya: 1, saura: 1, kaumara: 1 } }, { label: 'I prefer devotion over intellect', scores: { vaishnava: 3, shakta: 2, ganapatya: 2, saura: 1, kaumara: 1, shaiva: 0, smarta: 0 } }] },
  { q: 'Do you like structured rituals?', options: [{ label: 'Yes, I find them powerful', scores: { shakta: 3, smarta: 2, ganapatya: 2, vaishnava: 2, shaiva: 1, saura: 1, kaumara: 1 } }, { label: 'Sometimes', scores: { smarta: 2, shakta: 1, vaishnava: 1, ganapatya: 1, shaiva: 1, saura: 1, kaumara: 1 } }, { label: 'I prefer simplicity', scores: { shaiva: 2, vaishnava: 1, shakta: 0, smarta: 0, ganapatya: 1, saura: 1, kaumara: 1 } }] },
  { q: 'Do you feel drawn to the Divine Mother (Devi)?', options: [{ label: 'Yes, very strongly', scores: { shakta: 3, smarta: 1, vaishnava: 0, shaiva: 1, ganapatya: 0, saura: 0, kaumara: 0 } }, { label: 'Somewhat', scores: { shakta: 1, smarta: 2, vaishnava: 1, shaiva: 1, ganapatya: 1, saura: 0, kaumara: 0 } }, { label: 'Not particularly', scores: { vaishnava: 2, shaiva: 2, ganapatya: 2, saura: 2, kaumara: 2, smarta: 1, shakta: 0 } }] },
  { q: 'Do you feel a special connection to Vishnu or his avatars?', options: [{ label: 'Yes, Krishna or Rama', scores: { vaishnava: 3, smarta: 1, shakta: 0, shaiva: 0, ganapatya: 0, saura: 0, kaumara: 0 } }, { label: 'Somewhat', scores: { vaishnava: 1, smarta: 2, shakta: 1, shaiva: 1, ganapatya: 1, saura: 1, kaumara: 1 } }, { label: 'Not particularly', scores: { shaiva: 2, shakta: 2, ganapatya: 2, saura: 2, kaumara: 2, smarta: 1, vaishnava: 0 } }] },
  { q: 'Do you feel connected to Shiva?', options: [{ label: 'Yes, deeply', scores: { shaiva: 3, smarta: 1, shakta: 1, vaishnava: 0, ganapatya: 0, saura: 0, kaumara: 0 } }, { label: 'Somewhat', scores: { shaiva: 1, smarta: 2, shakta: 1, vaishnava: 1, ganapatya: 1, saura: 1, kaumara: 1 } }, { label: 'Not particularly', scores: { vaishnava: 2, shakta: 2, ganapatya: 2, saura: 2, kaumara: 2, smarta: 1, shaiva: 0 } }] },
  { q: 'Do you like silence and solitude?', options: [{ label: 'Yes, I crave it', scores: { shaiva: 3, shakta: 1, smarta: 1, vaishnava: 0, ganapatya: 0, saura: 0, kaumara: 0 } }, { label: 'In moderation', scores: { smarta: 2, shaiva: 1, shakta: 1, vaishnava: 1, ganapatya: 1, saura: 1, kaumara: 1 } }, { label: 'I prefer community', scores: { vaishnava: 3, ganapatya: 2, saura: 2, kaumara: 2, shakta: 1, smarta: 0, shaiva: 0 } }] },
  { q: 'Do you like devotional music and kirtan?', options: [{ label: 'Yes, it moves me deeply', scores: { vaishnava: 3, shakta: 2, ganapatya: 1, smarta: 1, shaiva: 0, saura: 0, kaumara: 0 } }, { label: 'Sometimes', scores: { vaishnava: 1, shakta: 1, smarta: 2, ganapatya: 1, shaiva: 1, saura: 1, kaumara: 1 } }, { label: 'I prefer silence', scores: { shaiva: 3, smarta: 1, shakta: 0, vaishnava: 0, ganapatya: 0, saura: 0, kaumara: 0 } }] },
  { q: 'Do you enjoy chanting mantras?', options: [{ label: 'Yes, it is central to my practice', scores: { vaishnava: 2, shaiva: 2, shakta: 3, smarta: 1, ganapatya: 2, saura: 1, kaumara: 2 } }, { label: 'Sometimes', scores: { smarta: 2, vaishnava: 1, shaiva: 1, shakta: 1, ganapatya: 1, saura: 1, kaumara: 1 } }, { label: 'Not really', scores: { shaiva: 2, smarta: 1, shakta: 0, vaishnava: 0, ganapatya: 0, saura: 0, kaumara: 0 } }] },
  { q: 'Do you seek protection from negative forces?', options: [{ label: 'Yes, this is important to me', scores: { shakta: 3, ganapatya: 2, vaishnava: 2, shaiva: 1, smarta: 1, saura: 1, kaumara: 1 } }, { label: 'Somewhat', scores: { smarta: 2, shakta: 1, ganapatya: 1, vaishnava: 1, shaiva: 1, saura: 1, kaumara: 1 } }, { label: 'Not a priority', scores: { shaiva: 2, smarta: 1, shakta: 0, vaishnava: 0, ganapatya: 0, saura: 0, kaumara: 0 } }] },
  { q: 'Do you seek wisdom and knowledge above all?', options: [{ label: 'Yes, wisdom is my goal', scores: { shaiva: 3, ganapatya: 2, smarta: 2, shakta: 1, vaishnava: 0, saura: 0, kaumara: 0 } }, { label: 'Along with devotion', scores: { smarta: 2, shaiva: 1, ganapatya: 1, vaishnava: 2, shakta: 1, saura: 1, kaumara: 1 } }, { label: 'I seek love over knowledge', scores: { vaishnava: 3, shakta: 2, ganapatya: 1, saura: 1, kaumara: 1, shaiva: 0, smarta: 0 } }] },
  { q: 'Do you seek discipline and self-control?', options: [{ label: 'Yes, discipline is essential', scores: { shaiva: 3, shakta: 2, smarta: 2, vaishnava: 1, ganapatya: 1, saura: 1, kaumara: 1 } }, { label: 'In balance', scores: { smarta: 2, shaiva: 1, shakta: 1, vaishnava: 1, ganapatya: 1, saura: 1, kaumara: 1 } }, { label: 'I prefer spontaneity', scores: { vaishnava: 2, shakta: 2, ganapatya: 2, saura: 1, kaumara: 1, shaiva: 0, smarta: 0 } }] },
  { q: 'Do you feel drawn to Ganesha?', options: [{ label: 'Yes, he is my primary deity', scores: { ganapatya: 3, smarta: 1, shakta: 0, vaishnava: 0, shaiva: 1, saura: 0, kaumara: 0 } }, { label: 'I worship him first', scores: { ganapatya: 2, smarta: 2, vaishnava: 1, shaiva: 1, shakta: 1, saura: 1, kaumara: 1 } }, { label: 'Not particularly', scores: { vaishnava: 2, shaiva: 2, shakta: 2, smarta: 1, ganapatya: 0, saura: 1, kaumara: 1 } }] },
  { q: 'Do you feel drawn to Surya (the Sun)?', options: [{ label: 'Yes, the Sun is central to my practice', scores: { saura: 3, smarta: 1, shakta: 0, vaishnava: 0, shaiva: 0, ganapatya: 0, kaumara: 0 } }, { label: 'I include Surya in worship', scores: { saura: 2, smarta: 2, vaishnava: 1, shaiva: 1, shakta: 1, ganapatya: 1, kaumara: 1 } }, { label: 'Not particularly', scores: { vaishnava: 2, shaiva: 2, shakta: 2, smarta: 1, ganapatya: 1, saura: 0, kaumara: 1 } }] },
  { q: 'Do you feel drawn to Kartikeya (Murugan)?', options: [{ label: 'Yes, he is my primary deity', scores: { kaumara: 3, smarta: 1, shakta: 0, vaishnava: 0, shaiva: 1, ganapatya: 0, saura: 0 } }, { label: 'I honor him', scores: { kaumara: 2, smarta: 2, shaiva: 1, vaishnava: 1, shakta: 1, ganapatya: 1, saura: 1 } }, { label: 'Not particularly', scores: { vaishnava: 2, shaiva: 2, shakta: 2, smarta: 1, ganapatya: 1, saura: 1, kaumara: 0 } }] },
  { q: 'Do you prefer a balanced approach to all deities?', options: [{ label: 'Yes, I honor all equally', scores: { smarta: 3, vaishnava: 1, shaiva: 1, shakta: 1, ganapatya: 1, saura: 1, kaumara: 1 } }, { label: 'I have a primary but respect all', scores: { smarta: 2, vaishnava: 1, shaiva: 1, shakta: 1, ganapatya: 1, saura: 1, kaumara: 1 } }, { label: 'I focus on one deity', scores: { vaishnava: 2, shaiva: 2, shakta: 2, ganapatya: 2, saura: 2, kaumara: 2, smarta: 0 } }] },
  { q: 'Do you feel drawn to fierce forms of the divine?', options: [{ label: 'Yes, I find them powerful', scores: { shakta: 3, shaiva: 2, smarta: 0, vaishnava: 0, ganapatya: 0, saura: 0, kaumara: 0 } }, { label: 'Somewhat', scores: { shakta: 1, shaiva: 1, smarta: 2, vaishnava: 1, ganapatya: 1, saura: 1, kaumara: 1 } }, { label: 'I prefer gentle forms', scores: { vaishnava: 3, ganapatya: 2, saura: 2, kaumara: 1, smarta: 1, shakta: 0, shaiva: 0 } }] },
  { q: 'Do you enjoy serving the deity (seva)?', options: [{ label: 'Yes, service is my path', scores: { vaishnava: 3, ganapatya: 2, shakta: 1, smarta: 1, shaiva: 0, saura: 1, kaumara: 1 } }, { label: 'Sometimes', scores: { smarta: 2, vaishnava: 1, ganapatya: 1, shakta: 1, shaiva: 1, saura: 1, kaumara: 1 } }, { label: 'I prefer meditation', scores: { shaiva: 3, shakta: 1, smarta: 1, vaishnava: 0, ganapatya: 0, saura: 0, kaumara: 0 } }] },
  { q: 'Do you feel drawn to the Sri Chakra or yantras?', options: [{ label: 'Yes, deeply', scores: { shakta: 3, smarta: 1, shaiva: 1, vaishnava: 0, ganapatya: 0, saura: 0, kaumara: 0 } }, { label: 'Curious', scores: { shakta: 1, smarta: 2, shaiva: 1, vaishnava: 1, ganapatya: 1, saura: 1, kaumara: 1 } }, { label: 'Not particularly', scores: { vaishnava: 2, shaiva: 2, ganapatya: 2, saura: 2, kaumara: 2, smarta: 1, shakta: 0 } }] },
  { q: 'Do you prefer reading scriptures or chanting?', options: [{ label: 'Reading scriptures', scores: { shaiva: 2, smarta: 2, vaishnava: 2, shakta: 1, ganapatya: 1, saura: 1, kaumara: 1 } }, { label: 'Chanting', scores: { vaishnava: 2, shakta: 2, ganapatya: 2, shaiva: 1, smarta: 1, saura: 1, kaumara: 2 } }, { label: 'Both equally', scores: { smarta: 3, vaishnava: 1, shaiva: 1, shakta: 1, ganapatya: 1, saura: 1, kaumara: 1 } }] },
  { q: 'Do you feel drawn to pilgrimage?', options: [{ label: 'Yes, temples are sacred to me', scores: { vaishnava: 2, shaiva: 2, shakta: 2, smarta: 2, ganapatya: 2, saura: 2, kaumara: 2 } }, { label: 'Sometimes', scores: { smarta: 2, vaishnava: 1, shaiva: 1, shakta: 1, ganapatya: 1, saura: 1, kaumara: 1 } }, { label: 'I prefer home practice', scores: { shaiva: 2, smarta: 1, shakta: 1, vaishnava: 1, ganapatya: 1, saura: 1, kaumara: 1 } }] },
  { q: 'Do you feel drawn to nature worship?', options: [{ label: 'Yes, nature is divine', scores: { saura: 3, shaiva: 2, shakta: 1, smarta: 1, vaishnava: 0, ganapatya: 0, kaumara: 0 } }, { label: 'Somewhat', scores: { smarta: 2, saura: 1, shaiva: 1, shakta: 1, vaishnava: 1, ganapatya: 1, kaumara: 1 } }, { label: 'I prefer temple worship', scores: { vaishnava: 2, ganapatya: 2, kaumara: 2, smarta: 1, shaiva: 1, shakta: 1, saura: 0 } }] },
  { q: 'Do you feel drawn to the formless divine?', options: [{ label: 'Yes, the formless is more real', scores: { shaiva: 3, smarta: 2, shakta: 0, vaishnava: 0, ganapatya: 0, saura: 0, kaumara: 0 } }, { label: 'Both form and formless', scores: { smarta: 3, shaiva: 1, shakta: 1, vaishnava: 1, ganapatya: 1, saura: 1, kaumara: 1 } }, { label: 'I need a personal form', scores: { vaishnava: 3, ganapatya: 2, shakta: 2, saura: 1, kaumara: 1, shaiva: 0, smarta: 0 } }] },
  { q: 'Do you enjoy fasting and austerities?', options: [{ label: 'Yes, they strengthen my practice', scores: { shaiva: 2, shakta: 3, smarta: 2, vaishnava: 1, ganapatya: 1, saura: 1, kaumara: 1 } }, { label: 'In moderation', scores: { smarta: 2, shaiva: 1, shakta: 1, vaishnava: 1, ganapatya: 1, saura: 1, kaumara: 1 } }, { label: 'I prefer joyful practice', scores: { vaishnava: 3, ganapatya: 2, saura: 1, kaumara: 1, smarta: 0, shaiva: 0, shakta: 0 } }] },
  { q: 'Do you feel drawn to the guru-disciple tradition?', options: [{ label: 'Yes, a Guru is essential', scores: { shaiva: 2, shakta: 3, smarta: 2, vaishnava: 1, ganapatya: 1, saura: 1, kaumara: 1 } }, { label: 'I am seeking a Guru', scores: { smarta: 2, shaiva: 1, shakta: 1, vaishnava: 1, ganapatya: 1, saura: 1, kaumara: 1 } }, { label: 'I prefer self-study', scores: { vaishnava: 2, shaiva: 1, smarta: 1, shakta: 0, ganapatya: 1, saura: 1, kaumara: 1 } }] },
  { q: 'Do you feel drawn to Kundalini and energy practices?', options: [{ label: 'Yes, I am very drawn', scores: { shakta: 3, shaiva: 2, smarta: 0, vaishnava: 0, ganapatya: 0, saura: 0, kaumara: 0 } }, { label: 'Curious but cautious', scores: { shakta: 1, shaiva: 1, smarta: 2, vaishnava: 1, ganapatya: 1, saura: 1, kaumara: 1 } }, { label: 'Not for me', scores: { vaishnava: 2, ganapatya: 2, saura: 2, kaumara: 2, smarta: 1, shaiva: 0, shakta: 0 } }] },
  { q: 'Do you feel drawn to the Bhagavad Gita?', options: [{ label: 'Yes, it is my primary text', scores: { vaishnava: 3, smarta: 2, shaiva: 1, shakta: 1, ganapatya: 0, saura: 0, kaumara: 0 } }, { label: 'I read it sometimes', scores: { smarta: 2, vaishnava: 1, shaiva: 1, shakta: 1, ganapatya: 1, saura: 1, kaumara: 1 } }, { label: 'I prefer other texts', scores: { shaiva: 2, shakta: 2, ganapatya: 2, saura: 2, kaumara: 2, smarta: 1, vaishnava: 0 } }] },
  { q: 'Do you feel drawn to the Devi Mahatmyam?', options: [{ label: 'Yes, it is my primary text', scores: { shakta: 3, smarta: 1, shaiva: 1, vaishnava: 0, ganapatya: 0, saura: 0, kaumara: 0 } }, { label: 'I read it during Navaratri', scores: { shakta: 1, smarta: 2, vaishnava: 1, shaiva: 1, ganapatya: 1, saura: 1, kaumara: 1 } }, { label: 'I prefer other texts', scores: { vaishnava: 2, shaiva: 2, ganapatya: 2, saura: 2, kaumara: 2, smarta: 1, shakta: 0 } }] },
  { q: 'Do you feel drawn to the Shiva Purana?', options: [{ label: 'Yes, it is my primary text', scores: { shaiva: 3, smarta: 1, shakta: 1, vaishnava: 0, ganapatya: 0, saura: 0, kaumara: 0 } }, { label: 'I read it sometimes', scores: { shaiva: 1, smarta: 2, shakta: 1, vaishnava: 1, ganapatya: 1, saura: 1, kaumara: 1 } }, { label: 'I prefer other texts', scores: { vaishnava: 2, shakta: 2, ganapatya: 2, saura: 2, kaumara: 2, smarta: 1, shaiva: 0 } }] },
  { q: 'Do you prefer morning or evening practice?', options: [{ label: 'Morning (Brahma Muhurta)', scores: { shaiva: 2, shakta: 1, smarta: 2, vaishnava: 2, ganapatya: 1, saura: 2, kaumara: 1 } }, { label: 'Evening', scores: { shakta: 2, vaishnava: 1, smarta: 1, shaiva: 1, ganapatya: 1, saura: 1, kaumara: 1 } }, { label: 'Both', scores: { smarta: 3, vaishnava: 1, shaiva: 1, shakta: 1, ganapatya: 1, saura: 1, kaumara: 1 } }] },
  { q: 'Do you feel drawn to the concept of grace (prasada)?', options: [{ label: 'Yes, grace is everything', scores: { vaishnava: 3, ganapatya: 2, shakta: 1, smarta: 1, shaiva: 0, saura: 1, kaumara: 1 } }, { label: 'Grace plus effort', scores: { smarta: 2, vaishnava: 1, shaiva: 1, shakta: 1, ganapatya: 1, saura: 1, kaumara: 1 } }, { label: 'I believe in self-effort', scores: { shaiva: 3, shakta: 2, smarta: 1, vaishnava: 0, ganapatya: 0, saura: 0, kaumara: 0 } }] },
  { q: 'Do you feel drawn to the concept of self-surrender (prapatti)?', options: [{ label: 'Yes, surrender is my path', scores: { vaishnava: 3, shakta: 1, smarta: 1, shaiva: 0, ganapatya: 1, saura: 0, kaumara: 0 } }, { label: 'I am learning to surrender', scores: { smarta: 2, vaishnava: 1, shaiva: 1, shakta: 1, ganapatya: 1, saura: 1, kaumara: 1 } }, { label: 'I prefer self-effort', scores: { shaiva: 3, shakta: 2, smarta: 1, vaishnava: 0, ganapatya: 0, saura: 0, kaumara: 0 } }] },
  { q: 'Do you feel drawn to Tantric philosophy (not practice)?', options: [{ label: 'Yes, the philosophy resonates', scores: { shakta: 2, shaiva: 3, smarta: 1, vaishnava: 0, ganapatya: 0, saura: 0, kaumara: 0 } }, { label: 'I am curious academically', scores: { smarta: 2, shaiva: 1, shakta: 1, vaishnava: 1, ganapatya: 1, saura: 1, kaumara: 1 } }, { label: 'Not particularly', scores: { vaishnava: 2, ganapatya: 2, saura: 2, kaumara: 2, smarta: 1, shaiva: 0, shakta: 0 } }] },
  { q: 'Do you feel drawn to community worship (satsang)?', options: [{ label: 'Yes, satsang is important', scores: { vaishnava: 3, ganapatya: 2, saura: 2, kaumara: 2, smarta: 1, shaiva: 0, shakta: 1 } }, { label: 'Sometimes', scores: { smarta: 2, vaishnava: 1, shaiva: 1, shakta: 1, ganapatya: 1, saura: 1, kaumara: 1 } }, { label: 'I prefer solitary practice', scores: { shaiva: 3, shakta: 2, smarta: 1, vaishnava: 0, ganapatya: 0, saura: 0, kaumara: 0 } }] },
  { q: 'Do you feel drawn to the concept of lila (divine play)?', options: [{ label: 'Yes, the world is divine play', scores: { vaishnava: 3, shakta: 1, smarta: 1, shaiva: 0, ganapatya: 1, saura: 0, kaumara: 0 } }, { label: 'I understand the concept', scores: { smarta: 2, vaishnava: 1, shaiva: 1, shakta: 1, ganapatya: 1, saura: 1, kaumara: 1 } }, { label: 'I see the world as maya', scores: { shaiva: 3, shakta: 1, smarta: 1, vaishnava: 0, ganapatya: 0, saura: 0, kaumara: 0 } }] },
  { q: 'Do you feel drawn to the concept of Shakti (divine energy)?', options: [{ label: 'Yes, Shakti is central', scores: { shakta: 3, shaiva: 1, smarta: 1, vaishnava: 0, ganapatya: 0, saura: 0, kaumara: 0 } }, { label: 'I acknowledge Shakti', scores: { smarta: 2, shakta: 1, shaiva: 1, vaishnava: 1, ganapatya: 1, saura: 1, kaumara: 1 } }, { label: 'I focus on consciousness (Shiva)', scores: { shaiva: 3, smarta: 1, shakta: 0, vaishnava: 0, ganapatya: 0, saura: 0, kaumara: 0 } }] },
  { q: 'Do you feel drawn to the concept of Dharma as cosmic order?', options: [{ label: 'Yes, Dharma is my guiding principle', scores: { smarta: 3, vaishnava: 2, shaiva: 1, shakta: 1, ganapatya: 1, saura: 1, kaumara: 1 } }, { label: 'I try to follow Dharma', scores: { smarta: 2, vaishnava: 1, shaiva: 1, shakta: 1, ganapatya: 1, saura: 1, kaumara: 1 } }, { label: 'I focus on liberation over Dharma', scores: { shaiva: 2, shakta: 2, smarta: 0, vaishnava: 0, ganapatya: 0, saura: 0, kaumara: 0 } }] },
  { q: 'Do you feel drawn to the concept of Bhakti as supreme love?', options: [{ label: 'Yes, love is the highest path', scores: { vaishnava: 3, ganapatya: 2, shakta: 1, smarta: 1, shaiva: 0, saura: 1, kaumara: 1 } }, { label: 'Bhakti is important to me', scores: { smarta: 2, vaishnava: 1, shaiva: 1, shakta: 1, ganapatya: 1, saura: 1, kaumara: 1 } }, { label: 'I prefer Jnana over Bhakti', scores: { shaiva: 3, smarta: 1, shakta: 0, vaishnava: 0, ganapatya: 0, saura: 0, kaumara: 0 } }] },
  { q: 'Do you feel drawn to the concept of Jnana (self-knowledge)?', options: [{ label: 'Yes, self-knowledge is the goal', scores: { shaiva: 3, smarta: 2, shakta: 1, vaishnava: 0, ganapatya: 0, saura: 0, kaumara: 0 } }, { label: 'Jnana is important alongside Bhakti', scores: { smarta: 2, shaiva: 1, vaishnava: 1, shakta: 1, ganapatya: 1, saura: 1, kaumara: 1 } }, { label: 'I prefer devotion over inquiry', scores: { vaishnava: 3, ganapatya: 2, shakta: 2, saura: 1, kaumara: 1, shaiva: 0, smarta: 0 } }] },
];

export function PathfinderPage() {
  const [stage, setStage] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [result, setResult] = useState<{ sorted: [string, number][]; total: number } | null>(null);

  const answer = (optionScores: Record<string, number>) => {
    const newScores = { ...scores };
    for (const k in optionScores) newScores[k] = (newScores[k] || 0) + optionScores[k];
    setScores(newScores);
    if (stage < QUESTIONS.length - 1) setStage(stage + 1);
    else {
      const sorted = Object.entries(newScores).sort((a, b) => b[1] - a[1]);
      const total = Object.values(newScores).reduce((a, b) => a + b, 0) || 1;
      setResult({ sorted, total });
    }
  };

  const restart = () => { setStage(0); setScores({}); setResult(null); };

  if (result) {
    const top = result.sorted[0];
    const topTradition = top[0];
    const affinity = Math.round((top[1] / result.total) * 100);
    const base = PATH_RESULTS.find((p) => p.tradition === topTradition);
    const labels: Record<string, string> = {
      vaishnava: 'Vaishnava (Bhakti)', shaiva: 'Shaiva (Jnana)', shakta: 'Shakta (Shakti)', smarta: 'Smarta (Balanced)',
      ganapatya: 'Ganapatya (Ganesha)', saura: 'Saura (Surya)', kaumara: 'Kaumara (Kartikeya)',
    };
    const maxScore = Math.max(...result.sorted.map(([, v]) => v));
    // Radar chart points
    const angles = result.sorted.map((_, i) => (i / result.sorted.length) * 2 * Math.PI - Math.PI / 2);
    const points = result.sorted.map(([, v], i) => {
      const r = (v / maxScore) * 80;
      const x = 100 + r * Math.cos(angles[i]);
      const y = 100 + r * Math.sin(angles[i]);
      return `${x},${y}`;
    });
    const labelPoints = result.sorted.map((_, i) => {
      const x = 100 + 95 * Math.cos(angles[i]);
      const y = 100 + 95 * Math.sin(angles[i]);
      return { x, y };
    });

    return (
      <div className="space-y-6 animate-fadeIn max-w-3xl mx-auto">
        <div className="card p-8 text-center">
          <div className="h-16 w-16 rounded-full bg-gold/15 flex items-center justify-center mx-auto mb-4">
            <Check className="h-8 w-8 text-accent" />
          </div>
          <h1 className="section-title text-2xl text-accent mb-2">Your Spiritual Path</h1>
          <p className="text-muted text-sm mb-6">{labels[topTradition] || topTradition} — {affinity}% primary affinity</p>

          {/* Radar chart */}
          <div className="flex justify-center mb-6">
            <svg viewBox="0 0 200 200" className="w-64 h-64">
              {/* Grid circles */}
              {[20, 40, 60, 80].map((r) => (
                <circle key={r} cx="100" cy="100" r={r} fill="none" stroke="var(--border)" strokeWidth="0.5" />
              ))}
              {/* Axes */}
              {angles.map((a, i) => (
                <line key={i} x1="100" y1="100" x2={100 + 80 * Math.cos(a)} y2={100 + 80 * Math.sin(a)} stroke="var(--border)" strokeWidth="0.5" />
              ))}
              {/* Data polygon */}
              <polygon points={points.join(' ')} fill="var(--accent)" fillOpacity="0.2" stroke="var(--accent)" strokeWidth="1.5" />
              {/* Labels */}
              {result.sorted.map(([k, v], i) => (
                <text key={k} x={labelPoints[i].x} y={labelPoints[i].y} textAnchor="middle" dominantBaseline="middle" className="fill-[var(--muted)]" style={{ fontSize: '6px', fontWeight: 'bold' }}>
                  {labels[k]?.split(' ')[0] || k}
                </text>
              ))}
            </svg>
          </div>

          {/* Scores */}
          <div className="space-y-2 mb-6 text-left">
            {result.sorted.map(([k, v]) => {
              const pct = Math.round((v / result.total) * 100);
              return (
                <div key={k} className="flex items-center gap-3">
                  <span className="text-xs text-muted w-32 text-right">{labels[k] || k}</span>
                  <div className="flex-1 relative h-2 rounded-full bg-card2 overflow-hidden">
                    <div className="absolute inset-y-0 left-0 bg-gold rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="text-xs text-accent w-8">{pct}%</span>
                </div>
              );
            })}
          </div>

          {base && (
            <>
              <p className="text-sm leading-relaxed mb-6 text-left">{base.description}</p>
              <div className="card-2 p-4 mb-4 text-left">
                <h3 className="text-xs font-semibold text-accent uppercase tracking-wide mb-2">Starting Mantra</h3>
                <p className="text-sm">{base.startingMantra}</p>
              </div>
              <div className="card-2 p-4 text-left">
                <h3 className="text-xs font-semibold text-accent uppercase tracking-wide mb-2">Suggested Readings</h3>
                <ul className="text-sm space-y-1 list-disc list-inside text-muted">{base.readings.map((r, i) => <li key={i}>{r}</li>)}</ul>
              </div>
            </>
          )}

          <button onClick={restart} className="btn-ghost mt-6 px-5 py-2.5 text-sm flex items-center gap-2 mx-auto">
            <RotateCcw className="h-4 w-4" /> Retake Assessment
          </button>
        </div>
      </div>
    );
  }

  const q = QUESTIONS[stage];
  return (
    <div className="space-y-6 animate-fadeIn max-w-2xl mx-auto">
      <div className="text-center">
        <h1 className="section-title text-3xl text-accent mb-2">Path Discovery</h1>
        <p className="text-muted text-sm">A {QUESTIONS.length}-question assessment of your spiritual temperament across 7 traditions.</p>
      </div>
      <div className="flex items-center gap-1">
        {QUESTIONS.map((_, i) => (<div key={i} className={`h-1 flex-1 rounded-full ${i <= stage ? 'bg-gold' : 'bg-card2'}`} />))}
      </div>
      <p className="text-xs text-muted text-center">Question {stage + 1} of {QUESTIONS.length}</p>
      <div className="card p-6">
        <h2 className="text-lg font-semibold mb-6">{q.q}</h2>
        <div className="space-y-3">
          {q.options.map((opt, i) => (
            <button key={i} onClick={() => answer(opt.scores)} className="card-2 p-4 w-full text-left hover:border-[var(--accent)] transition-all flex items-center justify-between group">
              <span className="text-sm">{opt.label}</span>
              <ArrowRight className="h-4 w-4 text-muted group-hover:text-accent transition-colors" />
            </button>
          ))}
        </div>
      </div>
      {stage > 0 && (
        <button onClick={() => setStage(stage - 1)} className="btn-ghost px-4 py-2 text-sm flex items-center gap-2 mx-auto">
          <RotateCcw className="h-4 w-4" /> Previous Question
        </button>
      )}
    </div>
  );
}
