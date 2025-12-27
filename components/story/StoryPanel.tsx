
import React, { useState, useMemo } from 'react';
import { Panel, Level, Story, Flashcard } from '../../types';
import { Mic, Speaker, PlayCircle } from 'lucide-react';
import { flashcards } from '../../data/flashcards';
import { getAsset } from '../../data/assets';
import ChallengeView from './ChallengeView';
import AudioPlayer from '../ui/AudioPlayer';
import RecordingPanel from './RecordingPanel';

interface StoryPanelProps {
  panel: Panel;
  story: Story;
  level: Level;
}

const VocabularyChip: React.FC<{flashcard: Flashcard}> = ({ flashcard }) => {
    const playVocabAudio = () => {
        if (flashcard.audioId) {
            const audioAsset = getAsset(flashcard.audioId);
            if (audioAsset && audioAsset.url) {
                // Ensuring we use the full absolute URL string from the asset manifest
                const audio = new Audio(audioAsset.url);
                
                audio.play().catch(e => {
                    console.error("Error playing vocab audio", e);
                    // Detailed debugging output for developer use
                    console.log(`Failed URL: ${audioAsset.url}`);
                    console.log(`Expected path: assets/audio/flashcards/${audioAsset.filename}`);
                });
            } else if (!audioAsset) {
                console.warn(`Vocabulary audio asset not found in manifest: ${flashcard.audioId}`);
            }
        }
    };

    return (
        <button 
            onClick={playVocabAudio} 
            disabled={!flashcard.audioId}
            className="cursor-pointer bg-white border-2 border-blue-200 hover:border-blue-400 hover:bg-blue-50 text-base sm:text-lg px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl font-bold flex items-center transition-all text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md transform hover:-translate-y-0.5 active:translate-y-0 active:shadow-sm"
        >
            <div className="bg-blue-100 rounded-full p-1.5 mr-2 sm:mr-3">
                <Speaker className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
            </div>
            <span className="font-amharic-pretty">{flashcard.amharic}</span>
        </button>
    )
}


const StoryPanel: React.FC<StoryPanelProps> = ({ panel, story, level }) => {
  const panelText = panel.textVariants[level];
  const englishText = panel.textEnglishVariants[level];
  const [showRecording, setShowRecording] = useState(false);
  const [showPlayer, setShowPlayer] = useState(false);
  
  const targetFlashcards = (story.targetWords || [])
    .map(word => flashcards.find(f => f.amharic === word))
    .filter((f): f is Flashcard => f !== undefined);

  // Retrieve the audio URL for the specific level from the new audioVariants structure
  const audioUrl = panel.audioVariants ? panel.audioVariants[level] : undefined;

  return (
    <div className="p-4 space-y-5">
      <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-5 border-2 border-orange-200 shadow-sm">
          <p className="font-amharic-pretty text-2xl md:text-3xl font-bold text-gray-800 leading-relaxed text-center mb-3">{panelText}</p>
          <p className="text-base sm:text-lg text-gray-600 text-center italic">"{englishText}"</p>
      </div>
      
      <div className="bg-white border border-green-200 rounded-lg p-3 shadow-sm">
          {!showPlayer ? (
              <button onClick={() => setShowPlayer(true)} disabled={!audioUrl} className="w-full text-left flex items-center gap-3 text-green-800 hover:bg-green-50 p-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed group">
                  <PlayCircle className="w-10 h-10 text-green-600 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <div>
                      <p className="font-bold text-lg">Play Audio</p>
                      <p className="text-xs text-gray-600 font-medium">{audioUrl ? 'Tap to listen' : 'Not available'}</p>
                  </div>
              </button>
          ) : (
              audioUrl && (
                <AudioPlayer 
                    normalSpeedUrl={audioUrl}
                    slowSpeedUrl={audioUrl} 
                />
              )
          )}
      </div>

      {targetFlashcards.length > 0 && (
           <div className="space-y-2">
              <h3 className="text-sm sm:text-base font-bold text-gray-700 flex items-center gap-2 mb-2 uppercase tracking-wide">
                  <Speaker className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
                  Key Vocabulary
              </h3>
              <div className="flex flex-wrap gap-2 sm:gap-3">
                  {targetFlashcards.map(fc => <VocabularyChip key={fc.id} flashcard={fc} />)}
              </div>
          </div>
      )}

      {panel.challengeType && (
        <ChallengeView panel={panel} story={story} level={level} />
      )}

      {panel.recordSlotId && (
          <div>
              {!showRecording ? (
                  <button onClick={() => setShowRecording(true)} className="w-full button-gradient hover:button-gradient text-white shadow-md py-3.5 text-lg rounded-xl font-bold transition-all transform hover:scale-[1.02] flex items-center justify-center">
                      <Mic className="w-6 h-6 mr-2" /> Practice Pronunciation
                  </button>
              ) : (
                  <RecordingPanel
                      textToRecord={panelText}
                      storyId={story.id}
                      panelId={panel.panelId}
                      recordSlotId={panel.recordSlotId}
                      onClose={() => setShowRecording(false)}
                  />
              )}
          </div>
      )}
    </div>
  );
};

export default StoryPanel;
