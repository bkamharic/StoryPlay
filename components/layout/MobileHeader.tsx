import React from 'react';
import { Menu, LogOut } from 'lucide-react';
import { useUserProgress } from '../../context/UserProgressContext';

interface MobileHeaderProps {
  onToggleSidebar: () => void;
}

const MobileHeader: React.FC<MobileHeaderProps> = ({ onToggleSidebar }) => {
  const { logout } = useUserProgress();
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b-2 border-amber-200 px-6 py-4 lg:hidden shadow-sm sticky top-0 z-10">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button onClick={onToggleSidebar} className="hover:bg-orange-100 p-2 rounded-lg transition-colors duration-200">
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent">
            StoryPlay
          </h1>
        </div>
        <button onClick={logout} className="hover:bg-orange-100 p-2 rounded-lg transition-colors" title="Logout">
          <LogOut className="w-6 h-6 text-gray-700" />
        </button>
      </div>
    </header>
  );
};

export default MobileHeader;