import React, { useState, useEffect, useMemo } from 'react';
import { BookOpen, Award, Mic, BarChart3, Star, CheckCircle, Lightbulb, TrendingUp, Calendar, Zap, Sun, User, BookHeart, ClipboardCheck } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from 'recharts';
import { useUserProgress } from '../../context/UserProgressContext';
import { flashcards } from '../../data/flashcards';
import { stories } from '../../data/stories';
import { badges } from '../../data/badges';
import { Level, Badge, AssessmentType } from '../../types';

const ParentDashboardPage: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const { progress, assessments } = useUserProgress();
    
    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1000);
        document.body.classList.add('gradient-bg');
        document.body.classList.remove('bg-gradient-to-br', 'from-amber-50', 'via-orange-50', 'to-red-50');
        return () => {
          clearTimeout(timer);
          document.body.classList.remove('gradient-bg');
          document.body.classList.add('bg-gradient-to-br', 'from-amber-50', 'via-orange-50', 'to-red-50');
        };
    }, []);

    const learningProgressData = useMemo(() => {
        if (!assessments || assessments.length === 0) {
            return Array.from({ length: 4 }, (_, i) => ({ name: `Week ${i + 1}`, 'Learning Score': 0 }));
        }

        const sortedAssessments = [...assessments].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
        const firstDate = new Date(sortedAssessments[0].timestamp);
        firstDate.setHours(0, 0, 0, 0);

        const today = new Date();
        const msPerWeek = 7 * 24 * 60 * 60 * 1000;
        const totalWeeks = Math.max(1, Math.ceil((today.getTime() - firstDate.getTime()) / msPerWeek));

        const weeklyScores: { [week: number]: number } = {};

        for (const assessment of sortedAssessments) {
            const assessmentDate = new Date(assessment.timestamp);
            const weekIndex = Math.floor((assessmentDate.getTime() - firstDate.getTime()) / msPerWeek);
            
            if (!weeklyScores[weekIndex]) {
                weeklyScores[weekIndex] = 0;
            }
            
            let points = 0;
            if (assessment.type === AssessmentType.StoryCompletion) {
                points = 10;
            } else if (assessment.type === AssessmentType.ReadingFluency) {
                points = 5;
            }
            weeklyScores[weekIndex] += points;
        }

        const data = [];
        for (let i = 0; i < totalWeeks; i++) {
            data.push({
                name: `Week ${i + 1}`,
                'Learning Score': weeklyScores[i] || 0,
            });
        }
        return data;
    }, [assessments]);

    const stats = useMemo(() => {
        const wordsMastered = Object.values(progress.wordsMasteredByLevel).flat().length;
        const storiesCompleted = progress.storiesCompleted.length;
        const badgesEarned = progress.badges.length;

        return {
            wordsMastered,
            storiesCompleted,
            badgesEarned,
            avgPronunciation: progress.averageScore,
            wordsProgress: (wordsMastered / flashcards.length) * 100,
            storiesProgress: (storiesCompleted / stories.length) * 100,
            badgesProgress: (badgesEarned / badges.length) * 100,
            pronunciationProgress: progress.averageScore,
            totalScore: progress.adaptiveScore
        };
    }, [progress]);
    
    const recentBadges = useMemo(() => {
        return progress.badges
            .sort((a, b) => new Date(b.earnedDate).getTime() - new Date(a.earnedDate).getTime())
            .slice(0, 3)
            .map(earned => badges.find(b => b.id === earned.badgeId))
            .filter((b): b is Badge => b !== undefined);
    }, [progress.badges]);

    const latestAssessment = useMemo(() => {
        if (assessments.length === 0) return null;
        return assessments.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0];
    }, [assessments]);

    const recommendations = useMemo(() => {
        const recs = [];
        if (stats.storiesCompleted === 0) recs.push({ icon: BookHeart, text: 'Start with your first story to begin the journey!' });
        if (stats.wordsMastered < 20) recs.push({ icon: BookOpen, text: 'Practice flashcards daily to expand vocabulary.' });
        if (progress.totalRecordings < 5) recs.push({ icon: Mic, text: 'Record more pronunciations to improve speaking skills.' });
        if (recs.length === 0) recs.push({ icon: Star, text: 'Great progress! Keep up the good work!' });
        return recs;
    }, [stats, progress.totalRecordings]);

    const levelNameMap = {
        [Level.Beginner4_6]: "Beginner (4-6)",
        [Level.Emerging7_9]: "Emerging (7-9)",
        [Level.FluentPrep10_12]: "FluentPrep (10-12)",
    };
    const currentLevelName = levelNameMap[progress.currentLevel];

    if(isLoading) {
        return <div className="text-center p-12">Loading Dashboard...</div>
    }

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <div className="fade-in bg-gradient-to-br from-red-600 to-orange-600 p-8 rounded-[2.5rem] shadow-2xl border-4 border-white/20 transform transition-transform hover:scale-[1.01]">
                <div className="flex flex-col md:flex-row items-center gap-8">
                    <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg border-4 border-white/40 transform -rotate-6">
                        <User className="w-12 h-12 text-white" />
                    </div>
                    <div className="text-center md:text-left">
                        <h1 className="text-4xl md:text-6xl font-black text-white font-amharic-pretty tracking-tight drop-shadow-lg">
                           {progress.displayName} የክትትል ገጽ
                        </h1>
                        <p className="text-xl md:text-2xl text-yellow-100 font-bold uppercase tracking-[0.2em] mt-2 opacity-90 drop-shadow">
                           {progress.displayName}'s Learning Dashboard
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard icon={BookOpen} value={stats.wordsMastered} label="Words Mastered" progress={stats.wordsProgress} color="blue" />
                <StatCard icon={BookHeart} value={stats.storiesCompleted} label="Stories Completed" progress={stats.storiesProgress} color="green" />
                <StatCard icon={Award} value={stats.badgesEarned} label="Badges Earned" progress={stats.badgesProgress} color="yellow" />
                <StatCard icon={Mic} value={`${stats.avgPronunciation}%`} label="Avg Pronunciation" progress={stats.pronunciationProgress} color="purple" />
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 bg-white/80 backdrop-blur-sm border-2 border-orange-200 rounded-xl">
                    <div className="p-6 border-b border-orange-100"><h2 className="text-xl font-semibold flex items-center gap-2 font-amharic-pretty"><TrendingUp className="w-6 h-6 text-orange-600" />የእድገት መከታተያ · Learning Progress</h2></div>
                    <div className="p-6 h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={learningProgressData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar dataKey="Learning Score" fill="#DA121A" name="Learning Score" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                 <div className="space-y-6">
                    <div className="bg-white/80 backdrop-blur-sm border-2 border-green-200 rounded-xl">
                        <div className="p-6 border-b border-green-100"><h2 className="text-xl font-semibold flex items-center gap-2"><Zap className="w-6 h-6 text-green-600" />Current Level</h2></div>
                        <div className="p-6">
                            <div className="text-center mb-4"><span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-lg px-4 py-2 rounded-md font-bold inline-block">{currentLevelName}</span></div>
                            <div className="space-y-2">
                                <div><p className="text-sm text-gray-600 mb-1">Learning Streak</p><div className="flex items-center gap-2"><Calendar className="w-5 h-5 text-orange-500" /><span className="text-xl font-bold text-gray-800">{progress.streakDays} days</span></div></div>
                                <div><p className="text-sm text-gray-600 mb-1">Total Score</p><span className="text-xl font-bold text-purple-600">{stats.totalScore} pts</span></div>
                            </div>
                        </div>
                    </div>
                     <div className="bg-white/80 backdrop-blur-sm border-2 border-orange-200 rounded-xl">
                        <div className="p-6 border-b border-orange-100"><h2 className="text-xl font-semibold flex items-center gap-2"><ClipboardCheck className="w-6 h-6 text-orange-600" />Recent Assessment</h2></div>
                        <div className="p-6">
                            {latestAssessment ? (
                                <div>
                                    <div className="flex justify-between items-start">
                                        <p className="font-semibold text-gray-800">{latestAssessment.type.replace(/([A-Z])/g, ' $1').trim()}</p>
                                        <span className="text-2xl font-bold text-orange-600">{latestAssessment.score}%</span>
                                    </div>
                                    <p className="text-xs text-gray-500">{new Date(latestAssessment.timestamp).toLocaleString()}</p>
                                </div>
                            ) : (
                                <div className="text-center py-4 text-gray-500"><ClipboardCheck className="w-10 h-10 text-gray-400 mx-auto mb-2" /><p>No assessments yet</p></div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm border-2 border-purple-200 rounded-xl">
                <div className="p-6 border-b border-purple-100"><h2 className="text-xl font-semibold flex items-center gap-2"><CheckCircle className="w-6 h-6 text-purple-600" />Recent Achievements</h2></div>
                <div className="p-6">
                    {recentBadges.length > 0 ? (
                        <div className="space-y-3">
                            {recentBadges.map(badge => (
                                <div key={badge.id} className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg border border-purple-200 fade-in">
                                    <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center"><Award className="w-5 h-5 text-white" /></div>
                                    <div className="flex-1"><p className="font-semibold text-gray-800">{badge.name}</p><p className="text-xs text-gray-600">{badge.description}</p></div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-500"><Award className="w-12 h-12 text-gray-400 mx-auto mb-2" /><p>No achievements yet</p><p className="text-sm">Keep learning to earn badges!</p></div>
                    )}
                </div>
            </div>

            <div className="bg-gradient-to-br from-orange-100 to-red-100 border-2 border-orange-300 rounded-xl shadow-inner">
                <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2 font-amharic-pretty"><Lightbulb className="w-6 h-6 text-red-600" />ምክረ-ሐሳቦች · Recommendations</h3>
                    <div className="space-y-2">
                        {recommendations.map((rec, i) => (
                             <p key={i} className="text-gray-700 fade-in flex items-center gap-2 font-medium"><rec.icon className="w-5 h-5 text-red-600 flex-shrink-0" /> {rec.text}</p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};


const StatCard: React.FC<{ icon: React.ElementType, value: string | number, label: string, progress: number, color: 'blue' | 'green' | 'yellow' | 'purple' }> = ({ icon: Icon, value, label, progress, color }) => {
    const colors = {
        blue: { bg: 'bg-blue-500', gradient: 'from-blue-500 to-cyan-500' },
        green: { bg: 'bg-green-500', gradient: 'from-green-500 to-emerald-500' },
        yellow: { bg: 'bg-yellow-500', gradient: 'from-yellow-400 to-orange-500' },
        purple: { bg: 'bg-purple-500', gradient: 'from-purple-500 to-pink-500' },
    };
    const { bg, gradient } = colors[color];

    return (
        <div className="bg-white/80 backdrop-blur-sm border-2 border-orange-200 rounded-xl hover:shadow-xl transition-all fade-in">
            <div className="p-6">
                <div className={`w-12 h-12 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center mb-4`}><Icon className="w-6 h-6 text-white" /></div>
                <p className="text-3xl font-bold text-gray-800 mb-1">{value}</p>
                <p className="text-sm text-gray-600 mb-3 font-semibold">{label}</p>
                <div className="w-full bg-gray-200 rounded-full h-2"><div className={`${bg} h-2 rounded-full`} style={{ width: `${progress}%` }}></div></div>
            </div>
        </div>
    );
};

export default ParentDashboardPage;