import React from 'react';
import { NavLink } from 'react-router-dom';
import { Story, Level } from '../../types';
import { getAsset } from '../../data/assets';

interface StoryLibraryCardProps {
  story: Story;
  index: number;
}

const levelDisplayInfo: { [key in Level]: { name: string; colors: string } } = {
  [Level.Beginner4_6]: {
    name: 'Beginner (4-6)',
    colors: 'bg-green-100 text-green-800 border-green-300',
  },
  [Level.Emerging7_9]: {
    name: 'Emerging (7-9)',
    colors: 'bg-blue-100 text-blue-800 border-blue-300',
  },
  [Level.FluentPrep10_12]: {
    name: 'Fluent (10-12)',
    colors: 'bg-purple-100 text-purple-800 border-purple-300',
  },
};

const StoryLibraryCard: React.FC<StoryLibraryCardProps> = ({ story, index }) => {
  const levelInfo = levelDisplayInfo[story.level] || levelDisplayInfo[Level.Beginner4_6];
  const coverAsset = getAsset(story.coverImageId);

  return (
    <div className="h-full fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
      <NavLink to={`/story/${story.id}`} className="block h-full">
        <div className="bg-white hover:shadow-2xl transition-all cursor-pointer border-2 border-orange-200 rounded-xl overflow-hidden group h-full flex flex-col">
          <div className="aspect-[4/3] w-full bg-amber-50 relative overflow-hidden flex items-center justify-center p-4">
             <div className="w-full h-full bg-white rounded-3xl shadow-[0_10px_0_#e5e7eb] border-4 border-white relative overflow-hidden flex items-center justify-center transform transition-transform duration-300 group-hover:scale-105">
                {coverAsset ? (
                    <img 
                        src={coverAsset.url} 
                        alt={story.title} 
                        className="w-full h-full object-contain"
                        referrerPolicy="no-referrer"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-400">
                        No Cover
                    </div>
                )}
            </div>
            <div className="absolute top-2 left-2 right-2 flex justify-between items-start z-10 px-2">
              <span className={`${levelInfo.colors} border px-2 py-1 rounded-md text-sm font-medium shadow-sm`}>
                {levelInfo.name}
              </span>
              <span className="bg-white/90 text-gray-800 px-2 py-1 rounded-md text-sm font-medium border border-gray-100 shadow-sm">
                {story.scenes.length} scenes
              </span>
            </div>
          </div>
          <div className="p-6 flex flex-col flex-grow">
            <h3 className="font-bold text-xl text-gray-800 mb-3 line-clamp-2 min-h-[56px] font-amharic-pretty">
              {story.title}
            </h3>
            <div className="space-y-2 mb-4 text-sm text-gray-600 font-medium">
              {story.grammarFocus && <p><span className="text-orange-600 font-bold">Focus:</span> {story.grammarFocus}</p>}
              <p><span className="text-orange-600 font-bold">Words:</span> {story.targetWords.length} new vocabulary</p>
            </div>
            <div className="mt-auto">
              <div className="w-full button-gradient hover:button-gradient text-white shadow-md py-3 rounded-xl font-bold flex items-center justify-center transition-all transform group-hover:translate-y-[-2px]">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                START ADVENTURE
              </div>
            </div>
          </div>
        </div>
      </NavLink>
    </div>
  );
};

export default StoryLibraryCard;