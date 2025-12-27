
import React, { useState, useEffect } from 'react';
import { useUserProgress } from '../../context/UserProgressContext';
import { badges } from '../../data/badges';
import { Badge as BadgeType, Rarity } from '../../types';
import DynamicIcon from '../ui/DynamicIcon';
import { Award, Lock, CheckCircle, Star, HelpCircle } from 'lucide-react';

const rarityStyles: { [key in Rarity]: { gradient: string; border: string; badge: string } } = {
  [Rarity.Common]: { gradient: "common-gradient", border: "common-border", badge: "bg-gray-200 text-gray-800" },
  [Rarity.Rare]: { gradient: "rare-gradient", border: "rare-border", badge: "bg-blue-200 text-blue-800" },
  [Rarity.Epic]: { gradient: "epic-gradient", border: "epic-border", badge: "bg-purple-200 text-purple-800" },
  [Rarity.Legendary]: { gradient: "legendary-gradient", border: "legendary-border", badge: "bg-yellow-200 text-yellow-800" },
};

const BadgeSkeletonCard: React.FC = () => (
  <div className="bg-gray-100 border-2 border-gray-300 rounded-xl overflow-hidden pulse">
    <div className="p-6 text-center">
      <div className="w-24 h-24 mx-auto bg-gray-300 rounded-full mb-4"></div>
      <div className="h-6 bg-gray-300 rounded mb-2"></div>
      <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto mb-3"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto mb-4"></div>
      <div className="h-10 bg-gray-300 rounded"></div>
    </div>
  </div>
);

const BadgeCard: React.FC<{ badge: BadgeType; isEarned: boolean; index: number }> = ({ badge, isEarned, index }) => {
  const styles = rarityStyles[badge.rarity];

  return (
    <div className={`transition-all overflow-hidden rounded-xl fade-in h-full`} style={{ animationDelay: `${index * 0.05}s` }}>
      {isEarned ? (
        <div className={`bg-white hover:shadow-2xl border-4 ${styles.border} rounded-xl h-full flex flex-col`}>
          <div className="p-6 text-center flex-grow">
            <div className="relative mb-4">
              <div className={`w-24 h-24 mx-auto ${styles.gradient} rounded-full flex items-center justify-center shadow-xl`}>
                <DynamicIcon source={{ iconName: badge.iconId }} className="w-16 h-16 text-white" />
              </div>
              {badge.rarity === Rarity.Legendary && (
                <div className="absolute inset-0 mx-auto w-24 h-24 spin" style={{ animation: 'spin 20s linear infinite' }}>
                  <Star className="w-6 h-6 text-yellow-400 absolute top-0 left-1/2 -translate-x-1/2" fill="currentColor" />
                </div>
              )}
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{badge.name}</h3>
            <span className={`inline-block ${styles.badge} px-3 py-1 rounded-md text-sm font-medium mb-3`}>
              {badge.rarity}
            </span>
            <p className="text-sm text-gray-600">{badge.criteria.description}</p>
          </div>
          <div className="mt-auto p-4 border-t border-gray-200">
            <p className="text-xs text-green-600 font-semibold flex items-center justify-center gap-1">
              <CheckCircle size={14} /> Earned!
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-gray-100 opacity-60 border-2 border-gray-300 rounded-xl h-full flex flex-col">
          <div className="p-6 text-center flex-grow">
            <div className="w-24 h-24 mx-auto bg-gray-300 rounded-full flex items-center justify-center mb-4">
              <Lock className="w-12 h-12 text-gray-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{badge.name}</h3>
            <span className={`inline-block ${styles.badge} px-3 py-1 rounded-md text-sm font-medium mb-3`}>
              {badge.rarity}
            </span>
            <p className="text-sm text-gray-600">{badge.criteria.description}</p>
          </div>
          <div className="mt-auto p-4 border-t border-gray-200">
            <p className="text-xs text-gray-500 font-semibold flex items-center justify-center gap-1">
              <Lock size={12} /> Locked
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

const BadgesPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { progress } = useUserProgress();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    document.body.classList.add('gradient-bg');
    document.body.classList.remove('bg-gradient-to-br', 'from-amber-50', 'via-orange-50', 'to-red-50');
    return () => {
      clearTimeout(timer);
      document.body.classList.remove('gradient-bg');
      document.body.classList.add('bg-gradient-to-br', 'from-amber-50', 'via-orange-50', 'to-red-50');
    };
  }, []);

  const earnedCount = progress.badges.length;
  const totalCount = badges.length;
  const progressPercent = totalCount > 0 ? (earnedCount / totalCount) * 100 : 0;

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="fade-in">
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
            <Award className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 font-amharic">የእርስዎ ሽልማቶች</h1>
            <p className="text-lg text-gray-600">Your Badges & Achievements</p>
          </div>
        </div>
        <p className="text-gray-600">
          You've earned {earnedCount} out of {totalCount} badges. Keep learning to unlock more!
        </p>
      </div>

      <div className="bg-white/80 backdrop-blur-sm border-2 border-orange-200 rounded-xl">
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-lg font-semibold text-gray-800">Overall Progress</span>
            <span className="text-2xl font-bold text-orange-600">{earnedCount}/{totalCount}</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div className="bg-orange-500 h-3 rounded-full transition-all duration-500" style={{ width: `${progressPercent}%` }}></div>
          </div>
        </div>
      </div>

      <div>
        {isLoading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => <BadgeSkeletonCard key={i} />)}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {badges.map((badge, index) => (
              <BadgeCard
                key={badge.id}
                badge={badge}
                isEarned={progress.badges.some(b => b.badgeId === badge.id)}
                index={index}
              />
            ))}
          </div>
        )}
      </div>

      <div className="bg-white/80 backdrop-blur-sm border-2 border-purple-200 rounded-xl">
        <div className="p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-purple-600" />
            Badge Rarity
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.values(Rarity).map(rarity => (
              <div key={rarity} className="flex items-center gap-2">
                <div className={`w-8 h-8 ${rarityStyles[rarity].gradient} rounded-lg`}></div>
                <span className="font-medium text-gray-700">{rarity}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BadgesPage;
