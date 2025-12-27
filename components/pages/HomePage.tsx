
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useUserProgress } from '../../context/UserProgressContext';
import { stories } from '../../data/stories';
import { flashcards } from '../../data/flashcards';
import { badges } from '../../data/badges';
import StoryCard from '../story/StoryCard';
import { Level } from '../../types';

const HomePage: React.FC = () => {
    const { progress } = useUserProgress();

    const storiesCompleted = progress.storiesCompleted.length;
    const totalStories = stories.length;
    const storiesPercent = totalStories > 0 ? (storiesCompleted / totalStories) * 100 : 0;
    
    const wordsMastered = Object.values(progress.wordsMasteredByLevel).flat().length;
    const totalWords = flashcards.length;
    const wordsPercent = totalWords > 0 ? (wordsMastered / totalWords) * 100 : 0;

    const badgesEarned = progress.badges.length;
    const totalBadges = badges.length;
    const badgesPercent = totalBadges > 0 ? (badgesEarned / totalBadges) * 100 : 0;

    const points = progress.adaptiveScore;
    const pointsPercent = (points / 1000) * 100; // Assume 1000 points is a good target

    const featuredStories = stories.slice(0, 3);

    const levelInfo = {
        [Level.Beginner4_6]: { name: "Beginner", range: "4-6", num: 1 },
        [Level.Emerging7_9]: { name: "Emerging", range: "7-9", num: 2 },
        [Level.FluentPrep10_12]: { name: "FluentPrep", range: "10-12", num: 3 },
    };
    const { name: currentLevelName, range: currentLevelRange, num: levelNum } = levelInfo[progress.currentLevel];

    const getGreeting = (): string => {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 12) {
            return 'እንደምን አደርክ'; // Good morning
        } else if (hour >= 12 && hour < 18) {
            return 'እንደምን ዋልክ'; // Good afternoon
        } else {
            return 'እንደምን አመሸህ'; // Good evening
        }
    };
    const amharicGreeting = getGreeting();

    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
            {/* Hero Section */}
            <div className="hero-gradient relative overflow-hidden rounded-3xl p-8 md:p-12 shadow-2xl">
                <div className="relative z-10">
                    <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 font-amharic-pretty">
                        {amharicGreeting}, {progress.displayName}! 👋
                    </h1>
                    <p className="text-xl text-white/90 mb-6">
                        Ready to learn Amharic through amazing stories?
                    </p>
                    <div className="flex flex-wrap gap-4">
                        <NavLink to="/stories">
                            <button className="bg-white text-red-600 hover:bg-gray-100 shadow-lg px-6 py-3 rounded-lg font-medium flex items-center transition-colors">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
                                </svg>
                                Start Reading
                            </button>
                        </NavLink>
                        <NavLink to="/flashcards">
                            <button className="bg-white/20 text-white border border-white hover:bg-white/30 px-6 py-3 rounded-lg font-medium flex items-center transition-colors">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                                </svg>
                                Practice Words
                            </button>
                        </NavLink>
                    </div>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400/20 rounded-full -mr-32 -mt-32"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-red-700/20 rounded-full -ml-24 -mb-24"></div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatTile value={storiesCompleted} label="ታሪኮች" percent={storiesPercent} gradientClass="stat-gradient-red" barClass="bg-red-500" icon={<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>} />
                <StatTile value={wordsMastered} label="ቃላት" percent={wordsPercent} gradientClass="stat-gradient-yellow" barClass="bg-yellow-500" icon={<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>} />
                <StatTile value={badgesEarned} label="ሽልማቶች" percent={badgesPercent} gradientClass="stat-gradient-green" barClass="bg-green-500" icon={<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>} />
                <StatTile value={points} label="ነጥብ · Score" percent={pointsPercent} gradientClass="stat-gradient-blue" barClass="bg-blue-500" icon={<svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>} />
            </div>

            {/* Current Level */}
            <div className="bg-white/80 backdrop-blur-sm border-2 border-amber-200 rounded-lg">
                <div className="p-6 border-b border-amber-100">
                    <h2 className="text-xl font-semibold flex items-center gap-2 font-amharic-pretty">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/></svg>
                        የአሁኑ ደረጃ · Current Level
                    </h2>
                </div>
                <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h3 className="text-2xl font-bold text-gray-800">{currentLevelName} ({currentLevelRange})</h3>
                            <p className="text-gray-600">Keep learning to advance!</p>
                        </div>
                        <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-lg text-lg font-medium">
                            Level {levelNum}
                        </span>
                    </div>
                </div>
            </div>
            
            {/* Featured Stories */}
            <div>
                 <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-3 font-amharic-pretty">
                        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/></svg>
                        የሚመከሩ ታሪኮች · Featured Stories
                    </h2>
                    <NavLink to="/stories" className="text-red-600 hover:text-red-700 flex items-center font-medium">
                        See All 
                        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
                    </NavLink>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                    {featuredStories.map(story => (
                        <StoryCard key={story.id} story={story} />
                    ))}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-2 gap-6">
                <NavLink to="/stories" className="bg-gradient-to-br from-purple-100 to-pink-100 border-2 border-purple-300 rounded-lg p-6 block">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/></svg>
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-xl text-gray-800 mb-2">Practice Speaking</h3>
                            <p className="text-gray-600">Record your voice in our interactive stories!</p>
                        </div>
                    </div>
                </NavLink>

                <NavLink to="/progress" className="bg-gradient-to-br from-green-100 to-emerald-100 border-2 border-green-300 rounded-lg p-6 block">
                     <div className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-xl text-gray-800 mb-2">View Badges</h3>
                            <p className="text-gray-600">See all your achievements and rewards</p>
                        </div>
                    </div>
                </NavLink>
            </div>
        </div>
    );
};

interface StatTileProps {
    value: number;
    label: string;
    percent: number;
    gradientClass: string;
    barClass: string;
    icon: React.ReactNode;
}

const StatTile: React.FC<StatTileProps> = ({ value, label, percent, gradientClass, barClass, icon }) => (
    <div className="bg-white/80 backdrop-blur-sm border-2 border-orange-200 rounded-lg hover:shadow-lg transition-all p-6">
        <div className={`${gradientClass} w-12 h-12 rounded-xl flex items-center justify-center mb-3`}>
            {icon}
        </div>
        <p className="text-2xl font-bold text-gray-800">{value}</p>
        <p className="text-sm text-gray-600 mb-2 font-amharic">{label}</p>
        <div className="w-full bg-gray-200 rounded-full h-2">
            <div className={`${barClass} h-2 rounded-full`} style={{ width: `${percent}%` }}></div>
        </div>
    </div>
);


export default HomePage;