
import React, { useCallback } from 'react';
import { Flashcard } from '../../types';
import { useUserProgress } from '../../context/UserProgressContext';
import Card from '../ui/Card';
import DynamicIcon from '../ui/DynamicIcon';
import { getAsset } from '../../data/assets';

interface FlashcardViewProps {
  flashcard: Flashcard;
}

const FlashcardView: React.FC<FlashcardViewProps> = ({ flashcard }) => {
  const { addMasteredWord, progress } = useUserProgress();
  
  const isMastered = progress.wordsMasteredByLevel[flashcard.level]?.includes(flashcard.id) ?? false;

  const handleCardClick = useCallback(() => {
    if (flashcard.audioId) {
      const audioAsset = getAsset(flashcard.audioId);
      if (audioAsset) {
        const audio = new Audio();
        audio.src = audioAsset.url;
        
        audio.play().catch(e => {
            console.error("Error playing flashcard audio", e);
            const fullUrl = new URL(audioAsset.url, window.location.href).href;
            alert(`Audio Missing: ${audioAsset.filename}\nAttempted URL: ${fullUrl}`);
        });
      }
    }
    addMasteredWord(flashcard.id);
  }, [flashcard, addMasteredWord]);

  return (
    <Card 
      className={`aspect-square flex flex-col items-center justify-center p-2 text-center relative ${isMastered ? 'bg-green-50' : ''}`}
      onClick={handleCardClick}
    >
      {isMastered && (
        <div className="absolute top-2 right-2 text-green-500" title="Mastered">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle-2"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m9 12 2 2 4-4"/></svg>
        </div>
      )}
      <div className="flex-grow flex items-center justify-center">
        <DynamicIcon source={flashcard} className="w-12 h-12 md:w-16 md:h-16 text-yellow-500 fill-yellow-200" />
      </div>
      <div className="w-full">
        <p className="font-amharic-pretty text-lg md:text-xl font-bold text-slate-800">{flashcard.amharic}</p>
        <p className="text-sm text-slate-500">{flashcard.english}</p>
      </div>
    </Card>
  );
};

export default FlashcardView;
