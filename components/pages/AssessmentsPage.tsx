import React, { useState, useEffect, useMemo } from 'react';
import { useUserProgress } from '../../context/UserProgressContext';
import { Assessment, AssessmentType } from '../../types';
import { ClipboardCheck, BarChart, BookOpen, Mic } from 'lucide-react';
import { stories } from '../../data/stories';

const AssessmentCard: React.FC<{ assessment: Assessment; index: number }> = ({ assessment, index }) => {
    const date = new Date(assessment.timestamp);
    const formattedDate = date.toLocaleDateString();
    const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const typeDetails = useMemo(() => {
        switch (assessment.type) {
            case AssessmentType.StoryCompletion:
                const story = stories.find(s => s.id === assessment.details.storyId);
                return {
                    icon: BookOpen,
                    title: 'Story Completion',
                    description: `Completed "${story?.title || 'a story'}"`,
                    color: 'blue'
                };
            case AssessmentType.ReadingFluency:
                 const storyFluency = stories.find(s => s.id === assessment.details.storyId);
                return {
                    icon: Mic,
                    title: 'Reading Fluency',
                    description: `Pronunciation practice in "${storyFluency?.title || 'a story'}"`,
                    color: 'green'
                };
            case AssessmentType.VocabularyCheck:
                return {
                    icon: BarChart,
                    title: 'Vocabulary Check',
                    description: `Quiz on ${assessment.details.wordCount} words`,
                    color: 'purple'
                };
            default:
                return {
                    icon: ClipboardCheck,
                    title: 'Assessment',
                    description: 'General assessment completed',
                    color: 'gray'
                };
        }
    }, [assessment]);

    const colorClasses = {
        blue: { border: "border-blue-300", bg: "bg-blue-50", text: "text-blue-700", gradient: "from-blue-500 to-cyan-500" },
        green: { border: "border-green-300", bg: "bg-green-50", text: "text-green-700", gradient: "from-green-500 to-emerald-500" },
        purple: { border: "border-purple-300", bg: "bg-purple-50", text: "text-purple-700", gradient: "from-purple-500 to-pink-500" },
        gray: { border: "border-gray-300", bg: "bg-gray-50", text: "text-gray-700", gradient: "from-gray-500 to-slate-500" },
    };
    const styles = colorClasses[typeDetails.color as keyof typeof colorClasses];

    return (
        <div className={`bg-white hover:shadow-lg transition-all border-2 ${styles.border} rounded-xl fade-in`} style={{ animationDelay: `${index * 0.05}s` }}>
            <div className="p-6">
                <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${styles.gradient} rounded-lg flex items-center justify-center flex-shrink-0`}>
                        <typeDetails.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-start">
                             <div>
                                <h3 className={`text-lg font-bold ${styles.text}`}>{typeDetails.title}</h3>
                                <p className="text-sm text-gray-600">{typeDetails.description}</p>
                            </div>
                            <span className={`text-2xl font-extrabold ${styles.text}`}>{assessment.score}%</span>
                        </div>
                         <p className="text-xs text-gray-500 mt-2">{formattedDate} at {formattedTime}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const AssessmentsPage: React.FC = () => {
    const { assessments } = useUserProgress();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 500);
        return () => clearTimeout(timer);
    }, []);
    
    const sortedAssessments = useMemo(() => {
        return [...assessments].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
    }, [assessments]);

    return (
        <div className="max-w-4xl mx-auto space-y-6">
            <div className="fade-in">
                <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                        <ClipboardCheck className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 font-amharic-pretty">ግምገማዎች</h1>
                        <p className="text-lg text-gray-600">Assessments</p>
                    </div>
                </div>
                <p className="text-gray-600">
                    Here is a history of all the assessments you've completed.
                </p>
            </div>
            
             <div>
                {isLoading ? (
                    <div className="space-y-4">
                        <div className="bg-gray-200 h-24 rounded-xl pulse"></div>
                        <div className="bg-gray-200 h-24 rounded-xl pulse" style={{animationDelay: '0.1s'}}></div>
                        <div className="bg-gray-200 h-24 rounded-xl pulse" style={{animationDelay: '0.2s'}}></div>
                    </div>
                ) : sortedAssessments.length > 0 ? (
                    <div className="space-y-4">
                        {sortedAssessments.map((assessment, index) => (
                           <AssessmentCard key={assessment.id} assessment={assessment} index={index} />
                        ))}
                    </div>
                ) : (
                    <div className="bg-white/80 backdrop-blur-sm border-2 border-orange-200 rounded-xl">
                        <div className="p-12 text-center">
                            <ClipboardCheck className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">No Assessments Yet</h3>
                            <p className="text-gray-500">Complete stories and recordings to see your assessments here!</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AssessmentsPage;