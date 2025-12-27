
import React from 'react';
import { useUserProgress } from '../../context/UserProgressContext';
import { badges } from '../../data/badges';
import { flashcards } from '../../data/flashcards';
import { stories } from '../../data/stories';
import Card from '../ui/Card';
import DynamicIcon from '../ui/DynamicIcon';
import { Award, BookOpen, Layers, Mic } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Level } from '../../types';

const ProgressPage: React.FC = () => {
  const { progress } = useUserProgress();

  const earnedBadges = progress.badges
    .map(earned => badges.find(b => b.id === earned.badgeId))
    .filter((b): b is (typeof badges[0]) => b !== undefined);

  const progressData = [
    { name: 'Beginner', mastered: progress.wordsMasteredByLevel[Level.Beginner4_6].length },
    { name: 'Emerging', mastered: progress.wordsMasteredByLevel[Level.Emerging7_9].length },
    { name: 'FluentPrep', mastered: progress.wordsMasteredByLevel[Level.FluentPrep10_12].length },
  ];
  
  return (
    <div className="animate-fade-in">
      <h1 className="text-4xl font-bold text-center text-purple-600 mb-8">Your Progress</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard icon={<Layers />} value={Object.values(progress.wordsMasteredByLevel).flat().length} label="Words Mastered" color="yellow" />
        <StatCard icon={<BookOpen />} value={progress.storiesCompleted.length} label="Stories Done" color="blue" />
        <StatCard icon={<Mic />} value={progress.totalRecordings} label="Recordings" color="green" />
        <StatCard icon={<Award />} value={progress.badges.length} label="Badges Earned" color="purple" />
      </div>

      <Card className="p-4 mb-8">
        <h2 className="text-xl font-bold text-slate-700 mb-4">Words Mastered by Level</h2>
        <div style={{width: '100%', height: 300}}>
          <ResponsiveContainer>
            <BarChart data={progressData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="mastered" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
      
      <div>
        <h2 className="text-2xl font-bold text-slate-700 mb-4">Badges</h2>
        {earnedBadges.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {earnedBadges.map(badge => (
              <Card key={badge.id} className="flex flex-col items-center p-4 text-center">
                <DynamicIcon source={{ iconName: badge.iconId }} className="w-16 h-16 mb-2 text-purple-500 fill-purple-200" />
                <h3 className="font-bold text-slate-800">{badge.name}</h3>
                <p className="text-xs text-slate-500">{badge.description}</p>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-center text-slate-500 p-8 bg-white rounded-lg">You haven't earned any badges yet. Keep learning!</p>
        )}
      </div>
    </div>
  );
};

const StatCard: React.FC<{icon: React.ReactNode, value: number, label: string, color: string}> = ({icon, value, label, color}) => {
    const colors: {[key: string]: string} = {
        yellow: 'bg-yellow-100 text-yellow-600',
        blue: 'bg-blue-100 text-blue-600',
        green: 'bg-green-100 text-green-600',
        purple: 'bg-purple-100 text-purple-600',
    }
    return (
    <Card className="p-4 flex flex-col items-center justify-center text-center">
        <div className={`p-3 rounded-full mb-2 ${colors[color]}`}>{icon}</div>
        <div className="text-3xl font-extrabold text-slate-800">{value}</div>
        <div className="text-sm text-slate-500 font-semibold">{label}</div>
    </Card>
)};

export default ProgressPage;
