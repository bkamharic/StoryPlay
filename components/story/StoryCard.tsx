import React from 'react';
import { NavLink } from 'react-router-dom';
import { Story, Level } from '../../types';
import { getAsset } from '../../data/assets';

interface StoryCardProps {
    story: Story;
}

const levelDisplayInfo: { [key in Level]: string } = {
  [Level.Beginner4_6]: 'Beginner',
  [Level.Emerging7_9]: 'Emerging',
  [Level.FluentPrep10_12]: 'FluentPrep',
};

const StoryCard: React.FC<StoryCardProps> = ({ story }) => {
    const coverAsset = getAsset(story.coverImageId);

    return (
        <NavLink to={`/story/${story.id}`} className="block h-full">
            <div className="bg-white hover:shadow-xl transition-all cursor-pointer border-2 border-orange-200 rounded-lg overflow-hidden group h-full flex flex-col">
                {/* Updated Image Container with 3D White Card Style - Matches StoryPlayerPage */}
                <div className="aspect-[4/3] w-full bg-amber-50 relative overflow-hidden flex items-center justify-center p-4">
                    <div className="w-full h-full bg-white rounded-3xl shadow-[0_10px_0_#d6f5d6] border-4 border-white relative overflow-hidden flex items-center justify-center transform transition-transform duration-300 group-hover:scale-105">
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
                    <div className="absolute top-2 right-2 z-10">
                        <span className="bg-white/90 text-gray-800 px-2 py-1 rounded-md text-sm font-medium border border-gray-100 shadow-sm">
                            {levelDisplayInfo[story.level]}
                        </span>
                    </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                    <h3 className="font-bold font-amharic-pretty text-lg text-gray-800 mb-2 line-clamp-2">
                       {story.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                        {story.targetWords.length} new words · {story.scenes.length} scenes
                    </p>
                    <div className="mt-auto">
                        <div className="w-full button-gradient hover:button-gradient text-white py-2 rounded-lg font-medium flex items-center justify-center transition-colors">
                            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                            Start Story
                        </div>
                    </div>
                </div>
            </div>
        </NavLink>
    );
};

export default StoryCard;