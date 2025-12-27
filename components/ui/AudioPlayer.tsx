
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, AlertCircle, ExternalLink, Lock } from 'lucide-react';

interface AudioPlayerProps {
  normalSpeedUrl: string;
  slowSpeedUrl: string;
  onComplete?: () => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ normalSpeedUrl, slowSpeedUrl, onComplete }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSlow, setIsSlow] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [error, setError] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false); // New state for Autoplay blocking

  const audioRef = useRef<HTMLAudioElement>(null);

  const formatTime = (time: number) => {
    if (isNaN(time) || time === Infinity) {
      return '0:00';
    }
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedMetadata = () => {
        setDuration(audio.duration);
        setError(false);
        setIsBlocked(false);
    };
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleEnded = () => {
        setIsPlaying(false);
        onComplete?.();
    };
    const handleError = (e: any) => {
        // Differentiate between a missing file (404) and a load error
        console.error(`Audio load error for: ${normalSpeedUrl}`, e);
        setError(true);
        setIsPlaying(false);
    };

    // Reset state when URL changes
    setError(false);
    setIsBlocked(false);
    setIsPlaying(false);
    setCurrentTime(0);

    // Standard Event Listeners
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    // Attempt Auto-play when URL changes (Standard behavior for story apps)
    // We wrap this in a logic block to catch Autoplay policies
    const attemptAutoPlay = async () => {
        try {
            // We wait for the audio to be ready
            if(audio.readyState >= 2) {
                await audio.play();
                setIsPlaying(true);
            } else {
                audio.addEventListener('canplay', async () => {
                     try {
                        await audio.play();
                        setIsPlaying(true);
                     } catch (err: any) {
                        if (err.name === 'NotAllowedError') {
                            console.warn("Autoplay blocked by browser. Waiting for user interaction.");
                            setIsBlocked(true);
                            setIsPlaying(false);
                        }
                     }
                }, { once: true });
            }
        } catch (err: any) {
             if (err.name === 'NotAllowedError') {
                console.warn("Autoplay blocked by browser. Waiting for user interaction.");
                setIsBlocked(true);
                setIsPlaying(false);
            } else {
                console.error("Autoplay failed:", err);
            }
        }
    }

    attemptAutoPlay();

    return () => {
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('ended', handleEnded);
        audio.removeEventListener('error', handleError);
    };
  }, [onComplete, normalSpeedUrl]);

  const togglePlayPause = async () => {
    const audio = audioRef.current;
    if (!audio || error) return;
    
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
          await audio.play();
          setIsPlaying(true);
          setIsBlocked(false); // Clear blocked state if user manually plays
      } catch (err: any) {
        console.error("Error playing audio:", err);
        if (err.name === 'NotAllowedError') {
             setIsBlocked(true);
        } else {
             setError(true);
        }
      }
    }
  };
  
  const handleRestart = () => {
    if (audioRef.current && !error) {
        audioRef.current.currentTime = 0;
        if (isPlaying) {
          audioRef.current.play().catch(console.error);
        } else {
            setCurrentTime(0);
            // If we restart while paused/blocked, try to play
            togglePlayPause();
        }
    }
  };

  const toggleSpeed = () => {
    const audio = audioRef.current;
    if (!audio || error) return;

    const wasPlaying = !audio.paused;
    const time = audio.currentTime;

    if (wasPlaying) {
        audio.pause();
        setIsPlaying(false);
    }

    setIsSlow(prev => {
        const newSlow = !prev;
        audio.src = newSlow ? slowSpeedUrl : normalSpeedUrl;
        audio.load();
        audio.addEventListener('loadeddata', () => {
            audio.currentTime = time;
            if (wasPlaying) {
                audio.play().catch(console.error);
                setIsPlaying(true);
            }
        }, { once: true });
        return newSlow;
    });
  };
  
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current && !error) {
        const seekTime = parseFloat(e.target.value);
        audioRef.current.currentTime = seekTime;
        setCurrentTime(seekTime);
    }
  };
  
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const getFilename = (path: string) => path.split('/').pop() || 'audio file';

  return (
    <div className={`rounded-xl border-2 p-4 shadow-lg w-full max-w-md fade-in relative overflow-hidden ${error ? 'bg-red-50 border-red-300' : 'bg-white border-green-300'}`}>
      
      {/* 
          REMOVED crossOrigin="anonymous"
          This often causes playback failures on servers that don't send strict CORS headers.
          Removing it allows "opaque" playback which is sufficient for listening.
      */}
      <audio ref={audioRef} src={normalSpeedUrl} preload="auto" />

      {/* Autoplay Blocked Overlay */}
      {isBlocked && !error && (
          <div className="absolute inset-0 z-10 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center text-center p-4 transition-all">
              <button 
                onClick={togglePlayPause}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-full font-bold shadow-lg flex items-center gap-2 animate-pulse"
              >
                  <Play fill="currentColor" />
                  Tap to Play Audio
              </button>
              <p className="text-xs text-gray-500 mt-2">Browser requires interaction to play sound</p>
          </div>
      )}

      <div className="flex items-center gap-4 mb-3">
        <button 
            onClick={togglePlayPause} 
            disabled={error}
            className={`w-16 h-16 rounded-2xl shadow-lg flex items-center justify-center transition-all ${error ? 'bg-gray-400 cursor-not-allowed' : 'play-button hover:play-button'}`}
        >
            {error ? <AlertCircle className="w-8 h-8 text-white" /> : (isPlaying ? <Pause className="w-8 h-8 text-white" /> : <Play className="w-8 h-8 text-white ml-1" />)}
        </button>
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-600">{formatTime(currentTime)}</span>
            <span className="text-sm text-gray-500">{formatTime(duration)}</span>
          </div>
          <div className="relative">
             <input type="range" min="0" max={duration || 100} value={currentTime} onChange={handleSeek} className="slider cursor-pointer" disabled={error} />
             <div className={`progress-bar absolute top-0 left-0 pointer-events-none ${error ? 'bg-red-400' : ''}`} style={{ width: `${progressPercent}%` }}></div>
          </div>
        </div>
      </div>

      {error ? (
          <div className="bg-white/50 rounded-lg p-3 border border-red-200">
              <div className="flex items-center gap-2 text-red-700 font-bold text-sm mb-1">
                  <AlertCircle size={16} />
                  <span>Playback Failed</span>
              </div>
              <p className="text-xs text-red-600 mb-2 break-all">
                  File: {getFilename(normalSpeedUrl)}
              </p>
              <div className="flex items-center gap-2">
                <a 
                    href={normalSpeedUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs bg-red-100 hover:bg-red-200 text-red-800 px-3 py-1.5 rounded-md transition-colors"
                >
                    <ExternalLink size={12} />
                    Check File
                </a>
              </div>
          </div>
      ) : (
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <button onClick={handleRestart} className="border-2 border-green-300 hover:bg-green-50 px-3 py-2 rounded-lg font-medium flex items-center text-sm transition-colors">
                <RotateCcw className="w-4 h-4 mr-1" />
                Restart
              </button>
              <button onClick={toggleSpeed} className={`border-2 hover:bg-orange-50 px-3 py-2 rounded-lg font-medium text-sm transition-colors ${isSlow ? 'bg-orange-100 border-orange-400' : 'border-orange-300'}`}>
                {isSlow ? '🐢 Slow' : '🐰 Normal'}
              </button>
            </div>
            <span className="bg-green-100 text-green-800 border border-green-300 px-3 py-1 rounded-md text-sm font-medium flex items-center">
                <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m-2.828-9.9a9 9 0 012.728-2.728"/></svg>
                Audio Ready
            </span>
          </div>
      )}
    </div>
  );
};
export default AudioPlayer;
