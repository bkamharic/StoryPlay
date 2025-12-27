import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useUserProgress } from '../../context/UserProgressContext';
import { Recording } from '../../types';
import { stories } from '../../data/stories';
import { getAsset } from '../../data/assets';
import { Mic, Play, Trash2, Check, AlertTriangle } from 'lucide-react';

type FilterType = 'All' | 'Approved' | 'Pending';

const RecordingReviewPage: React.FC = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [currentFilter, setCurrentFilter] = useState<FilterType>('All');
    const { recordings, removeRecording } = useUserProgress();

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

    const filteredRecordings = useMemo(() => {
        return recordings
            .filter(rec => {
                if (currentFilter === 'All') return true;
                if (currentFilter === 'Approved') return rec.approved;
                if (currentFilter === 'Pending') return !rec.reviewedByParent;
                return true;
            })
            .sort((a, b) => new Date(b.created_date).getTime() - new Date(a.created_date).getTime());
    }, [recordings, currentFilter]);

    const stats = useMemo(() => {
        const total = recordings.length;
        const approved = recordings.filter(r => r.approved).length;
        const avgScore = total > 0 ? recordings.reduce((sum, r) => sum + r.score, 0) / total : 0;
        return { total, approved, avgScore: Math.round(avgScore) };
    }, [recordings]);

    const handleFilterChange = (filter: FilterType) => {
        setCurrentFilter(filter);
    };

    const handleDelete = (recordingId: string) => {
        if (window.confirm('Are you sure you want to delete this recording?')) {
            removeRecording(recordingId);
        }
    };
    
    return (
        <div className="max-w-6xl mx-auto space-y-6">
            <div className="fade-in">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
                        <Mic className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 font-amharic">የእርስዎ ቀረጻዎች</h1>
                        <p className="text-lg text-gray-600">Your Recordings</p>
                    </div>
                </div>
                <p className="text-gray-600">Review and listen to your {stats.total} recorded pronunciations</p>
            </div>

            <div className="grid grid-cols-3 gap-4">
                <StatCard value={stats.total} label="Total" color="purple" />
                <StatCard value={stats.approved} label="Approved" color="green" />
                <StatCard value={`${stats.avgScore}%`} label="Avg Score" color="orange" />
            </div>

            <div className="bg-white/80 backdrop-blur-sm border-2 border-orange-200 rounded-xl">
                <div className="p-6">
                    <div className="bg-orange-100 rounded-lg p-1 flex gap-1">
                        <FilterButton label="All" current={currentFilter} onClick={() => handleFilterChange('All')} />
                        <FilterButton label="Approved" current={currentFilter} onClick={() => handleFilterChange('Approved')} />
                        <FilterButton label="Pending" current={currentFilter} onClick={() => handleFilterChange('Pending')} />
                    </div>
                </div>
            </div>

            <div>
                {isLoading ? (
                    <div className="space-y-4">
                        <SkeletonCard /><SkeletonCard /><SkeletonCard />
                    </div>
                ) : filteredRecordings.length === 0 ? (
                    <div className="bg-white/80 backdrop-blur-sm border-2 border-orange-200 rounded-xl">
                        <div className="p-12 text-center">
                            <Mic className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">No recordings found</h3>
                            <p className="text-gray-500">Record yourself in a story to see your practice here!</p>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredRecordings.map((rec, index) => (
                            <RecordingCard key={rec.id} recording={rec} index={index} onDelete={handleDelete} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

const StatCard: React.FC<{ value: number | string; label: string; color: 'purple' | 'green' | 'orange' }> = ({ value, label, color }) => {
    const colors = {
        purple: "text-purple-700 border-purple-200",
        green: "text-green-700 border-green-200",
        orange: "text-orange-700 border-orange-200",
    }
    return (
         <div className={`bg-white/80 backdrop-blur-sm border-2 ${colors[color]} rounded-xl`}>
            <div className="p-6 text-center">
                <p className={`text-3xl font-bold ${colors[color]}`}>{value}</p>
                <p className="text-sm text-gray-600">{label}</p>
            </div>
        </div>
    )
}

const FilterButton: React.FC<{label: FilterType, current: FilterType, onClick: () => void}> = ({ label, current, onClick }) => (
    <button onClick={onClick} className={`px-4 py-2 rounded-md font-medium transition-all ${current === label ? 'active-tab' : 'hover:bg-orange-200 text-gray-600'}`}>
        {label}
    </button>
);

const SkeletonCard: React.FC = () => (
    <div className="bg-white border-2 border-purple-200 rounded-xl pulse"><div className="p-6"><div className="h-32 bg-gray-200 rounded"></div></div></div>
)


const getScoreColor = (score: number) => score >= 90 ? 'high-score' : score >= 75 ? 'medium-score' : 'low-score';
const getScoreEmoji = (score: number) => score >= 90 ? '🌟' : score >= 75 ? '👍' : '💪';

const RecordingCard: React.FC<{ recording: Recording; index: number; onDelete: (id: string) => void; }> = ({ recording, index, onDelete }) => {
    const scoreColor = getScoreColor(recording.score);
    const scoreEmoji = getScoreEmoji(recording.score);
    const date = new Date(recording.created_date);
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const story = stories.find(s => s.id === recording.storyId);
    
    const handlePlay = useCallback(() => {
        const audio = new Audio(recording.audioUrl);
        audio.play().catch(e => console.error("Error playing recording audio", e));
    }, [recording.audioUrl]);

    return (
        <div className="bg-white hover:shadow-xl transition-all border-2 border-purple-200 rounded-xl fade-in" style={{ animationDelay: `${index * 0.05}s` }}>
            <div className="p-6">
                <div className="flex flex-col sm:flex-row items-start gap-4">
                    <div className={`w-16 h-16 ${scoreColor} rounded-xl flex items-center justify-center shadow-lg flex-shrink-0`}>
                        <span className="text-2xl">{scoreEmoji}</span>
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-start justify-between mb-2 gap-2">
                            <div>
                                <h3 className="text-lg font-bold text-gray-800">Recording from "{story?.title || 'a story'}"</h3>
                                <p className="text-sm text-gray-600">{formattedDate} at {formattedTime}</p>
                            </div>
                            <span className={`${scoreColor} text-white text-lg px-4 py-1 rounded-md font-medium`}>{recording.score}%</span>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 mb-3">
                            {recording.approved ? (
                                <span className="bg-green-100 text-green-800 border border-green-300 px-2 py-1 rounded-md text-sm font-medium flex items-center"><Check className="w-3 h-3 mr-1" /> Approved</span>
                            ) : recording.reviewedByParent ? (
                                <span className="bg-orange-100 text-orange-800 border border-orange-300 px-2 py-1 rounded-md text-sm font-medium flex items-center"><AlertTriangle className="w-3 h-3 mr-1" /> Needs Work</span>
                            ) : (
                                <span className="bg-blue-100 text-blue-800 border border-blue-300 px-2 py-1 rounded-md text-sm font-medium">Pending Review</span>
                            )}
                            <span className="border border-gray-300 px-2 py-1 rounded-md text-sm font-medium">Attempt {recording.attempts}</span>
                        </div>

                        {recording.notes && (
                            <div className="bg-yellow-50 rounded-lg p-3 mb-3 border border-yellow-200">
                                <p className="text-sm text-gray-700"><span className="font-semibold">Feedback:</span> {recording.notes}</p>
                            </div>
                        )}

                        <div className="flex gap-3">
                            <button onClick={handlePlay} className="play-button hover:play-button text-white px-4 py-2 rounded-md font-medium flex items-center text-sm"><Play className="w-4 h-4 mr-2" /> Play</button>
                            <button onClick={() => onDelete(recording.id)} className="border-2 border-red-300 text-red-600 hover:bg-red-50 px-4 py-2 rounded-md font-medium flex items-center text-sm"><Trash2 className="w-4 h-4 mr-2" /> Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default RecordingReviewPage;