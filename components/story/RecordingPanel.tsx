
import React, { useRef } from 'react';
import { Mic, Check, Square, Trash2, Play, Save, Loader, X } from 'lucide-react';
import { useRecorder } from '../../hooks/useRecorder';

interface RecordingPanelProps {
    textToRecord: string;
    storyId: string;
    panelId: string; // for keying, context
    recordSlotId: string;
    onClose: () => void;
    isChallenge?: boolean;
}

const RecordingPanel: React.FC<RecordingPanelProps> = ({ textToRecord, storyId, panelId, recordSlotId, onClose, isChallenge = false }) => {
    const { status, error, audioUrl, score, startRecording, stopRecording, saveRecording, discardRecording } = useRecorder(storyId, panelId);
    const playbackAudioRef = useRef<HTMLAudioElement>(null);

    const playRecording = () => {
        if (audioUrl && playbackAudioRef.current) {
            playbackAudioRef.current.src = audioUrl;
            playbackAudioRef.current.play();
        }
    };

    const getScoreBadge = (score: number, size: 'small' | 'large' = 'large') => {
        const scoreColor = score >= 90 ? 'high-score' : score >= 75 ? 'medium-score' : 'low-score';
        const scoreEmoji = score >= 90 ? '🌟' : score >= 75 ? '👍' : '💪';
        if (size === 'large') {
            return (
                <div className={`${scoreColor} text-white text-base px-3 py-1.5 rounded-md font-bold`}>
                    {scoreEmoji} {score}%
                </div>
            );
        }
        return (
            <div className={`absolute -top-3 -right-3 ${scoreColor} text-white text-xs px-2 py-0.5 rounded-md font-bold shadow-lg`}>
                {scoreEmoji} {score}%
            </div>
        );
    };

    const getScoreBar = (score: number) => {
        const scoreColor = score >= 90 ? 'high-score' : score >= 75 ? 'medium-score' : 'low-score';
        const feedback = score >= 90 ? "Amazing! Perfect pronunciation! 🎉" :
                         score >= 75 ? "Great job! Keep practicing! 👏" :
                         "Good try! Practice makes perfect! 💪";
        return (
            <>
                <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-medium text-gray-600">Your Score</span>
                    <span className="text-xs font-bold text-gray-800">{score}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className={`${scoreColor} h-2 rounded-full`} style={{ width: `${score}%` }}></div>
                </div>
                <p className="text-xs text-gray-600 mt-1.5 text-center">{feedback}</p>
            </>
        );
    }

    return (
        <div className="recording-panel rounded-xl w-full fade-in relative border border-red-200">
             <audio ref={playbackAudioRef} className="hidden" />
            {!isChallenge && (
                <button onClick={onClose} className="absolute top-1 right-1 bg-red-100 hover:bg-red-200 text-red-700 rounded-full p-1 z-10">
                    <X size={14} />
                </button>
            )}
            
            <div className="p-4 space-y-3">
                <h3 className="text-base font-bold text-gray-800 flex items-center gap-2">
                    <Mic className="w-4 h-4 text-red-600" />
                    {isChallenge ? 'Listen & Repeat' : 'Record Your Voice'}
                </h3>
                
                <div className="bg-white/80 rounded-lg p-3 border border-orange-200">
                    <p className="text-lg font-semibold text-gray-800 text-center leading-relaxed font-amharic">
                        {textToRecord}
                    </p>
                </div>
                
                {status === 'idle' && (
                    <div id="ready-state" className="flex flex-col items-center gap-3 py-4 fade-in">
                        <button onClick={startRecording} className="record-button hover:record-button text-white rounded-lg px-6 py-2 shadow-md font-medium flex items-center text-sm">
                            <Mic className="w-4 h-4 mr-2" />
                            Start Recording
                        </button>
                    </div>
                )}
                
                {status === 'recording' && (
                     <div id="recording-progress" className="flex flex-col items-center gap-3 py-4 fade-in">
                        <div className="w-16 h-16 rounded-full stop-button flex items-center justify-center animate-pulse shadow-lg">
                            <div className="wave-animation">
                                <div className="wave-bar h-3"></div><div className="wave-bar h-3"></div><div className="wave-bar h-3"></div>
                            </div>
                        </div>
                        <p className="text-sm font-medium text-gray-700">Recording...</p>
                        <button onClick={stopRecording} className="stop-button hover:stop-button text-white rounded-lg px-6 py-2 font-medium flex items-center text-sm">
                            <Square className="w-4 h-4 mr-2" />
                            Stop
                        </button>
                    </div>
                )}
                
                {(status === 'stopped' || status === 'saving' || status === 'success') && score !== null && (
                    <div id="after-recording" className="space-y-3 fade-in">
                        <div id="score-section">
                            {getScoreBar(score)}
                        </div>
                        <div className="flex flex-wrap gap-2 justify-center">
                            <button onClick={playRecording} className="border border-green-300 hover:bg-green-50 px-3 py-1.5 rounded-lg font-medium flex items-center transition-colors text-sm">
                                <Play className="w-3 h-3 mr-1.5" />
                                Play
                            </button>
                            <button onClick={discardRecording} disabled={status === 'saving' || status === 'success'} className="border border-red-300 hover:bg-red-50 px-3 py-1.5 rounded-lg font-medium flex items-center transition-colors disabled:opacity-50 text-sm">
                                <Trash2 className="w-3 h-3 mr-1.5" />
                                Retry
                            </button>
                            <button onClick={saveRecording} disabled={status === 'saving' || status === 'success'} className="save-button hover:save-button text-white shadow-md px-3 py-1.5 rounded-lg font-medium flex items-center transition-colors disabled:opacity-50 text-sm">
                                {status === 'saving' && <><Loader className="w-3 h-3 mr-1.5 animate-spin"/> Saving...</>}
                                {status === 'success' && <><Check className="w-3 h-3 mr-1.5"/> Saved</>}
                                {status === 'stopped' && <><Save className="w-3 h-3 mr-1.5"/> Save</>}
                            </button>
                        </div>
                    </div>
                )}

                {error && <p className="text-red-600 text-center text-xs">{error}</p>}
            </div>
        </div>
    );
};

export default RecordingPanel;
