import React, { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { stories } from '../../data/stories';
import { getAsset } from '../../data/assets';
import StoryPanel from '../story/StoryPanel';
import { ArrowLeft, ArrowRight, BookOpen, ImageIcon } from 'lucide-react';
import { useUserProgress } from '../../context/UserProgressContext';
import { Level } from '../../types';

const levelNames: { [key in Level]: string } = {
  [Level.Beginner4_6]: "Beginner (4-6)",
  [Level.Emerging7_9]: "Emerging (7-9)",
  [Level.FluentPrep10_12]: "Fluent (10-12)",
};

const StoryPlayerPage: React.FC = () => {
  const { storyId } = useParams();
  const navigate = useNavigate();
  const { addCompletedStory } = useUserProgress();
  
  const [isLoading, setIsLoading] = useState(true);
  const [animationClass, setAnimationClass] = useState('slide-in');

  const story = useMemo(() => stories.find(s => s.id === storyId), [storyId]);
  const [panelIndex, setPanelIndex] = useState(0);

  const allPanels = useMemo(() => story?.scenes.flatMap(scene => scene.panels) || [], [story]);
  const currentPanel = allPanels[panelIndex];
  
  const illustrationAsset = useMemo(() => getAsset(currentPanel?.illustrationId), [currentPanel]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 300);
    document.body.classList.add('gradient-bg');
    return () => {
      clearTimeout(timer);
      document.body.classList.remove('gradient-bg');
    };
  }, []);

  if (!story) {
    return (
        <div className="text-center p-12">
            <h1 className="text-2xl font-bold">Story not found!</h1>
            <button onClick={() => navigate('/stories')} className="mt-4 text-blue-600 underline">Back to Library</button>
        </div>
    );
  }

  const totalPanels = allPanels.length;
  const progressPercent = totalPanels > 0 ? ((panelIndex + 1) / totalPanels) * 100 : 0;

  const handleNavigation = (direction: 'next' | 'prev') => {
    setAnimationClass('slide-out');
    setTimeout(() => {
      if (direction === 'next') {
        if (panelIndex < totalPanels - 1) {
          setPanelIndex(panelIndex + 1);
        } else {
          addCompletedStory(story.id);
          navigate('/stories');
        }
      } else {
        if (panelIndex > 0) {
          setPanelIndex(panelIndex - 1);
        }
      }
      setAnimationClass('slide-in');
    }, 200);
  };
  
  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-amber-50 flex items-center justify-center z-50">
        <div className="text-center">
            <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full spin mx-auto mb-4"></div>
            <p className="text-lg text-gray-600 font-bold">Loading adventure...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="max-w-3xl mx-auto space-y-4 px-2 pb-12">
      <header className="flex items-center justify-between pt-2">
        <button onClick={() => navigate('/stories')} className="border-2 border-orange-300 bg-white/80 hover:bg-orange-50 px-3 py-1.5 rounded-lg font-bold flex items-center transition-colors text-sm text-gray-700">
          <ArrowLeft className="w-4 h-4 mr-1 text-orange-500" />
          Library
        </button>
        <span className="bg-white/90 border-2 border-orange-300 text-gray-800 px-3 py-1 rounded-md text-xs font-black shadow-sm uppercase tracking-wider">
          {levelNames[story.level]}
        </span>
      </header>

      <div className="bg-white/90 backdrop-blur-sm border-2 border-orange-200 rounded-2xl p-4 shadow-md">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center shadow-md">
            <BookOpen className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 font-amharic-pretty leading-tight">{story.title}</h1>
            <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mt-1">
              Page {panelIndex + 1} of {totalPanels}
            </p>
          </div>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2 mt-4 shadow-inner">
          <div className="bg-orange-500 h-2 rounded-full transition-all duration-300 shadow-[0_0_8px_rgba(249,115,22,0.4)]" style={{ width: `${progressPercent}%` }}></div>
        </div>
      </div>

      <div className={`${animationClass} bg-white border-4 border-orange-200 rounded-[2.5rem] overflow-hidden shadow-2xl relative transition-transform`}>
        {currentPanel && (
           <div className="aspect-[4/3] w-full max-h-[60vh] bg-amber-50 relative overflow-hidden flex items-center justify-center p-4 sm:p-8">
                {illustrationAsset ? (
                    <div className="relative w-full h-full flex items-center justify-center">
                        <div className="bg-white rounded-[2rem] shadow-[0_12px_0_#e5e7eb] border-8 border-white w-full h-full flex items-center justify-center overflow-hidden">
                            <img 
                              src={illustrationAsset.url} 
                              alt={`Panel ${currentPanel.order}`} 
                              className="w-full h-full object-contain"
                              referrerPolicy="no-referrer"
                              loading="eager"
                            />
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center gap-4 text-center p-8 bg-white/40 rounded-3xl w-full h-full border-4 border-dashed border-gray-200">
                        <ImageIcon className="w-16 h-16 text-gray-300" />
                        <p className="font-bold text-gray-400 uppercase tracking-widest text-xs">Visual Not Linked</p>
                    </div>
                )}
           </div>
        )}
        {currentPanel && <StoryPanel panel={currentPanel} story={story} level={story.level} />}
      </div>
      
      <footer className="flex items-center justify-between gap-4 pb-10 px-2">
        <button
          onClick={() => handleNavigation('prev')}
          disabled={panelIndex === 0}
          className="bg-white hover:bg-orange-50 px-6 py-4 rounded-2xl font-black text-gray-700 flex items-center transition-all disabled:opacity-30 border-b-8 border-gray-200 active:border-b-0 active:translate-y-2 shadow-lg"
        >
          <ArrowLeft className="w-6 h-6 mr-2 text-orange-500" strokeWidth={3} />
          Back
        </button>

        <button
          onClick={() => handleNavigation('next')}
          className="flex-1 bg-[#078930] hover:bg-[#06772a] text-white shadow-2xl px-8 py-4 rounded-2xl font-black flex items-center justify-center transition-all border-b-8 border-[#056d26] active:border-b-0 active:translate-y-2 text-lg uppercase tracking-wider"
        >
          {panelIndex === totalPanels - 1 ? 'Finish!' : 'Next'}
          <ArrowRight className="w-6 h-6 ml-3" strokeWidth={3} />
        </button>
      </footer>
    </div>
  );
};

export default StoryPlayerPage;