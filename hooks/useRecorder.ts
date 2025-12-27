import { useState, useCallback, useEffect, useRef } from 'react';
import { useUserProgress } from '../context/UserProgressContext';

type RecordingStatus = 'idle' | 'permission-pending' | 'recording' | 'stopped' | 'saving' | 'success' | 'error';

export const useRecorder = (storyId: string, panelId: string) => {
  const [status, setStatus] = useState<RecordingStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [score, setScore] = useState<number | null>(null);

  const { addRecording } = useUserProgress();
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const durationRef = useRef<number>(0);

  const startRecording = useCallback(async () => {
    setStatus('permission-pending');
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);

        const tempAudio = new Audio(url);
        tempAudio.onloadedmetadata = () => {
            durationRef.current = tempAudio.duration;
        };
        
        // Simulate processing and scoring
        setTimeout(() => {
          const randomScore = Math.floor(Math.random() * 30) + 70; // 70-99
          setScore(randomScore);
          setStatus('stopped');
        }, 1000);

        stream.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      };
      
      mediaRecorderRef.current.start();
      setStatus('recording');

    } catch (err) {
      console.error("Error accessing microphone:", err);
      setError("Microphone access was denied. Please enable it in your browser settings.");
      setStatus('error');
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && status === 'recording') {
      mediaRecorderRef.current.stop();
    }
  }, [status]);

  const saveRecording = useCallback(() => {
    if (status === 'stopped' && audioUrl && score !== null) {
        setStatus('saving');
        setTimeout(() => {
            addRecording({ storyId, panelId, audioUrl, score, duration: durationRef.current });
            setStatus('success');
             setTimeout(() => {
                // Fully reset
                setStatus('idle');
                if (audioUrl) URL.revokeObjectURL(audioUrl);
                setAudioUrl(null);
                setScore(null);
            }, 1500);
        }, 1000);
    }
  }, [status, addRecording, storyId, panelId, audioUrl, score]);

  const discardRecording = useCallback(() => {
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }
    setAudioUrl(null);
    setScore(null);
    setStatus('idle');
    setError(null);
  }, [audioUrl]);
  
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  return { status, error, audioUrl, score, startRecording, stopRecording, saveRecording, discardRecording };
};