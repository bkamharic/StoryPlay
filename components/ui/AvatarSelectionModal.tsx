
import React, { useState } from 'react';
import { avatars } from '../../data/avatars';
import { Check, Sparkles } from 'lucide-react';
import DynamicIcon from './DynamicIcon';

interface AvatarSelectionModalProps {
    userName: string;
    onAvatarSelect: (avatarId: string) => void;
}

const themeStyles: { [key: string]: { bg: string, border: string, borderB: string, ring: string, text: string, gradient: string } } = {
    orange: { bg: 'bg-orange-50', border: 'border-orange-300', borderB: 'border-b-orange-600', ring: 'ring-orange-400', text: 'text-orange-700', gradient: 'from-orange-400 to-red-500' },
    yellow: { bg: 'bg-yellow-50', border: 'border-yellow-300', borderB: 'border-b-yellow-600', ring: 'ring-yellow-400', text: 'text-yellow-800', gradient: 'from-yellow-400 to-orange-500' },
    amber: { bg: 'bg-amber-50', border: 'border-amber-300', borderB: 'border-b-amber-600', ring: 'ring-amber-400', text: 'text-amber-800', gradient: 'from-amber-400 to-orange-600' },
    stone: { bg: 'bg-stone-50', border: 'border-stone-300', borderB: 'border-b-stone-600', ring: 'ring-stone-400', text: 'text-stone-700', gradient: 'from-stone-400 to-stone-600' },
    blue: { bg: 'bg-blue-50', border: 'border-blue-300', borderB: 'border-b-blue-600', ring: 'ring-blue-400', text: 'text-blue-700', gradient: 'from-blue-400 to-indigo-600' },
    purple: { bg: 'bg-purple-50', border: 'border-purple-300', borderB: 'border-b-purple-600', ring: 'ring-purple-400', text: 'text-purple-700', gradient: 'from-purple-400 to-pink-600' },
};

const AvatarSelectionModal: React.FC<AvatarSelectionModalProps> = ({ userName, onAvatarSelect }) => {
    const [selectedAvatarId, setSelectedAvatarId] = useState<string | null>(null);

    const handleConfirm = () => {
        if (selectedAvatarId) {
            onAvatarSelect(selectedAvatarId);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/80 backdrop-blur-md p-4 fade-in overflow-y-auto">
            <div className="w-full max-w-4xl mx-auto text-center bg-white border-4 border-orange-200 rounded-[2.5rem] shadow-2xl p-6 md:p-10 relative overflow-hidden">
                <div className="relative z-10">
                    <div className="mb-6">
                        <div className="inline-flex items-center justify-center bg-gradient-to-r from-orange-500 to-red-500 text-white px-5 py-1.5 rounded-full font-bold shadow-lg mb-3 transform -rotate-1">
                            <Sparkles className="w-4 h-4 mr-2" />
                            <span className="tracking-wide uppercase text-xs">Choose Your Hero</span>
                        </div>
                        <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-2 font-amharic-pretty">
                            Welcome, {userName}!
                        </h1>
                        <p className="text-base md:text-lg text-gray-600">
                            Who do you want to be on your adventure?
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8 max-w-2xl mx-auto">
                        {avatars.map(avatar => {
                            const isSelected = selectedAvatarId === avatar.id;
                            const theme = themeStyles[avatar.color] || themeStyles.orange;

                            return (
                                <button
                                    key={avatar.id}
                                    onClick={() => setSelectedAvatarId(avatar.id)}
                                    className={`relative group transition-all duration-300 outline-none`}
                                >
                                    <div className={`
                                        relative flex flex-col items-center p-3 rounded-2xl transition-all duration-200
                                        ${theme.bg} border-4 ${theme.border}
                                        ${isSelected 
                                            ? `border-b-4 translate-y-1 ring-4 ${theme.ring} shadow-none` 
                                            : `${theme.borderB} border-b-[8px] shadow-lg hover:-translate-y-0.5 hover:shadow-xl`
                                        }
                                    `}>
                                        <div className={`
                                            w-16 h-16 md:w-20 md:h-20 rounded-full mb-3 flex items-center justify-center
                                            bg-gradient-to-br ${theme.gradient} shadow-inner p-0.5 relative
                                        `}>
                                            <DynamicIcon
                                                source={{ iconUrl: avatar.iconUrl, imageId: avatar.assetId }}
                                                className="w-14 h-14 md:w-16 md:h-16 object-contain drop-shadow-xl transform transition-transform group-hover:scale-110 z-10"
                                            />
                                            {isSelected && (
                                                <div className="absolute -top-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center border-2 border-green-500 shadow-md animate-bounce z-20">
                                                    <Check className="w-3 h-3 text-green-600" strokeWidth={4} />
                                                </div>
                                            )}
                                        </div>
                                        <div className="bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full border border-white/50 shadow-sm">
                                            <span className={`font-bold text-xs md:text-sm ${theme.text}`}>{avatar.name}</span>
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>

                    <button
                        onClick={handleConfirm}
                        disabled={!selectedAvatarId}
                        className={`
                            w-full max-w-xs mx-auto text-white text-lg font-bold py-3 rounded-2xl shadow-xl transition-all duration-300
                            ${selectedAvatarId 
                                ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 hover:scale-105 transform cursor-pointer border-b-8 border-green-700 active:border-b-0 active:translate-y-2' 
                                : 'bg-gray-300 border-b-8 border-gray-400 cursor-not-allowed opacity-70'}
                        `}
                    >
                        {selectedAvatarId ? "Let's Start! 🚀" : "Select an Avatar"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AvatarSelectionModal;
