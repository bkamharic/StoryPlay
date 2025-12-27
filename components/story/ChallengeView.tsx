
import React, { useState, useEffect, useMemo } from 'react';
import { Panel, ChallengeType, Story, Level } from '../../types';
import { Send, Check, AlertTriangle, RefreshCw, Delete } from 'lucide-react';
import RecordingPanel from './RecordingPanel';

interface ChallengeViewProps {
  panel: Panel;
  story: Story;
  level: Level;
}

const ChallengeView: React.FC<ChallengeViewProps> = ({ panel, story, level }) => {
  if (!panel.challengeType) return null;

  const renderChallenge = () => {
    switch (panel.challengeType) {
      case ChallengeType.ListenRepeat:
        return <ListenRepeatChallenge story={story} panel={panel} level={level} />;
      case ChallengeType.FillBlank:
        return <FillBlankChallenge panel={panel} level={level} />;
      case ChallengeType.Reorder:
        return <div className="text-center p-3 bg-purple-100 text-purple-800 rounded-lg text-sm">Reorder challenge coming soon!</div>;
      case ChallengeType.Compose:
        return <div className="text-center p-3 bg-teal-100 text-teal-800 rounded-lg text-sm">Compose challenge coming soon!</div>;
      default:
        return <div className="text-center p-3 bg-gray-100 text-gray-800 rounded-lg text-sm">Challenge type not implemented.</div>;
    }
  };

  return (
    <div className="w-full p-4 bg-white/90 backdrop-blur-sm rounded-xl border-2 border-purple-200 shadow-sm">
      <h4 className="text-base font-bold text-center mb-4 text-purple-700 bg-purple-50 inline-block px-3 py-1 rounded-full mx-auto block w-fit">Challenge!</h4>
      {renderChallenge()}
    </div>
  );
};

const ListenRepeatChallenge: React.FC<{ story: Story; panel: Panel, level: Level }> = ({ story, panel, level }) => {
    if (!panel.recordSlotId) return null;
    return (
        <div className="flex flex-col items-center">
            <p className="text-slate-600 mb-3 text-center text-sm font-medium">Listen to the sentence, then record yourself saying it.</p>
            <RecordingPanel
                textToRecord={panel.textVariants[level]}
                storyId={story.id}
                panelId={panel.panelId}
                recordSlotId={panel.recordSlotId}
                onClose={() => {}} // No close button in this context
                isChallenge={true}
            />
        </div>
    );
}

interface LetterTile {
    id: string; // Unique ID to handle duplicate letters
    char: string;
}

const FillBlankChallenge: React.FC<{ panel: Panel, level: Level }> = ({ panel, level }) => {
    const [selectedLetters, setSelectedLetters] = useState<LetterTile[]>([]);
    const [availableLetters, setAvailableLetters] = useState<LetterTile[]>([]);
    const [status, setStatus] = useState<'idle' | 'correct' | 'incorrect'>('idle');
    
    const text = panel.textVariants[level];
    const parts = text.split('__blank__');
    const correctWord = panel.challengeAnswer || "";

    // Initialize logic
    useEffect(() => {
        resetChallenge();
    }, [panel.challengeAnswer]);

    const resetChallenge = () => {
        if (!correctWord) return;
        
        // Create letter objects with unique IDs
        const letters = correctWord.split('').map((char, index) => ({
            id: `${char}-${index}-${Date.now()}`,
            char
        }));

        // Shuffle
        const shuffled = [...letters].sort(() => Math.random() - 0.5);
        
        setAvailableLetters(shuffled);
        setSelectedLetters([]);
        setStatus('idle');
    };

    const handleSelectLetter = (letter: LetterTile) => {
        if (status === 'correct') return;
        setAvailableLetters(prev => prev.filter(l => l.id !== letter.id));
        setSelectedLetters(prev => [...prev, letter]);
        setStatus('idle');
    };

    const handleDeselectLetter = (letter: LetterTile) => {
        if (status === 'correct') return;
        setSelectedLetters(prev => prev.filter(l => l.id !== letter.id));
        setAvailableLetters(prev => [...prev, letter]);
        setStatus('idle');
    };

    const handleCheck = () => {
        const formedWord = selectedLetters.map(l => l.char).join('');
        if (formedWord === correctWord) {
            setStatus('correct');
        } else {
            setStatus('incorrect');
        }
    };

    return (
        <div className="text-center space-y-6">
            <p className="text-slate-600 text-sm font-medium">Complete the sentence:</p>
            
            {/* Sentence Display Area */}
            <div className="bg-purple-50 p-4 rounded-xl border border-purple-100 flex flex-wrap items-center justify-center gap-2 text-lg md:text-xl font-amharic leading-relaxed min-h-[80px]">
                <span>{parts[0]}</span>
                
                {/* The Answer Box */}
                <div className={`flex flex-wrap items-center justify-center gap-1 px-2 py-1 rounded-lg border-b-4 transition-colors min-w-[100px] min-h-[40px] ${
                    status === 'correct' ? 'bg-green-100 border-green-400' :
                    status === 'incorrect' ? 'bg-red-50 border-red-300' :
                    'bg-white border-purple-300'
                }`}>
                    {selectedLetters.length === 0 && (
                        <span className="text-gray-400 text-sm font-sans animate-pulse">Tap letters below</span>
                    )}
                    {selectedLetters.map((letter) => (
                        <button
                            key={letter.id}
                            onClick={() => handleDeselectLetter(letter)}
                            className="bg-white hover:bg-red-50 text-slate-800 font-bold border border-gray-200 rounded px-2 py-0.5 shadow-sm transform hover:-translate-y-0.5 transition-all text-lg"
                        >
                            {letter.char}
                        </button>
                    ))}
                </div>

                <span>{parts[1]}</span>
            </div>

            {/* Status Feedback */}
            <div className="h-6">
                {status === 'correct' && (
                    <div className="text-green-600 font-bold flex items-center justify-center gap-2 animate-in slide-in-from-bottom-2 fade-in duration-300">
                        <Check size={20} className="bg-green-100 rounded-full p-0.5" /> 
                        <span>Correct! Well done.</span>
                    </div>
                )}
                {status === 'incorrect' && (
                    <div className="text-red-500 font-bold flex items-center justify-center gap-2 animate-in slide-in-from-bottom-2 fade-in duration-300">
                        <AlertTriangle size={20} /> 
                        <span>Try again!</span>
                    </div>
                )}
            </div>

            {/* Letter Bank (Keyboard) */}
            <div className="flex flex-col gap-4">
                <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
                    {availableLetters.map((letter) => (
                        <button
                            key={letter.id}
                            onClick={() => handleSelectLetter(letter)}
                            disabled={status === 'correct'}
                            className="w-12 h-12 sm:w-14 sm:h-14 bg-white border-2 border-b-4 border-purple-200 text-purple-700 font-amharic font-bold text-xl sm:text-2xl rounded-xl shadow-sm active:border-b-2 active:translate-y-0.5 hover:bg-purple-50 hover:border-purple-300 transition-all flex items-center justify-center"
                        >
                            {letter.char}
                        </button>
                    ))}
                    {availableLetters.length === 0 && status !== 'correct' && (
                        <div className="text-gray-400 text-sm italic py-4">All letters placed</div>
                    )}
                </div>

                {/* Controls */}
                <div className="flex justify-center gap-3 mt-2">
                    <button 
                        onClick={resetChallenge}
                        className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-full transition-colors"
                        title="Reset"
                    >
                        <RefreshCw size={20} />
                    </button>
                    
                    {status !== 'correct' && (
                        <button 
                            onClick={handleCheck}
                            disabled={selectedLetters.length === 0}
                            className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3 rounded-xl font-bold shadow-md transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2"
                        >
                            Check Answer
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ChallengeView;
