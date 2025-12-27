
import React, { useState, lazy, Suspense } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { UserProgressProvider, useUserProgress } from './context/UserProgressContext';
import Sidebar from './components/layout/Sidebar';
import MobileHeader from './components/layout/MobileHeader';
import LoginPage from './components/pages/LoginPage';
import AvatarSelectionModal from './components/ui/AvatarSelectionModal';

// Lazy load pages for code splitting
const HomePage = lazy(() => import('./components/pages/HomePage'));
const FlashcardsPage = lazy(() => import('./components/pages/FlashcardsPage'));
const StoryLibraryPage = lazy(() => import('./components/pages/StoryLibraryPage'));
const ProgressPage = lazy(() => import('./components/pages/ProgressPage'));
const StoryPlayerPage = lazy(() => import('./components/pages/StoryPlayerPage'));
const BadgesPage = lazy(() => import('./components/pages/BadgesPage'));
const RecordingReviewPage = lazy(() => import('./components/pages/RecordingReviewPage'));
const ParentDashboardPage = lazy(() => import('./components/pages/ParentDashboardPage'));
const CommunityPage = lazy(() => import('./components/pages/CommunityPage'));
const AssetManifestPage = lazy(() => import('./components/pages/AssetManifestPage'));
const AssessmentsPage = lazy(() => import('./components/pages/AssessmentsPage'));
const PrintablesPage = lazy(() => import('./components/pages/PrintablesPage'));

// Simple loading fallback
const PageLoader = () => (
  <div className="flex-1 flex items-center justify-center min-h-[60vh]">
    <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

const AppRouter: React.FC = () => {
  const { progress, isAuthenticated, setAvatar } = useUserProgress();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const showAvatarModal = isAuthenticated && !progress.avatarId;

  return (
    <HashRouter>
      <div className="min-h-screen flex">
        <Sidebar isSidebarOpen={isSidebarOpen} closeSidebar={() => setIsSidebarOpen(false)} />
        <div className="main-content flex-1 flex flex-col">
          <MobileHeader onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
          <main className="flex-1 overflow-auto p-4 sm:p-6">
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/flashcards" element={<FlashcardsPage />} />
                <Route path="/stories" element={<StoryLibraryPage />} />
                <Route path="/story/:storyId" element={<StoryPlayerPage />} />
                <Route path="/progress" element={<ProgressPage />} />
                <Route path="/badges" element={<BadgesPage />} />
                <Route path="/recordings" element={<RecordingReviewPage />} />
                <Route path="/dashboard" element={<ParentDashboardPage />} />
                <Route path="/community" element={<CommunityPage />} />
                <Route path="/assessments" element={<AssessmentsPage />} />
                <Route path="/printables" element={<PrintablesPage />} />
                <Route path="/asset-manifest" element={<AssetManifestPage />} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </div>
      {!isAuthenticated && <LoginPage />}
      {showAvatarModal && <AvatarSelectionModal onAvatarSelect={setAvatar} userName={progress.displayName} />}
    </HashRouter>
  );
};

const App: React.FC = () => {
  return (
    <UserProgressProvider>
      <AppRouter />
    </UserProgressProvider>
  );
};

export default App;
