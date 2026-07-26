import { useState, useEffect } from 'react';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Header } from '@/components/Header';
import { Sidebar, BottomNav } from '@/components/Navigation';
import { HomePage } from '@/pages/HomePage';
import { KnowledgePage } from '@/pages/KnowledgePage';
import { UpasanaPage } from '@/pages/UpasanaPage';
import { LibraryPage } from '@/pages/LibraryPage';
import { ToolsPage } from '@/pages/ToolsPage';
import { JapaPage } from '@/pages/JapaPage';
import { PathfinderPage } from '@/pages/PathfinderPage';
import { ArenaPage } from '@/pages/ArenaPage';
import { PronunciationPage } from '@/pages/PronunciationPage';
import { MythBusterPage } from '@/pages/MythBusterPage';
import type { View } from '@/types';

function AppContent() {
  const [view, setView] = useState<View>('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [canInstall, setCanInstall] = useState(false);
  useEffect(() => { if ('serviceWorker' in navigator) { navigator.serviceWorker.register('/sw.js').catch(() => {}); } const handler = () => setCanInstall(true); window.addEventListener('beforeinstallprompt', handler); return () => window.removeEventListener('beforeinstallprompt', handler); }, []);
  const navigate = (v: View) => { setView(v); setSearchQuery(''); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const renderView = () => { switch (view) { case 'home': return <HomePage onNavigate={navigate} />; case 'knowledge': return <KnowledgePage searchQuery={searchQuery} />; case 'upasana': return <UpasanaPage onNavigate={navigate} />; case 'library': return <LibraryPage searchQuery={searchQuery} />; case 'tools': return <ToolsPage onNavigate={navigate} />; case 'japa': return <JapaPage />; case 'pathfinder': return <PathfinderPage />; case 'arena': return <ArenaPage />; case 'pronunciation': return <PronunciationPage />; case 'mythbuster': return <MythBusterPage />; default: return <HomePage onNavigate={navigate} />; } };
  return (
    <div className="min-h-screen flex flex-col">
      <Header onSearch={setSearchQuery} searchQuery={searchQuery} canInstall={canInstall} />
      <div className="flex flex-1">
        <Sidebar view={view} onNavigate={navigate} />
        <main className="flex-1 min-w-0 px-4 py-6 pb-24 lg:pb-8 max-w-5xl mx-auto w-full">{renderView()}</main>
      </div>
      <BottomNav view={view} onNavigate={navigate} />
    </div>
  );
}

export default function App() {
  return (<ThemeProvider><AppContent /></ThemeProvider>);
}
