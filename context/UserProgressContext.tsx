import React, { createContext, useContext, useState, ReactNode, useCallback, useMemo, useEffect } from 'react';
import { UserProgress, Recording, Level, Assessment, AssessmentType, EarnedBadge } from '../types';
import { badges } from '../data/badges';
import { flashcards } from '../data/flashcards';

interface UserProgressContextType {
  progress: UserProgress;
  recordings: Recording[];
  assessments: Assessment[];
  isAuthenticated: boolean;
  addMasteredWord: (wordId: string) => void;
  addCompletedStory: (storyId: string) => void;
  addRecording: (newRecordingData: { storyId: string; panelId: string; audioUrl: string; score: number; duration: number; }) => void;
  removeRecording: (recordingId: string) => void;
  login: (name: string) => void;
  logout: () => void;
  setAvatar: (avatarId: string) => void;
}

const UserProgressContext = createContext<UserProgressContextType | undefined>(undefined);

const STORAGE_KEY = 'storyplay-user-progress';

const initialProgress: UserProgress = {
  userId: 'user-123',
  displayName: 'Learner',
  avatarId: '',
  currentLevel: Level.Beginner4_6,
  storiesCompleted: [],
  wordsMasteredByLevel: {
    [Level.Beginner4_6]: [],
    [Level.Emerging7_9]: [],
    [Level.FluentPrep10_12]: [],
  },
  badges: [],
  adaptiveScore: 0,
  streakDays: 1,
  lastActiveDate: new Date().toISOString().split('T')[0],
  totalRecordings: 0,
  averageScore: 0,
  parentUserId: 'parent-456',
};

interface AppState {
  progress: UserProgress;
  recordings: Recording[];
  assessments: Assessment[];
  isAuthenticated: boolean;
}

const initialAppState: AppState = {
    progress: initialProgress,
    recordings: [],
    assessments: [],
    isAuthenticated: false,
}

export const UserProgressProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(() => {
    try {
      const item = window.localStorage.getItem(STORAGE_KEY);
      if (item) {
        const parsed = JSON.parse(item);
        if (parsed.progress && parsed.recordings && parsed.assessments && typeof parsed.isAuthenticated === 'boolean') {
            return parsed;
        }
      }
      return initialAppState;
    } catch (error) {
      console.error("Error reading state from localStorage", error);
      return initialAppState;
    }
  });

  useEffect(() => {
    try {
      if (state.isAuthenticated) {
        const serializedState = JSON.stringify(state);
        window.localStorage.setItem(STORAGE_KEY, serializedState);
      } else {
        window.localStorage.removeItem(STORAGE_KEY);
      }
    } catch (error) {
      console.error("Error saving state to localStorage", error);
    }
  }, [state]);

  const wordLevelMap = useMemo(() => {
    const map = new Map<string, Level>();
    flashcards.forEach(fc => map.set(fc.id, fc.level));
    return map;
  }, []);
  
  const checkAndAwardBadges = useCallback((updatedProgress: UserProgress, allRecordings: Recording[]): { updatedBadges: EarnedBadge[], scoreBonus: number } => {
      const earnedBadgeIds = new Set(updatedProgress.badges.map(b => b.badgeId));
      const newlyEarned: EarnedBadge[] = [];

      badges.forEach(badge => {
          if (earnedBadgeIds.has(badge.id)) return;
          
          let isEarned = false;
          const { type, threshold = 1, category, storyId } = badge.criteria;
          
          switch (type) {
              case 'wordMastery':
                  const totalWordsMastered = Object.values(updatedProgress.wordsMasteredByLevel).flat();
                  if (category) {
                      const masteredInCategory = totalWordsMastered
                          .map(id => flashcards.find(f => f.id === id))
                          .filter(f => f && f.category === category).length;
                      if (masteredInCategory >= threshold) isEarned = true;
                  } else {
                      if (totalWordsMastered.length >= threshold) isEarned = true;
                  }
                  break;
              case 'storyComplete':
                  if (storyId) {
                      if (updatedProgress.storiesCompleted.includes(storyId)) isEarned = true;
                  } else {
                      if (updatedProgress.storiesCompleted.length >= threshold) isEarned = true;
                  }
                  break;
              case 'firstRecording':
                  if (allRecordings.length >= threshold) isEarned = true;
                  break;
          }

          if (isEarned) {
              console.log(`New badge earned: ${badge.name}`);
              newlyEarned.push({ badgeId: badge.id, earnedDate: new Date().toISOString() });
          }
      });
      
      return {
          updatedBadges: [...updatedProgress.badges, ...newlyEarned],
          scoreBonus: newlyEarned.length * 20, // 20 points per badge
      };
  }, []);

  const addMasteredWord = useCallback((wordId: string) => {
      const level = wordLevelMap.get(wordId);
      if (!level) return;

      setState(currentState => {
          const { progress: p, recordings } = currentState;
          const words = new Set(p.wordsMasteredByLevel[level]);
          const isNewWord = !words.has(wordId);
          
          let updatedProgress = { ...p };

          // 1. Update Streak
          const today = new Date().toISOString().split('T')[0];
          if (p.lastActiveDate !== today) {
              const yesterday = new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split('T')[0];
              updatedProgress.lastActiveDate = today;
              updatedProgress.streakDays = p.lastActiveDate === yesterday ? p.streakDays + 1 : 1;
          }

          // 2. Add Word and Score
          if (isNewWord) {
              updatedProgress.wordsMasteredByLevel = {
                  ...p.wordsMasteredByLevel,
                  [level]: [...p.wordsMasteredByLevel[level], wordId],
              };
              updatedProgress.adaptiveScore += 1;
          }
          
          // 3. Check for Badges using latest recordings
          const { updatedBadges, scoreBonus } = checkAndAwardBadges(updatedProgress, recordings);
          if (updatedBadges.length > updatedProgress.badges.length) {
              updatedProgress.badges = updatedBadges;
              updatedProgress.adaptiveScore += scoreBonus;
          }

          return { ...currentState, progress: updatedProgress };
      });
  }, [wordLevelMap, checkAndAwardBadges]);

  const addCompletedStory = useCallback((storyId: string) => {
      setState(currentState => {
          let { progress: p, recordings, assessments } = currentState;
          if (p.storiesCompleted.includes(storyId)) {
            const today = new Date().toISOString().split('T')[0];
            if (p.lastActiveDate !== today) {
                const yesterday = new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split('T')[0];
                const updatedProgress = {
                  ...p,
                  lastActiveDate: today,
                  streakDays: p.lastActiveDate === yesterday ? p.streakDays + 1 : 1,
                };
                return { ...currentState, progress: updatedProgress };
            }
            return currentState;
          }
          
          let updatedProgress = { ...p };

          // 1. Update Streak
          const today = new Date().toISOString().split('T')[0];
          if (p.lastActiveDate !== today) {
              const yesterday = new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split('T')[0];
              updatedProgress.lastActiveDate = today;
              updatedProgress.streakDays = p.lastActiveDate === yesterday ? p.streakDays + 1 : 1;
          }
          
          // 2. Add Story and Score
          const newStoriesCompleted = [...p.storiesCompleted, storyId];
          let newLevel = p.currentLevel;
          let recommendedNextLevel: Level | undefined;
          
          const score = Math.floor(Math.random() * 21) + 80;
          if (score > 85) {
              if (p.currentLevel === Level.Beginner4_6 && newStoriesCompleted.length >= 2) {
                  newLevel = Level.Emerging7_9;
                  recommendedNextLevel = Level.Emerging7_9;
              } else if (p.currentLevel === Level.Emerging7_9 && newStoriesCompleted.length >= 4) {
                  newLevel = Level.FluentPrep10_12;
                  recommendedNextLevel = Level.FluentPrep10_12;
              }
          }
          
          const completionAssessment: Assessment = {
              id: `as-story-${storyId}-${Date.now()}`,
              userId: p.userId,
              type: AssessmentType.StoryCompletion,
              score,
              details: { storyId },
              timestamp: new Date().toISOString(),
              ...(recommendedNextLevel && { recommendedNextLevel }),
          };
          const newAssessments = [...assessments, completionAssessment];
          
          updatedProgress = {
              ...updatedProgress,
              storiesCompleted: newStoriesCompleted,
              adaptiveScore: p.adaptiveScore + 10,
              currentLevel: newLevel,
          };

          // 3. Check for Badges
          const { updatedBadges, scoreBonus } = checkAndAwardBadges(updatedProgress, recordings);
          if (updatedBadges.length > updatedProgress.badges.length) {
              updatedProgress.badges = updatedBadges;
              updatedProgress.adaptiveScore += scoreBonus;
          }
          
          return { ...currentState, progress: updatedProgress, assessments: newAssessments };
      });
  }, [checkAndAwardBadges]);

  const addRecording = useCallback((data: { storyId: string; panelId: string; audioUrl: string; score: number; duration: number; }) => {
      setState(currentState => {
          let { progress: p, recordings, assessments } = currentState;
          const newRecording: Recording = {
            id: `${data.storyId}-${data.panelId}-${Date.now()}`,
            userId: p.userId,
            ...data,
            reviewedByParent: false, approved: false, attempts: 1, notes: "",
            created_date: new Date().toISOString(),
          };
          
          const newRecordings = [...recordings, newRecording];
          let updatedProgress = { ...p };

          // 1. Update Streak
          const today = new Date().toISOString().split('T')[0];
          if (p.lastActiveDate !== today) {
              const yesterday = new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split('T')[0];
              updatedProgress.lastActiveDate = today;
              updatedProgress.streakDays = p.lastActiveDate === yesterday ? p.streakDays + 1 : 1;
          }
          
          // 2. Update Recording Stats and Score
          const newTotal = newRecordings.length;
          updatedProgress.totalRecordings = newTotal;
          updatedProgress.averageScore = newTotal > 0 ? Math.round(newRecordings.reduce((sum, r) => sum + r.score, 0) / newTotal) : 0;
          updatedProgress.adaptiveScore += 5;

          // 3. Check for Badges
          const { updatedBadges, scoreBonus } = checkAndAwardBadges(updatedProgress, newRecordings);
          if (updatedBadges.length > updatedProgress.badges.length) {
              updatedProgress.badges = updatedBadges;
              updatedProgress.adaptiveScore += scoreBonus;
          }

          const fluencyAssessment: Assessment = {
            id: `as-fluency-${newRecording.id}`,
            userId: p.userId,
            type: AssessmentType.ReadingFluency,
            score: data.score,
            details: { storyId: data.storyId, panelId: data.panelId, duration: data.duration },
            timestamp: new Date().toISOString(),
          };
          const newAssessments = [...assessments, fluencyAssessment];

          return { ...currentState, progress: updatedProgress, recordings: newRecordings, assessments: newAssessments };
      });
  }, [checkAndAwardBadges]);

  const removeRecording = useCallback((recordingId: string) => {
    setState(currentState => {
        const newRecordings = currentState.recordings.filter(rec => rec.id !== recordingId);
        const newTotal = newRecordings.length;
        const newAverage = newTotal > 0 ? Math.round(newRecordings.reduce((sum, r) => sum + r.score, 0) / newTotal) : 0;
        
        const updatedProgress = {
            ...currentState.progress,
            totalRecordings: newTotal,
            averageScore: newAverage
        };

        return { ...currentState, progress: updatedProgress, recordings: newRecordings };
    });
  }, []);

  const login = useCallback((name: string) => {
    setState({
      ...initialAppState,
      isAuthenticated: true,
      progress: {
        ...initialProgress,
        displayName: name.trim() || 'Learner',
        userId: `user-${Date.now()}`,
        avatarId: '',
        lastActiveDate: new Date().toISOString().split('T')[0],
      },
    });
  }, []);

  const logout = useCallback(() => {
    setState(initialAppState);
  }, []);

  const setAvatar = useCallback((avatarId: string) => {
      setState(currentState => ({
          ...currentState,
          progress: {
              ...currentState.progress,
              avatarId: avatarId,
          }
      }));
  }, []);

  const contextValue = useMemo(() => ({
    ...state,
    addMasteredWord,
    addCompletedStory,
    addRecording,
    removeRecording,
    login,
    logout,
    setAvatar,
  }), [state, addMasteredWord, addCompletedStory, addRecording, removeRecording, login, logout, setAvatar]);

  return (
    <UserProgressContext.Provider value={contextValue}>
      {children}
    </UserProgressContext.Provider>
  );
};

export const useUserProgress = () => {
  const context = useContext(UserProgressContext);
  if (context === undefined) {
    throw new Error('useUserProgress must be used within a UserProgressProvider');
  }
  return context;
};
