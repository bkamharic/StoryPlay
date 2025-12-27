
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { flashcards } from '../../data/flashcards';
import { Category, Level } from '../../types';
import DynamicIcon from '../ui/DynamicIcon';
import { Lightbulb, Volume2, RotateCcw, ChevronLeft, ChevronRight, Filter, Play, ArrowRight, ArrowLeft } from 'lucide-react';
import { getAsset } from '../../data/assets';
import { useUserProgress } from '../../context/UserProgressContext';

const FlashcardsPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<Category | 'All'>('All');
  const [selectedLevel, setSelectedLevel] = useState<Level | 'All'>('All');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const { addMasteredWord } = useUserProgress();

  const categories = useMemo(() => ['All', ...Object.values(Category)], []);
  const levels = useMemo(() => ['All', Level.Beginner4_6, Level.Emerging7_9, Level.FluentPrep10_12], []);

  const handleCategorySelect = (category: Category | 'All') => {
    setSelectedCategory(category);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const handleLevelSelect = (level: Level | 'All') => {
    setSelectedLevel(level);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const filteredFlashcards = useMemo(() => {
    return flashcards.filter(fc => {
      const matchesCategory = selectedCategory === 'All' || fc.category === selectedCategory;
      const matchesLevel = selectedLevel === 'All' || fc.level === selectedLevel;
      return matchesCategory && matchesLevel;
    });
  }, [selectedCategory, selectedLevel]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    document.body.classList.add('flashcard-gradient-bg');
    document.body.classList.remove('bg-gradient-to-br', 'from-amber-50', 'via-orange-50', 'to-red-50');
    return () => {
        clearTimeout(timer);
        document.body.classList.remove('flashcard-gradient-bg');
        document.body.classList.add('bg-gradient-to-br', 'from-amber-50', 'via-orange-50', 'to-red-50');
    };
  }, []);

    const currentCard = filteredFlashcards[currentIndex];

  const handlePlayAudio = useCallback((e: React.MouseEvent) => {
      e.stopPropagation();
      if (currentCard && currentCard.audioId) {
          const audioAsset = getAsset(currentCard.audioId);
          if (audioAsset) {
            const audio = new Audio();
            audio.src = audioAsset.url;
            
            audio.play().catch(e => {
                console.error("Error playing flashcard audio", e);
            });
          }
      }
  }, [currentCard]);

  const handleNext = () => {
    if (filteredFlashcards.length <= 1) return;
    if (currentCard) {
      addMasteredWord(currentCard.id);
    }
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex(prev => (prev + 1) % filteredFlashcards.length);
    }, 150);
  };
  
  const handlePrev = () => {
    if (filteredFlashcards.length <= 1) return;
    if (currentCard) {
      addMasteredWord(currentCard.id);
    }
    setIsFlipped(false);
    setTimeout(() => {
        setCurrentIndex(prev => (prev - 1 + filteredFlashcards.length) % filteredFlashcards.length);
    }, 150);
  };

  const handleRestart = () => {
    setIsFlipped(false);
    setTimeout(() => setCurrentIndex(0), 150);
  };


  if (isLoading) {
    return <div className="h-96 bg-gray-200 rounded-xl pulse max-w-4xl mx-auto mt-8"></div>;
  }
  
  return (
    <div className="max-w-7xl mx-auto flex flex-col h-full px-4 pb-8">
        {/* Header */}
        <div className="flex items-center justify-center gap-3 mb-6 fade-in">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg transform rotate-3">
                <Lightbulb className="w-7 h-7 text-white" />
            </div>
            <div>
                <h1 className="text-3xl font-bold text-gray-800 font-amharic-pretty drop-shadow-sm">የቃላት ካርዶች</h1>
                <p className="text-sm font-bold text-gray-600">Flashcards</p>
            </div>
        </div>

        {/* Filter Controls - Enhanced 3D Look */}
        <div className="bg-white/60 backdrop-blur-md border-2 border-orange-100 rounded-[2rem] p-6 mb-8 shadow-sm fade-in">
            
            {/* Categories */}
            <div className="mb-6">
                <div className="flex flex-wrap gap-3 justify-center">
                    {categories.map(cat => (
                        <button 
                            key={cat} 
                            onClick={() => handleCategorySelect(cat as Category | 'All')} 
                            className={`px-5 py-3 rounded-2xl font-bold text-sm transition-all duration-150 flex items-center justify-center text-center ${
                                selectedCategory === cat 
                                    ? 'bg-orange-500 text-white shadow-lg border-b-4 border-orange-700 translate-y-0' 
                                    : 'bg-white text-gray-600 border-2 border-gray-200 border-b-4 border-b-gray-300 hover:bg-orange-50 hover:border-orange-300 hover:border-b-orange-400 hover:-translate-y-0.5 active:border-b-0 active:translate-y-1 active:shadow-inner'
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>
            
            {/* Levels - Centered on "Third Row" with 3D Style */}
            <div className="flex justify-center">
                <div className="flex flex-wrap gap-3 justify-center bg-purple-50/50 p-3 rounded-3xl border border-purple-100 inline-flex">
                    {levels.map(lvl => (
                        <button 
                            key={lvl} 
                            onClick={() => handleLevelSelect(lvl as Level | 'All')} 
                            className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-150 ${
                                selectedLevel === lvl 
                                    ? 'bg-purple-600 text-white shadow-md border-b-4 border-purple-800' 
                                    : 'bg-white text-gray-600 border-2 border-gray-200 border-b-4 border-b-gray-300 hover:bg-purple-50 hover:border-purple-300 hover:border-b-purple-400 active:border-b-0 active:translate-y-1'
                            }`}
                        >
                            {lvl}
                        </button>
                    ))}
                </div>
            </div>
        </div>
        
        {/* Main Interaction Area */}
        <div className="flex-1 flex items-center justify-center w-full gap-4 md:gap-12 min-h-[550px] relative">
            
            {/* Desktop Previous Button - 3D Style */}
            <button 
                onClick={handlePrev} 
                disabled={filteredFlashcards.length <= 1}
                className="hidden md:flex w-24 h-28 rounded-2xl bg-white border-2 border-gray-200 border-b-8 border-b-gray-300 hover:bg-orange-50 hover:border-orange-300 hover:border-b-orange-400 text-orange-500 shadow-xl items-center justify-center transition-all active:border-b-2 active:translate-y-2 disabled:opacity-50 disabled:cursor-not-allowed z-10"
            >
                <ChevronLeft size={44} strokeWidth={3} />
            </button>

            {/* The Flashcard - 3D Design */}
            <div className="relative w-full max-w-md sm:max-w-lg aspect-[3/4]" style={{ perspective: '1200px' }}>
                {currentCard ? (
                    <div 
                        className={`flashcard w-full h-full transition-transform duration-700 ${isFlipped ? 'flipped' : ''}`} 
                        style={{ transformStyle: 'preserve-3d' }}
                        onClick={() => setIsFlipped(!isFlipped)}
                    >
                        {/* Front - 3D Card Look */}
                        <div 
                            className="flashcard-front absolute inset-0 bg-white border-4 border-yellow-400 border-b-[16px] border-b-yellow-400 shadow-2xl cursor-pointer rounded-[2.5rem] p-8 flex flex-col items-center justify-center overflow-hidden hover:-translate-y-1 hover:shadow-orange-200/80 transition-all duration-300"
                            style={{ backfaceVisibility: 'hidden' }}
                        >
                            {/* Decorative blobs */}
                            <div className="absolute -top-10 -left-10 w-40 h-40 bg-yellow-100 rounded-full opacity-60 pointer-events-none"></div>
                            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-orange-100 rounded-full opacity-60 pointer-events-none"></div>

                            {/* Image Container with inner shadow */}
                            <div className="w-48 h-48 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-3xl flex items-center justify-center mb-8 shadow-inner border-2 border-blue-100 relative z-10 group-hover:scale-105 transition-transform duration-500">
                                {currentCard.category === Category.Numbers && currentCard.geez ? (
                                    <span className="font-amharic-pretty text-8xl md:text-9xl text-blue-700 drop-shadow-sm">{currentCard.geez}</span>
                                ) : (
                                    <DynamicIcon source={currentCard} className="w-32 h-32 drop-shadow-md" />
                                )}
                            </div>
                            
                            {/* Text */}
                            <h2 className="text-5xl md:text-7xl font-bold text-gray-800 mb-8 text-center font-amharic-pretty relative z-10 leading-tight drop-shadow-sm">
                                {currentCard.amharic}
                            </h2>
                            
                            {/* Play Audio Button - 3D style inside card */}
                            {currentCard.audioId && (
                                <button 
                                    onClick={handlePlayAudio} 
                                    className="relative z-10 bg-green-500 hover:bg-green-600 text-white border-b-4 border-green-700 active:border-b-0 active:translate-y-1 shadow-lg rounded-2xl px-8 py-4 font-bold text-xl flex items-center transition-all w-full max-w-xs justify-center"
                                >
                                    <Volume2 className="w-8 h-8 mr-3" />
                                    Play Sound
                                </button>
                            )}
                            <p className="text-gray-400 text-sm font-bold mt-auto absolute bottom-4 uppercase tracking-widest opacity-60">Tap to flip</p>
                        </div>

                        {/* Back - 3D Card Look */}
                        <div 
                            className="flashcard-back absolute inset-0 bg-white border-4 border-purple-400 border-b-[16px] border-b-purple-400 shadow-2xl cursor-pointer rounded-[2.5rem] p-8 flex flex-col items-center justify-center overflow-hidden hover:-translate-y-1 hover:shadow-purple-200/80 transition-all duration-300"
                            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                        >
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-100 rounded-full opacity-60 pointer-events-none"></div>

                             {currentCard.category === Category.Numbers ? (
                                <div className="text-center relative z-10">
                                    <h2 className="text-7xl md:text-8xl font-bold text-purple-600 mb-4 drop-shadow-sm">
                                        {currentCard.id.split('-')[1]}
                                    </h2>
                                    <h3 className="text-4xl md:text-5xl font-bold text-purple-500">
                                        {currentCard.english}
                                    </h3>
                                </div>
                            ) : (
                                <h2 className="text-4xl md:text-6xl font-bold text-purple-600 text-center relative z-10 leading-tight mb-6 drop-shadow-sm">
                                    {currentCard.english}
                                </h2>
                            )}
                            
                            {currentCard.exampleSentence && (
                                <div className="mt-8 bg-purple-50 p-6 rounded-2xl border-2 border-purple-100 relative z-10 max-w-full shadow-sm w-full">
                                    <p className="text-center text-purple-900 font-amharic text-lg md:text-xl leading-relaxed font-medium">"{currentCard.exampleSentence}"</p>
                                </div>
                            )}

                            <span className="mt-auto mb-6 bg-purple-100 text-purple-700 border-2 border-purple-200 px-6 py-2 rounded-full text-lg font-bold uppercase tracking-wide relative z-10 shadow-sm">
                                {currentCard.category}
                            </span>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white/80 backdrop-blur-sm border-4 border-orange-200 border-dashed rounded-[2.5rem] p-12 text-center flex flex-col items-center justify-center w-full h-full shadow-lg">
                        <Lightbulb className="w-24 h-24 text-gray-300 mx-auto mb-6" />
                        <h3 className="text-3xl font-bold text-gray-600 mb-2">No flashcards found</h3>
                        <p className="text-gray-500 text-xl">Try adjusting your filters</p>
                        <button onClick={() => { setSelectedCategory('All'); setSelectedLevel('All'); }} className="mt-8 bg-orange-500 text-white border-b-4 border-orange-700 px-8 py-3 rounded-2xl font-bold shadow-lg transition-all active:border-b-0 active:translate-y-1 text-lg">
                            Reset Filters
                        </button>
                    </div>
                )}
            </div>

            {/* Desktop Next Button - 3D Style */}
            <button 
                onClick={handleNext} 
                disabled={filteredFlashcards.length <= 1}
                className="hidden md:flex w-24 h-28 rounded-2xl bg-gradient-to-b from-orange-400 to-orange-500 border-b-8 border-orange-700 text-white shadow-xl items-center justify-center transition-all hover:brightness-110 active:border-b-2 active:translate-y-2 disabled:opacity-50 disabled:cursor-not-allowed z-10"
            >
                <ChevronRight size={44} strokeWidth={3} />
            </button>
        </div>
        
        {/* Mobile Controls & Progress Bar */}
        <div className="mt-8 flex flex-col gap-5">
             {/* Mobile Navigation Buttons - 3D Style */}
             <div className="flex md:hidden gap-4">
                <button onClick={handlePrev} disabled={filteredFlashcards.length <= 1} className="flex-1 bg-white border-2 border-gray-200 border-b-4 border-gray-300 text-gray-700 py-4 rounded-2xl font-bold shadow-sm active:border-b-0 active:translate-y-1 disabled:opacity-50 flex items-center justify-center text-xl">
                    <ArrowLeft className="w-6 h-6 mr-2" /> Previous
                </button>
                <button onClick={handleNext} disabled={filteredFlashcards.length <= 1} className="flex-1 bg-orange-500 border-b-4 border-orange-700 text-white py-4 rounded-2xl font-bold shadow-md active:border-b-0 active:translate-y-1 disabled:opacity-50 flex items-center justify-center text-xl">
                    Next <ArrowRight className="w-6 h-6 ml-2" />
                </button>
             </div>

             {/* Footer Info */}
             <div className="flex items-center justify-between bg-white/50 px-6 py-4 rounded-3xl border-2 border-white/60 shadow-sm max-w-lg mx-auto w-full">
                <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Progress</span>
                <div className="flex items-center gap-4">
                    <span className="font-mono font-bold text-gray-700 text-xl">
                        {filteredFlashcards.length > 0 ? `${currentIndex + 1} / ${filteredFlashcards.length}` : '0 / 0'}
                    </span>
                    <div className="w-px h-6 bg-gray-300"></div>
                    <button onClick={handleRestart} className="text-gray-500 hover:text-orange-600 transition-colors p-2 rounded-full hover:bg-orange-100" title="Restart Deck">
                       <RotateCcw size={24} />
                    </button>
                </div>
             </div>
        </div>
    </div>
  );
};

export default FlashcardsPage;
