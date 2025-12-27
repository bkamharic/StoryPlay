
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, BookOpen, Layers, Award, User, Mic, BarChart3, Star, CheckCircle, Users, Archive, ClipboardCheck, LogOut, Printer } from 'lucide-react';
import { useUserProgress } from '../../context/UserProgressContext';
import { avatars } from '../../data/avatars';
import DynamicIcon from '../ui/DynamicIcon';

interface SidebarProps {
  isSidebarOpen: boolean;
  closeSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, closeSidebar }) => {
  const { progress, logout } = useUserProgress();
  const points = progress.adaptiveScore;

  const navItems = [
    { to: '/', amharic: 'ቤት', english: 'Home', icon: Home, color: 'text-red-500' },
    { to: '/stories', amharic: 'ታሪኮች', english: 'Stories', icon: BookOpen, color: 'text-orange-500' },
    { to: '/flashcards', amharic: 'ካርዶች', english: 'Flashcards', icon: Layers, color: 'text-yellow-500' },
    { to: '/printables', amharic: 'ተግባራት እና የሚታተሙ', english: 'Activities', icon: Printer, color: 'text-cyan-500' },
    { to: '/dashboard', amharic: 'ዳሽቦርድ', english: 'Dashboard', icon: BarChart3, color: 'text-green-500' },
    { to: '/community', amharic: 'ማህበረሰብ', english: 'Community', icon: Users, color: 'text-blue-500' },
    { to: '/badges', amharic: 'ሽልማቶች', english: 'Badges', icon: Award, color: 'text-purple-500' },
    { to: '/recordings', amharic: 'ቀረጻዎች', english: 'Recordings', icon: Mic, color: 'text-pink-500' },
    { to: '/assessments', amharic: 'ግምገማዎች', english: 'Assessments', icon: ClipboardCheck, color: 'text-teal-500' },
    { to: '/asset-manifest', amharic: 'የንብረት ዝርዝር', english: 'Asset Manifest', icon: Archive, color: 'text-indigo-500' },
  ];

  // Increased padding for better touch target and spacing
  const commonLinkClasses = "flex items-center gap-4 px-4 py-3.5 rounded-xl mb-1.5 transition-all duration-200";
  const activeLinkClasses = "active-link shadow-md";
  const inactiveLinkClasses = "text-gray-700 hover:bg-orange-100 hover:text-red-700";

  const selectedAvatar = avatars.find(a => a.id === progress.avatarId);

  return (
    <aside className={`sidebar fixed lg:relative w-72 h-full bg-gradient-to-b from-[#FFF8F0] to-amber-50 border-r-2 border-amber-200 z-20 ${isSidebarOpen ? '' : 'closed'}`}>
      <div className="border-b-2 border-amber-200 p-6 bg-gradient-to-br from-red-600 to-orange-600">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 bg-yellow-400 rounded-2xl flex items-center justify-center shadow-lg transform">
            <BookOpen className="w-8 h-8 text-red-700" />
          </div>
          <div>
            <h2 className="font-bold text-2xl text-white">StoryPlay</h2>
            <p className="text-sm text-yellow-100 font-amharic-pretty font-semibold">የአማርኛ ታሪኮች</p>
          </div>
        </div>
      </div>

      <div className="p-4 h-[calc(100%-200px)] overflow-y-auto scroll-container">
        <div className="mb-8">
          <div className="text-sm font-bold text-orange-800 uppercase tracking-wider px-3 py-3 font-amharic-pretty mb-1">
            ዝርዝር · Navigation
          </div>
          <nav className="space-y-2">
            {navItems.map(item => (
              <NavLink
                key={item.to}
                to={item.to}
                end
                onClick={closeSidebar}
                className={({ isActive }) => `${commonLinkClasses} ${isActive ? activeLinkClasses : inactiveLinkClasses}`}
              >
                {({ isActive }) => (
                  <>
                    <item.icon className={`w-6 h-6 flex-shrink-0 ${isActive ? '' : item.color}`} strokeWidth={2.5} />
                    <div className="flex flex-col">
                      <span className="font-bold text-lg font-amharic-pretty leading-tight">{item.amharic}</span>
                      <span className="text-sm opacity-90 font-medium">{item.english}</span>
                    </div>
                  </>
                )}
              </NavLink>
            ))}
          </nav>
        </div>
        
        <div className="mt-6">
          <div className="text-sm font-bold text-green-800 uppercase tracking-wider px-3 py-3 font-amharic-pretty mb-1">
            እድገት · Progress
          </div>
          <div className="px-4 py-4 space-y-4 bg-white/60 border border-amber-100 rounded-2xl mx-1 shadow-sm">
            <ProgressItem icon={Star} value={points} label="ነጥብ · Score" color="green" />
            <ProgressItem icon={CheckCircle} value={progress.badges.length} label="ሽልማቶች · Badges" color="orange" />
          </div>
        </div>
      </div>

      <div className="border-t-2 border-amber-200 p-4 bg-gradient-to-br from-amber-100 to-orange-100 absolute bottom-0 w-full shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-md overflow-hidden border-2 border-white flex-shrink-0">
            {selectedAvatar ? (
              <DynamicIcon 
                  source={{ openMojiCode: selectedAvatar.openMojiCode, imageId: selectedAvatar.assetId }} 
                  className="w-full h-full object-contain p-1"
              />
            ) : (
              <User className="text-white w-6 h-6" />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-gray-800 text-base truncate font-amharic">{progress.displayName}</p>
            <p className="text-xs text-gray-600 font-semibold truncate">Ready to learn!</p>
          </div>
          <button onClick={logout} className="text-gray-500 hover:text-red-600 hover:bg-red-50 p-2 rounded-lg transition-colors" title="Logout">
            <LogOut className="w-6 h-6" />
          </button>
        </div>
      </div>
    </aside>
  );
};

const ProgressItem: React.FC<{icon: React.ElementType, value: number, label: string, color: 'green' | 'orange'}> = ({ icon: Icon, value, label, color}) => (
    <div className="flex items-center gap-3">
        <div className={`w-10 h-10 ${color === 'green' ? 'bg-gradient-to-br from-green-400 to-emerald-500' : 'bg-gradient-to-br from-yellow-400 to-orange-500'} rounded-xl flex items-center justify-center shadow-sm`}>
            <Icon className="w-6 h-6 text-white" />
        </div>
        <div>
            <p className="text-xs font-bold text-gray-500 font-amharic-pretty uppercase tracking-wide">{label}</p>
            <p className={`font-extrabold text-xl ${color === 'green' ? 'text-green-700' : 'text-orange-700'}`}>{value}</p>
        </div>
    </div>
);


export default Sidebar;
