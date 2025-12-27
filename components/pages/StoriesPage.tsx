

import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { stories } from '../../data/stories';
import { Level } from '../../types';
import Card from '../ui/Card';
import DynamicIcon from '../ui/DynamicIcon';
import { useUserProgress } from '../../context/UserProgressContext';

const StoriesPage: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<Level | 'All'>('All');
  const navigate = useNavigate();
  const { progress } = useUserProgress();

  const levels = useMemo(() => ['All', ...Object.values(Level)], []);

  const filteredStories = useMemo(() => {
    if (selectedLevel === 'All') {
      return stories;
    }
    return stories.filter(story => story.level === selectedLevel);
  }, [selectedLevel]);

  return (
    <div className="animate-fade-in">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-2">Stories</h1>
      <p className="text-center text-slate-500 mb-8">Choose a story to begin your adventure!</p>

      <div className="mb-8 overflow-x-auto pb-4">
        <div className="flex space-x-2 justify-center">
          {levels.map(level => (
            <button
              key={level}
              onClick={() => setSelectedLevel(level as Level | 'All')}
              className={`px-4 py-2 text-sm font-semibold rounded-lg whitespace-nowrap transition-colors duration-200 ${
                selectedLevel === level
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-blue-100'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStories.map(story => {
          const isCompleted = progress.storiesCompleted.includes(story.id);
          return (
            <Card key={story.id} onClick={() => navigate(`/story/${story.id}`)} className="flex items-center p-4">
              <div className="mr-4">
                {/* FIX: Use `story.coverImageId` and pass it as `imageId` to DynamicIcon. */}
                <DynamicIcon source={{ imageId: story.coverImageId }} className="w-16 h-16 text-blue-500" />
              </div>
              <div className="flex-1">
                <h3 className="font-amharic text-xl font-bold text-slate-800">{story.title}</h3>
                <span className={`text-xs font-bold py-1 px-2 rounded-full ${
                  story.level === Level.Beginner4_6 ? 'bg-green-100 text-green-800' :
                  story.level === Level.Emerging7_9 ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>{story.level}</span>
              </div>
              {isCompleted && <div className="text-green-500" title="Completed"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle-2"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg></div>}
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default StoriesPage;