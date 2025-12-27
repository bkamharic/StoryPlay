import React, { useState, useEffect, useMemo } from 'react';
import { BookOpen, Search } from 'lucide-react';
import { stories } from '../../data/stories';
import { Level } from '../../types';
import StoryLibraryCard from '../story/StoryLibraryCard';
import StorySkeletonCard from '../story/StorySkeletonCard';

const StoryLibraryPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState<Level | 'All'>('All');

  useEffect(() => {
    // Reduced loading time to feel snappier
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const filteredStories = useMemo(() => {
    if (!stories || stories.length === 0) return [];
    
    return stories.filter(story => {
      const searchLower = searchQuery.toLowerCase().trim();
      const matchesSearch = searchLower === '' || story.title.toLowerCase().includes(searchLower);
      const matchesLevel = levelFilter === 'All' || story.level === levelFilter;
      return matchesSearch && matchesLevel;
    });
  }, [searchQuery, levelFilter]);

  const levelFilters: { label: string; value: Level | 'All' }[] = [
    { label: 'All Levels', value: 'All' },
    { label: 'Beginner (4-6)', value: Level.Beginner4_6 },
    { label: 'Emerging (7-9)', value: Level.Emerging7_9 },
    { label: 'Fluent (10-12)', value: Level.FluentPrep10_12 },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div>
        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 font-amharic">
              የታሪክ ቤተ-መፃህፍት
            </h1>
            <p className="text-lg text-gray-600">Story Library</p>
          </div>
        </div>
        <p className="text-gray-600">
          Explore {stories.length} engaging Amharic stories designed for every level.
        </p>
      </div>

      <div className="bg-white/80 backdrop-blur-sm border-2 border-orange-200 rounded-xl p-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search stories..."
              className="w-full pl-10 pr-4 py-2 border-2 border-orange-200 rounded-lg focus:border-orange-400 focus:outline-none"
            />
          </div>
          <div className="flex bg-orange-100 rounded-lg p-1 overflow-x-auto scrollbar-hide">
            {levelFilters.map(({ label, value }) => (
              <button
                key={value}
                onClick={() => setLevelFilter(value)}
                className={`px-4 py-2 rounded-md font-medium whitespace-nowrap transition-all ${levelFilter === value ? 'active-level' : 'text-gray-600 hover:bg-orange-200'}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div>
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StorySkeletonCard />
            <StorySkeletonCard />
            <StorySkeletonCard />
          </div>
        ) : filteredStories.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredStories.map((story, index) => (
              <StoryLibraryCard key={story.id} story={story} index={index} />
            ))}
          </div>
        ) : (
          <div className="bg-white/80 backdrop-blur-sm border-2 border-orange-200 rounded-xl">
            <div className="p-12 text-center">
              <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">No stories found</h3>
              <p className="text-gray-500">
                {stories.length === 0 
                  ? "The story library is currently empty." 
                  : "Try adjusting your filters or search query."}
              </p>
              <button 
                onClick={() => { setSearchQuery(''); setLevelFilter('All'); }}
                className="mt-4 text-orange-600 font-bold hover:underline"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryLibraryPage;